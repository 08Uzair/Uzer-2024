import * as api from "../api";
import { CREATE_PRODUCT } from "../constants/actionTypes";

export const addOrders = (order) => async (dispatch) => {
  try {
    const { data } = await api.createOrder(order);
    dispatch({ type: CREATE_PRODUCT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
