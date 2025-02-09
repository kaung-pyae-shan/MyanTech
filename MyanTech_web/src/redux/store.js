import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './services/CounterSlice'

export const store = configureStore({
  reducer: {
   counter : counterReducer
  },
})
