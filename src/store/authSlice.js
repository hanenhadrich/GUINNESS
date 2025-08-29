import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/auth" || "http://localhost:9090";

// Récupération sécurisée depuis localStorage
const token = localStorage.getItem("token");
const userDetails = localStorage.getItem("userDetails");
const tokenExpiration = localStorage.getItem("tokenExpiration");

const saveAuthToLocalStorage = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userDetails", JSON.stringify(user));
  localStorage.setItem("tokenExpiration", (Date.now() + 60*60*1000).toString()); // 1h
};

// ------------------ Async Thunks ------------------
export const requestLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/users/login`, { email, password });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur de connexion");
    }
  }
);

export const requestRegister = createAsyncThunk(
  "auth/register",
  async ({ firstName, lastName, email, password, telephone }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/users/register`, {
        firstName, lastName, email, password, telephone
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur d'inscription");
    }
  }
);

export const requestUpdateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ firstName, lastName, email, telephone, password }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.put(`${API_URL}/users/update-profile`, { firstName, lastName, email, telephone, password }, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors de la mise à jour du profil");
    }
  }
);

// ------------------ Slice ------------------
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!token && Date.now() < Number(tokenExpiration),
    token: token || null,
    user: userDetails ? JSON.parse(userDetails) : null,
    isLoading: false,
    error: null,
    registrationSuccess: false
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      saveAuthToLocalStorage(action.payload.token, action.payload.user);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userDetails");
      localStorage.removeItem("tokenExpiration");
    },
    clearError: (state) => { state.error = null; },
    resetRegistration: (state) => { state.registrationSuccess = false; },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(requestLogin.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(requestLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        saveAuthToLocalStorage(action.payload.token, action.payload.user);
      })
      .addCase(requestLogin.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      // Register
      .addCase(requestRegister.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(requestRegister.fulfilled, (state, action) => { state.isLoading = false; state.registrationSuccess = true; })
      .addCase(requestRegister.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      // Update profile
      .addCase(requestUpdateProfile.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(requestUpdateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        localStorage.setItem("userDetails", JSON.stringify(action.payload.user));
      })
      .addCase(requestUpdateProfile.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
  }
});

export const { login, logout, clearError, resetRegistration } = authSlice.actions;
export default authSlice.reducer;
