import { createSlice } from 'redux-starter-kit'

const navigationSlice = createSlice({
  slice: 'navigation',
  initialState: {
    currentPage: 'Home',
  },
  reducers: {
    navigate: (state, action) => {
      return {
        currentPage: action.payload,
      }
    }
  }
})

// Extract the action creators object and the reducer
const { actions, reducer, selectors } = navigationSlice
// Extract and export each action creator by name
export const { navigate } = actions

export const { getNavigation } = selectors

export default reducer
