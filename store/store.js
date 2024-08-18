// src/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import encryptTransform from "./encrpt/encrypt";
const persistConfig = {
  key: "root",

  storage,
  transforms: [encryptTransform],
};
const reducers = combineReducers({
  auth: authSlice,
});
const persistReducers = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistReducers,
});
export const persistor = persistStore(store);

export default store;
