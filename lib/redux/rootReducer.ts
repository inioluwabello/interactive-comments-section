/* Instruments */
import { commentSlice, counterSlice, userSlice } from './slices'

export const reducer = {
  counter: counterSlice.reducer,
  comment: commentSlice.reducer,
  user: userSlice.reducer,
}
