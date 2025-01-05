import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface KYCState {
	kycType: "aadhar" | "pan" | null;
	idNumber: string;
	isVerified: boolean;
	userDetails: {
		name: string;
		dob: string;
		gender: string;
		phone_no: string;
		address: string;
		aadhar_no?: string;
		pan_no?: string;
		bank_name?: string;
		bank_account_no?: string;
	} | null;
}

const initialState: KYCState = {
	kycType: null,
	idNumber: "",
	isVerified: false,
	userDetails: null,
};

const kycSlice = createSlice({
	name: "kyc",
	initialState,
	reducers: {
		setKYCType: (state, action: PayloadAction<"aadhar" | "pan" | null>) => {
			state.kycType = action.payload;
			state.idNumber = "";
			state.isVerified = false;
		},
		setIdNumber: (state, action: PayloadAction<string>) => {
			state.idNumber = action.payload;
		},
		setVerificationStatus: (state, action: PayloadAction<boolean>) => {
			state.isVerified = action.payload;
		},
		setUserDetails: (
			state,
			action: PayloadAction<KYCState["userDetails"]>
		) => {
			state.userDetails = action.payload;
		},
		resetKYC: () => initialState,
	},
});

export const {
	setKYCType,
	setIdNumber,
	setVerificationStatus,
	setUserDetails,
	resetKYC,
} = kycSlice.actions;

export default kycSlice.reducer;
