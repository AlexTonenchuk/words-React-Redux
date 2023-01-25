import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


interface IwordState {
  focusWordId: number | '',
  markedWordsIds: number[]
}

const initialState: IwordState = {
  focusWordId: '',
  markedWordsIds: [],
};

// Здесь могло бы быть асинхронное получение данных с сервера,
// (пользовательский список id выделенных слов),
// но сервера нет, поэтому список получаем из localStorage,
// не вызывая никаких асихронных запросов
export const getMarkedWordsIds = createAsyncThunk(  'word/getMarkedWordsIds', async () => {
  return JSON.parse(localStorage.getItem('markedWordsIds') || '[]');
})

// Здесь могла бы быть асинхронная отправка данных на сервер,
// (и еще один экстраредьюсер для индикации успешности post запроса)
// чтобы сохранять пользовательский список id выделенных слов,
// но сервера нет, поэтому список сохраняем в localStorage без экстраредьюсера.
export const saveMarkedIds = createAsyncThunk('word/changeMarkink', async (id: number | string) => {
  let list = JSON.parse(localStorage.getItem('markedWordsIds') || '[]');
  const index = list.indexOf(id);
  index > -1 ? list.splice(index, 1) : list.push(id);
  localStorage.removeItem('markedWordsIds');
  localStorage.setItem('markedWordsIds', JSON.stringify(list));
  return JSON.parse(localStorage.getItem('markedWordsIds') || '[]');
});

export const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    changeFocusWordId: (state, action) => {
      if (action.payload){
        state.focusWordId = action.payload;
      } else {
        state.focusWordId = '';
      }
    },
    clearFocusWordId: (state) => {state.focusWordId = ''}
  },
  extraReducers: builder => {
    builder
    .addCase(getMarkedWordsIds.fulfilled, (state, action) => {
      state.markedWordsIds = action.payload;
    })
    .addCase(saveMarkedIds.fulfilled, (state, action) => {
      state.markedWordsIds = action.payload;
    })
  }
});

export const { 
  changeFocusWordId, 
  clearFocusWordId, 
} = wordSlice.actions;

export default wordSlice.reducer;

export const selectFocusWordId = createSelector(
  (state: RootState) => state,
  state => state.word.focusWordId,
);

export const selectMarkedWordsIds = createSelector(
  (state: RootState) => state,
  state => state.word.markedWordsIds,
);