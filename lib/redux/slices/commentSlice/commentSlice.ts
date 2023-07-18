/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
import { incrementAsync } from './thunks'
import { IUser } from '../..'

const initialState: CommentSliceState = {
  comments: [],
  status: 'idle',
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload
    },
    incrementScore: (state, action: PayloadAction<number>) => {
      
    },
    decrementScore: (state, action: PayloadAction<number>) => {
      
    },
    reply: (state, action: PayloadAction<number>) => {
      
    },
    delete: (state, action: PayloadAction<number>) => {
      
    },
    edit: (state, action: PayloadAction<number>) => {
      
    },
    update: (state, action: PayloadAction<number>) => {
      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle'
      })
  },
})

/* Types */
export interface CommentSliceState {
  comments: IComment[],
  status: 'idle' | 'loading' | 'failed'
}

export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: IUser;
  replies: IComment[]
}