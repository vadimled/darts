import {configureStore} from '@reduxjs/toolkit';
import {authSliceReducer} from './authSlice';
import {userSliceReducer} from './userSlice';
import {setupListeners} from '@reduxjs/toolkit/query';
import reactotron from '../../ReactotronConfig';
import {socketSliceReducer} from './socketSlice';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    user: userSliceReducer,
    socket: socketSliceReducer,
  },
  enhancers: [reactotron.createEnhancer()],
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
