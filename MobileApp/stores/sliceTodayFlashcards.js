import { createSlice } from "@reduxjs/toolkit";

const todayFlashcardsSlice = createSlice({
  name:"sliceTodayFlashcards",
  initialState:{
    needsRefresh:false,
  },
  reducers:{
    setNeedsRefresh:(state, action) => {
      state.needsRefresh = action.payload;
    }
  }
})

export const { 
  setNeedsRefresh
} = todayFlashcardsSlice.actions;

export default todayFlashcardsSlice.reducer;