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