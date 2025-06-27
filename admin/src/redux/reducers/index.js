import { combineReducers } from "redux";
import authReducer from "./auth";
import inbox from "./inbox";
import product from "./product";
import category from "./category";
import orders from "./orders";
import status from "./status";

const rootReducer = combineReducers({
  authReducer,
  inbox,
  product,
  category,
  orders,
  status,
});

export default rootReducer;
