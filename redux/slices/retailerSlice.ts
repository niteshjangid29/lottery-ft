"use client";

import { getFromLocalStorage } from "@/utils/helpers/getFromLocalStorage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface RetailerState {
	profile: {
		id: string;
		name: string;
		email: string;
		phoneNumber: string;
		brandName: string;
		uniqueId: string;
		logo?: string;
		customization: {
			primaryColor: string | null;
			secondaryColor: string | null;
			brandingText?: string;
		};
	} | null;
	transactionStats: {
		totalSales: number;
		totalCommission: number;
		pendingCommission: number;
		customerCount: number;
	};
	stats: {
		total: {
			totalAmount: number;
			totalCommission: number;
			toalTransactions: number;
		};
		pending: {
			pendingCommission: number;
			pendingTransactions: number;
		};
		processed: {
			processedCommission: number;
			processedTransactions: number;
		};
	};
	commissions: {
		id: string;
		amount: number;
		status: "pending" | "processed";
		createdAt: string;
	}[];
	sales: {
		id: string;
		ticketNumber: string;
		amount: number;
		commission: number;
		customerId: string;
		purchaseDate: string;
	}[];
	loading: boolean;
	authRetailer: boolean;
}

const initialState: RetailerState = {
	profile: JSON.parse(getFromLocalStorage("retailerProfile") || "null"),
	transactionStats: {
		totalSales: 0,
		totalCommission: 0,
		pendingCommission: 0,
		customerCount: 0,
	},
	stats: {
		total: {
			totalAmount: 0,
			totalCommission: 0,
			toalTransactions: 0,
		},
		pending: {
			pendingCommission: 0,
			pendingTransactions: 0,
		},
		processed: {
			processedCommission: 0,
			processedTransactions: 0,
		},
	},
	commissions: [],
	sales: [],
	loading: false,
	authRetailer: getFromLocalStorage("retailerToken") !== null ? true : false,
};

export const fetchStoreByUniqueId = createAsyncThunk(
	"retailer/fetchStore",
	async (uniqueId: string | string[], { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/retailer/store/${uniqueId}`
			);

			console.log("store data", response.data);
			return response.data;
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data || "Failed to fetch store"
			);
		}
	}
);

export const fetchRetailerDetails = createAsyncThunk(
	"retailer/fetchDetails",
	async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/retailer/details`,
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem(
							"retailerToken"
						)}`,
					},
				}
			);

			return response.data;
		} catch (error: any) {
			return error.response?.data || "Failed to fetch details";
		}
	}
);

export const createAffiliateTransaction = createAsyncThunk(
	"retailer/createAffiliateTransaction",
	async ({ retailerId, transactionId, amount }: any) => {
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/affiliate/transaction`,
				{ retailerId, transactionId, amount },
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem(
							"userToken"
						)}`,
					},
				}
			);

			return response.data;
		} catch (error: any) {
			return (
				error.response?.data || "Failed to create affiliate transaction"
			);
		}
	}
);

// export const getRetailerTransactions = createAsyncThunk(
// 	"retailer/getTransactions",
// 	async ({
// 		retailerId,
// 		status,
// 		startDate,
// 		endDate,
// 		page = 1,
// 		limit = 10,
// 	}: any) => {
// 		try {
// 			const response = await axios.get(
// 				`${process.env.NEXT_PUBLIC_API_URL}/affiliate/transactions/${retailerId}/?status=${status}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`,
// 				{
// 					headers: {
// 						authorization: `Bearer ${localStorage.getItem(
// 							"retailerToken"
// 						)}`,
// 					},
// 				}
// 			);

// 			return response.data;
// 		} catch (error: any) {
// 			return error.response?.data || "Failed to fetch transactions";
// 		}
// 	}
// );

export const processAffiliatePayment = createAsyncThunk(
	"retailer/processPayment",
	async ({ transactionIds, retailerId }: any) => {
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/affiliate/process-payment/${retailerId}`,
				{ transactionIds },
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem(
							"retailerToken"
						)}`,
					},
				}
			);

			return response.data;
		} catch (error: any) {
			return error.response?.data || "Failed to process payments";
		}
	}
);

