import React from 'react';
import styles from './Language.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from './languageSlice';


export default function Language () {
  const dispatch = useDispatch();
  const lang = useSelector(state => state.language.value);
  return (
    <div className={styles.language}>
      <button onClick={() => dispatch(toggleLanguage())}>
        {lang}
      </button>
    </div>
  );
}