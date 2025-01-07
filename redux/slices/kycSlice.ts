import { getCookie } from "@/utils/helpers/cookies";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface KYCState {
	isVerified: boolean;
	kycDetails: {
		name: string;
		dob: string;
		gender: string;
		phone_no: string;
		address: {
			local: string;
			city: string;
			state: string;
			country: string;
			pincode: string;
		};
		kyc: {
			status: string;
			documents: {
				kycType: string;
				url: string;
				idNumber: string;
			}[];
			bank_details: {
				bank_name: string;
				account_no: string;
				ifsc_code: string;
			};
		};
	} | null;
}

const initialState: KYCState = {
	isVerified: false,
	kycDetails: null,
};

export const updateKYC = createAsyncThunk(
	"kyc/updateKYC",
	async ({
		kycType,
		idNumber,
		otp,
	}: {
		kycType: string;
		idNumber: string;
		otp: string;
	}) => {
		try {
			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/user/kyc/update`,
				{ kycType, idNumber, otp },
				{
					headers: {
						authorization: `Bearer ${getCookie("userToken")}`,
					},
				}
			);

			console.log("KYC update response:", response.data);

			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return error.response.data;
			}
			return "Failed to update KYC";
		}
	}
);

export const getKycDetails = createAsyncThunk("kyc/getKycDetails", async () => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/user/kyc/details`,
			{
				headers: {
					authorization: `Bearer ${getCookie("userToken")}`,
				},
			}
		);

		// console.log("KYC details response:", response.data);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.data;
		}
		return "Failed to get KYC details";
	}
});

const kycSlice = createSlice({
	name: "kyc",
	initialState,
	reducers: {
		setVerificationStatus: (state, action: PayloadAction<boolean>) => {
			state.isVerified = action.payload;
		},
		setKycDetails: (
			state,
			action: PayloadAction<KYCState["kycDetails"]>
		) => {
			state.kycDetails = action.payload;
		},
		resetKYC: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateKYC.fulfilled, (state, action) => {
				state.isVerified =
					action.payload.kyc_details.kyc.status === "approved";
				state.kycDetails = action.payload.kyc_details;
			})
			.addCase(updateKYC.rejected, (state) => {
				state.isVerified = false;
				state.kycDetails = null;
			})
			.addCase(getKycDetails.fulfilled, (state, action) => {
				state.isVerified = action.payload.kyc.status === "approved";
				state.kycDetails = action.payload;
			})
			.addCase(getKycDetails.rejected, (state) => {
				state.isVerified = false;
				state.kycDetails = null;
			});
	},
});

export const { setVerificationStatus, setKycDetails, resetKYC } =
	kycSlice.actions;

export default kycSlice.reducer;
