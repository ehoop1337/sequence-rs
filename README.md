# SequnceRS
---
Javascript класс для работы с анимацией (секвенция) в canvas

### Installation
`unminify`
```javascript
<script src="sequnce-rs.js"></script>
```
`minify`
```javascript
<script src="sequnce-rs.min.js"></script>
```

### Settings

`Required`

| Option | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| canvas | DOM node |  | Canvas к которому применяем инициализацию |
| frames | int |  | Количество фреймов |
| path | string | '/' | Путь до фреймов |
| name | string |  | Название фремов |
| format | string | 'jpg' | Формат фреймов по умолчанию |
| width | boolean | 1920 | Ширина фреймов и canvas |
| height | boolean | 950 | Высота фреймов и canvas |

`Optional`

| Option | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| webp | boolean | false | Поддрежка WEBP формата |
| upload | boolean | false | Загрузка фреймов при инициализации |
| start | boolean | false | Воспроизводить анимацию при полной загрузке фреймов |
| obsession | boolean | false | Цикличность анимации |
| fps | int | 0 | Частота кадров в секунду. 0 по умолчанию выводит 60 fps |
| currentFrame | int | 0 | Индекс фрейма с которого начнется анимация|
| pad | int | 5 | Количество цифр после названия фрейма |

## Methods
`basic`
| Method | Argument | Description |
| ------ | ------ | ------ |
| play | | Запускает анимацию |
| stop | | Останавливает анимацию |

`additional`
| Method | Argument | Description |
| ------ | ------ | ------ |
| load | |  Начинает загрузку фрейвом |
| setCurrentFrame | int | Устанавливает текущий фрейм, по индексу |
| setSizes | int, int | Устанавливает размеры для canvas и фремов - ширина, длина |
| setObsession | boolean | Устаналивает цикличность анимации. true - цикличная, false - до последнего фрейма |
| setFPS | int | Устанавливает частоту кадров для анимации |
| getLoadingPercent | | Возвращает процент (int) загруженныех фремов во время загрузки, иначе 0 или 100 |
| getCurrentFrame | | Возвращает текущий фрейм |


## Events
`init`
```javascript
seq1.on('init', function(e) {
    console.log(e.detail);
})
```
`update`
```javascript
seq1.on('update', function(e) {
    console.log(e.detail);
});
```


## Example

`default`

```js
const seq = new SequenceRS({
	canvas: document.querySelector('canvas'),
	frames: 150,
	path: '//example.com/sequnce/',
	name: 'seq_',
	format: 'jpg',
	width: 1920,
	height: 950
});
```


`full settings`

```js
const seq = new SequenceRS({
	canvas: document.querySelector('canvas'),
	frames: 150,
	path: '//example.com/sequnce/',
	name: 'seq_',
	format: 'jpg',
	width: 1920,
	height: 950,
	webp: true,
	upload: true,
    start: true,
    obsession: true,
    fps: 30
    currentFrame: 10
    pad: 4
});
```


