import React from "react";
import styles from './Word.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectWord, selectIsMarked } from '../wordList/wordListSlice';
import { changeFocusWordId, clearFocusWordId, saveMarkedIds } from './wordSlice';
import { RootState, AppDispatch } from "../../app/store";

interface IWordProps {
  id: number
};

const Word = ({id}: IWordProps) => {
  const dispatch: AppDispatch = useDispatch();
  const word = useSelector((state: RootState) => selectWord(state, id));
  const isMarked = useSelector((state: RootState) => selectIsMarked(state, id));
  const classes = `${styles.word}  ${isMarked ? styles.marked : ''}`;
  const mouseOver = () => dispatch(changeFocusWordId(id));
  const mouseLeave = () => dispatch(clearFocusWordId());
  const onClick = () => dispatch(saveMarkedIds(id));
  return (
    <div  className={styles.row} 
          onMouseOver={mouseOver}
          onMouseLeave={mouseLeave}>
      <div className={styles.id}> 
        {id}
      </div>
      <div  className={classes} 
            onClick={onClick}
            data-testid='word'> 
        {word}    
      </div>
    </div>  
  );
};

export default Word