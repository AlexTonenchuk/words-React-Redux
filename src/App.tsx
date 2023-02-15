import React from 'react';
import './App.css';
import ButtonPanel from './features/buttonPanel/ButtonPanel';
import WordList from './features/wordList/WordList';
import Translator from './features/translator/Translator';


function App() {
  return (
    <div className="app">
      <div className='head'>Start Words</div>
      <Translator/>
      <WordList/>
      <ButtonPanel/>
    </div>
  );
}

export default App;