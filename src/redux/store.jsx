// src/redux/store.js
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { reducerColor } from './reducers/color';

const rootReducer = combineReducers({
    colors : reducerColor
    // Add other reducers here
});

const store = createStore(rootReducer);

export default store;