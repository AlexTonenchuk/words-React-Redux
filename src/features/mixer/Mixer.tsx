import React from 'react';
import styles from './Mixer.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from './mixerSlice';
import { RootState } from '../../app/store';

const Mixer = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language);
  return (
    <div className={styles.language}>
      <button onClick={() => dispatch(toggleLanguage())}
              value={lang}
              data-testid='mixer'>
        {lang}
      </button>
    </div>
  );
}

export default Mixer