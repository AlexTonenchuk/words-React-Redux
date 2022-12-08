import React from 'react';
import { render, screen } from '@testing-library/react';
//import { Provider } from 'react-redux';
//import { createTestStore } from './app/store';
import App from './App';
//import { loaded } from './features/wordList/wordListSlice';
import { renderWithProviders } from './setupTests';


// В соответствии с рекомендациями Redux
// https://redux.js.org/usage/writing-tests
// предпочтение отдаем интеграционным тестам.
// Это приложение не делает запросов к серверу
// поэтому интеграционное тестирование будет
// особенно удобным и простым.


// настроим тестовый store и далее тестируем
const testState = {
  wordList: {
    entities: {
      1: {id:1,eng:'one',rus:'один'}, 
      2: {id:2,eng:'two',rus:'два'},
      3: {id:3,eng:'three',rus:'три'},
      4: {id:4,eng:'four',rus:'четыре'},
      5: {id:5,eng:'five',rus:'пять'},
    },
    ids: [1, 2, 3, 5, 4,]   // 5 и 4   поменяем местами для чистоты эксперемента
  },
  word: {
    focusWordId: undefined,
    markedWordsIds: [],
  },
  sort: {value: "all",},
  level: {value: 3,},
  language: {value: 'eng',},
};

// далее делаем интеграционные изолированные тесты

test('"eng", "all", "level", "out off" should be render', () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  expect(screen.getByText('eng')).toBeInTheDocument();
  expect(screen.getByText('all')).toBeInTheDocument();
  expect(screen.getByText('level')).toBeInTheDocument();
  expect(screen.getByText('out off')).toBeInTheDocument();
});

test('should be "out off 5"', () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  expect(screen.getByTestId('totalWords')).toHaveTextContent('5')
});

test('"two" should be rendered', () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  expect(screen.getByText('two')).toBeInTheDocument();
});

test('3 should not be rendered', () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  expect(screen.getByText('eng')).toBeInTheDocument();
  expect(screen.getByText('three')).toBeInTheDocument();
});