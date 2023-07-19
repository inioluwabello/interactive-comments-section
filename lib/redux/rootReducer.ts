/* Instruments */
import { commentSlice, userSlice } from './slices'

export const reducer = {
  comment: commentSlice.reducer,
  user: userSlice.reducer,
}
