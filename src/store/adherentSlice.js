import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090/adherents';

// Action pour récupérer les adhérents avec nettoyage des paramètres vides
export const fetchAdherents = createAsyncThunk(
  'adherents/fetchAdherents',
  async (searchParams = {}, { rejectWithValue }) => {
    try {
      const cleanParams = {};
      if (searchParams.nom) cleanParams.nom = searchParams.nom;
      if (searchParams.prenom) cleanParams.prenom = searchParams.prenom;
      if (searchParams.email) cleanParams.email = searchParams.email;

      const response = await axios.get(API_URL, { params: cleanParams });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Erreur lors de la récupération des adhérents'
      );
    }
  }
);

// Action pour créer un adhérent
export const createAdherent = createAsyncThunk(
  'adherents/createAdherent',
  async (newAdherent, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, newAdherent);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Erreur lors de la création de l'adhérent"
      );
    }
  }
);

// Action pour mettre à jour un adhérent
export const updateAdherent = createAsyncThunk(
  'adherents/updateAdherent',
  async ({ adherentId, newData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${adherentId}`, newData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Erreur lors de la mise à jour de l'adhérent"
      );
    }
  }
);

// Action pour supprimer un adhérent
export const deleteAdherent = createAsyncThunk(
  'adherents/deleteAdherent',
  async (adherentId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${adherentId}`);
      return adherentId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Erreur lors de la suppression de l'adhérent"
      );
    }
  }
);

const adherentSlice = createSlice({
  name: 'adherents',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdherents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdherents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAdherents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAdherent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAdherent.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createAdherent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAdherent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAdherent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (adherent) => adherent._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateAdherent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAdherent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAdherent.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(
          (adherent) => adherent._id !== action.payload
        );
      })
      .addCase(deleteAdherent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAdherents = (state) => state.adherents.list;
export const selectAdherentsLoading = (state) => state.adherents.loading;
export const selectAdherentsError = (state) => state.adherents.error;

export default adherentSlice.reducer;
