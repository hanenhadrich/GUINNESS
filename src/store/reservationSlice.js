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
      const message = error.response?.data?.message || error.message || 'Erreur lors de la récupération des réservations';
      return rejectWithValue(message);
    }
  }
);

export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async (newReservation, { rejectWithValue }) => {
    try {
      
      const response = await axios.post(API_URL, newReservation);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Erreur lors de la création de la réservation';
      return rejectWithValue(message);
    }
  }
);

export const updateReservation = createAsyncThunk(
  'reservations/updateReservation',
  async ({ reservationId, newData }, { rejectWithValue }) => {
    try {
      
      const response = await axios.put(`${API_URL}/${reservationId}`, newData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Erreur lors de la mise à jour de la réservation';
      return rejectWithValue(message);
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
      const message = error.response?.data?.message || error.message || 'Erreur lors de la suppression de la réservation';
      return rejectWithValue(message);
    }
  }
);


const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    list: [],
    loadingFetch: false,
    loadingCreate: false,
    loadingUpdate: false,
    loadingDelete: false,
    errorFetch: null,
    errorCreate: null,
    errorUpdate: null,
    errorDelete: null,
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchReservations.pending, (state) => {
        state.loadingFetch = true;
        state.errorFetch = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loadingFetch = false;
        state.list = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loadingFetch = false;
        state.errorFetch = action.payload;
      })

     
      .addCase(createReservation.pending, (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loadingCreate = false;
        state.list.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload;
      })

      
      .addCase(updateReservation.pending, (state) => {
        state.loadingUpdate = true;
        state.errorUpdate = null;
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        const index = state.list.findIndex(reservation => reservation._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.errorUpdate = action.payload;
      })

     
      .addCase(deleteReservation.pending, (state) => {
        state.loadingDelete = true;
        state.errorDelete = null;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.loadingDelete = false;
        state.list = state.list.filter(reservation => reservation._id !== action.payload);
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.loadingDelete = false;
        state.errorDelete = action.payload;
      });
  },
});


export const selectReservations = (state) => state.reservations.list;

export const selectLoadingFetch = (state) => state.reservations.loadingFetch;
export const selectLoadingCreate = (state) => state.reservations.loadingCreate;
export const selectLoadingUpdate = (state) => state.reservations.loadingUpdate;
export const selectLoadingDelete = (state) => state.reservations.loadingDelete;

export const selectErrorFetch = (state) => state.reservations.errorFetch;
export const selectErrorCreate = (state) => state.reservations.errorCreate;
export const selectErrorUpdate = (state) => state.reservations.errorUpdate;
export const selectErrorDelete = (state) => state.reservations.errorDelete;

export default reservationSlice.reducer;
