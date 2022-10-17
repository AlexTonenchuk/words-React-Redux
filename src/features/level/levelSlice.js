import { createSlice, createSelector } from '@reduxjs/toolkit';

const   initialState = {
  value: 15,
};

export const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: { 
    changeLevel: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeLevel } = levelSlice.actions;

export default levelSlice.reducer;

export const selectLevel = createSelector(
  state => state,
  state => state.level.value
);