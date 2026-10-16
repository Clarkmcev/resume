import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./exampleSlice";
import runnerReducer from "./runnerSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    theme: themeReducer,
    runner: runnerReducer,
  },
});
