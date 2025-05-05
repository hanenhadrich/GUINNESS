import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import reservationReducer from './reservationSlice';
import adherentReducer from './adherentSlice';
import subscriptionReducer from './subscriptionSlice';
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    reservations: reservationReducer,
    adherents: adherentReducer,
    subscriptions: subscriptionReducer
  },
});


export default store;
