import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, role: "user", token: "" },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = "";
    },
    changeRole(state, action) {
      state.role = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
