import { createSlice } from "@reduxjs/toolkit";

const changeCollectionsSlice = createSlice({
  name:"sliceChangeCollections",
  initialState:{
    value: false,
  },
  reducers:{
    setValueC:(state, action) => {
      state.value = action.payload;
    }
  }
})

export const { 
  setValueC
} = changeCollectionsSlice.actions;

export default changeCollectionsSlice.reducer;