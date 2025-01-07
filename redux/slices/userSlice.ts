import { getCookie, removeCookie, setCookie } from "@/utils/helpers/cookies";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserDetails {
	name: string;
	email: string;
	phoneNumber: string;
	gender?: string;
	address?: {
		city: string;
		state: string;
		country: string;
		pincode: string;
	};
}

interface UserState {
	authUser: boolean;
	userDetails: UserDetails | null;
	userTickets: any[];
	purchasedTickets: any[];
	cartTickets: any[];
	loading: boolean;
}

const initialState: UserState = {
	authUser: getCookie("userToken") !== null ? true : false,
	userDetails: JSON.parse(getCookie("userDetails") || "null"),
	userTickets: JSON.parse(getCookie("userTickets") || "[]"),
	purchasedTickets: [],
	cartTickets: JSON.parse(getCookie("cartTickets") || "[]"),
	loading: false,
};

export const recordTransaction = createAsyncThunk(
	"user/recordTransaction",
	async (transaction: any) => {
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/user/purchase`,
				transaction,
				{
					headers: {
						authorization: `Bearer ${getCookie("userToken")}`,
					},
				}
			);

			return response.data;
		} catch (error: any) {
			return error.response?.data || "Failed to record transaction";
		}
	}
);

export const purchaseTicket = createAsyncThunk(
	"user/purchaseTicket",
	async ({ tickets, lottery_id }: any) => {
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/ticket/purchase`,
				{ lottery_id, custom_ticket_numbers: tickets },
				{
					headers: {
						authorization: `Bearer ${getCookie("userToken")}`,
					},
				}
			);
			console.log(response);
		} catch (error: any) {
			return error.response?.data || "Failed to purchase ticket";
		}
	}
);

export const getUserTickets = createAsyncThunk(
	"user/getPurchasedTickets",
	async () => {
		setLoading(true);
		try {
			const auth = `Bearer ${getCookie("userToken")}`;
			console.log("auth header", auth);

			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/tickets`,
				{
					headers: {
						authorization: `Bearer ${getCookie("userToken")}`,
					},
				}
			);
			setLoading(false);
			return response.data;
		} catch (error: any) {
			setLoading(false);
			console.log(
				error.response?.data || "Failed to fetch purchased tickets"
			);
		}
	}
);

export const fetchTicketsByLotteryId = createAsyncThunk(
	"user/fetchTicketsByLotteryId",
	async (lotteryId: string | string[]) => {
		setLoading(true);
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/ticket/lottery/${lotteryId}`
			);

			setLoading(false);
			return response.data;
		} catch (error: any) {
			setLoading(false);
			return error.response?.data || "Failed to fetch tickets";
		}
	}
);

export const userLogin = createAsyncThunk(
	"user/login",
	async (formData: { phone: string; otp: string; countryCode: string }) => {
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/user/login`,
				formData
			);

			return response.data;
		} catch (error: any) {
			return error.response?.data || "Failed to login";
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login(state, action: PayloadAction<UserDetails>) {
			state.authUser = true;
			state.userDetails = action.payload;
			setCookie("userDetails", JSON.stringify(action.payload));
		},
		logout(state) {
			state.authUser = false;
			state.userDetails = null;
			removeCookie("userDetails");
			removeCookie("userToken");
			removeCookie("cartTickets");
			removeCookie("retailerProfile");
		},
		updateUser(state, action: PayloadAction<UserDetails>) {
			if (state.userDetails) {
				state.userDetails = { ...state.userDetails, ...action.payload };
				setCookie("userDetails", JSON.stringify(state.userDetails));
			}
		},
		setCartTickets(state, action: PayloadAction<any[]>) {
			state.cartTickets = action.payload;
			setCookie("cartTickets", JSON.stringify(action.payload));
		},
		addToCart(state, action: PayloadAction<any>) {
			state.cartTickets.push(action.payload);
			setCookie("cartTickets", JSON.stringify(state.cartTickets));
		},
		removeFromCart(state, action: PayloadAction<string>) {
			state.cartTickets = state.cartTickets.filter(
				(ticket) => ticket.id !== action.payload
			);
			setCookie("cartTickets", JSON.stringify(state.cartTickets));
		},
		clearCart(state) {
			state.cartTickets = [];
			removeCookie("cartTickets");
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserTickets.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUserTickets.fulfilled, (state, action) => {
				state.userTickets = action.payload;
			})
			.addCase(getUserTickets.rejected, (state) => {
				state.userTickets = [];
				state.loading = false;
			})
			.addCase(fetchTicketsByLotteryId.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchTicketsByLotteryId.fulfilled, (state, action) => {
				state.purchasedTickets = action.payload;
			})
			.addCase(fetchTicketsByLotteryId.rejected, (state) => {
				state.purchasedTickets = [];
			});
	},
});

export const {
	login,
	logout,
	updateUser,
	setCartTickets,
	addToCart,
	removeFromCart,
	clearCart,
	setLoading,
} = userSlice.actions;
export default userSlice.reducer;
