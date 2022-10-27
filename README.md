
    Это не pet project! Это рабочее, действительно полезное приложение,
при помощи которого я учу английский язык. Присоединяйтесь ко мне, учите слова вместе со мной, базу слов я буду пополнять новыми терминами, взятыми как правило из документации по технологиям JS.  
Идея приложения, логика, архитектура, дизайн - это полностью продукт моего творчества.
    В этом приложении я стараюсь максимально строго придерживаться всем
последним рекомендациям Redux и Redux Toolkit. Все приложение построено по  документации Redux c официального сайта. В приложении учтены пожалуй все рекомендации Redux:
    - разбивать стейт на слайсы (выбрал сделать 5 слайсов для обкатки технологии);
    - структура папок в соответствии с рекомендациями.Каждая папка компонента содержит в себе файлы:
        -- react компонент;
        -- redux слайс;
        -- стили;
        -- тесты.
    - вся логика изменения данных содержится в редьюсерах, а не в компонентах для повышения технологичности тестирования. Код компонентов получился компактным, минимальным;
    - вся логика извлечения данных из хранилища расположена в селекторах внутри слайсов. В запоминаемых селекторах выхода использована сложная логика обработки извлекаемых данных;
    - все селекторы - чистые функции, случайная сортировка вынесена в компонент;
    - повсеместно использованы селекторы из адаптера;
    - загрузка данных в хранилище из/в localStorage отработана с createAsyncThunk; 
    - для сохранения скорости отзывчивости интерфейса исключены любые лишние переборы массивов (map(), findindex() и т.п.) в компонентах и в редьюсерах. Перебор массива по факту используется только один раз в <WordList/>. Поиск элементов списков основан на технологии адаптера.
Все эти рекомендации позволили исключить дублированные рендеренги
при использовании приложения.

Как пользоваться приложением:
1. Введите свой уровень знаний "lavel"
2. Выучите слова
3. Отмаркируйте (клик по слову) самые сложные слова которые нужно повторять чаще остальных. Отмаркированные слова сохранятся в вашем localStorage.
4. Фильтром "Sort" перемешивайте слова или просматривайте отмаркированные.
5. Повторяйте слова: если забыли перевод - просто наведите курсор и перевод появится в окне в нижней части приложения.

Как учу слова я:
- допустим сейчас утро понедельника и мой уровень 100 слов и я хочу сегодня выучить еще 5 новых слов;
- сперва я определяю какие слова из 100 я забыл за активно прошедшие выходные ;) Для этого просматриваю все 100 слов и маркирую забытые (эти забытые слова я буду повторять каждый день в течении всей недели используя Sort: marked и marked mixed);
- далее настраиваю lavel = 105;
- учу в течении 30 минут последние 5 слов из этих 105;
- те, которые из этих 5 слов плохо запоминаются я тоже маркирую (и тем самым буду их повторять каждое утро в течении недели);
- и таким образом каждое утро прибавляю уровень на 3-5 слов и + в течении недели на 100500 раз просматриваю плохозапомненные (отмаркированные) слова;
- вот и все!

Плюсы этого приложения:
- удобно подглядывать перевод слова просто наводя на него курсор;
- удобно когда можно перемешивать список;
- всегда знаешь какие именно слова ты забыл за неделю (маркированные слова хранятся в твоем браузере);
- не нужно тратить время каждый день чтобы прочитывать весь список слов, ведь однажды твой уровень станет 1-2 или 3 тысячи слов! И как ты будешь контролировать, какие именно слова ты забыл? А вот так: просмотрел раз в неделю (или раз в месяц) весь список, отмаркировал то что забыл, и зубри зубри зубри этот отмаркированный список...





















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
