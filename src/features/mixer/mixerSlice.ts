import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export const languageSlice = createSlice({
  name: 'language',
  initialState: 'eng',
  reducers: { 
    toggleLanguage: (state) => {
      if (state === 'eng'){
        state = 'rus'
      } else if (state === 'rus'){
        state = 'eng'
      }
      return state
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;

export default languageSlice.reducer;

export const selectLanguage = createSelector(
  (state: RootState) => state,
  state => state.language,
);