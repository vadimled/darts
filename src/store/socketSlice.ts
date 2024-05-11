import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isSomeoneConnected: boolean;
}

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    isSomeoneConnected: false,
  } as AuthState,
  reducers: {
    setConnectionStatus(state, action: PayloadAction<boolean>) {
      state.isSomeoneConnected = action.payload;
    },
  },
  extraReducers: undefined,
});

export const socketSliceAction = socketSlice.actions;
export const socketSliceReducer = socketSlice.reducer;
