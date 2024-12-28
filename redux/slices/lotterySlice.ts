import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface LotteryDetails {
	id: string;
	name: string;
	drawDate: string;
	drawTime: string;
	ticketPrice: number;
	category: string;
	digitLength: number;
	prizeTiers: {
		prize: string;
		winners: number;
		amount: number;
	}[];
}

interface LotteryState {
	lotteries: [];
	recentWinners: { name: string; amount: number }[];
}

const initialState: LotteryState = {
	lotteries: [],
	recentWinners: [],
};

export const fetchAllLotteries = createAsyncThunk(
	"lottery/getAll",
	async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/lottery/`
			);

			return response.data;
		} catch (error: any) {
			return error.response?.data || "Failed to fetch lotteries";
		}
	}
);

export const fetchLotteryById = createAsyncThunk(
	"lottery/getById",
	async (id: string | string[]) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/lottery/${id}`
			);

			return response.data;
		} catch (error: any) {
			return error.response?.data || "Failed to fetch lottery";
		}
	}
);

const lotterySlice = createSlice({
	name: "lottery",
	initialState,
	reducers: {
		setRecentWinners(
			state,
			action: PayloadAction<{ name: string; amount: number }>
		) {
			state.recentWinners.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllLotteries.fulfilled, (state, action) => {
				state.lotteries = action.payload;
			})
			.addCase(fetchAllLotteries.rejected, (state) => {
				state.lotteries = [];
			});
	},
});

export const { setRecentWinners } = lotterySlice.actions;
export default lotterySlice.reducer;
