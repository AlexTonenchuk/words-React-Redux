import React from "react";
import styles from './Sort.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeSort } from './sortSlice';
import { RootState } from "../../app/store";


const Sort = () => {
  const sortType = useSelector((state: RootState) => state.sort);  
  const dispatch = useDispatch();
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeSort(e.target.value));
  }
  return (
    <span className={styles.sort}>
      <select
          name ="sort"
          data-testid="sort"
          defaultValue = { sortType }
          onChange = { onChange }>
          <option value="all"> all </option>
          <option value="all mixed"> all mixed </option>
          <option value="marked"> marked </option>
          <option value="marked mixed"> marked mixed </option>
      </select>
    </span>
  );
};

export default Sort