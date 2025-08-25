import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const TODO_API_URL = import.meta.env.VITE_TODO_API_URL + "/todos"|| 'http://localhost:9090/todos';


export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(TODO_API_URL);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Erreur lors de la récupération des tâches');
  }
});

export const createTodo = createAsyncThunk('todos/createTodo', async (newTask, { rejectWithValue }) => {
  try {
    const response = await axios.post(TODO_API_URL, { title: newTask, completed: false });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Erreur lors de la création de la tâche');
  }
});


export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ todoId, newData }, { rejectWithValue }) => {
    console.log("Updating Todo", todoId, newData);
    try {
      const response = await axios.put(`${TODO_API_URL}/${todoId}`, newData);
      return response.data;
    } catch (error) {
      console.error("Error updating todo:", error);
      return rejectWithValue(error.response?.data || 'Erreur lors de la mise à jour de la tâche');
    }
  }
);


export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId, { rejectWithValue }) => {
  try {
    await axios.delete(`${TODO_API_URL}/${todoId}`);
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
        state.error = null;
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
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((todo) => todo._id === action.payload._id);
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
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((todo) => todo._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;
