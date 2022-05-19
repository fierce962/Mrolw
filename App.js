
import React from 'react';
import Main from './src/main';
import { Provider } from 'react-redux';
import { store } from './src/store/store'
import { decode, encode } from 'base-64';


const App = () => {
  if (!global.btoa) { global.btoa = encode }
  if (!global.atob) { global.atob = decode }
  return (
    <Provider store={ store }>
        <Main />
    </Provider>
  );
};

export default App;
