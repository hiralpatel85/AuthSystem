import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AuthState } from "../../types";

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    clearAuthToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

const persistConfig = {
  key: "auth",
  storage,
};

export const { setAuthToken, clearAuthToken } = authSlice.actions;

export default persistReducer(persistConfig, authSlice.reducer);
