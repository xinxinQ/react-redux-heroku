import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';

const initialState = {
  counter: {
    value: 0
  }
};

export function counter(state, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        value: state.value + 1
      };
    case DECREMENT_COUNTER:
      return {
        value: state.value - 1
      };
    default:
      return state;
  }
}

export default reducer => (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
    case DECREMENT_COUNTER:
      return {
        ...state,
        counter: counter(state.counter, action)
      };
    default:
      return reducer(state, action);
  }
};
