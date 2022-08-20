import { combineReducers, createStore } from "redux"

import date from "./slices/date"
import navigation from "./slices/navigation"

const reducer = combineReducers({
  date,
  navigation
})

const store = createStore(reducer)

export default store
