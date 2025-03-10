import { configureStore } from '@reduxjs/toolkit'
import screenReducer from './sliceScreen'
import todayFlashcardsReducer from './sliceTodayFlashcards'

const store = configureStore({
  reducer: {
    screen: screenReducer,
    todayFlashcards: todayFlashcardsReducer
  }
})

export default store