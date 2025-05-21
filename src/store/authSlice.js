import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { alertError, alertSuccess, extractErrorMessage } from "../utilities/feedback";


const token = localStorage.getItem("token");
const userDetails = localStorage.getItem("userDetails");
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090';

export const requestLogin = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/users/login`, { email, password });
      return res.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);


export const requestRegister = createAsyncThunk(
  "users/register",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/users/register`, {
        firstName,
        lastName,
        email,
        password,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!token,
    token: token || null,
    user: userDetails ? JSON.parse(userDetails) : null,
    isLoading: false,
    error: null,
    registrationSuccess: false,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userDetails", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userDetails");
    },
    clearError: (state) => {
      state.error = null;
    },
    resetRegistration: (state) => {
      state.registrationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(requestLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("userDetails", JSON.stringify(action.payload.user));
        alertSuccess(action.payload.message);
      })
      .addCase(requestLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        alertError(action.payload);
      })

    
      .addCase(requestRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registrationSuccess = true;
        alertSuccess(action.payload.message);
      })
      .addCase(requestRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        alertError(action.payload);
      });
  },
});

export const { login, logout, clearError, resetRegistration } = authSlice.actions;
export default authSlice.reducer;
