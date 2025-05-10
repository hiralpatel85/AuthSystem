import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerCustomer = async (firstName: string, lastName: string, email: string, password: string) => {
  try {
    const response = await api.post('/api/auth/customer/register', { firstName, lastName, email, password });
    return response.data; 
  } catch (error:any) {
    throw error.response ? error.response.data : new Error('Something went wrong!');
  }
};

export const registerAdmin = async (firstName: string, lastName: string, email: string, password: string) => {
  try {
    const response = await api.post('/api/auth/admin/register', { firstName, lastName, email, password });
    return response.data; 
  } catch (error:any) {
    throw error.response ? error.response.data : new Error('Something went wrong!');
  }
};

export const resendVerificationCode = async (email: string) => {
  try {
    const response = await api.post('/api/auth/resend-verification', { email });
    return response.data;
  } catch (error:any) {
    throw error.response ? error.response.data : new Error('Failed to resend verification code.');
  }
};


export const verifyEmail = async (email: string, verificationCode: string) => {
  try {
    const response = await api.post('/api/auth/verify-email', { email, verificationCode });
    return response.data;
  } catch (error:any) {
    throw error.response ? error.response.data : new Error('Failed to verify email.');
  }
};

export const adminLogin = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/auth/admin/login', { email, password });
    return response.data;
  } catch (error:any) {
    throw error.response ? error.response.data : new Error('Failed to login as admin.');
  }
};

export default api;
