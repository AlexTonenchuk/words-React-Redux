import { createSlice, createSelector } from '@reduxjs/toolkit';


const   initialState = {
  value: "all",
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: { 
    changeSort: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { changeSort } = sortSlice.actions;

export default sortSlice.reducer;

export const selectSortType = createSelector(
  state => state,
  state => state.sort.value
);