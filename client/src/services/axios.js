import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../store";
import { setLoading, stopLoading } from "../store/slices/loaderSlice";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading());
    return config;
  },
  (err) => {
    store.dispatch(stopLoading());
    return Promise.reject(err);
  },
);

Axios.interceptors.response.use(
  (res) => {
    store.dispatch(stopLoading());
    return res;
  },
  async (err) => {
    store.dispatch(stopLoading());
    const status = err.response?.status;
    if (status === 401) {
      Cookies.remove("token");
      window.location.href = "/login";
    }
    return Promise.reject({
      message:
        err.response?.data?.message || err.message || "Something went wrong",
      data: err.response?.data || null,
    });
  },
);

export default Axios;
