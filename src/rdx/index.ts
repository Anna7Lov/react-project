import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer, GlobalAppState } from './rootReducer';
import type { } from 'redux-thunk/extend-redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const persistedReducer = persistReducer<GlobalAppState>(
  persistConfig,
  rootReducer
);

export const store: Store<GlobalAppState> = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
