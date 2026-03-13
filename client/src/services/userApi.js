import { baseApi } from "./baseApi";
import { USER_SERVICE } from "./endpoint";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({ url: USER_SERVICE.register, method: "POST", data }),
    }),
    login: builder.mutation({
      query: (data) => ({ url: USER_SERVICE.login, method: "POST", data }),
    }),
    logout: builder.mutation({
      query: (data) => ({ url: USER_SERVICE.logout, method: "POST" }),
    }),
  }),
});
export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  userApi;
