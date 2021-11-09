import {configureStore} from '@reduxjs/toolkit';
import user from './user';
import test from './test';
import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({user, test});
const persistConfig = {key: 'root', storage};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({reducer: persistedReducer, devTools: true, middleware: [thunk]});

export default store;