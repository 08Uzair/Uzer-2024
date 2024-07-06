import {
  FETCH_CART_PRODUCTS,
  FETCH_CART_PRODUCTS_ID,
  CREATE_CART_PRODUCT,
  UPDATE_CART_PRODUCTS,
  DELETE_CART_PRODUCTS,
} from "../constants/actionTypes";

export default (products = [], action) => {
  switch (action.type) {
    case FETCH_CART_PRODUCTS:
      return action.payload;

    case CREATE_CART_PRODUCT:
      return [...products, action.payload];

    case FETCH_CART_PRODUCTS_ID:
      return [action.payload];

    case DELETE_CART_PRODUCTS:
      console.log(products.cartProducts);
      return products.filter((product) => product._id !== action.payload);

    case UPDATE_CART_PRODUCTS:
      return products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
      break;
    default:
      return products;
  }
};
