import { configureStore } from "@reduxjs/toolkit";
import lotteryReducer from "./slices/lotterySlice";
import walletReducer from "./slices/walletSlice";
import userReducer from "./slices/userSlice";
import retailerReducer from "./slices/retailerSlice";

export const store = configureStore({
  reducer: {
    lottery: lotteryReducer,
    wallet: walletReducer,
    user: userReducer,
    retailer: retailerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
