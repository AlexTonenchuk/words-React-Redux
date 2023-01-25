import { configureStore } from '@reduxjs/toolkit';
import wordListReducer from '../features/wordList/wordListSlice';
import wordReducer from '../features/word/wordSlice';
import languageReducer from '../features/language/languageSlice';
import sortReducer from '../features/sort/sortSlice';
import levelReducer from '../features/level/levelSlice';

export const store = configureStore({
  // так много редъюсеров (5 шт) для того чтобы хорошо
  // отработать этот паттерн на практике
  reducer: {                            
    wordList: wordListReducer,          
    word: wordReducer,
    language: languageReducer,
    sort: sortReducer,
    level: levelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// создатель экземпляров store для изолированных тестов
// используется в setupTest.js
// см. https://redux.js.org/usage/writing-tests
export const setupStore = (preloadedState: RootState | {}) => {
  return configureStore({
      reducer: {                            
        wordList: wordListReducer,          
        word: wordReducer,
        language: languageReducer,
        sort: sortReducer,
        level: levelReducer,
      },
      preloadedState
    })
}

