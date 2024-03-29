import React from 'react';
import styles from './Mixer.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { saveMarkedMixIds, saveAllMixIds, selectMarkedIds } from '../word/wordSlice';
import { selectSortType } from '../sort/sortSlice';
import { selectAllIds } from '../wordList/wordListSlice';
import { selectLevel } from '../level/levelSlice';


const Mixer = () => {
  const dispatch: AppDispatch = useDispatch();
  const sortValue = useSelector(selectSortType);
  const markedIds = useSelector(selectMarkedIds);
  const allIds = useSelector(selectAllIds);
  const level = useSelector(selectLevel);
  const mix = () => {
    if (sortValue === 'marked mixed') {
      dispatch(saveMarkedMixIds(markedIds));
    } else if (sortValue === 'all mixed') {
      const ids = allIds.slice(0, level);
      dispatch(saveAllMixIds(ids));
    }
  }
  let stylesBtn = " ";
  if (sortValue === 'marked mixed' || sortValue === 'all mixed'){
    stylesBtn = styles.mixer
  } else {
    stylesBtn = styles.disable;
  }
  return (
    <div className={stylesBtn}>
      <button onClick={mix}
              data-testid='mixer'>
        <img src="./update.png"></img>
      </button>
    </div>
  );
}

export default Mixer