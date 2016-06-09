import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';

import { Router, browserHistory, match } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';

import getRoutes from './routes';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('app');

const history = browserHistory;
const routes = getRoutes(store);

match({ history, routes }, (err, redirect, renderProps) => {
  if (redirect) {
    history.replace(redirect);
  } else if (err) {
    history.goBack();
    console.error(err.toString());
  } else {
    render(
      <Provider store={store}>
        <Router
          {...renderProps}
          render={(props) => <ReduxAsyncConnect {...props}/>}
        />
      </Provider>,
      rootElement
    );
  }
});

