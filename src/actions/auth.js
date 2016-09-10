import { ASYNC } from '../utils/asyncMiddleware';
import { customFetch } from '../utils/utils';

export function shouldLoadAuth(state) {
  const userState = state.reduxAsyncConnect.loadState.user;
  const loaded = userState && userState.loaded;
  return !loaded;
}

export function loadAuth() {
  return {
    [ASYNC]: {
      key: 'user',
      promise: () => customFetch('/loadAuth')
    }
  };
}

export function loadAuthIfNeeded() {
  return (dispatch, getState) => {
    if (shouldLoadAuth(getState())) {
      return dispatch(loadAuth());
    }
    return Promise.resolve();
  };
}

export function login(name) {
  const url = '/login';
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name
    })
  };
  return {
    [ASYNC]: {
      key: 'user',
      promise: () => customFetch(url, option)
    }
  };
}

export function logout() {
  return {
    [ASYNC]: {
      key: 'user',
      promise: () => customFetch('/logout')
    }
  };
}
