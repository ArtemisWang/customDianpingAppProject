import { combineReducers } from "redux";
import entities from "./entities";
import home from "./home";
import detail from "./detail";
import app from "./app";
import search from './search'
import login from './login'


//合并成根reducer
const rootReducer = combineReducers({
  entities,
  home,
  detail,
  app,
  search,
  login
})

export default rootReducer