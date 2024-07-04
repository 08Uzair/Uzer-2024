import * as api from "../api";
import { handleErrors } from "../../utility/handelError";
import { AUTH, FETCH_USER_ID, FETCH_USER } from "../constants/actionTypes";
import { toast } from "react-toastify";
export const signin = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.signIn(newUser);
    dispatch({ type: AUTH, payload: data });
    toast.success("Login Sucessfull");
  } catch (error) {
    toast.error("Invalid Email or Password");
    return handleErrors(error.response.status);
  }
};

export const signUp = (newUser) => async (dispatch) => {
  // Validation for empty fields
  const {
    email,
    password,
    fname,
    lname,
    country,
    state,
    city,
    pinCode,
    number,
    address1,
    address2,
  } = newUser;
  if (
    !email ||
    !password ||
    !fname ||
    !lname ||
    !country ||
    !state ||
    !city ||
    !pinCode ||
    !number ||
    !address1 ||
    !address2
  ) {
    toast.error("Please fill all the fields");
    return;
  }

  try {
    const { data } = await api.signUp(newUser);
    dispatch({ type: AUTH, payload: data });
    toast.success("Registered Successfully");
  } catch (error) {
    toast.error("Registration Failed");
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
    await api.deleteUser(id);
    dispatch({ type: DELETE_BLOG, payload: id });
  } catch (error) {
    console.log(error);
  }
};
