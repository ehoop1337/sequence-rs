# SequnceRS
---
Javascript class for working with animation (sequence) in canvas

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
| Method | Argument | Description |
| ------ | ------ | ------ |
| load | | Starts frame loading |
| setCurrentFrame | int | Sets the current frame, by index |
| setSizes | int, int | Sets dimensions for canvas and frames - width, length |
| setObsession | boolean | Sets the cycle of the animation. true - cyclic, false - up to the last frame |
| setFPS | int | Sets the frame rate for animation |
| getLoadingPercent | | Returns the percentage (int) of frames loaded during loading, otherwise 0 or 100 |
| getCurrentFrame | | Returns the currently active frame |


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
`init`
```javascript
seq1.on('init', function(e) {
    console.log(e.detail);
});
```
`update`
```javascript
seq1.on('update', function(e) {
    console.log(e.detail);
});
```
