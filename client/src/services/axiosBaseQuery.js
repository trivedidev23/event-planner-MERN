import { setLoading, stopLoading } from "../store/slices/loaderSlice";
import Axios from "./axios";

const axiosBaseQuery =
  () =>
  async ({ url, data, params, method, ...rest }, api) => {
    try {
      api.dispatch(setLoading());
      const res = await Axios({
        url,
        method,
        data,
        params,
        ...rest,
      });
      api.dispatch(stopLoading());
      return { data: res.data };
    } catch (error) {
      api.dispatch(stopLoading());
      const status = error?.response?.status;

      if (status === 401) {
        Cookies.remove("token");
        window.location.href = "/login";
      }

      return {
        error: {
          message:
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong",
          data: error?.response?.data || null,
        },
      };
    }
  };

export default axiosBaseQuery;
