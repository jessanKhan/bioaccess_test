/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import Providers from './src/routes/index';

const App = () => {

  return (
    <>
      <Provider store={store}>
        <Providers />
      </Provider>
    </>
  );
};

export default App;
