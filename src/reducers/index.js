import { combineReducers, compose } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as formReducer } from 'redux-form';
import counter from './counter';

const rootReducer = combineReducers({
  reduxAsyncConnect: compose(counter)(reduxAsyncConnect),
  form: formReducer
});

export default rootReducer;
