import './i18n';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './rdx';
import { PersistGate } from 'redux-persist/integration/react';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <Suspense fallback={false}>
        <App />
      </Suspense>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
