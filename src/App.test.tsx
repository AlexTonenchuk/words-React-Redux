import '@testing-library/jest-dom/extend-expect'; 
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './setupTests';
import { RootState } from './app/store';


// В соответствии с рекомендациями Redux
// https://redux.js.org/usage/writing-tests
// предпочтение отдается интеграционным тестам.

// это preloadedState для store, пересоздаваемого в каждом тесте 
const testState: RootState = {
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
    focusWordId: '',
    markedWordsIds: [2],
  },
  sort: "all",
  level: 3,
  language: 'eng',
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

  test('"four" is rendered if "level" equal 4', () => {
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
        focusWordId: "",
        markedWordsIds: [],
      },
      sort: "all",
      level: 4,       //  меняем на 4 вместо 3
      language: 'eng',
    };
    renderWithProviders(<App />, { preloadedState: testState });
    expect(screen.getByText('four')).toBeInTheDocument();
  }); 
});

// тесты кнопки переключения языка:

test('button "eng" is rendered', () => {
  renderWithProviders(<App />, { preloadedState: testState });
  const button = screen.getByRole('button', {name: 'eng'});
  expect(button).toBeInTheDocument();
});

describe('after click on the "eng" button:', () => {
  
  test('"rus" is rendered', () => {
    renderWithProviders(<App />, { preloadedState: testState });
    fireEvent.click(screen.getByRole('button', {name: 'eng'}));
    expect(screen.getByRole('button', {name: 'rus'})).toBeInTheDocument();
  });
  
  test('"один", "два", "три" are rendered', () => {
    renderWithProviders(<App />, { preloadedState: testState });
    fireEvent.click(screen.getByRole('button', {name: 'eng'}));
    expect(screen.getByText('один')).toBeInTheDocument();
    expect(screen.getByText('два')).toBeInTheDocument();
    expect(screen.getByText('три')).toBeInTheDocument();
  });

  test('"one"..."three" are not rendered', () => {
    renderWithProviders(<App />, { preloadedState: testState });
    fireEvent.click(screen.getByRole('button', {name: 'eng'}));
    expect(screen.queryByText('one')).not.toBeInTheDocument();
    expect(screen.queryByText('two')).not.toBeInTheDocument();
    expect(screen.queryByText('three')).not.toBeInTheDocument();
  });

  test('"четыре" is not rendered',  () => {
    renderWithProviders(<App />, { preloadedState: testState });
    fireEvent.click(screen.getByRole('button', {name: 'eng'}));
    expect(screen.queryByText('четыре')).not.toBeInTheDocument();
  });
  
})
 
// тесты "all mixed" в меню сортировки:

test('sort "all" is selected default', () => {
  renderWithProviders(<App />, { preloadedState: testState });
  expect(screen.getByTestId('sort')).toHaveValue('all')
});

test('"all mixed","marked","marked mixed" is not selected', () => {
  renderWithProviders(<App />, { preloadedState: testState });
  const sort = screen.getByTestId('sort');
  expect(sort).not.toHaveValue('all mixed');
  expect(sort).not.toHaveValue('marked ');
  expect(sort).not.toHaveValue('marked mixed');
});

describe('after select "all mixed" it is selected', () => {

  test('"all mixed" is selected', () => {
    renderWithProviders(<App />, { preloadedState: testState });
    const sort = screen.getByTestId('sort');
    fireEvent.change(sort, { target: { value: 'all mixed' } });
    expect(sort).toHaveValue('all mixed');
  });

  test('"one" ... "five" are not sequential', () => {
    // добавим в стейт "five" чтоб снизить вероятность случайной 
    // нежелательной последовательной отрисовки от "one" до "five"
    const testState = {
      wordList: {
        entities: {
          1: {id:1,eng:'one',rus:'один'}, 
          2: {id:2,eng:'two',rus:'два'},
          3: {id:3,eng:'three',rus:'три'},
          4: {id:4,eng:'four',rus:'четыре'},
          5: {id:5,eng:'five',rus:'пять'},
        },
        ids: [1, 2, 3, 4, 5]
      },
      word: {
        focusWordId: '',
        markedWordsIds: [],
      },
      sort: "all",
      level: 5,
      language: 'eng',
    };
    renderWithProviders(<App />, { preloadedState: testState });
    const sort = screen.getByTestId('sort');
    fireEvent.change(sort, { target: { value: 'all mixed' } });
    const words: any =  screen.getAllByTestId('word');
    expect( 
      words[0].textContent 
      + words[1].textContent 
      + words[2].textContent
      + words[3].textContent 
      + words[4].textContent
    ).not.toBe("onetwothreefourfive"); //not: one + two + three + four + five
  });

});

// тесты "marked" в меню сортировки:

describe('after select "marked" in sort menu:', () => {

  test('"marked" is selected',  () => {
    renderWithProviders(<App />, { preloadedState: testState });
    const sort = screen.getByTestId('sort');
    fireEvent.change(sort, { target: { value: 'marked'} });
    expect(sort).toHaveValue('marked');
  });
  
  test('"two" is rendered',  () => {
    renderWithProviders(<App />, { preloadedState: testState });
    const sort = screen.getByTestId('sort');
    fireEvent.change(sort, { target: { value: 'marked'} });
    expect(screen.getByText('two')).toBeInTheDocument();
  });

  test('"one" and "three" are not rendered', () => {
    renderWithProviders(<App />, { preloadedState: testState });
    const sort = screen.getByTestId('sort');
    fireEvent.change(sort, { target: { value: 'marked'} });
    expect(screen.queryByText('one')).not.toBeInTheDocument();
    expect(screen.queryByText('three')).not.toBeInTheDocument();
  });
  
});

// тесты появления подсказки-перевода при hover

test('when mouse hover in "one": "один" is rendered', () => {
  renderWithProviders(<App />, { preloadedState: testState });
  expect(screen.queryByText('один')).not.toBeInTheDocument();
  fireEvent.mouseOver(screen.getByText('one'));
  expect(screen.getByText('один')).toBeInTheDocument();
});

test('when mouse hover in "1": "один" is rendered', () => {
  renderWithProviders(<App />, { preloadedState: testState });
  expect(screen.queryByText('один')).not.toBeInTheDocument();
  fireEvent.mouseOver(screen.getByText('1'));
  expect(screen.getByText('один')).toBeInTheDocument();
});

test('when mouse hover in "2": "один" is not rendered', () => {
  renderWithProviders(<App />, { preloadedState: testState });
  fireEvent.mouseOver(screen.getByText('2'));
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
  const level = screen.getByTestId('level');
  expect(level).toHaveValue('3')
});

test('"out off" equal 4', () => {
  renderWithProviders(<App />, { preloadedState: testState });
  const total = screen.getByTestId('totalWords');
  expect(total).toHaveTextContent('4')
}); 

test('after submit "level" = 1: only "one" is rendered', () => {
  renderWithProviders(<App />, { preloadedState: testState });
  const level = screen.getByTestId('level');
  fireEvent.input(level, { target: { value: 1 }});
  fireEvent.submit(level);
  expect(screen.getByText('one')).toBeInTheDocument();
  expect(screen.queryByText('two')).not.toBeInTheDocument();
  expect(screen.queryByText('three')).not.toBeInTheDocument();
});
