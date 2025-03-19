import cart from "@main/store/slices/cart/cartSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";

import newProduct from "../@editor/store/slices/newProductSlice";
import users from "../@editor/store/slices/usersSlice";
import auth from "../@main/store/slices/auth/authSlice";
import categories from "../@main/store/slices/categories/categoriesSlice";
import colors from "../@main/store/slices/color/colorsSlice";
import filters from "../@main/store/slices/filter/filterSlice";
import modal from "../@main/store/slices/modal/modalSlice";
import orders from "../@main/store/slices/orders/ordersSlice";
import productList from "../@main/store/slices/product-list/productListSlice";
import product from "../@main/store/slices/product/productSlice";
import registration from "../@main/store/slices/registration/registrationSlice";
import tempAuth from "../@main/store/slices/temp-auth/tempAuthSlice";
import wishlist from "../@main/store/slices/wishlist/wishlistSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["filters", "product", "address", "tempAuth", "orders", "registration"],
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

const persistConfigRegistration = {
  key: "registration ",
  storage,
  whitelist: ["data"],
};

const persistConfigOrders = {
  key: "orders",
  storage,
  whitelist: ["data"],
};
const persistedAuthReducer = persistReducer(persistConfigAuth, auth);

const persistedTempAuthReducer = persistReducer(persistConfigTempAuth, tempAuth);

const persistedRgistrationReducer = persistReducer(persistConfigRegistration, registration);

const persistedOrdersReducer = persistReducer(persistConfigOrders, orders);

const rootReduser = combineReducers({
  productList,
  product,
  auth: persistedAuthReducer,
  tempAuth: persistedTempAuthReducer,
  registration: persistedRgistrationReducer,
  cart,
  modal,
  wishlist,
  filters,
  colors,
  categories,
  users,
  newProduct,
  orders: persistedOrdersReducer,
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

export type RootState = ReturnType<typeof store.getState>;
