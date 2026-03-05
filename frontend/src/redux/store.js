import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import itemReducer from './itemSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        items: itemReducer,
        orders: orderReducer,
    },
});

export default store;
