import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export const sortSlice = createSlice({
  name: 'sort',
  initialState: 'all',
  reducers: { 
    changeSort: (state, action) => state = action.payload,
  },
});

export const { changeSort } = sortSlice.actions;

export default sortSlice.reducer;

export const selectSortType = createSelector(
  (state: RootState) => state,
  state => state.sort
);