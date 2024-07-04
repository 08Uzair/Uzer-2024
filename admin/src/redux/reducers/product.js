import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ID,
  CREATE_PRODUCT,
  DELETE_PRODUCTS,
  UPDATE_PRODUCTS,
} from "../constants/actionTypes";

export default (products = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;

    case CREATE_PRODUCT:
      return [...products, action.payload];

    case FETCH_PRODUCTS_ID:
      return [action.payload];

    case DELETE_PRODUCTS:
      return products.filter((product) => product._id !== action.payload._id);

    case UPDATE_PRODUCTS:
      return products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );

    default:
      return products;
  }
};
