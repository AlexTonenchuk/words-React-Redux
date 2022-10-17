import React from "react";
import styles from './Level.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeLevel } from './levelSlice';
import { selectTotalWords } from '../wordList/wordListSlice';
import { useState } from "react";


export default function Level() {
  const [level, setLevel] = useState("");
  const totalWords = useSelector(selectTotalWords);
  const dispatch = useDispatch();
  const onChange = (e) => setLevel(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(changeLevel(level));
  };
  return (
    <div className={styles.level}>
      <div >level</div>
      <form name = 'level' onSubmit={onSubmit}>
        <input  type = "text" 
                placeholder = {'level'}
                value = {level}
                onChange = {onChange}
                className={styles.levelFild}/>
      </form>
      <div>out off</div>
      <div>{totalWords}</div>
    </div>
  );
}