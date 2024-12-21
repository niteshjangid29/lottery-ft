import { configureStore } from "@reduxjs/toolkit";
import lotteryReducer from "./slices/lotterySlice";

const store = configureStore({
  reducer: {
    lottery: lotteryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
