import React from 'react';
import styles from './Language.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from './languageSlice';
import { RootState } from '../../app/store';

const Language = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language);
  return (
    <div className={styles.language}>
      <button onClick={() => dispatch(toggleLanguage())}
              value={lang}
              data-testid='eng/rus'>
        {lang}
      </button>
    </div>
  );
}

export default Language