import * as api from "../api";
import { FETCH_STATUS, FETCH_STATUS_ID } from "../constants/actionTypes";

export const getStatus = () => async (dispatch) => {
  try {
    const { data } = await api.fetchStatus();
    dispatch({ type: FETCH_STATUS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getStatusByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchStatusById(id);
    dispatch({ type: FETCH_STATUS_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};
