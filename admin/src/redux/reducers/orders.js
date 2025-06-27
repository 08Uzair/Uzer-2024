import {
  FETCH_ORDERS,
  FETCH_ORDERS_ID,
  DELETE_ORDERS,
  FETCH_TOTAL,
  UPDATE_ORDER_STATUS,
} from "../constants/actionTypes";

const initialState = {
  orders: [],
  totalPrice: [], // or an object if you want to store a single blog post
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        order: action.payload,
      };
    case FETCH_TOTAL:
      return {
        ...state,
        totalPrice: action.payload,
      };

    case FETCH_ORDERS_ID:
      return {
        ...state,
        order: action.payload,
      };
    case UPDATE_ORDER_STATUS:
      return state.orders.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case DELETE_ORDERS:
      return {
        order: state.filter((order) => order._id !== action.payload._id),
      };

    default:
      return state;
  }
};
