import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const levelSlice = createSlice({
  name: 'level',
  initialState: 10,
  reducers: { 
    changeLevel: (state, action) => state = action.payload,
  },
});

export const { changeLevel } = levelSlice.actions;

export default levelSlice.reducer;

export const selectLevel = createSelector(
  (state: RootState) => state,
  state => state.level
);