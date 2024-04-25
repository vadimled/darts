import {configureStore} from '@reduxjs/toolkit';
import {authSliceReducer} from './authSlice';
import {setupListeners} from '@reduxjs/toolkit/query';
import {userSliceReducer} from './userSlice';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    user: userSliceReducer,
  },
});
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
