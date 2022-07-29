import { createSlice } from 'redux-starter-kit'
import { LocalDate } from '@js-joda/core'

const dateSlice = createSlice({
  slice: 'date',
  initialState: LocalDate.now().toString(),
  reducers: {
    setDate: (state, action) => action.payload,
  },
})

// Extract the action creators object and the reducer
const { actions, reducer, selectors } = dateSlice
// Extract and export each action creator by name
export const { setDate } = actions

export const { getDate } = selectors

export default reducer
