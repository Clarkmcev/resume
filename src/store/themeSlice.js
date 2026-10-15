import { createSlice } from '@reduxjs/toolkit';
import { isTheme } from '../themes';

const STORAGE_KEY = 'theme';

const getInitialTheme = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch (e) {
    // localStorage unavailable, fall back to system preference
  }
  return window.matchMedia?.('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: getInitialTheme(),
    // true while the theme picker is hovered or open; hides the wave background
    pickerActive: false,
  },
  reducers: {
    setTheme: (state, action) => {
      if (isTheme(action.payload)) state.mode = action.payload;
    },
    setPickerActive: (state, action) => {
      state.pickerActive = action.payload;
    },
  },
});

export const applyTheme = (mode) => {
  document.documentElement.setAttribute('data-theme', mode);
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch (e) {
    // ignore write failures (private mode, blocked storage)
  }
};

export const { setTheme, setPickerActive } = themeSlice.actions;

export default themeSlice.reducer;
