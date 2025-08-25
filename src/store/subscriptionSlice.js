import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL + "/subscriptions"|| 'http://localhost:9090/subscriptions';


const extractError = (error, fallback = 'Erreur inconnue') => {
  const err = error?.response?.data;
  return typeof err === 'string' ? { message: err } : err || { message: fallback };
};

// Hydratation locale pour joindre les données adherent stockées en local
const hydrateAdherentFromLocalStorage = (subscription) => {
  const adherents = JSON.parse(localStorage.getItem('adherents')) || [];
  const found = adherents.find(a => a._id === subscription.adherent);
  if (found) {
    subscription.adherent = found;
  }
  return subscription;
};

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await axios.get(`${API_URL}?${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractError(error, "Erreur lors de la récupération des abonnements"));
    }
  }
);

export const createSubscription = createAsyncThunk(
  'subscriptions/createSubscription',
  async (subscription, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, subscription);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractError(error, "Erreur lors de la création."));
    }
  }
);

export const updateSubscription = createAsyncThunk(
  'subscriptions/updateSubscription',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractError(error, "Erreur lors de la mise à jour."));
    }
  }
);

export const deleteSubscription = createAsyncThunk(
  'subscriptions/deleteSubscription',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(extractError(error, "Erreur lors de la suppression."));
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    list: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    resetSuccess: (state) => {
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.map(hydrateAdherentFromLocalStorage);
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.loading = false;
        const newSub = hydrateAdherentFromLocalStorage(action.payload);
        state.list.push(newSub);
        state.successMessage = "Abonnement créé avec succès.";
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSub = hydrateAdherentFromLocalStorage(action.payload);
        const index = state.list.findIndex(sub => sub._id === updatedSub._id);
        if (index !== -1) {
          state.list[index] = updatedSub;
        }
        state.successMessage = "Abonnement mis à jour avec succès.";
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(sub => sub._id !== action.payload);
        state.successMessage = "Abonnement supprimé avec succès.";
      })
      .addCase(deleteSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, resetSuccess } = subscriptionSlice.actions;

export const selectSubscriptions = (state) => state.subscriptions.list;
export const selectSubscriptionsLoading = (state) => state.subscriptions.loading;
export const selectSubscriptionsError = (state) => state.subscriptions.error;
export const selectSubscriptionsSuccess = (state) => state.subscriptions.successMessage;

export default subscriptionSlice.reducer;
