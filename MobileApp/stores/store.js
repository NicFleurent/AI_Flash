import { configureStore } from '@reduxjs/toolkit'
import screenReducer from './sliceScreen'

const store = configureStore({
  reducer: {
    screen: screenReducer
  }
})

export default store