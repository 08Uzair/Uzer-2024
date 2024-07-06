import { toast } from "react-toastify";
import * as api from "../api";
import {
  FETCH_CART_PRODUCTS,
  FETCH_CART_PRODUCTS_ID,
  UPDATE_CART_PRODUCTS,
  DELETE_CART_PRODUCTS,
  CREATE_CART_PRODUCT,
} from "../constants/actionTypes";

export const getCartProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCartProducts();
    console.log("Fetched Cart Products:", data); // Debugging log
    dispatch({ type: FETCH_CART_PRODUCTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCartProducts = (product) => async (dispatch) => {
  try {
    const { data } = await api.addCartProducts(product);
    console.log("Created Cart Product:", data); // Debugging log
    toast.success("Added to Cart Successfully");
    dispatch({ type: CREATE_CART_PRODUCT, payload: data });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const getCartProductByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchCartProductsById(id);
    console.log("Fetched Cart Product By ID:", data); // Debugging log
    dispatch({ type: FETCH_CART_PRODUCTS_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const cartProductUpdate = (id, updatedProduct) => async (dispatch) => {
  console.log(id);
  console.log(updatedProduct);
  try {
    const { data } = await api.updateCartProducts(id, updatedProduct);
    console.log("Updated Cart Product:", data); // Debugging log
    dispatch({ type: UPDATE_CART_PRODUCTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartProduct = (id) => async (dispatch) => {
  try {
    await api.deleteCartProducts(id);
    console.log("Deleted Cart Product ID:", id); // Debugging log
    dispatch({ type: DELETE_CART_PRODUCTS, payload: id });
  } catch (error) {
    console.log(error);
  }
};
