import { 
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';

const initialState = {
  focusWordId: undefined,
  markedWordsIds: [],
};

// Здесь могло бы быть асинхронное получение данных с сервера,
// (пользовательский список id выделенных слов),
// но сервера нет, поэтому список получаем из localStorage,
// не вызывая никаких асихронных запросов
export const getMarkedWordsIds = createAsyncThunk('word/getMarkedWordsIds', async () => {
  return JSON.parse(localStorage.getItem('markedWordsIds')) || [];
})

// Здесь могла бы быть асинхронная отправка данных на сервер,
// чтобы сохранять пользовательский список id выделенных слов,
// но сервера нет, поэтому список сохраняем в localStorage.
export const saveMarkedIds = createAsyncThunk('word/changeMarkink', async (id) => {
  let list = JSON.parse(localStorage.getItem('markedWordsIds')) || [];
  const index = list.indexOf(id);
  index > -1 ? list.splice(index, 1) : list.push(id);
  localStorage.removeItem('markedWordsIds');
  localStorage.setItem('markedWordsIds', JSON.stringify(list));
  return JSON.parse(localStorage.getItem('markedWordsIds'));
});

export const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    changeFocusWordId: (state, action) => {
      if (action.payload){
        state.focusWordId = action.payload;
      } else {
        state.focusWordId = undefined;
      }
    },
    clearFocusWordId: (state, action) => {
      state.focusWordId = undefined
    }
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
  toggleMark 
} = wordSlice.actions;

export default wordSlice.reducer;

export const selectFocusWordId = createSelector(
  state => state,
  state => state.word.focusWordId,
);

export const selectMarkedWordsIds = createSelector(
  state => state,
  state => state.word.markedWordsIds,
);