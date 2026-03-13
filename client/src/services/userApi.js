import { baseApi } from "./baseApi";
import { USER_SERVICE } from "./endpoint";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({ url: USER_SERVICE.register, method: "POST", data }),
      providesTags: ["Users"],
    }),
    login: builder.mutation({
      query: (data) => ({ url: USER_SERVICE.login, method: "POST", data }),
      providesTags: ["Users"],
    }),
    logout: builder.mutation({
      query: (data) => ({ url: USER_SERVICE.logout, method: "POST" }),
      providesTags: ["Users"],
    }),
  }),
});
export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  userApi;
