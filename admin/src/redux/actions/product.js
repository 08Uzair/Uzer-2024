import * as api from "../api";
import { toast } from "react-toastify";
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ID,
  CREATE_PRODUCT,
  DELETE_PRODUCTS,
  UPDATE_PRODUCTS,
} from "../constants/actionTypes";
import { TOAST } from "../../utility/constantToast";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts();
    dispatch({ type: FETCH_PRODUCTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProducts = (product) => async (dispatch) => {
  try {
    toast.success(TOAST.PRODUCT.CREATE_PRODUCT);
    const { data } = await api.createProducts(product);
    dispatch({ type: CREATE_PRODUCT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getProductByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchProductsById(id);
    dispatch({ type: FETCH_PRODUCTS_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = (id, updatedProduct) => async (dispatch) => {
  try {
    const { data } = await api.updateProducts(id, updatedProduct);
    dispatch({ type: UPDATE_PRODUCTS, payload: data });
    toast.success(TOAST.PRODUCT.UPDATE_PRODUCT);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    toast.success(TOAST.PRODUCT.DELETE_PRODUCT);
    await api.deleteProducts(id);
    dispatch({ type: DELETE_PRODUCTS, payload: id });
  } catch (error) {
    console.log(error);
  }
};