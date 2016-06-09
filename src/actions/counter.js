import { ASYNC } from '../utils/asyncMiddleware';
import { customFetch } from '../utils/utils';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { reduxAsyncConnect } = getState();

    if (reduxAsyncConnect.counter.value % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}

export function load() {
  return {
    [ASYNC]: {
      key: 'counter',
      promise: customFetch('/counter')
    }
  };
}
