/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */

const initialData = await (await fetch('../../../../public/data/data.json')).json();
console.log(initialData)

const initialState: UserSliceState = {
  currentUser: initialData.currentUser ?? [],
  status: 'idle',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // incrementScore: (state, action: PayloadAction<number>) => {
      
    // },
    // decrementScore: (state, action: PayloadAction<number>) => {
      
    // }
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