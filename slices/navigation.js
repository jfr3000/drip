import { createSlice } from 'redux-starter-kit'

const navigationSlice = createSlice({
  slice: 'navigation',
  initialState: {
    currentPage: 'Home',
    history: [],
  },
  reducers: {
    navigate: (state, action) => {
      const { history, currentPage } = state
      return {
        history: history.concat(currentPage),
        currentPage: action.payload,
      }
    },
    goBack: (state) => {
      const { history } = state
      const lastIndex = history.length - 1
      return {
        currentPage: history[lastIndex],
        history: history.slice(0, lastIndex),
      }
    }
  }
})

// Extract the action creators object and the reducer
const { actions, reducer, selectors } = navigationSlice
// Extract and export each action creator by name
export const { navigate, goBack } = actions

export const { getNavigation } = selectors

export default reducer
