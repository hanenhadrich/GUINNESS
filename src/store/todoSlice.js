import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090/todos';

// Action pour récupérer les tâches
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Erreur lors de la récupération des tâches');
  }
});

// Action pour créer une tâche
export const createTodo = createAsyncThunk('todos/createTodo', async (newTask, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, { title: newTask, completed: false });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Erreur lors de la création de la tâche');
  }
});

// Action pour mettre à jour une tâche
export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ todoId, newData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${todoId}`, newData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Erreur lors de la mise à jour de la tâche');
  }
});

// Action pour supprimer une tâche
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${todoId}`);
    return todoId;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Erreur lors de la suppression de la tâche');
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: { list: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(todo => todo._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(todo => todo._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;
