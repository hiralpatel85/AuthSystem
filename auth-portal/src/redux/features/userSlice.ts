import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../types";

const initialState: UserState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  role: null,
  isVerified: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {      
      state.id = action.payload.id ?? null;
      state.firstName = action.payload.firstName ?? null;
      state.lastName = action.payload.lastName ?? null;
      state.email = action.payload.email ?? null;
      state.role = action.payload.role ?? null;
      state.isVerified = action.payload.isVerified ?? false;
    },
    clearUser: (state) => {
      state.id = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.role = null;
      state.isVerified = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
