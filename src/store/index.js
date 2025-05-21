import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import reservationReducer from './reservationSlice';
import adherentReducer from './adherentSlice';
import subscriptionReducer from './subscriptionSlice';
import authReducer from './authSlice';
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    reservations: reservationReducer,
    adherents: adherentReducer,
    subscriptions: subscriptionReducer,
    auth: authReducer,
  },
});


export default store;
