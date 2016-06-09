import {
  load, loadSuccess, loadFail,
  beginGlobalLoad, endGlobalLoad
} from 'redux-connect/lib/store';
export const ASYNC = Symbol('async middleware');

export default () => next => action => {
  if (typeof action[ASYNC] === 'undefined') {
    return next(action);
  }
  const { key, promise } = action[ASYNC];

  next(beginGlobalLoad());
  next(load(key));

  return promise
    .then(data => next(loadSuccess(key, data)))
    .catch(error => next(loadFail(key, error)))
    .then(result => {
      next(endGlobalLoad());
      return result;
    });
};
