import React from "react";
import Word from "../word/Word";
import styles from './WordList.module.css';
import { useSelector, shallowEqual } from 'react-redux';
import { selectAllIds, selectSortedWordsIds } from './wordListSlice';
import {selectAllMixIds, selectMarkedIds, selectMarkedMixIds} from '../word/wordSlice'
import { selectSortType } from "../sort/sortSlice";
import { EntityId } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { selectLevel } from "../level/levelSlice";



const WordList = () => {
  const sortType = useSelector(selectSortType);
  const allIds = useSelector(selectAllIds);
  const allMixIds = useSelector(selectAllMixIds);
  const markedIds = useSelector(selectMarkedIds);
  const markedMixIds = useSelector(selectMarkedMixIds);
  const level = useSelector(selectLevel);
  const sortedIds = useSelector(selectSortedWordsIds, shallowEqual);    //wtf?
  let renderedIds: EntityId[] = [];
  if (sortType === 'all'){
    renderedIds = [...allIds];
    renderedIds.splice(level);
  } else if (sortType === 'all mixed'){
    renderedIds = allMixIds
  } else if (sortType === 'marked'){
    renderedIds = markedIds
  } else if (sortType === 'marked mixed'){
    renderedIds = markedMixIds
  };
  const renderedWords = renderedIds.map((wordId) => {
    return <li key={wordId}> <Word id={wordId}/> </li>       
  });
  return (
    <div className={styles.list}>
      <ul className={styles.li}> {renderedWords} </ul>
    </div>
  );
};

export default WordList