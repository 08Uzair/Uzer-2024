import * as api from "../api";
import {
  FETCH_INBOX,
  FETCH_INBOX_ID,
  DELETE_INBOX,
} from "../constants/actionTypes";

// GET INBOX
export const getInbox = () => async (dispatch) => {
  try {
    const { data } = await api.fetchInbox();
    dispatch({ type: FETCH_INBOX, payload: data });
  } catch (error) {
    console.log(error);
  }
};
// GET INBOX BY ID
export const getInboxByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchInboxById(id);
    dispatch({ type: FETCH_INBOX_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//   DELETE INBOX
export const deleteInbox = (id) => async (dispatch) => {
  try {
    await api.deleteInbox(id);
    dispatch({ type: DELETE_INBOX, payload: id });
  } catch (error) {
    console.log(error);
  }
};
