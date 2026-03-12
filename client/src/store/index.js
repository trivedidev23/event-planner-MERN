import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slices/loaderSlice";
const rootReducer = combineReducers({
  loader: loaderReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
