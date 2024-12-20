import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LotteryState {
  nextDrawDate: string;
  jackpotAmount: number;
  recentWinners: { name: string; amount: number }[];
}

const initialState: LotteryState = {
  nextDrawDate: "",
  jackpotAmount: 0,
  recentWinners: [],
};

const lotterySlice = createSlice({
  name: "lottery",
  initialState,
  reducers: {
    setNextDrawDate(state, action: PayloadAction<string>) {
      state.nextDrawDate = action.payload;
    },
    setJackpotAmount(state, action: PayloadAction<number>) {
      state.jackpotAmount = action.payload;
    },
    setRecentWinners(
      state,
      action: PayloadAction<{ name: string; amount: number }>
    ) {
      state.recentWinners.push(action.payload);
    },
  },
});

export const { setNextDrawDate, setJackpotAmount, setRecentWinners } =
  lotterySlice.actions;
export default lotterySlice.reducer;
