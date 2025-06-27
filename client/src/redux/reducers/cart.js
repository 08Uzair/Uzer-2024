import {
  FETCH_CART_PRODUCTS,
  CREATE_CART_PRODUCT,
  UPDATE_CART_PRODUCTS,
  DELETE_CART_PRODUCTS,
  FETCH_CART_PRODUCTS_BY_USER_ID,
  DELETE_CART_PRODUCT_BY_USER_ID,
} from "../constants/actionTypes";

export default (products = [], action) => {
  switch (action.type) {
    case FETCH_CART_PRODUCTS:
      return action.payload;

    case CREATE_CART_PRODUCT:
      return [...products, action.payload];

    case FETCH_CART_PRODUCTS_BY_USER_ID:
      // console.log(action.payload);
      return action.payload;

    case DELETE_CART_PRODUCTS:
      return products.filter((product) => product._id !== action.payload);

    case DELETE_CART_PRODUCT_BY_USER_ID:
      return products.filter(
        (product) => product.user !== action.payload.userId
      );

    case UPDATE_CART_PRODUCTS:
      return products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );

    default:
      return products;
  }
};
