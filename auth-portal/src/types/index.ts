import store from "../redux/store";

export interface RegisterFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  export interface LoginFormValues {
    email: string;
    password: string;
  }
  
  export interface VerifyFormValues {
    code: string;
  }

  export type RootState = ReturnType<typeof store.getState>;

  export interface UserState {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: string | null;
  isVerified: boolean;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}