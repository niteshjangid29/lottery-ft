import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
	balance: number;
	transactions: Array<{
		amount: number;
		type: "credit" | "debit";
		timestamp: string;
	}>;
}

const initialState: WalletState = {
	balance: 0,
	transactions: [],
};

const walletSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {
		addFunds: (state, action: PayloadAction<number>) => {
			state.balance += action.payload;
			state.transactions.push({
				amount: action.payload,
				type: "credit",
				timestamp: new Date().toISOString(),
			});
		},
		deductFunds: (state, action: PayloadAction<number>) => {
			if (state.balance >= action.payload) {
				state.balance -= action.payload;
				state.transactions.push({
					amount: action.payload,
					type: "debit",
					timestamp: new Date().toISOString(),
				});
			}
		},
		setBalance: (state, action: PayloadAction<number>) => {
			state.balance = action.payload;
		},
		addTransaction: (state, action: PayloadAction<any>) => {
			state.transactions.push(action.payload);
		},
	},
});

export const { addFunds, deductFunds, setBalance } = walletSlice.actions;
export default walletSlice.reducer;
