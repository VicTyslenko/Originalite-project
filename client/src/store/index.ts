import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import newProduct from "../@editor/store/slices/newProductSlice";
import users from "../@editor/store/slices/usersSlice";
import addressSlice from "../@main/store/slices/addressSlice";
import auth from "../@main/store/slices/authSlice";
import cart from "../@main/store/slices/cartSlice";
import categories from "../@main/store/slices/categoriesSlice";
import colors from "../@main/store/slices/colorsSlice";
import filters from "../@main/store/slices/filterSlice";
import productList from "../@main/store/slices/productListSlice";
import product from "../@main/store/slices/productSlice";
import registration from "../@main/store/slices/registrationSlice";
import wishlist from "../@main/store/slices/wishlistSlice";

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["filters", "product"],
};

const rootReduser = combineReducers({
	productList,
	product,
	auth,
	registration,
	cart,
	wishlist,
	filters,
	colors,
	categories,
	users,
	newProduct,
	addressSlice,
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