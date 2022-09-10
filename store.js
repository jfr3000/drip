import { combineReducers, createStore } from 'redux'

import navigation from './slices/navigation'

const reducer = combineReducers({
  navigation,
})

const store = createStore(reducer)

export default store
