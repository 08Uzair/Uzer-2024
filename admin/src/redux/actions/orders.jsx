import * as api from "../api";
import {
  FETCH_ORDERS,
  FETCH_ORDERS_ID,
  DELETE_ORDERS,
} from "../constants/actionTypes";

export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await api.fetchOrders();
    dispatch({ type: FETCH_ORDERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchOrdersById(id);
    dispatch({ type: FETCH_ORDERS_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    await api.deleteOrders(id);
    dispatch({ type: DELETE_ORDERS, payload: id });
  } catch (error) {
    console.log(error);
  }
};
