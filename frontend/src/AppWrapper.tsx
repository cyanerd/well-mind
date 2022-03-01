import store from './redux/store';
import App from './App';
import {Provider} from 'react-redux';
import React from 'react';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import { YMInitializer } from 'react-yandex-metrika';

const AppWrapper: React.FC = () => {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <YMInitializer accounts={[85687521]} options={{webvisor: true}}/>
        <App/>
      </PersistGate>
    </Provider>
  );
}

export default AppWrapper;