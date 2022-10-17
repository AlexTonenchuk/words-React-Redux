import { createSlice, createSelector } from '@reduxjs/toolkit';

const   initialState = {
  value: 'eng',
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: { 
    toggleLanguage: (state) => {
      if (state.value === 'eng'){
        state.value = 'rus'
      } else if (state.value === 'rus'){
        state.value = 'eng'
      } else {
        alert('error in: store.language')
      };
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;

export default languageSlice.reducer;

export const selectLanguage = createSelector(
  state => state,
  state => state.language.value,
);