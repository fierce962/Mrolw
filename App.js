
import React from 'react';
import Main from './src/main';
import { Provider } from 'react-redux';
import { store } from './src/store/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <Provider store={ store }>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Main />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
