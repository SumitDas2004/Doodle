import { createSlice } from "@reduxjs/toolkit";

const scorePageDetailsSlice = createSlice({
  name: "ScorePageDetails",
  initialState: {
    playerDetails: [],
    isScoreVisible: false,
    word: "",
    isFinalScoreVisible: false
  },
  reducers: {
    changeDetails: (state, action) => {
      state.playerDetails = [...action.payload.players];
      state.isScoreVisible = true;
      state.word = action.payload.word;
    },
    showScorePage: (state) => {
      state.isScoreVisible = true;
    },
    hideScorePage: (state) => {
      state.isScoreVisible = false;
    },
    showFinalScorePage: (state) => {
      state.isFinalScoreVisible = true;
    },
    hideFinalScorePage: (state) => {
      state.isFinalScoreVisible = false;
    },
  },
});

export const {
  changeDetails,
  showScorePage,
  hideScorePage,
  showFinalScorePage,
  hideFinalScorePage,
} = scorePageDetailsSlice.actions;

export default scorePageDetailsSlice.reducer;
