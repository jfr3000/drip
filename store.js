import { combineReducers, createStore } from "redux"

import date from "./slices/date"

const reducer = combineReducers({
  date
})

const store = createStore(reducer)

export default store
