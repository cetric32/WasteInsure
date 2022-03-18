import {createStore, combineReducers} from 'redux';

import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import RegistrationReducer from './registration';
const rootReducer = combineReducers({registration: RegistrationReducer});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
