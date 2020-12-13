import { createSlice } from 'redux-starter-kit'
import { pages } from '../components/pages'

const navigationSlice = createSlice({
  slice: 'navigation',
  initialState: {
    currentPage: 'Home',
  },
  reducers: {
    navigate: (state, action) => {
      return {
        currentPage: action.payload,
        previousPage: state.currentPage,
      }
    },
    goBack: ({ currentPage, previousPage }) => {
      if (currentPage === 'CycleDay' && !!previousPage) {
        return {
          currentPage: previousPage,
        }
      }

      const page = pages.find((p) => p.component === currentPage)
      return {
        currentPage: page.parent,
        previousPage: currentPage,
      }
    },
  },
})

// Extract the action creators object and the reducer
const { actions, reducer, selectors } = navigationSlice
// Extract and export each action creator by name
export const { navigate, goBack } = actions

export const { getNavigation } = selectors

export default reducer
