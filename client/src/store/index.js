import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slices/loaderSlice";
import authReducer from "./slices/authSlice";
import storage from "redux-persist/lib/storage";

import { baseApi } from "../services/baseApi";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  loader: loaderReducer,
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware,
    ),
});

export const persistor = persistStore(store);
