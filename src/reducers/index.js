import { combineReducers, compose } from 'redux';
import { reducer as asyncReducer } from 'redux-amr';
import { reducer as formReducer } from 'redux-form';
import counter from './counter';

const rootReducer = combineReducers({
  async: compose(counter)(asyncReducer),
  form: formReducer
});

export default rootReducer;
