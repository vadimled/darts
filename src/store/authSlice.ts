import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
}

interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// interface LoginData {
//   username: string;
//   password: string;
// }

export const login = createAsyncThunk('auth/login', async () => {
  // await apiLogin(data);
  return new Promise(() => console.log('Login'));
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  } as AuthState,
  reducers: {},
  extraReducers: undefined,
});

export const authSliceAction = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
