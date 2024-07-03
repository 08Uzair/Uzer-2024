import {
  ADMIN_LOGOUT,
  ADMIN_AUTH,
  FETCH_ADMIN_ID,
  FETCH_ADMIN,
  DELETE_ADMIN,
} from "../constants/actionTypes";

const adminAuthReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case ADMIN_AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));

      // console.log(action.payload);
      return {
        ...state,
        authData: action.payload,
        loading: false,
        errors: null,
      };
    case ADMIN_LOGOUT:
      return { ...state, authData: null, loading: false, errors: null };

    case FETCH_ADMIN:
      return action.payload;

    case FETCH_ADMIN_ID:
      return [action.payload];
    default:
      return state;
    case DELETE_ADMIN:
      return state.filter((admin) => admin._id !== action.payload._id);
  }
};
export default adminAuthReducer;
