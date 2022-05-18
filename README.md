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

#### Required

| Name | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| canvas | object |  | Canvas to which we apply initialization |
| frames | object |  | Object with frames parameters |

#### Optional

| Name | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| webp | boolean | false | WEBP format support |

## Example

#### default

```js
const seq = new SequenceRS({

    // Required
    canvas: document.querySelector('canvas'),
    width: 1920,
    height: 950,
    frames: {
        count: 120,
        path: 'https://degorov.ru/lks/wp-content/themes/base/assets/i/2/',
        name: 'LKS_seq002_',
        format: 'jpg',
        pad: 5,
    }
});
```

#### full settings

```js
const seq = new SequenceRS({

    // Required
    canvas: document.querySelector('canvas'),
    width: 1920,
    height: 950,
    frames: {
        count: 120,
        path: 'https://degorov.ru/lks/wp-content/themes/base/assets/i/2/',
        name: 'LKS_seq002_',
        format: 'jpg',
        pad: 5,

        // Optional
        webp: true,
        width: 1920,
        height: 950,
        sx: 0,
        sy: 0,
        x: 0,
        y: 0,
    },
    loop: true,
    fps: 60,
    startFrame: 5,
    preview: true,
    startAfterLoading: true,
    preventDefault: false,
    on: {
        init: function() {
            console.log('Event: init');
        },
        load: function() {
            console.log('Event: load');
        },
        loading: function() {
            console.log('Event: loading - ', this.loadedFrames, ' / ', this.getLoadingPercent() + '%');
        },
        loaded: function() {
            console.log('Event: loaded');
        },
        start: function() {
            console.log('Event: start');
        },
        pause: function() {
            console.log('Event: pause');
        },
        play: function() {
            console.log('Event: play');
        },
        stop: function() {
            console.log('Event: stop');
        },
        restart: function() {
            console.log('Event: restart');
        },
        update: function() {
            console.log('Event: update', '/ currentFrame: ', this.getCurrentFrame());
        },
        loop: function() {
            console.log('Event: loop');
        }
    }
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

#### loaded

```javascript
// the event pops up when all frames are fully loaded
seq1.on('loaded', function(e) {
    console.log(e.detail);
});
```

#### update

```javascript
// the event pops up every time the frame is rendered
seq1.on('update', function(e) {
    console.log(e.detail);
});
```
