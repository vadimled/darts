import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
interface UserState {
  player1: string | undefined;
  player2: string | undefined;
}

// Define the initial state using that type
const initialState: UserState = {
  player1: undefined,
  player2: undefined,
};

const gameSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPlayer1: (state, action: PayloadAction<string>) => {
      state.player1 = action.payload;
    },
    setPlayer2: (state, action: PayloadAction<string>) => {
      state.player2 = action.payload;
    },
    clearPlayers: state => {
      state.player1 = undefined;
      state.player2 = undefined;
    },
  },
});

export const {setPlayer1, setPlayer2, clearPlayers} = gameSlice.actions;

export const userSliceReducer = gameSlice.reducer;
