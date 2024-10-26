import { configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from './authSlice';
import { userSliceReducer } from './gameSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { socketSliceReducer } from './socketSlice';
import Reactotron from '../../ReactotronConfig';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    user: userSliceReducer,
    socket: socketSliceReducer,
  },
  enhancers: (getDefaultEnhancers) => {
    const reactotronEnhancer = __DEV__ ? [Reactotron.createEnhancer!()] : [];
    return getDefaultEnhancers().concat(reactotronEnhancer);
  }
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
