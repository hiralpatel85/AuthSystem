import * as Yup from 'yup';


export const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(30, 'First Name must be at most 30 characters')
    .required('First Name is required'),
  
  lastName: Yup.string()
    .max(30, 'Last Name must be at most 30 characters')
    .required('Last Name is required'),
  
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character')
    .required('Password is required'),
});


export const verifyEmailSchema = Yup.object({
  code: Yup.string()
    .required("Verification code is required")
    .min(6, "Code must be 6 characters")
    .max(6, "Code must be 6 characters"),
});
