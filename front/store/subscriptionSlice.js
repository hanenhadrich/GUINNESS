import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090/subscriptions';

// Fetch all subscriptions
export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      if (!response.data) {
        throw new Error('Aucune donnée reçue de l\'API');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Erreur lors de la récupération des abonnements');
    }
  }
);

// Create a new subscription
export const createSubscription = createAsyncThunk(
  'subscriptions/createSubscription',
  async (newSubscription, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, newSubscription);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Erreur lors de la création de l’abonnement');
    }
  }
);

// Update a subscription
export const updateSubscription = createAsyncThunk(
  'subscriptions/updateSubscription',
  async ({ subscriptionId, newData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${subscriptionId}`, newData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Erreur lors de la mise à jour de l’abonnement');
    }
  }
);

// Delete a subscription
export const deleteSubscription = createAsyncThunk(
  'subscriptions/deleteSubscription',
  async (subscriptionId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${subscriptionId}`);
      return subscriptionId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Erreur lors de la suppression de l’abonnement');
    }
  }
);

// Slice
const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        const index = state.list.findIndex(sub => sub._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteSubscription.fulfilled, (state, action) => {
        state.list = state.list.filter(sub => sub._id !== action.payload);
      });
  },
});

export const selectSubscriptions = (state) => state.subscriptions.list;
export const selectSubscriptionsLoading = (state) => state.subscriptions.loading;
export const selectSubscriptionsError = (state) => state.subscriptions.error;

export default subscriptionSlice.reducer;
