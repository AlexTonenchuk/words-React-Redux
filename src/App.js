import React from 'react';
import './App.css';
import AppHeader from './features/appHeader/AppHeader';
import WordList from './features/wordList/WordList';
import Translator from './features/translator/Translator';
import Level from './features/level/Level';


function App() {
  return (
    <div className="app">
      <AppHeader/>
      <WordList/>
      <Translator/>
      <Level/>
    </div>
  );
}

export default App;