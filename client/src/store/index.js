import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import productList from '../@main/store/slices/productListSlice';
import product from '../@main/store/slices/productSlice';
import auth from '../@main/store/slices/authSlice';
import cart from '../@main/store/slices/cartSlice';
import registration from '../@main/store/slices/registrationSlice';
import wishlist from '../@main/store/slices/wishlistSlice';
import filters from '../@main/store/slices/filterSlice';
import colors from '../@main/store/slices/colorsSlice';
import categories from '../@main/store/slices/categoriesSlice';
import users from '../@editor/store/slices/usersSlice';
import newProduct from '../@editor/store/slices/newProductSlice';
import addressSlice from '../@main/store/slices/addressSlice';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['filters', 'product'],
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
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}),
	});
}

export const store = setupStore();
export const persistor = persistStore(store);
