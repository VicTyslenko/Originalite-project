import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";

import newProduct from "../@editor/store/slices/newProductSlice";
import users from "../@editor/store/slices/usersSlice";
import auth from "../@main/store/slices/authSlice";
import cart from "../@main/store/slices/cartSlice";
import categories from "../@main/store/slices/categoriesSlice";
import colors from "../@main/store/slices/colorsSlice";
import filters from "../@main/store/slices/filterSlice";
import modal from "../@main/store/slices/modalSlice";
import orders from "../@main/store/slices/ordersSlice";
import productList from "../@main/store/slices/productListSlice";
import product from "../@main/store/slices/productSlice";
import registration from "../@main/store/slices/registrationSlice";
import tempAuth from "../@main/store/slices/tempAuthSlice";
import wishlist from "../@main/store/slices/wishlistSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["filters", "product", "address", "tempAuth"],
};

const persistConfigAuth = {
  key: "auth",
  storage,
  whitelist: ["data", "userData"],
};

const persistConfigTempAuth = {
  key: "tempAuth",
  storage: sessionStorage,
  whitelist: ["tempData"],
};

const persistedAuthReducer = persistReducer(persistConfigAuth, auth);

const persistedTempAuthReducer = persistReducer(persistConfigTempAuth, tempAuth);

const rootReduser = combineReducers({
  productList,
  product,
  auth: persistedAuthReducer,
  tempAuth: persistedTempAuthReducer,
  registration,
  cart,
  modal,
  wishlist,
  filters,
  colors,
  categories,
  users,
  newProduct,
  orders,
});

const persistedReducer = persistReducer(persistConfig, rootReduser);

function setupStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

export const store = setupStore();
export const persistor = persistStore(store);
export type RootDispatch = typeof store.dispatch;
