
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + "/reclamations"|| 'http://localhost:9090/reclamations';

const cleanParams = (params) => {
  return Object.keys(params).reduce((acc, key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      acc[key] = params[key];
    }
    return acc;
  }, {});
};

export const fetchReclamations = createAsyncThunk(
  'reclamations/fetchReclamations',
  async (searchParams = {}, { rejectWithValue }) => {
    try {
      const cleanParamsObj = cleanParams(searchParams);
      const response = await axios.get(API_URL, { params: cleanParamsObj });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 
        { general: error.message || 'Erreur lors de la récupération des réclamations' }
      );
    }
  }
);

export const createReclamation = createAsyncThunk(
  'reclamations/create',
  async (reclamation, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, reclamation);
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

export const updateReclamation = createAsyncThunk(
  'reclamations/update',
  async (reclamation, { rejectWithValue }) => {
    try {
      const { _id, ...dataToUpdate } = reclamation;
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

export const deleteReclamation = createAsyncThunk(
  'reclamations/deleteReclamation',
  async (reclamationId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${reclamationId}`);
      return reclamationId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { general: "Erreur lors de la suppression de la réclamation" }
      );
    }
  }
);

export const markReclamationAsRead = createAsyncThunk(
  'reclamations/markAsRead',
  async (reclamationId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/${reclamationId}/read`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { general: 'Erreur lors du marquage comme lu' }
      );
    }
  }
);

const reclamationSlice = createSlice({
  name: 'reclamations',
  initialState: {
    list: [],
    loading: false,
    error: null,
    success: null,
    selectedReclamation: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
    clearSuccess: (state) => { state.success = null; },
    resetReclamations: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
      state.success = null;
      state.selectedReclamation = null;
    },
    setSelectedReclamation: (state, action) => {
      state.selectedReclamation = action.payload;
    },
    clearSelectedReclamation: (state) => {
      state.selectedReclamation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReclamations.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchReclamations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.slice();
        state.error = null;
      })
      .addCase(fetchReclamations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { general: 'Erreur inattendue' };
      })

      .addCase(createReclamation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createReclamation.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.error = null;
        state.success = 'Réclamation ajoutée avec succès !';
      })
      .addCase(createReclamation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { general: 'Erreur inconnue' };
      })

      .addCase(updateReclamation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateReclamation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((r) => r._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.error = null;
        state.success = 'Réclamation mise à jour avec succès !';
      })
      .addCase(updateReclamation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { general: "Erreur lors de la mise à jour" };
      })

      .addCase(deleteReclamation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteReclamation.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((r) => r._id !== action.payload);
        state.error = null;
        state.success = 'Réclamation supprimée avec succès !';
      })
      .addCase(deleteReclamation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { general: "Erreur lors de la suppression" };
      })

      .addCase(markReclamationAsRead.fulfilled, (state, action) => {
        const index = state.list.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(markReclamationAsRead.rejected, (state, action) => {
        state.error = action.payload || { general: 'Erreur inattendue' };
      });
  },
});

// Mémoïsation du sélecteur des réclamations non lues
const selectReclamationsList = (state) => state.reclamations.list;

export const selectUnreadReclamations = createSelector(
  [selectReclamationsList],
  (list) => list.filter((r) => r.isRead === false)
);

export const {
  clearError,
  clearSuccess,
  resetReclamations,
  setSelectedReclamation,
  clearSelectedReclamation,
} = reclamationSlice.actions;

export const selectReclamationsLoading = (state) => state.reclamations.loading;
export const selectReclamationsError = (state) => state.reclamations.error;
export const selectReclamationsSuccess = (state) => state.reclamations.success;
export const selectReclamations = selectReclamationsList;

export default reclamationSlice.reducer;
