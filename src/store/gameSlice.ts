import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameState {
  scorePlayer1: number;
  scorePlayer2: number;
  legsPlayer1: number;
  legsPlayer2: number;
  currentPlayer: string | undefined;
}

interface GameSliceState {
  player1?: string;
  player2?: string;
  gameState: GameState;
}

const initialState: GameSliceState = {
  player1: undefined,
  player2: undefined,
  gameState: {
    scorePlayer1: 301,
    scorePlayer2: 301,
    legsPlayer1: 0,
    legsPlayer2: 0,
    currentPlayer: ''
  }
};

const gameSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPlayer1: (state, action: PayloadAction<string | undefined>) => {
      state.player1 = action.payload;
    },
    setPlayer2: (state, action: PayloadAction<string | undefined>) => {
      state.player2 = action.payload;
    },
    clearPlayers: state => {
      state.player1 = undefined;
      state.player2 = undefined;
    },
    setGameState: (state, action: PayloadAction<GameState>) => {
      state.gameState = action.payload;
    }
  }
});

export const { setPlayer1, setPlayer2, clearPlayers, setGameState } =
  gameSlice.actions;

export const userSliceReducer = gameSlice.reducer;
