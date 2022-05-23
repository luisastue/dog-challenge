import { combineReducers } from 'redux';
import dogReducer from './reducers/dogReducer'
import breedReducer from './reducers/breedReducer'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';


const persistConfig = {
  key: 'game',
  storage,
};
const reducers = combineReducers({ 
  dogState: dogReducer,
  breedState: breedReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
      }),
  })
export default store;
