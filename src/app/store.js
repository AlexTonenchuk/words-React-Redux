import { configureStore } from '@reduxjs/toolkit';
import wordListReducer from '../features/wordList/wordListSlice';
import wordReducer from '../features/word/wordSlice';
import languageReducer from '../features/language/languageSlice';
import sortReducer from '../features/sort/sortSlice';
import levelReducer from '../features/level/levelSlice';

export const store = configureStore({
  reducer: {                            // так много редъюсеров (5 шт) для того чтобы хорошо
    wordList: wordListReducer,          // отработать этот паттерн на практике
    word: wordReducer,
    language: languageReducer,
    sort: sortReducer,
    level: levelReducer,
  },
});