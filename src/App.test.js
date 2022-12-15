import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './setupTests';
import userEvent from '@testing-library/user-event'

// В соответствии с рекомендациями Redux
// https://redux.js.org/usage/writing-tests
// предпочтение отдаем интеграционным тестам.

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

// тесты первоначального отображения списка слов

describe('after first render app:', () => {

  test('"one", "two", "three" are rendered', () => {
    renderWithProviders(<App />, { preloadedState: testState });
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
    expect(screen.getByText('three')).toBeInTheDocument();
  });

  test('"four" is not rendered', () => {
    renderWithProviders(<App />, { preloadedState: testState });
    expect(screen.queryByText('four')).not.toBeInTheDocument();
  });

  test('"two" is marked', () => {
    renderWithProviders(<App />, { preloadedState: testState });
    expect(screen.getByText('two')).toHaveClass('marked');
  });

  test('"one", "three" are not marked', () => {
    renderWithProviders(<App />, { preloadedState: testState });
    expect(screen.getByText('one')).not.toHaveClass('marked');
    expect(screen.getByText('three')).not.toHaveClass('marked');
  });

  test('"four" is rendered then "level" equal 4', () => {
    const testState = {
      wordList: {
        entities: {
          1: {id:1,eng:'one',rus:'один'}, 
          2: {id:2,eng:'two',rus:'два'},
          3: {id:3,eng:'three',rus:'три'},
          4: {id:4,eng:'four',rus:'четыре'},
        },
        ids: [1, 2, 3, 4 ]
      },
      word: {
        focusWordId: undefined,
        markedWordsIds: [],
      },
      sort: {value: "all",},
      level: {value: 4,},       //  4 вместо 3
      language: {value: 'eng',},
    };
    renderWithProviders(<App />, { preloadedState: testState });
    expect(screen.getByText('four')).toBeInTheDocument();
  });
});

// тесты кнопки переключения языка:

test('button "eng" is rendered', () => {
  renderWithProviders(<App />, { preloadedState: testState });
  expect(screen.getByText('eng')).toBeInTheDocument();
});

describe('after click on the "eng" button:', () => {
  
  test('"rus" is rendered', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { preloadedState: testState });
    await user.click(screen.getByTestId('eng/rus'));
    expect(screen.getByTestId('eng/rus').textContent).toBe('rus');
  });
  
  test('"один", "два", "три" are rendered', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { preloadedState: testState });
    await user.click(screen.getByTestId('eng/rus'));
    expect(screen.getByText('один')).toBeInTheDocument();
    expect(screen.getByText('два')).toBeInTheDocument();
    expect(screen.getByText('три')).toBeInTheDocument();
  });

  test('"one"..."three" are not rendered', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { preloadedState: testState });
    await user.click(screen.getByTestId('eng/rus'));
    expect(screen.queryByText('one')).not.toBeInTheDocument();
    expect(screen.queryByText('two')).not.toBeInTheDocument();
    expect(screen.queryByText('three')).not.toBeInTheDocument();
  });

  test('"четыре" is not rendered', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { preloadedState: testState });
    await user.click(screen.getByTestId('eng/rus'));
    expect(screen.queryByText('четыре')).not.toBeInTheDocument();
  });
})

// тесты "all mixed" в меню сортировки:

test('sort "all" is selected default', () => {
  renderWithProviders(<App />, { preloadedState: testState });
  expect(screen.getByRole('option', { name: 'all' }).selected)
  .toBe(true);
});

test('sort "all mixed" is not selected', () => {
  renderWithProviders(<App />, { preloadedState: testState });
  expect(screen.getByRole('option', { name: 'all mixed' }).selected)
  .toBe(false);
});

describe('after select "all mixed" in sort menu:', () => {

  test('"all mixed" is selected', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { preloadedState: testState });
    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'all mixed' }),
    );
    expect(screen.getByRole('option', { name: 'all mixed' }).selected)
    .toBe(true);
  });

  test('"one" ... "five" are not sequential', async () => {
    // добавим в стейт "five" чтоб снизить вероятность нежелательной
    // последовательной отрисовки от "one" до "five"
    const user = userEvent.setup();
    const testState = {
      wordList: {
        entities: {
          1: {id:1,eng:'one_',rus:'один'}, 
          2: {id:2,eng:'two_',rus:'два'},
          3: {id:3,eng:'three_',rus:'три'},
          4: {id:4,eng:'four_',rus:'четыре'},
          5: {id:5,eng:'five_',rus:'пять'},
        },
        ids: [1, 2, 3, 4, 5]
      },
      word: {
        focusWordId: undefined,
        markedWordsIds: [],
      },
      sort: {value: "all",},
      level: {value: 5,},
      language: {value: 'eng',},
    };
    renderWithProviders(<App />, { preloadedState: testState });
    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'all mixed' }),
    );
    expect( 
            screen.getAllByTestId('word')[0].textContent 
            + screen.getAllByTestId('word')[1].textContent 
            + screen.getAllByTestId('word')[2].textContent
            + screen.getAllByTestId('word')[3].textContent 
            + screen.getAllByTestId('word')[4].textContent
    ).not.toBe("one_two_three_four_five_");
  });
});

// тесты "marked" в меню сортировки:

describe('after select "marked" in sort menu:', () => {

  test('"marked" is selected', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { preloadedState: testState });
    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'marked' }),
    );
    expect(screen.getByRole('option', { name: 'marked' }).selected)
    .toBe(true);
  });

  test('"two" is rendered', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { preloadedState: testState });
    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'marked' }),
    );
    expect(screen.getByText('two')).toBeInTheDocument();
  });

  test('"one" and "three" are not rendered', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { preloadedState: testState });
    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'marked' }),
    );
    expect(screen.queryByText('one')).not.toBeInTheDocument();
    expect(screen.queryByText('three')).not.toBeInTheDocument();
  });
});

// тесты функцианальности: появление подсказки-перевода 
// при наведении курсора на строку со словом

test('when mouse hover in "one": "один" is rendered', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />, { preloadedState: testState });
  await user.hover(screen.getByText('one'));
  expect(screen.getByText('один')).toBeVisible();
});

test('when mouse hover in "1": "один" is rendered', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />, { preloadedState: testState });
  await user.hover(screen.getByText('1'));
  expect(screen.getByText('один')).toBeInTheDocument();
  expect(screen.getByText('один')).toBeVisible();
});

test('when mouse hover in "2": "один" is not rendered', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />, { preloadedState: testState });
  await user.hover(screen.getByText('2'));
  expect(screen.queryByText('один')).not.toBeInTheDocument();
});

// тесты поля ввода "level":

test('"level", "out off" are rendered', () => {
  renderWithProviders(<App />, { preloadedState: testState });
  expect(screen.getByText('level')).toBeInTheDocument();
  expect(screen.getByText('out off')).toBeInTheDocument();
});

test('"level" equal 3', () => {
  renderWithProviders(<App />, { preloadedState: testState });
  expect(screen.getByTestId('level').value).toBe('3')
});

test('"out off" equal 4', () => {
  renderWithProviders(<App />, { preloadedState: testState });
  expect(screen.getByTestId('totalWords')).toHaveTextContent('4')
});

test('after submit "level" = 1: only "one" is rendered', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />, { preloadedState: testState });
  await user.type(screen.getByTestId('level'), "{backspace}1{enter}");
  expect(screen.getByText('one')).toBeInTheDocument();
  expect(screen.queryByText('two')).not.toBeInTheDocument();
  expect(screen.queryByText('three')).not.toBeInTheDocument();
});
