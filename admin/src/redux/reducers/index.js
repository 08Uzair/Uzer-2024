import { combineReducers } from "redux";
import authReducer from "./auth";
import inbox from "./inbox";
import product from "./product";
import adminAuthReducer from "./adminAuth";

const rootReducer = combineReducers({
  authReducer,
  inbox,
  product,
  adminAuthReducer,
});

export default rootReducer;
