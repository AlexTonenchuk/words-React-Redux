import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


interface IwordState {
  focusWordId: number | '',
  markedIds: number[],
  markedMixIds: number[],
  allMixIds: number[]
}

const initialState: IwordState = {
  focusWordId: '',
  markedIds: [],
  markedMixIds: [],
  allMixIds: []
};

// Здесь могло бы быть асинхронное получение данных с сервера,
// (пользовательские списки id выделенных слов),
// но сервера нет, поэтому список получаем из localStorage,
// не вызывая никаких асихронных запросов
export const getMarkedIds = createAsyncThunk(
  'word/getMarkedIds', 
  async () => {
  return JSON.parse(localStorage.getItem('markedIds') || '[]');
});

export const getMarkedMixIds = createAsyncThunk(
  'word/getMarkedMixIds', 
  async () => {
  return JSON.parse(localStorage.getItem('markedMixIds') || '[]');
})

export const getAllMixIds = createAsyncThunk(
  'word/getAllMixIds', 
  async () => {
  return JSON.parse(localStorage.getItem('allMixIds') || '[]');
})

// Здесь могла бы быть асинхронная отправка данных на сервер,
// чтобы сохранять пользовательские списки id выделенных слов,
// но сервера нет, поэтому списки сохраняем в localStorage.
export const saveMarkedIds = createAsyncThunk(
  'word/changeMarkedIds', 
  async (id: number | string) => {
    let list = JSON.parse(localStorage.getItem('markedIds') || '[]');
    const index = list.indexOf(id);
    index > -1 ? list.splice(index, 1) : list.push(id);
    localStorage.removeItem('markedIds');
    localStorage.setItem('markedIds', JSON.stringify(list));
    return JSON.parse(localStorage.getItem('markedIds') || '[]');
  }
);

export const saveMarkedMixIds = createAsyncThunk(
  'word/changeMarkedMixIds', 
  async (ids: number[]) => {
    let newMarkedMixIds = [...ids].sort(() => Math.random() - 0.5);
    localStorage.removeItem('markedMixIds');
    localStorage.setItem('markedMixIds', JSON.stringify(newMarkedMixIds));
    return JSON.parse(localStorage.getItem('markedMixIds') || '[]');
  }
);

export const saveAllMixIds = createAsyncThunk(
  'word/changeAllMixIds', 
  async (ids: number[]) => {
    let newAllMixIds = [...ids].sort(() => Math.random() - 0.5);
    localStorage.removeItem('allMixIds');
    localStorage.setItem('allMixIds', JSON.stringify(newAllMixIds));
    return JSON.parse(localStorage.getItem('allMixIds') || '[]');
  }
);

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
    .addCase(getMarkedIds.fulfilled, (state, action) => {
      state.markedIds = action.payload;
    })
    .addCase(saveMarkedIds.fulfilled, (state, action) => {
      state.markedIds = action.payload;
    })
    .addCase(getMarkedMixIds.fulfilled, (state, action) => {
      state.markedMixIds = action.payload;
    })
    .addCase(saveMarkedMixIds.fulfilled, (state, action) => {
      state.markedMixIds = action.payload;
    })
    .addCase(getAllMixIds.fulfilled, (state, action) => {
      state.allMixIds = action.payload;
    })
    .addCase(saveAllMixIds.fulfilled, (state, action) => {
      state.allMixIds = action.payload;
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

export const selectAllMixIds = createSelector(
  (state: RootState) => state,
  state => state.word.allMixIds,
);

export const selectMarkedIds = createSelector(
  (state: RootState) => state,
  state => state.word.markedIds,
);

export const selectMarkedMixIds = createSelector(
  (state: RootState) => state,
  state => state.word.markedMixIds,
);