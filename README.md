# SequenceRS
Javascript class for playing animations with individual frames in canvas

[https://jsfiddle.net/ehoop1337/ep6ga1o8/](https://jsfiddle.net/ehoop1337/ep6ga1o8/)

## Installation

Static hosting

```html
<!-- unminify -->
<script src="sequence-rs.js"></script>
```

```html
<!-- minify -->
<script src="sequence-rs.min.js"></script>
```

CDN

```html
<!-- unminify -->
<script src="https://cdn.jsdelivr.net/gh/ehoop1337/sequence-rs@master/sequence-rs.js"></script>
```

```html
<!-- minify -->
<script src="https://cdn.jsdelivr.net/gh/ehoop1337/sequence-rs@master/sequence-rs.min.js"></script>
```

## Settings

Let's look on list of all available parameters

| Name | Type | Default | Required | Description |
| ------ | ------ | ------ | ------ | ------ |
| canvas | object |  | + | |
| width | number |  | + |  |
| height | number |  | + |  |
| startFrame | number | 0 |  |  |
| loop | boolean | false |  |  |
| fps | number | 0 |  |  |
| startAfterLoading | boolean | false |  |  |
| preventDefault | boolean | false |  |  |
| frames | object |  | + | Object with frames settings |

Parameters of the `frames` object

| Name | Type | Default | Required | Description |
| ------ | ------ | ------ | ------ | ------ |
| count | number |  | + |  |
| path | string |  | + |  |
| name | string |  | + |  |
| format | string |  | + |  |
| pad | number |  | + |  |
| webp | boolean | false |  |  |
| width | number |  |  |  |
| height | number |  |  |  |
| sx | number | 0 |  |  |
| sy | number | 0 |  |  |
| x | number | 0 |  |  |
| y | number | 0 |  |  |

Example

```js
const seq = new SequenceRS({
    canvas: document.querySelector('canvas'),
    width: 1920,
    height: 950,
    frames: {
        count: 100,
        path: 'https://example.com/frames/',
        name: 'frame_',
        format: 'jpg',
        pad: 5,
        webp: true,
        width: 1920,
        height: 950,
        sx: 0,
        sy: 0,
        x: 0,
        y: 0,
    },
    loop: true,
    fps: 30,
    startFrame: 10,
    preview: true,
    startAfterLoading: true,
    preventDefault: false
});
```

## Methods

| Method | Argument | Returns | Description |
| ------ | ------ | ------ | ------ |
| init | | |  |
| load | | |  |
| start | | |  |
| pause | | |  |
| play | | |  |
| stop | | |  |
| restart | | |  |
| getStartFrame | | |  |
| getLoop | | |  |
| getFPS | | |  |
| getSizesCanvas | | |  |
| getCurrentFrame | | |  |
| getSizesFrames | | |  |
| setStartFrame | | |  |
| setLoop | | |  |
| setFPS | | |  |
| setSizesCanvas | | |  |
| setCurrentFrame | | |  |
| setSizesFrames | | |  |

## Events

SequnceRS comes with a bunch of useful events you can listen. Events can be assigned in two ways:

1. Using on parameter on swiper initialization:

```javascript
const seq = new SequenceRS({
  // ...
  on: {
    init: function () {
      console.log('initialized', this);
    }
  }
});
```

2. Using on method after SequnceRS initialization.

```javascript
const seq = new SequenceRS({
  // ...
  preventDefault: true
});
seq.on('init', function () {
  console.log('initialized', this);
});
seq.init();
```

Please note, that `this` keyword within event handler always points to SequnceRS instance

| Name | Description |
| ------ | ------ |
| init | |
| load |  |
| loading |  |
| loaded |  |
| start |  |
| pause |  |
| play |  |
| stop |  |
| restart |  |
| upadte | |
| looped |  |
