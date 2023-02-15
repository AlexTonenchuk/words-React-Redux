import React from 'react';
import styles from './ButtonPanel.module.css';
import Language from '../language/Language';
import Sort from '../sort/Sort';
import Level from '../level/Level';


const AppHeader = () => {
  return (
      <div className={styles.buttonPanel}>
        <Language/>
        <Sort/>
        <Level/>
      </div>
  )
}

export default  AppHeader