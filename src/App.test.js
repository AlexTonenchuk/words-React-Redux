import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './setupTests';
import userEvent from '@testing-library/user-event'

// В соответствии с рекомендациями Redux
// https://redux.js.org/usage/writing-tests
// предпочтение отдаем интеграционным тестам.
// Это приложение не делает запросов к серверу
// поэтому интеграционное тестирование будет
// особенно удобным и простым.

// preloadedState для пересоздаваемого в каждом тесте store
const testState = {
  wordList: {
    entities: {
      1: {id:1,eng:'one',rus:'один'}, 
      2: {id:2,eng:'two',rus:'два'},
      3: {id:3,eng:'three',rus:'три'},
      4: {id:4,eng:'four',rus:'четыре'},
    },
    ids: [1, 2, 3, 4,]
  },
  word: {
    focusWordId: undefined,
    markedWordsIds: [2],
  },
  sort: {value: "all",},
  level: {value: 3,},       // 3 но не 4 для чистоты эксперемента
  language: {value: 'eng',},
};

// тесты на корректность первой отрисовки приложения

test('"eng", "level", "out off" is rendered', () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  expect(screen.getByText('eng')).toBeInTheDocument();
  expect(screen.getByText('level')).toBeInTheDocument();
  expect(screen.getByText('out off')).toBeInTheDocument();
});

test('sort "all" is selected', () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  expect(screen.getByRole('option', { name: 'all' }).selected).toBe(true);
});

test('sort "all mixed" is not selected', () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  expect(screen.getByRole('option', { name: 'all mixed' }).selected).toBe(false);
});

test('"two" is marked', () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  expect(screen.getByText('two')).toHaveClass('marked');
});

test('"one", "three" is not marked', () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  expect(screen.getByText('one')).not.toHaveClass('marked');
  expect(screen.getByText('three')).not.toHaveClass('marked');
});

test('"level" equal 3', () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  expect(screen.getByTestId('levell').value).toBe('3')
});

test('"out off" equal 4', () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  expect(screen.getByTestId('totalWords')).toHaveTextContent('4')
});

test('"one", "two", "three" is rendered', () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  expect(screen.getByText('one')).toBeInTheDocument();
  expect(screen.getByText('two')).toBeInTheDocument();
  expect(screen.getByText('three')).toBeInTheDocument();
});

test('"four" is not rendered', () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  expect(screen.queryByText('four')).not.toBeInTheDocument();
});

test('"four" is rendered', () => {
  const testState = {
    wordList: {
      entities: {
        1: {id:1,eng:'one',rus:'один'}, 
        2: {id:2,eng:'two',rus:'два'},
        3: {id:3,eng:'three',rus:'три'},
        4: {id:4,eng:'four',rus:'четыре'},
        5: {id:5,eng:'five',rus:'пять'},
      },
      ids: [1, 2, 3, 4, 5,]
    },
    word: {
      focusWordId: undefined,
      markedWordsIds: [],
    },
    sort: {value: "all",},
    level: {value: 4,},       // теперь 4 а не 3
    language: {value: 'eng',},
  };
  renderWithProviders(<App />, { preloadedState: testState,});
  expect(screen.getByText('four')).toBeInTheDocument();
});

// тесты кнопки переключения языка:

test('after click on the "eng" rendered "rus"', async () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  const user = userEvent.setup();
  await user.click(screen.getByTestId('eng/rus'));
  expect(screen.getByTestId('eng/rus').textContent).toBe('rus');
});

test('after click on the "eng": "один", "два", "три" is rendered', async () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  const user = userEvent.setup();
  await user.click(screen.getByTestId('eng/rus'));
  expect(screen.getByText('один')).toBeInTheDocument();
  expect(screen.getByText('два')).toBeInTheDocument();
  expect(screen.getByText('три')).toBeInTheDocument();
});

test('after click on the "eng": "четыре" is not rendered', async () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  const user = userEvent.setup();
  await user.click(screen.getByTestId('eng/rus'));
  expect(screen.queryByText('четыре')).not.toBeInTheDocument();
});

test('after click on the "eng": "one"..."four" is not rendered', async () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  const user = userEvent.setup();
  await user.click(screen.getByTestId('eng/rus'));
  expect(screen.queryByText('one')).not.toBeInTheDocument();
  expect(screen.queryByText('two')).not.toBeInTheDocument();
  expect(screen.queryByText('three')).not.toBeInTheDocument();
  expect(screen.queryByText('four')).not.toBeInTheDocument();
});

// тесты меню сортировки:

test('after select "all mixed" it is selected', async () => {
  renderWithProviders(<App />, { preloadedState: testState, });
  const user = userEvent.setup();
  await user.selectOptions(
    screen.getByRole('combobox'),
    screen.getByRole('option', { name: 'all mixed' }),
  );
  expect(screen.getByRole('option', { name: 'all mixed' }).selected).toBe(true);
});