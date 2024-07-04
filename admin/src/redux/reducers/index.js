import { combineReducers } from "redux";
import authReducer from "./auth";
import inbox from "./inbox";
import product from "./product";

const rootReducer = combineReducers({
  authReducer,
  inbox,
  product,
});

export default rootReducer;
