import { createSlice, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { selectMarkedWordsIds, selectFocusWordId } from '../word/wordSlice';
import { selectLevel } from '../level/levelSlice';
import { selectSortType } from '../sort/sortSlice';
import { selectLanguage } from '../language/languageSlice';


const wordsAdapter = createEntityAdapter();

const initialState = wordsAdapter.getInitialState();

export const wordListSlice = createSlice({
  name: 'wordList',
  initialState,
  reducers: {
    loaded: wordsAdapter.addMany,
  }
});

export const { loaded } = wordListSlice.actions;

export default wordListSlice.reducer;

export const { 
  selectIds: selectWordsIds, 
  selectEntities: selectWordList, 
  selectById: selectCoupleWords,
  selectTotal: selectTotalWords,
} = wordsAdapter.getSelectors((state) => state.wordList);

export const selectSortedWordsIds = createSelector(
  selectWordsIds,
  selectLevel,
  selectSortType,
  selectMarkedWordsIds,
  (wordsIds, level, sortType, markedWordsIds) => {
    let ids = [...wordsIds].slice(0, level);
    if (sortType === 'all' || sortType === 'all mixed') {
      ids = wordsIds.slice(0, level);
    } else if (sortType === 'marked' || sortType === 'marked mixed' ){
      ids = markedWordsIds;
    }
    return ids
  }
)

export const selectWord = createSelector(
  selectCoupleWords,
  selectLanguage,
  (coupleWord,  lang) => coupleWord[lang]
)

export const selectWordTranslate = createSelector(
  selectWordList,
  selectFocusWordId,
  selectLanguage,
  (words, focusId, lang) => {
    if (focusId){
    return lang === 'eng' ? words[focusId]['rus'] : words[focusId]['eng'];
    } else {
      return ' '
    }
  }
)

export const selectIsMarked = createSelector(
  selectCoupleWords,
  selectMarkedWordsIds,
  (coupleWords, markedWordsIds ) => {
    const id = coupleWords.id;
    const isMarked = markedWordsIds.indexOf(id) > -1 ? true : false;
    return isMarked
  }
)