import React from "react";
import Word from "../word/Word";
import styles from './WordList.module.css';
import { useSelector, shallowEqual } from 'react-redux';
import { selectRenderedIds } from './wordListSlice';

const WordList = () => {
  const renderedIds = useSelector(selectRenderedIds, shallowEqual)
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