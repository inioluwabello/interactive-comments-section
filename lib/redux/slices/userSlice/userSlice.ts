/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
const initialState: UserSliceState = {
  currentUser: {
    image: { 
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp"
    },
    username: "juliusomo"
  },
  status: 'idle',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload
    },
  }
})

/* Types */
export interface UserSliceState {
  currentUser: IUser,
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