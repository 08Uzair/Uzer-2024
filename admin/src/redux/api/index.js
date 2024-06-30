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

// Message
export const fetchInbox = () => API.get("/inbox");
export const fetchInboxById = () => API.get(`/inbox/${id}`);
export const deleteInbox = (id) => API.delete(`/inbox/${id}`);
