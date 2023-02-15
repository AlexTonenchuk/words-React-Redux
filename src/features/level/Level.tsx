import React from "react";
import styles from './Level.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectLevel, changeLevel } from './levelSlice';
import { selectTotalWords } from '../wordList/wordListSlice';
import { useState } from "react";


const Level = () => {
  const levelInStore = useSelector(selectLevel);
  const [level, setLevel] = useState(levelInStore);
  const totalWords = useSelector(selectTotalWords);
  const dispatch = useDispatch();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(e.target.value ? parseInt(e.target.value) : 0)
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(changeLevel(level));
  };
  return (
    <div className={styles.level}>
      <div>level</div>
      <form name = 'level' 
            onSubmit={onSubmit}>
        <input  type = "text" 
                value = {level}
                placeholder = {`level`}
                onChange = {onChange}
                className={styles.levelFild}
                data-testid="level"/>
      </form>
      <div>/</div>
      <div data-testid="totalWords">{totalWords}</div>
    </div>
  );
}

export default Level;