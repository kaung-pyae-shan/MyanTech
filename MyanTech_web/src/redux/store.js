import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './services/CounterSlice'
import productReducer from "./productSlice";
import orderReducer from './services/OrderSlice'
import deliReducer from './deliSLice'



export const store = configureStore({
  reducer: {
    orders: orderReducer,
   counter : counterReducer,
   products: productReducer,
   delis: deliReducer,
  },
})
