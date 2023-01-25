import React from 'react';
import styles from './AppHeader.module.css';
import Language from '../language/Language';
import Sort from '../sort/Sort';


const AppHeader = () => {
  return (
      <div className={styles.appHeader}>
        <Language/>
        <Sort/>
      </div>
  )
}

export default  AppHeader