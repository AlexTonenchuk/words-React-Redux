import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { loaded } from './features/wordList/wordListSlice';
import { getMarkedWordsIds } from './features/word/wordSlice';
import './index.css';
import App from './App';
import { data } from './app/data';


store.dispatch(loaded(data));
store.dispatch(getMarkedWordsIds());

const root = ReactDOM.createRoot(document.getElementById('root')!);
// не забыть вернуть обертку стриктмод вокруг провайдера
root.render(                                    
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);