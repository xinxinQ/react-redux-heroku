import path from 'path';
import Express from 'express';
import favicon from 'serve-favicon';
import httpProxy from 'http-proxy';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import configureStore from './utils/configureStore';
import getRoutes from './routes';
import Html from './utils/Html';
import config from './config';

const app = new Express();
const port = process.env.PORT || config.port;
const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
const proxy = httpProxy.createProxyServer({
  target: targetUrl
});

app.use(compression());
app.use(Express.static(path.join(__dirname, '..', 'static')));
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl });
});

app.use((req, res) => {
  global.__COOKIE__ = req.get('cookie');

  if (process.env.NODE_ENV !== 'production') {
    webpackIsomorphicTools.refresh();
  }
  const initialState = {};
  const store = configureStore(initialState);

  const routes = getRoutes(store);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ routes, location: req.url }, (err, redirect, renderProps) => {
    if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (err) {
      res.status(500);
      hydrateOnClient();
      console.error('ROUTER ERROR:', err.stack);
    } else if (renderProps) {
      loadOnServer({ ...renderProps, store })
        .then(() => {
          res.status(200);
          const component = (
            <Provider store={store}>
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          );
          res.send('<!doctype html>\n' +
            renderToString(
              <Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>)
          );
        })
        .catch(error => {
          res.status(500).send('Internal Server Error');
          console.error('MOUNT ERROR:', error.stack);
        });
    } else {
      res.status(404).send('Not found');
    }
  });
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Open http://%s:%s in a browser to view the app.', config.host, port);
  }
});
