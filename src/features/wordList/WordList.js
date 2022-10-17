import Word from "../word/Word";
import styles from './WordList.module.css';
import { useSelector, shallowEqual } from 'react-redux';
import { selectSortedWordsIds } from './wordListSlice';
import { selectSortType } from "../sort/sortSlice";


const WordList = () => {
  const sortType = useSelector(selectSortType);
  const sortedWordsIds = useSelector(selectSortedWordsIds, shallowEqual);
// рандомную сортировку массива id выносим из селектора в компонент
// так как селектор должен быть чистой функцией
  let renderedWordsIds;
  if (sortType === 'all' || sortType === 'marked'){
    renderedWordsIds = [...sortedWordsIds].sort((a,b) => a-b)
  } else if (sortType === 'all mixed' || sortType === 'marked mixed'){
    renderedWordsIds = [...sortedWordsIds].sort(() => Math.random() - 0.5)
  };
  const renderedWords = renderedWordsIds.map((wordId) => {
    return <li key={wordId}> <Word id={wordId}/> </li>
  });
  // для отладки
  console.dir('1 render list from WordList');
  // для отладки
  console.dir(sortedWordsIds);                            
  return (
    <div className={styles.list}>
      <ul className={styles.li}> {renderedWords} </ul>
    </div>
  );
};

export default WordList