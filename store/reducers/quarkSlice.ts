import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const quarkSlice = createSlice({
  name: 'profile',
  initialState: {allQuarks: []},
  reducers: {
    setQuarks: (state, action) => {
        state.allQuarks = action.payload;
      
    }}
});

export const quarkReducer = quarkSlice.reducer;
export const {
 setQuarks
} = quarkSlice.actions;
