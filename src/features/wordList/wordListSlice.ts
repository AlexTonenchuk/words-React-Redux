import { createSlice, createSelector, createEntityAdapter, EntityId } from '@reduxjs/toolkit';
import { selectMarkedIds, selectFocusWordId } from '../word/wordSlice';
import { selectLevel } from '../level/levelSlice';
import { selectSortType } from '../sort/sortSlice';
import { selectLanguage } from '../language/languageSlice';
import { RootState } from '../../app/store';


interface IEntity {
  id: number;
  eng: string;
  rus: string;
};

const wordsAdapter = createEntityAdapter<IEntity>();

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
} = wordsAdapter.getSelectors((state: RootState) => state.wordList);

export const selectAllIds = createSelector(
  selectWordsIds,
  (allIds) => {
    return allIds
  }
)

export const selectSortedWordsIds = createSelector(
  selectWordsIds,
  selectLevel,
  selectSortType,
  selectMarkedIds,
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
  (coupleWord,  lang) => {
    if (coupleWord) {
      return coupleWord[lang as keyof IEntity]
    } else {return ''}
  }
)

export const selectWordTranslate = createSelector(
  selectWordList,
  selectFocusWordId,
  selectLanguage,
  (words, focusId, lang) => {
    let coupleWords = words[focusId];
    if (focusId && coupleWords){
      return lang==='eng'? coupleWords['rus'] : coupleWords['eng'];
    } else { return ' ' }
  }
)

export const selectIsMarked = createSelector(
  selectCoupleWords,
  selectMarkedIds,
  (coupleWords, markedWordsIds ) => {
    let isMarked
    if (coupleWords){
      const id = coupleWords.id;
      isMarked = markedWordsIds.indexOf(id) > -1 ? true : false;
      return isMarked
    } else {
      return isMarked=false
    }
  }
)