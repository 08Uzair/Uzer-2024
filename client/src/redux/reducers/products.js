import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ID,
  CREATE_PRODUCT,
  DELETE_PRODUCTS,
  UPDATE_PRODUCTS,
} from "../constants/actionTypes";

const initialState = {
  products: [],
  singleProduct: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };

    case FETCH_PRODUCTS_ID:
      return { ...state, singleProduct: action.payload };

    case CREATE_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };

    case DELETE_PRODUCTS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload._id
        ),
      };

    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };

    default:
      return state;
  }
};
