# SequnceRS
Javascript class for playing animations with individual frames in canvas

[https://jsfiddle.net/ehoop1337/ep6ga1o8/](https://jsfiddle.net/ehoop1337/ep6ga1o8/)

### Installation
`unminify`
```html
<script src="sequnce-rs.js"></script>
```
`minify`
```html
<script src="sequnce-rs.min.js"></script>
```

### CDN
`unminify`
```html
<script src="[https://cdn.jsdelivr.net/gh/ehoop1337/sequence-rs@master/sequence-rs.js](https://cdn.jsdelivr.net/gh/ehoop1337/sequence-rs@master/sequence-rs.js)"></script>
```
`minify`
```html
<script src="[https://cdn.jsdelivr.net/gh/ehoop1337/sequence-rs@master/sequence-rs.min.js](https://cdn.jsdelivr.net/gh/ehoop1337/sequence-rs@master/sequence-rs.min.js)"></script>
```

### Settings

`Required`

| Option | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| canvas | DOM node |  | Canvas to which we apply initialization |
| frames | int |  | Number of frames |
| path | string | '/' | Path to frames |
| name | string |  | Name of frames |
| format | string | 'jpg' | Default frame format |
| width | boolean | 1920 | Frame width and canvas |
| height | boolean | 950 | Frame height and canvas |

`Optional`

| Option | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| webp | boolean | false | WEBP format support |
| upload | boolean | false | Loading frames during initialization |
| start | boolean | false | Play animation when frames are fully loaded |
| obsession | boolean | false | Cyclicity of animation |
| fps | int | 0 | Frame rate per second. 0 outputs 60 fps by default |
| currentFrame | int | 0 | The index of the frame from which the animation will start |
| pad | int | 5 | The number of digits after the frame name |

### Example

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
    fps: 30,
    currentFrame: 10,
    pad: 4
});
```

### Methods
`basic`
| Method | Description |
| ------ | ------ |
| play | Starts the animation |
| stop | Stops animation |

`additional`
| Method | Argument | Returns | Description |
| ------ | ------ | ------ | ------ |
| load | | | Starts frame loading |
| setCurrentFrame | int | | Sets the current frame, by index |
| setSizes | int, int | | Sets dimensions for canvas and frames - width, length |
| setObsession | boolean | | Sets the cycle of the animation. true - cyclic, false - up to the last frame |
| setFPS | int | | Sets the frame rate for animation |
| getLoadingPercent | | int | Returns the percentage (int) of frames loaded during loading, otherwise 0 or 100 |
| getCurrentFrame | | int | Returns the currently active frame |


### Example

```js
const seq = new SequenceRS({
    ...
});
seq.setCurrentFrame(100);
seq.setSize(1920, 950);
seq.setObsession(true);
seq.setFPS(30);
seq.load();
seq.play();
seq.stop();
```

### Events
`loaded`
```javascript
// the event pops up when all frames are fully loaded
seq1.on('loaded', function(e) {
    console.log(e.detail);
});
```
`update`
```javascript
// the event pops up every time the frame is rendered
seq1.on('update', function(e) {
    console.log(e.detail);
});
```
