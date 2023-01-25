import React from "react";
import Word from "../word/Word";
import styles from './WordList.module.css';
import { useSelector, shallowEqual } from 'react-redux';
import { selectSortedWordsIds } from './wordListSlice';
import { selectSortType } from "../sort/sortSlice";
import { EntityId } from "@reduxjs/toolkit";


const WordList = () => {
  const sortType = useSelector(selectSortType);
  const sortedWordsIds = useSelector(selectSortedWordsIds, shallowEqual);
  // рандомная сортировка массива id делается здесь в компоненте,
  // а не в селекторе т.к. селектор должен быть чистой функцией
  let renderedWordsIds: EntityId[];
  if (sortType === 'all' || sortType === 'marked'){
    renderedWordsIds = [...sortedWordsIds].sort((a, b) => +a-+b)
  } else if (sortType === 'all mixed' || sortType === 'marked mixed'){
    renderedWordsIds = [...sortedWordsIds].sort(() => Math.random() - 0.5)
  } else {
    renderedWordsIds = [...sortedWordsIds].sort((a, b) => +a-+b)
  };
  const renderedWords = renderedWordsIds.map((wordId) => {
    return <li key={wordId}> <Word id={wordId}/> </li>       
  });
  return (
    <div className={styles.list}>
      <ul className={styles.li}> {renderedWords} </ul>
    </div>
  );
};

export default WordList