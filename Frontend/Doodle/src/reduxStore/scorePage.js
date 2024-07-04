import { createSlice } from "@reduxjs/toolkit";

const scorePageDetailsSlice = createSlice({
  name: "ScorePageDetails",
  initialState: {
    playerDetails: [],
    isScoreVisible: false,
  },
  reducers: {
    changePlayers:(state, action)=>{
      action.payload.sort((x, y)=>(x.score-y.score)*-1)
        state.playerDetails = [...action.payload]
        state.isScoreVisible = true
    },
    showScorePage:(state, action)=>{
        state.isScoreVisible = true;
    },
    hideScorePage:(state, action)=>{
        state.isScoreVisible = false;
    }
  },
});

export const { changePlayers, showScorePage, hideScorePage } = scorePageDetailsSlice.actions

export default scorePageDetailsSlice.reducer
