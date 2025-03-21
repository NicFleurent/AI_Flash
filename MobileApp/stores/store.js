import { configureStore } from '@reduxjs/toolkit'
import screenReducer from './sliceScreen'
import todayFlashcardsReducer from './sliceTodayFlashcards'
import changeCollectionsSlice from './sliceChangeCollections'
import changeSubjectSlice from './sliceChangeSubject'
import updateExploreSlice from './sliceUpdateExplore'

const store = configureStore({
  reducer: {
    screen: screenReducer,
    todayFlashcards: todayFlashcardsReducer,
    changeCollectionsSlice: changeCollectionsSlice,
    changeSubjectSlice: changeSubjectSlice,
    updateExplore: updateExploreSlice
  }
})

export default store