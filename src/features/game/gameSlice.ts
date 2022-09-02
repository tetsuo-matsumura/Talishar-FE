import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ParseGameState from '../../app/ParseGameState';
import InitialGameState from './InitialGameState';
import GameInfo from '../GameInfo';
import GameState from '../GameState';

export const nextTurn = createAsyncThunk(
  'game/nextTurn',
  async (params: GameInfo) => {
    const queryURL = `https://www.fleshandbloodonline.com/FaBOnline/GetNextTurn3.php?gameName=${params.gameID}&playerID=${params.playerID}&authKey=${params.authKey}`;
    const response = await fetch(queryURL, {
      method: 'GET',
      headers: {}
    });
    const data = await response.text();
    // console.log(data);
    const gameState: GameState = ParseGameState(data);
    // console.log(gameState);
    return gameState;
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState: InitialGameState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder.addCase(nextTurn.fulfilled, (state, action) => {
      state.playerOne = action.payload.playerOne;
      state.playerTwo = action.payload.playerTwo;
      return state;
    });
  }
});

// export const {} = gameSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default gameSlice.reducer;
