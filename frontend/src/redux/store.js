import {configureStore} from '@reduxjs/toolkit';
import app from './app';
import test from './test';
import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({app, test});
const persistConfig = {key: 'root', storage};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({reducer: persistedReducer, devTools: true, middleware: [thunk]});

export default store;