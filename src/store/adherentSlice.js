import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090/adherents';

const cleanParams = (params) => {
  return Object.keys(params).reduce((acc, key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      acc[key] = params[key];
    }
    return acc;
  }, {});
};

export const fetchAdherents = createAsyncThunk(
  'adherents/fetchAdherents',
  async (searchParams = {}, { rejectWithValue }) => {
    try {
      const cleanParamsObj = cleanParams(searchParams);
      const response = await axios.get(API_URL, { params: cleanParamsObj });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 
        { general: error.message || 'Erreur lors de la récupération des adhérents' }
      );
    }
  }
);

export const createAdherent = createAsyncThunk(
  'adherents/create',
  async (adherent, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, adherent);
      return response.data;
    } catch (err) {
      const data = err.response?.data;

      if (Array.isArray(data)) {
        return rejectWithValue({ general: data });
      }

      if (typeof data === 'object') {
        return rejectWithValue(data);
      }

      return rejectWithValue({ general: ['Erreur inconnue'] });
    }
  }
);

export const updateAdherent = createAsyncThunk(
  'adherents/update',
  async (adherent, { rejectWithValue }) => {
    try {
      const { _id, ...dataToUpdate } = adherent;
      const res = await axios.put(`${API_URL}/${_id}`, dataToUpdate);
      return res.data;
    } catch (err) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ general: 'Erreur inconnue' });
    }
  }
);

export const deleteAdherent = createAsyncThunk(
  'adherents/deleteAdherent',
  async (adherentId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${adherentId}`);
      return adherentId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { general: "Erreur lors de la suppression de l'adhérent" }
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
    success: null,
    selectedAdherent: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    resetAdherents: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
      state.success = null;
      state.selectedAdherent = null;
    },
    setSelectedAdherent: (state, action) => {
      state.selectedAdherent = action.payload;
    },
    clearSelectedAdherent: (state) => {
      state.selectedAdherent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAdherents.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchAdherents.fulfilled, (state, action) => {
        state.loading = false;
        // Tri alphabétique sur nom
        state.list = action.payload.slice().sort((a, b) => a.nom.localeCompare(b.nom));
        state.error = null;
        state.success = null;
         localStorage.setItem('adherents', JSON.stringify(action.payload));
      })
      .addCase(fetchAdherents.rejected, (state, action) => {
        console.error('Fetch adherents error:', action.payload);
        state.loading = false;
        state.error = action.payload || { general: 'Erreur inattendue' };
        state.success = null;
      })

      // Create
      .addCase(createAdherent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createAdherent.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.error = null;
        state.success = 'Adhérent ajouté avec succès !';
      })
      .addCase(createAdherent.rejected, (state, action) => {
        console.error('Create adherent error:', action.payload);
        state.loading = false;
        state.error = action.payload || { general: 'Erreur inconnue' };
        state.success = null;
      })

      // Update
      .addCase(updateAdherent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateAdherent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((adherent) => adherent._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.error = null;
        state.success = 'Adhérent mis à jour avec succès !';
      })
      .addCase(updateAdherent.rejected, (state, action) => {
        console.error('Update adherent error:', action.payload);
        state.loading = false;
        state.error = action.payload || { general: "Erreur lors de la mise à jour" };
        state.success = null;
      })

      // Delete
      .addCase(deleteAdherent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteAdherent.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((adherent) => adherent._id !== action.payload);
        state.error = null;
        state.success = 'Adhérent supprimé avec succès !';
      })
      .addCase(deleteAdherent.rejected, (state, action) => {
        console.error('Delete adherent error:', action.payload);
        state.loading = false;
        state.error = action.payload || { general: "Erreur lors de la suppression" };
        state.success = null;
      });
  },
});

export const {
  clearError,
  clearSuccess,
  resetAdherents,
  setSelectedAdherent,
  clearSelectedAdherent,
} = adherentSlice.actions;
export const selectAdherentsLoading = (state) => state.adherents.loading;
export const selectAdherents = (state) => state.adherents.list;
export default adherentSlice.reducer;
