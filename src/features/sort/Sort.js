import React from "react";
import styles from './Sort.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeSort } from './sortSlice';


export default function Sort () {
  const sort = useSelector(state => state.sort);
  const dispatch = useDispatch();
  const onChange = (e) => dispatch(changeSort(e.target.value));
  return (
    <span className={styles.sort}>
      <select 
          size="1" 
          name="sort"
          defaultValue = { sort }
          onChange = { onChange }>
          <option value="all"> all </option>
          <option value="all mixed"> all mixed </option>
          <option value="marked"> marked </option>
          <option value="marked mixed"> marked mixed </option>
      </select>
    </span>
  );
};