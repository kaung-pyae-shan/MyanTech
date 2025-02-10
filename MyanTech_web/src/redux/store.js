import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './services/CounterSlice'
import productReducer from "./productSlice";


export const store = configureStore({
  reducer: {
    orders: orderReducer,
   counter : counterReducer,
   products: productReducer,
   orders: deliReducer,
  },
})
