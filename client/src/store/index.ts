import cart from "@main/store/slices/cart/cartSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

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
import wishlist from "../@main/store/slices/wishlist/wishlistSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["filters", "product", "address", "tempAuth", "orders", "registration", "auth"],
};
const persistAuth = {
  key: "auth",
  storage,
  whitelist: ["isLoggedOut"],
};

const persistConfigOrders = {
  key: "orders",
  storage,
  whitelist: ["data"],
};

const persistedOrdersReducer = persistReducer(persistConfigOrders, orders);
const persistAuthReducer = persistReducer(persistAuth, auth);

const rootReduser = combineReducers({
  productList,
  product,
  auth: persistAuthReducer,

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
