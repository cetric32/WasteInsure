/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import configureStore from './src/store/reducers';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

const store = configureStore();

const RNRedux = () => (
  <Provider store={store}>
    <PaperProvider>
      <App />
    </PaperProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
