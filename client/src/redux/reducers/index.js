import { combineReducers } from "redux";
import authReducer from "./auth";
import products from "./products";
import cart from "./cart";

const rootReducer = combineReducers({
  authReducer,
  products,
  cart
});

export default rootReducer;
