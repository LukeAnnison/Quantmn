import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const nftSlice = createSlice({
  name: 'profile',
  initialState: {allNfts: []},
  reducers: {
    setNfts: (state, action) => {
        state.allNfts = action.payload;
      
    }}
});

export const nftReducer = nftSlice.reducer;
export const {
 setNfts
} = nftSlice.actions;
