import expect from 'expect';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions/counter';

const middlewares = [thunk];

/*
 * Creates a mock of Redux store with middleware.
 */
function mockStore(getState, expectedActions, onLastAction) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.');
  }
  if (typeof onLastAction !== 'undefined' && typeof onLastAction !== 'function') {
    throw new Error('onLastAction should either be undefined or function.');
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState;
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift();
        expect(action).toEqual(expectedAction);
        if (onLastAction && !expectedActions.length) {
          onLastAction();
        }
        return action;
      }
    };
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
}

describe('actions', () => {
  describe('counter', () => {
    it('increment should create increment action', () => {
      expect(actions.increment()).toEqual({ type: actions.INCREMENT_COUNTER });
    });

    it('decrement should create decrement action', () => {
      expect(actions.decrement()).toEqual({ type: actions.DECREMENT_COUNTER });
    });

    it('incrementIfOdd should create increment action', (done) => {
      const expectedActions = [
        { type: actions.INCREMENT_COUNTER }
      ];
      const getState = { reduxAsyncConnect: { counter: { value: 1 } } };
      const store = mockStore(getState, expectedActions, done);
      store.dispatch(actions.incrementIfOdd());
    });

    it('incrementIfOdd shouldnt create increment action if counter is even', (done) => {
      const expectedActions = [];
      const getState = { reduxAsyncConnect: { counter: { value: 2 } } };
      const store = mockStore(getState, expectedActions);
      store.dispatch(actions.incrementIfOdd());
      done();
    });

    it('incrementAsync should create increment action', (done) => {
      const expectedActions = [
        { type: actions.INCREMENT_COUNTER }
      ];
      const getState = { reduxAsyncConnect: { counter: { value: 0 } } };
      const store = mockStore(getState, expectedActions, done);
      store.dispatch(actions.incrementAsync(100));
    });
  });
});
