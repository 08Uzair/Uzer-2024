import {
  FETCH_ORDERS,
  FETCH_ORDERS_ID,
  DELETE_ORDERS,
} from "../constants/actionTypes";

export default (orders = [], action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return action.payload;

    case FETCH_ORDERS_ID:
      return action.payload;

    case DELETE_ORDERS:
      return orders.filter((order) => order._id !== action.payload._id);

    default:
      return orders;
  }
};
