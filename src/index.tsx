if (__DEV__) {
  require('../ReactotronConfig');
}

import React from 'react';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { Darts } from './darts';
import { name as appName } from '../app.json';

import { Provider } from 'react-redux';
import { store } from './store';

const initWrapper = () => {
  return (
    <Provider store={store}>
      <Darts />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => initWrapper);
