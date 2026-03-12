import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false,
    pendingRequests: 0,
  },
  reducers: {
    setLoading: (state) => {
      state.pendingRequests += 1;
      state.loading = true;
    },
    stopLoading: (state) => {
      state.pendingRequests = Math.max(0, state.pendingRequests - 1);
      state.loading = false;
    },
    resetLoader: (state) => {
      state.loading = false;
      state.pendingRequests = 0;
    },
  },
});

export const { setLoading, stopLoading, resetLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
