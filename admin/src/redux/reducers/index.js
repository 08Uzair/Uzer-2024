import { combineReducers } from "redux";
import authReducer from "./auth";
import inbox from "./inbox";
import product from "./product";
import category from "./category";

const rootReducer = combineReducers({
  authReducer,
  inbox,
  product,
  category,
});

export default rootReducer;
