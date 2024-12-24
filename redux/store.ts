import { configureStore } from "@reduxjs/toolkit";
import lotteryReducer from "./slices/lotterySlice";
import walletReducer from "./slices/walletSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    lottery: lotteryReducer,
    wallet: walletReducer,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
