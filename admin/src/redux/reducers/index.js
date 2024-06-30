import { combineReducers } from "redux";
import authReducer from "./auth";
import inbox from "./inbox";

const rootReducer = combineReducers({
  authReducer,
  inbox,
});

export default rootReducer;
