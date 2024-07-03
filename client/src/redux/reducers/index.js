import { combineReducers } from "redux";
import authReducer from "./auth";
import products from "./products";

const rootReducer = combineReducers({
  authReducer,
  products,
});

export default rootReducer;
