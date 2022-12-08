import React from 'react';
import styles from './AppHeader.module.css';
import Language from '../language/Language';
import Sort from '../sort/Sort';


export default function AppHeader () {
  return (
      <div className={styles.appHeader}>
        <Language/>
        <Sort/>
      </div>
  )
}