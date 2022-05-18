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
| canvas | object |  | + | Passing an HTML element, for example `document.querySelector('canvas')`. |
| width | integer |  | + | Sets the width of the canvas. |
| height | integer |  | + | Sets the heigth of the canvas. |
| startFrame | integer | 0 |  | This parameter is responsible for the initial frame in the animation. It is used when initializing by default with the `startAfterLoading: true` parameter or when calling the `start()` method. |
| loop | boolean | false |  | `true` loops the render. `false` the animation will play once. |
| fps | integer | 0 |  | Frames per second of rendering. `0` uses "window.animationRequestFrame" by default. |
| startAfterLoading | boolean | true |  | `true` after loading the last frame, the rendering immediately plays. `false` the render does not start, you need to use the `start()` or `play()` method. |
| preventDefault | boolean | false |  | `true` cancels initialization (getting context, canvas size setting, start loading frames) |
| frames | object |  | + | Object with frames settings. it is required parameter. |

Parameters of the `frames` object

| Name | Type | Default | Required | Description |
| ------ | ------ | ------ | ------ | ------ |
| count | integer |  | + |  |
| path | string |  | + |  |
| name | string |  | + |  |
| format | string |  | + |  |
| pad | integer |  | + |  |
| webp | boolean | false |  |  |
| width | integer |  |  |  |
| height | integer |  |  |  |
| sx | integer | 0 |  |  |
| sy | integer | 0 |  |  |
| x | integer | 0 |  |  |
| y | integer | 0 |  |  |

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

Example

```javascript
const seq = new SequenceRS({
  // ...
});
seq.pause();
let [widthCanvas, heightCanvas] = seq.getSizesCanvas();
if (widthCanvas > 1024) {
    seq.setSizesCanvas(widthCanvas, widthCanvas / 1.333);
    seq.play();
} else {
    seq.restart();
}
```

## Events

SequnceRS comes with a bunch of useful events you can listen. Events can be assigned in two ways:

1. Using on parameter on SequnceRS initialization:

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
| update | |
| looped |  |
