
import React from 'react';
import Main from './src/main';
import { Provider } from 'react-redux';
import { store } from './src/store/store'
import { decode, encode } from 'base-64';
import { controllerNotifications } from './src/models/ControllerNotifications';


const App = () => {
  if (!global.btoa) { global.btoa = encode };
  if (!global.atob) { global.atob = decode };
  controllerNotifications.createListenerBackgraound();

  return (
    <Provider store={ store }>
        <Main />
    </Provider>
  );
};

export default App;
