import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoading } from "./userSlice";

export interface LocationState {
	location: {
		city: string;
		state: string;
		country: string;
	};
}

const initialState = {
	location: {
		city: "",
		state: "",
		country: "",
	},
};

export const fetchCityFromCoordinates = createAsyncThunk(
	"location/fetchCityFromCoordinates",
	async ({
		latitude,
		longitude,
	}: {
		latitude: number;
		longitude: number;
	}) => {
		setLoading(true);
		try {
			const apiKey = process.env.NEXT_PUBLIC_OPENCAGEDATA_API_KEY;
			if (!apiKey) {
				throw new Error("API key is missing.");
			}

			const response = await axios.get(
				`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
			);

			console.log("response", response);
			setLoading(false);
			return response.data.results[0].components;
		} catch (err) {
			setLoading(false);
			console.log("Failed to fetch location from coordinates.");
		}
	}
);

const locationSlice = createSlice({
	name: "location",
	initialState,
	reducers: {
		setLocation: (state, action) => {
			state.location = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCityFromCoordinates.fulfilled, (state, action) => {
				state.location = {
					city: action.payload.city,
					state: action.payload.state,
					country: action.payload.country,
				};
			})
			.addCase(fetchCityFromCoordinates.rejected, (state) => {
				state.location = { city: "", state: "", country: "" };
			});
	},
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
