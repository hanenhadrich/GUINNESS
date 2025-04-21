import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090/reservations';


export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Erreur lors de la récupération des réservations'
      );
    }
  }
);

// Action pour créer une réservation
export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async (newReservation, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, {
        title: newReservation,
        completed: false,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Erreur lors de la création de la réservation'
      );
    }
  }
);

export const updateReservation = createAsyncThunk(
  'reservations/updateReservation',
  async ({ reservationId, newData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/${reservationId}`,
        newData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Erreur lors de la mise à jour de la réservation'
      );
    }
  }
);


export const deleteReservation = createAsyncThunk(
  'reservations/deleteReservation',
  async (reservationId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${reservationId}`);
      return reservationId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Erreur lors de la suppression de la réservation'
      );
    }
  }
);


const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (reservation) => reservation._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(
          (reservation) => reservation._id !== action.payload
        );
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const selectReservations = (state) => state.reservations.list;
export const selectReservationsLoading = (state) => state.reservations.loading;
export const selectReservationsError = (state) => state.reservations.error;


export default reservationSlice.reducer;
