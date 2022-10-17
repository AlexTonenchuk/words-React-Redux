import React from "react";
import styles from './Word.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectWord, selectIsMarked } from '../wordList/wordListSlice';
import { changeFocusWordId, clearFocusWordId, saveMarkedIds } from './wordSlice';

const Word = ({id}) => {
  const dispatch = useDispatch();
  const word = useSelector(state => selectWord(state, id));
  const isMarked = useSelector(state => selectIsMarked(state, id));
  const classes = isMarked ? styles.marked : '';
  const mouseOver = () => dispatch(changeFocusWordId(id));
  const mouseLeave = () => dispatch(clearFocusWordId());
  const onClick = () => dispatch(saveMarkedIds(id));
  console.dir('2 render Word');                              // для отладки
  console.dir(id);                                           // для отладки
  return (
    <div  className={styles.word} 
          onMouseOver={mouseOver}
          onMouseLeave={mouseLeave}>
      <div className={styles.id}> 
        {id}
      </div>
      <div  className={classes} 
            onClick={onClick}> 
        {word}    
      </div>
    </div>  
  );
};

export default Word
























/*
export default function Word (prop) {
 
  const dispatch = useDispatch();

  const language = useSelector(state => state.language.value);
  const markedListID = useSelector(state => state.word.markedListID);
  
  const mouseOver = () => {
  dispatch(
    changeTransletedWord(language === 'eng' ? prop.rus : prop.eng)
  )
  };
  
  const onClick = () => { 
    dispatch(toggleMark(prop.id))
  };

  return (
    <div  className={styles.word} 
          onMouseOver={mouseOver}>
      <div> {prop.id}--- </div>
      <div  className={markedListID.indexOf(prop.id) > -1 ? styles.bold : ''} //плохой стиль
            onClick={onClick}> 
      {language === 'eng' ? prop.eng : prop.rus} 
      </div>
    </div>
  )
}






 
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}

 */
