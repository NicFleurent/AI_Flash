import { createSlice } from "@reduxjs/toolkit";

const changeSubjectSlice = createSlice({
  name:"sliceChangeSubject",
  initialState:{
    value: false,
  },
  reducers:{
    setValueS:(state, action) => {
      state.value = action.payload;
    }
  }
})

export const { 
  setValueS
} = changeSubjectSlice.actions;

export default changeSubjectSlice.reducer;