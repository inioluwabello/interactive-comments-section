/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
const initialState: UserSliceState = {
  currentUser: null,
  status: 'idle',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload
    },
    // decrementScore: (state, action: PayloadAction<number>) => {
      
    // }
  }
})

/* Types */
export interface UserSliceState {
  currentUser: IUser | null,
  status: 'idle' | 'loading' | 'failed'
}

export interface IUser {
  image: IImage;
  username: string;
}

export interface IImage {
  png: string,
  webp: string;
}