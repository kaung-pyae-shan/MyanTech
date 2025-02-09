import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './services/CounterSlice'
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
   counter : counterReducer,
   products: productReducer,
  },
})
