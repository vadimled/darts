import {configureStore} from '@reduxjs/toolkit';
import {authSliceReducer} from './authSlice';
import {setupListeners} from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
