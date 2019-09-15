import { createSlice } from 'redux-starter-kit'

const navigationSlice = createSlice({
  slice: 'navigation',
  initialState: {
    current: 'Home',
    prev: null,
  },
  reducers: {
    navigate: (state, action) => {
      return {
        current: action.payload,
        prev: state.current
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
