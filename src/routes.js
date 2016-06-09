import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Main, Home, Counter, NotFound, Forms, Statistic, Login } from './containers';
import { loadAuthIfNeeded } from './actions/auth';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    const user = store.getState().reduxAsyncConnect.user;
    if (!user) {
      replace('/');
    }
    cb();
  };

  const requireLoadAuth = (nextState, replace, cb) => {
    store.dispatch(loadAuthIfNeeded()).then(() => cb());
  };

  return (
    <Route path="/" component={Main} onEnter={requireLoadAuth}>
      <IndexRoute component={Home}/>
      <Route onEnter={requireLogin}>
        <Route path="counter" component={Counter}/>
        <Route path="forms" component={Forms}/>
        <Route path="statistic" component={Statistic}/>
      </Route>
      <Route path="login" component={Login}/>
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
