import { configureStore } from "@reduxjs/toolkit";
import lotteryReducer from "./slices/lotterySlice";
import walletReducer from "./slices/walletSlice";
import userReducer from "./slices/userSlice";
import retailerReducer from "./slices/retailerSlice";
import locationReducer from "./slices/locationSlice";

export const store = configureStore({
	reducer: {
		lottery: lotteryReducer,
		wallet: walletReducer,
		user: userReducer,
		retailer: retailerReducer,
		location: locationReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
