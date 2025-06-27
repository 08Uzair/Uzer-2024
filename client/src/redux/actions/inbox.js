import * as api from "../api";
import { CREATE_INBOX, FETCH_INBOX } from "../constants/actionTypes";
export const getInbox = () => async (dispatch) => {
  try {
    const { data } = await api.fetchInbox();
    dispatch({ type: FETCH_INBOX, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addInbox = (inbox) => async (dispatch) => {
  try {
    const { data } = await api.createInbox(inbox);
    console.log(data);
    dispatch({ type: CREATE_INBOX, payload: data });
  } catch (error) {
    console.log(error);
  }
};
