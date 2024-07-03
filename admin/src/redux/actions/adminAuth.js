import * as api from "../api";
import { toast } from "react-toastify";

import {
  ADMIN_AUTH,
  FETCH_ADMIN,
  FETCH_ADMIN_ID,
} from "../constants/actionTypes";
export const signin = (newAdmin) => async (dispatch) => {
  try {
    const { data } = await api.signIn(newAdmin);
    dispatch({ type: ADMIN_AUTH, payload: data });
    toast.success("Login Sucessfully")
  } catch (error) {
    toast.error("Invalid Email & Password")
  }
};

export const signUp = (newAdmin) => async (dispatch) => {
  try {
    const { data } = await api.signUp(newAdmin);
    dispatch({ type: ADMIN_AUTH, payload: data });
    toast.success("Registeration Sucessfull")
  } catch (error) {
    toast.error("Registeration Failed")
    console.log(error);
  }
};

export const getAdmins = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAdmin();
    localStorage.setItem("profile", JSON.stringify(data));
    dispatch({ type: FETCH_ADMIN, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchAdminById(id);
    dispatch({ type: FETCH_ADMIN_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};
