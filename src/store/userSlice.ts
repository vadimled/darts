// src/features/userSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
interface UserState {
  username: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    clearUsername: state => {
      state.username = null;
    },
  },
});

export const {setUsername, clearUsername} = userSlice.actions;

export const userSliceReducer = userSlice.reducer;
