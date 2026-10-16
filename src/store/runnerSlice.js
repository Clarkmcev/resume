import { createSlice } from "@reduxjs/toolkit";

// Best score in the runner game on the home page. It unlocks themes (see
// src/themes.js), so the theme picker reads it from here.
export const BEST_SCORE_KEY = "runner-high-score";

export const loadBestScore = () => {
  try {
    return Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;
  } catch (e) {
    return 0;
  }
};

export const saveBestScore = (score) => {
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(score));
  } catch (e) {
    // storage unavailable, the score just won't stick
  }
};

export const runnerSlice = createSlice({
  name: "runner",
  initialState: { best: loadBestScore() },
  reducers: {
    recordScore: (state, action) => {
      state.best = Math.max(state.best, action.payload);
    },
  },
});

export const { recordScore } = runnerSlice.actions;

export default runnerSlice.reducer;
