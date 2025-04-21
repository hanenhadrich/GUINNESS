import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import reservationReducer from './reservationSlice';
import adherentReducer from './adherentSlice';
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    reservations: reservationReducer,
    adherents: adherentReducer
  },
});


export default store;
