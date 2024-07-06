import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000/api/v1/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// USERS
export const fetchUser = () => API.get("/user");
export const fetchUserById = (id) => API.get(`/user/${id}`);
export const deleteUser = (id) => API.delete(`/user/${id}`);
export const signUp = (newUser) => API.post("/user/signUp/", newUser);
export const signIn = (newUser) => API.post("/user/signIn/", newUser);

// PRODUCTS
export const createProducts = (newProducts) =>
  API.post("/products", newProducts);
export const fetchProducts = () => API.get("/products");
export const fetchProductsById = (id) => API.get(`/products/${id}`);
export const deleteProducts = (id) => API.delete(`/products/${id}`);
export const updateProducts = (id) => API.put(`/products/${id}`);

// CART
export const addCartProducts = (newProducts) => API.post("/cart", newProducts);
export const fetchCartProducts = () => API.get("/cart");
export const fetchCartProductsById = (id) => API.get(`/cart/${id}`);
export const deleteCartProducts = (id) => API.delete(`/cart/${id}`);
export const updateCartProducts = ( product, user) => API.put(`/cart/${id}`,);
