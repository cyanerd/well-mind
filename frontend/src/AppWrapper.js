import store from './redux/store';
import App from './App';
import {Provider} from 'react-redux';
import React from 'react';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

export default function AppWrapper() {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
  );
}