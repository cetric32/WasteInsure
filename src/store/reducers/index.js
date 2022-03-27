import {createStore, combineReducers} from 'redux';

import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import RegistrationReducer from './registration';
import UserReducer from './user';

const rootReducer = combineReducers({
  registration: RegistrationReducer,
  user: UserReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
