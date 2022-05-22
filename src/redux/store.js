import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import dogState from './reducers/dogState'
import { configureStore } from '@reduxjs/toolkit'

/**
 * Creates a redux store with devtools and thunk middleware
 * @returns {store} redux store
 * @see {@link createStore}
 */
const store = configureStore({
    reducer: {
      dogState: dogState,
    },
  })
export default store;
