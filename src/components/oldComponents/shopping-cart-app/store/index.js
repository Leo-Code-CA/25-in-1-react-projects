import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cart-slice.js';

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

export default store;