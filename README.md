# Тестовое задание на frontend-разработчика

1. [Игра в города / Cities word chain (React, TypeScript, Tailwind)](#cities):
   
    * [Описание](#cities-description)
    * [Задача](#cities-task)
    * [Стек и технические требования](#cities-stack)
    * [Примечания](#cities-notes)
    * [✅Результат](#cities-result)
  
## Установка 

```sh
Все команды запускаются из корня проекта:

# Шаг 1 — Клонируем репозиторий
$ https://github.com/M4XPRD/cities-game

# Шаг 2 — Устанавливаем зависимости и одновременно запускаем проект
$ make start

# Шаг 2.5 — Если нужно просто запустить проект, пишем make dev
$ make dev

# Если у вас yarn, то перед командой пишем "y"
$ make y-start
```

## Проект

### **Описание**
<a name="cities-description"></a>

Привет!

Это страничка тестового задания для вакансии на frontend-разработчика.

Задание расчитано на ~3-4 часа. Что мы проверяем:

  - Вёрстка, (кроссбраузерная, адаптивная), применение Tailwind
  - Умение работать с макетом в Figma
  - Умение разделять код на компоненты
  - Умение писать осознанные коммиты
  - Умение предлагать варианты для решения поставленной задачи
  - Код стайл, аккуратность (желательно использование prettier)
  - Стремление к развитию, не бойся делать ошибки

### **Задача**
<a name="cities-task"></a>

Необходимо разработать "легкую" версию онлайн-игры в "Города".

В качестве аппонента, мы предлагаем тебе написать функцию (искуственный интеллект, если можно так это назвать), которая будет брать города из заготовленного списка (список городов прилагается в репозитории). Главное не забудь учитывать правила игры – города не могут повторяться.

Для имитации живого игрока нужно написать функцию так, чтобы ответ от нее приходил с задержкой.

В репозитории есть [макет Figma](https://www.figma.com/file/OUbQwQUf3YgAxcdJBcwGhg/TestApp?type=design&node-id=7518%3A482&mode=design&t=M7EEetQvHy1e6MuX-1), в котором ты можешь найти финальный дизайн для игры. Обрати внимание на отступы, выравнивания по центру, на размерности.

В первой вкладке расположен макет, во второй tailwindcss конфигурация (она соответсвует конфигурации по умолчанию).

Все размеры в макете подходят под размеры tailwind-классов. Например: максимальная ширина окна - 576px, соответствует классу max-w-xl.

Для работы над текстом в первом слайде рекомендую использовать класс `.prose` из tailwind плагина [Typography](https://tailwindcss.com/docs/typography-plugin).

Так же необходимо реализовать таймер обратного отсчета, по умолчанию на 2 минуты. Если игрок или функция "ИИ" не успеет дать нужный ответ, мы можем определить победителя и проигравшего.

Для более качественной работы необходимо добавить валидацию вводимых городов на существование (1), по первой букве (2) и на повторение (3). (для упрощения проверяй существование города по имеющимуся списку городов)

### **Стек и технические требования**
<a name="cities-stack"></a>

  - React 18 (можно с Next, можно без)
  - Tailwind
  - Использование Typescript в проекте будет жирным плюсом

Роутинг делать не обязательно, если тебе будет достаточно работы в одном родительском компоненте.

Pixel Perfect оценивать не будем, но жирным плюсом будет, если классы из tailwind будут верно подобраны и подходить под размеры макета.

Решение должно быть выложено в публичном репозитории на github, чтобы можно было его проверить.

В остальном требований к проекту нет, можно использовать любые вспомогательные библиотеки на твой вкус (такие как day.js для работы с датой и тд). Будет плюсом, если ты умеешь обходится без "готовых React компонентов".

### **Примечания**

Присылай свой вариант решения на почту chaek-frontend@mail.ru в виде ссылки на Github-репозиторий.

Если тебе что-либо не удалось реализовать, прикладывай пояснение к своей работе для общего разбора полетов. Мы приветствуем любые результаты, даже если у тебя что-то не получается реализовать.

Все вопросы можно задавать на почте a@gldk.ru или в телеграм @qweik

Желаем успехов! Надеемся, что задание окажется интересным!

## ✅ Результат:
<a name="cities-result"></a>


### Что получилось в итоге: