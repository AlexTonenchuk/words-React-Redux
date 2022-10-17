Для отработки навыков работы с рекомендуемым Redux современным инструментом Toolkit - разбиваю стейт на слайсы:
- список слов;
- слово (- перевод слова, находящегося под курсором мыши; - список выделенных слов.);
- язык;
- ...;

Структура папок выбрана в соответствии с рекомендациями Redux: 
https://redux.js.org/style-guide/#structure-files-as-feature-folders-with-single-file-logic
Каждая папка компонента содержит в себе файлы:
- react компонент;
- redux слайс;
- стили;
- ...;

Всю логику компонентов стараюсь прописать в редьюсерах, для удобства тестирования, в соответствии с рекомендациями Redux:
...

Для сохранения скорости отзывчивости интерфейса стараюсь минимизировать любые лишние переборы массивов (map(), findindex() и т.п.) в компонентах и в редьюсерах. Перебор массива по факту используется только один раз в <WordList/>. 

В слайсах у initialState не использую initialState.value если initialState это массив или объект соответствии с рекомендациями Redux:
...


















# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
