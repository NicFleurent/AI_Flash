import { createSlice } from "@reduxjs/toolkit";

const updateExploreSlice = createSlice({
  name:"sliceUpdateExplore",
  initialState:{
    value: false,
  },
  reducers:{
    updateExplore:(state, action) => {
      state.value = action.payload;
    }
  }
})

export const { 
  updateExplore
} = updateExploreSlice.actions;

export default updateExploreSlice.reducer;