export const getTransactionStats = createAsyncThunk(
	"retailer/getStats",
	async ({ retailerId }: any) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/affiliate/stats/${retailerId}`,
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem(
							"retailerToken"
						)}`,
					},
				}
			);

			return response.data;
		} catch (error: any) {
			return error.response?.data || "Failed to fetch stats";
		}
	}
);

const retailerSlice = createSlice({
	name: "retailer",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},

		logoutRetailer: (state) => {
			state.profile = null;
			state.loading = false;
			localStorage.removeItem("retailerProfile");
			localStorage.removeItem("retailerToken");
			state.authRetailer = false;
		},

		setProfile: (
			state,
			action: PayloadAction<RetailerState["profile"]>
		) => {
			console.log("action payload - ", action.payload);
			state.profile = action.payload;
			state.authRetailer = true;
			state.loading = false;
			localStorage.setItem(
				"retailerProfile",
				JSON.stringify(action.payload)
			);
			console.log("profile set to local storage");
		},

		clearProfile: (state) => {
			state.profile = null;
			state.loading = false;
			state.authRetailer = false;
			localStorage.removeItem("retailerProfile");
		},

		updateProfile: (
			state,
			action: PayloadAction<Partial<RetailerState["profile"]>>
		) => {
			if (state.profile) {
				state.profile = { ...state.profile, ...action.payload };
				localStorage.setItem(
					"retailerProfile",
					JSON.stringify(state.profile)
				);
			}
			state.loading = false;
		},

		setStats: (state, action: PayloadAction<RetailerState["stats"]>) => {
			state.stats = action.payload;
			state.loading = false;
		},

		updateStats: (
			state,
			action: PayloadAction<Partial<RetailerState["stats"]>>
		) => {
			state.stats = { ...state.stats, ...action.payload };
			state.loading = false;
		},

		setCommissions: (
			state,
			action: PayloadAction<RetailerState["commissions"]>
		) => {
			state.commissions = action.payload;
			state.loading = false;
		},

		addCommission: (
			state,
			action: PayloadAction<RetailerState["commissions"][0]>
		) => {
			state.commissions.push(action.payload);
			state.loading = false;
		},

		setSales: (state, action: PayloadAction<RetailerState["sales"]>) => {
			state.sales = action.payload;
			state.loading = false;
		},

		addSale: (state, action: PayloadAction<RetailerState["sales"][0]>) => {
			state.sales.push(action.payload);
			state.transactionStats.totalSales += action.payload.amount;
			state.transactionStats.totalCommission += action.payload.commission;
			state.loading = false;
		},

		updateCommissionStatus: (
			state,
			action: PayloadAction<{
				id: string;
				status: "pending" | "processed";
			}>
		) => {
			const commission = state.commissions.find(
				(c) => c.id === action.payload.id
			);
			if (commission) {
				commission.status = action.payload.status;
				if (action.payload.status === "processed") {
					state.transactionStats.pendingCommission -=
						commission.amount;
				}
			}
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchStoreByUniqueId.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchStoreByUniqueId.fulfilled, (state, action) => {
				state.loading = false;
				state.profile = action.payload;
				localStorage.setItem(
					"retailerProfile",
					JSON.stringify(action.payload)
				);
			})
			.addCase(fetchStoreByUniqueId.rejected, (state) => {
				state.loading = false;
			})
			.addCase(fetchRetailerDetails.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchRetailerDetails.fulfilled, (state, action) => {
				state.loading = false;
				state.transactionStats = {
					totalSales: action.payload.metrics.totalSales,
					totalCommission: action.payload.metrics.totalEarnings,
					pendingCommission: action.payload.metrics.pendingEarnings,
					customerCount: action.payload.metrics.customerCount,
				};
				state.sales = action.payload.recentTransactions;
			})
			.addCase(fetchRetailerDetails.rejected, (state) => {
				state.loading = false;
			})
			.addCase(getTransactionStats.fulfilled, (state, action) => {
				state.stats = action.payload;
				state.loading = false;
			})
			.addCase(getTransactionStats.rejected, (state) => {
				state.loading = false;
			});
	},
});

export const {
	setLoading,
	setProfile,
	clearProfile,
	logoutRetailer,
	updateProfile,
	setStats,
	updateStats,
	setCommissions,
	addCommission,
	setSales,
	addSale,
	updateCommissionStatus,
} = retailerSlice.actions;

export default retailerSlice.reducer;
