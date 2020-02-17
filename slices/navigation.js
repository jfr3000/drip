import { createSlice } from 'redux-starter-kit'
import { pages, isSymptomView } from '../components/pages'
import { closeDb } from '../db'
import { BackHandler } from 'react-native'

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

      if (currentPage === 'Home') {
        closeDb()
        BackHandler.exitApp()
        return { currentPage }
      }

      if (currentPage === 'CycleDay' || isSymptomView(currentPage)) {
        if (previousPage) {
          return {
            currentPage: previousPage
          }
        }
      }

      const page = pages.find(p => p.component === currentPage)
      return {
        currentPage: page.parent
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
