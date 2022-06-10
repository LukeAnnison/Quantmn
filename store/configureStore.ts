import { configureStore } from '@reduxjs/toolkit'
import { nftReducer } from './reducers/nftSlice'

export const store = configureStore({
  reducer: {
    nfts: nftReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
