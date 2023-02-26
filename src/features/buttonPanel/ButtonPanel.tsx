import React from 'react';
import styles from './ButtonPanel.module.css';
import Language from '../language/Language';
import Sort from '../sort/Sort';
import Level from '../level/Level';
import Mixer from '../mixer/Mixer';


const AppHeader = () => {
  return (
      <div className={styles.buttonPanel}>
        <Language/>
        <Mixer/>
        <Sort/>
        <Level/>
      </div>
  )
}

export default  AppHeader