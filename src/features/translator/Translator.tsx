import React from "react";
import styles from './Translator.module.css';
import { useSelector } from 'react-redux';
import { selectWordTranslate } from '../wordList/wordListSlice';


const Translator = () => {
  const wordTranslate = useSelector(selectWordTranslate);
  return (
    <div  className = {styles.translator}
          data-testid = 'translator'> 
      {wordTranslate} 
    </div>
  )
}

export default Translator;