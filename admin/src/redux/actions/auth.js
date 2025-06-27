import * as api from "../api";
import { toast } from "react-toastify";
import {
  AUTH,
  FETCH_USER_ID,
  FETCH_USER,
  DELETE_USER,
} from "../constants/actionTypes";
import { TOAST } from "../../utility/constantToast";
export const signIn = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.signIn(newUser);
    dispatch({ type: AUTH, payload: data });
    localStorage.setItem("itemName", "home");
    toast.success(TOAST.AUTH.SUCCESS_LOGIN);
  } catch (error) {
    return toast.error("Login Failed");
  }
};

export const signUp = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.signUp(newUser);
    dispatch({ type: AUTH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUser();
    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUserById(id);
    dispatch({ type: FETCH_USER_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    toast.success(TOAST.AUTH.DELETE_USER);
    await api.deleteUser(id);
    dispatch({ type: DELETE_USER, payload: id });
  } catch (error) {
    console.log(error);
  }
};
