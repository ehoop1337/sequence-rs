# SequnceRS
Javascript class for playing animations with individual frames in canvas

[https://jsfiddle.net/ehoop1337/ep6ga1o8/](https://jsfiddle.net/ehoop1337/ep6ga1o8/)

## Installation

```html
<!-- unminify -->
<script src="sequnce-rs.js"></script>
```

```html
<!-- minify -->
<script src="sequnce-rs.min.js"></script>
```

## CDN

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
| canvas | object |  | + | Canvas to which we apply initialization |
| frames | object |  | + | Object with frames parameters |
| webp | boolean | false |  | WEBP format support |

#### Example

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
| play | | | Starts the animation |
| stop | | | Stops animation |
| load | | | Starts frame loading |
| setCurrentFrame | int | | Sets the current frame, by index |
| setSizes | int, int | | Sets dimensions for canvas and frames - width, length |
| setObsession | boolean | | Sets the cycle of the animation. true - cyclic, false - up to the last frame |
| setFPS | int | | Sets the frame rate for animation |
| getLoadingPercent | | int | Returns the percentage (int) of frames loaded during loading, otherwise 0 or 100 |
| getCurrentFrame | | int | Returns the currently active frame |


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
  console.log('init', this);
});
seq.init();
```

Please note, that `this` keyword within event handler always points to SequnceRS instance

| Name | Description |
| ------ | ------ |
| init | Fired right after SequnceRS initialization. |
| load |  |
| loading |  |
| loaded |  |
| start |  |
| pause |  |
| play |  |
| stop |  |
| restart | The event will be triggered after the animation is restarted |
| upadte | The event will be triggered after the frame is refreshed |
| looped | The event will be triggered after rendering the last frame with the `loop` parameter active |
