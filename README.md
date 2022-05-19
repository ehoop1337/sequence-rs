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
| width | number |  | + | Set the width of the canvas. |
| height | number |  | + | Set the heigth of the canvas. |
| startFrame | number | 0 |  | This parameter is responsible for the initial frame in the animation. It is used when initializing by default with the `startAfterLoading: true` parameter or when calling the `start()` method. |
| loop | boolean | false |  | `true` loops the render. If loop is `false` the animation plays once. |
| fps | number | 0 |  | Frames per second of rendering. If fps is `0` it is used `window.animationRequestFrame()` by default. |
| preview | boolean | true |  | |
| startAfterLoading | boolean | true |  | If parameter after loading the last frame is `true`, the rendering plays immediately. If parameter is `false` the render does not start, you need to use the `start()` or `play()` method. |
| preventDefault | boolean | false |  | `true` cancels initialization (getting context, canvas size setting, start loading frames) |
| frames | object |  | + | Object with frames settings. it is required parameter. |

Parameters of the `frames` object

| Name | Type | Default | Required | Description |
| ------ | ------ | ------ | ------ | ------ |
| count | number |  | + | Number of uploaded frames. |
| path | string |  | + | Url path to frames. |
| name | string |  | + | Name of frames. |
| format | string |  | + | Default frame format. |
| pad | number |  | + |  |
| webp | boolean | false |  | WEBP format support. Cancels the default format if the browser supports WEBP, you need to duplicate the frames in WEBP format in the same folder.  |
| width | number |  |  | The width of the sub-rectangle of the source frame to draw into the destination context. |
| height | number |  |  | The height of the sub-rectangle of the source frame to draw into the destination context.  |
| sx | number | 0 |  | The x-axis coordinate of the top left corner of the sub-rectangle of the source frame to draw into the destination context. |
| sy | number | 0 |  | The y-axis coordinate of the top left corner of the sub-rectangle of the source frame to draw into the destination context. |
| x | number | 0 |  | The x-axis coordinate in the destination canvas at which to place the top-left corner of the source frame. |
| y | number | 0 |  | The y-axis coordinate in the destination canvas at which to place the top-left corner of the source frame |

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
| init | | boolean | Initialization (getting context, canvas size setting, start loading frames). Returns `true` if successful. |
| load | | | Сauses frames to load. |
| start | number | boolean | Starts rendering from the specified frame in `startFrame`. If an argument (the index of the frame) is passed, it makes it the current one. Returns `true` if successful. |
| pause | | boolean | Pauses rendering. Returns `true` if successful. |
| play |  | boolean | Removes rendering from pause. Returns `true` if successful. |
| stop | number | boolean | Stops rendering. If an argument (the index of the frame) is passed, it makes it the current one. Returns `true` if successful. |
| restart | number | boolean | Restarts rendering. If an argument (the index of the frame) is passed, it makes it the current one. Returns `true` if successful. |
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
