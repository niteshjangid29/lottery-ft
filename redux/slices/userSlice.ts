import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  userDetails: {
    name: string;
    email: string;
  } | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  userDetails: JSON.parse(localStorage.getItem("userDetails") || "null"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ name: string; email: string }>) {
      state.isAuthenticated = true;
      state.userDetails = action.payload;
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userDetails = null;
      localStorage.removeItem("userDetails");
    },
    updateUser(
      state,
      action: PayloadAction<{ name?: string; email?: string }>
    ) {
      if (state.userDetails) {
        state.userDetails = { ...state.userDetails, ...action.payload };
        localStorage.setItem("userDetails", JSON.stringify(state.userDetails));
      }
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
