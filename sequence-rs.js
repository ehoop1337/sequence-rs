class SequenceRS {
					
	constructor (settings) {
		this.context = null;
		this.arrayFrames = [];
		this.animation = false;
		this.currentFrame = 0;
		this.requestId = 0;
		this.fpsInterval = null;
		this.startTime = null;
		this.now = null;
		this.then = null;
		this.elapsed = null;
		this.loadedFrames = 0;
		this.canvas = settings.canvas;
		this.width = settings.width;
		this.height = settings.height;
		this.countFrames = settings.frames.count;
		this.pathFrames = settings.frames.path;
		this.nameFrames = settings.frames.name;
		this.padFrames = settings.frames.pad;
		this.formatFrames = settings.frames.format;
		this.widthFrames = settings.frames.width || settings.width;
		this.heightFrames = settings.frames.height || settings.height;
		this.webp = settings.frames.webp || false;
		this.sx = settings.frames.sx || 0;
		this.sy = settings.frames.sy || 0;
		this.x = settings.frames.x || 0;
		this.y = settings.frames.y || 0;
		this.loop = settings.loop || false;
		this.fps = settings.fps || 0;
		this.startFrame = settings.startFrame || 0;
		this.renderFirstFrame = settings.preview == false ? false : true;
		this.startAfterLoading = settings.startAfterLoading == false ? false : true;
		this.events = settings.on || {};
		this.preventDefault = settings.preventDefault || false;
		this.addListener();
		if (this.checkRequiredSettings()) {
			if (!this.preventDefault) {
				this.init();
			}
		}
	}

	checkRequiredSettings = () => {
		if (!this.canvas) return this.errorRequired('canvas');
		if (!this.width) return this.errorRequired('width');
		if (!this.height) return this.errorRequired('height');
		if (!this.countFrames) return this.errorRequired('count');
		if (!this.pathFrames) return this.errorRequired('path');
		if (!this.nameFrames) return this.errorRequired('name');
		if (!this.padFrames) return this.errorRequired('pad');
		if (!this.formatFrames) return this.errorRequired('format');
		return true;
	}

	addListener = () => {
		for (let key in this.events) {
			this.canvas.addEventListener(key, this.events[key].bind(this));
		}
	}

	init = () => {
		this.context = this.canvas.getContext('2d');
		this.setSizesCanvas(this.width, this.height);
		this.setCurrentFrame(this.startFrame);
		this.eventInit();
		if (!this.preventDefault) {
			this.load();
		}
	}

	load = () => {
		this.eventLoad();
		let loaded = (index, img) => {
			this.arrayFrames[index] = img;
			this.loadedOneFrame();
			this.eventLoading();
			if (this.checkLoaded()) {
				this.eventLoaded();
				if (!this.preventDefault && this.startAfterLoading) {
					this.start();
				}
			}
			if (this.renderFirstFrame) {
				if (index == this.currentFrame) {
					this.context.clearRect(0, 0, this.width, this.height);
					this.context.drawImage(this.arrayFrames[this.currentFrame], 0, 0);
				}
			}
		}
		let startLoad = () => {
			for (let i = 0; i < this.countFrames; i++) {
				const img = new Image();
				img.src = this.getPathFrame(i);
				img.onload = () => loaded(i, img);
				img.onerror = () => {
					const reImg = new Image();
					reImg.src = this.getPathFrame(i);
					reImg.onload = () => loaded(i, reImg);
				};
			}
		}
		if (this.webp) {
			this.isWebpSupported().then(res => {
				startLoad();
			});
		} else {
			startLoad();
		}
	}

	start = (indexFrame) => {
		if (this.animation === true) return false;
		this.eventStart();
		this.animation = true;
		this.setCurrentFrame(indexFrame ? indexFrame : this.startFrame);
		if (this.fps > 0) {
			this.fpsInterval = 1000 / this.fps;
			this.then = Date.now();
			this.startTime = this.then;
		}
		this.looping();
		return true;
	}

	pause = () => {
		if (this.animation === false) return false;
		this.eventPause();
		this.animation = false;
		return true;
	}

	play = () => {
		if (this.animation === true) return false;
		this.eventPlay();
		this.animation = true;
		this.looping();
		return true;
	}

	stop = (indexFrame) => {
		if (this.animation === false) return false;
		this.eventStop();
		window.cancelAnimationFrame(this.requestId);
		this.animation = false;
		this.requestId = 0;
		this.setCurrentFrame(indexFrame ? indexFrame : this.startFrame);
		return true;
	}

	restart = (indexFrame) => {
		this.eventRestart(); // Вызываем событие
		this.setCurrentFrame(indexFrame ? indexFrame : this.startFrame);
		if (this.animation !== true) {
			this.animation = true;
			this.looping();
		}
		return true;
	}

	render = (callback) => {
		if (this.animation === true) {
			this.context.clearRect(0, 0, this.width, this.height);
			this.context.drawImage(this.arrayFrames[this.currentFrame], this.sx, this.sy, this.widthFrames, this.heightFrames, this.x, this.y, this.width, this.height);
			callback();
		}
	}

	looping = () => {
		if (this.animation === true) {
			this.render(() => {
				this.requestId = window.requestAnimationFrame(this.looping);
			});
			if (this.fps > 0) {
				this.now = Date.now();
				this.elapsed = this.now - this.then;
				if (this.elapsed > this.fpsInterval) {
					this.then = this.now - (this.elapsed % this.fpsInterval);
					this.animate();
				}
			} else {
				this.animate();
			}
		}
	}

	animate = () => {
		if (this.currentFrame < this.countFrames - 1) {
			this.currentFrame = this.currentFrame + 1;
			this.eventUpdate();
		} else if (this.loop) {
			this.currentFrame = 0;
			this.eventLooped();
			this.eventUpdate();
		} else {
			this.stop();
		}
	}

	setStartFrame = (indexFrame) => {
		this.startFrame = indexFrame;
		return true;
	}

	getStartFrame = () => {
		return this.startFrame;
	}

	setLoop = (isLoop) => {
		this.loop = isLoop;
		return true;
	}

	getLoop = () => {
		return this.loop;
	}

	setFPS = (num) => {
		this.fps = num;
		return true;
	}

	getFPS = () => {
		return this.fps;
	}

	setSizesCanvas = (width, height) => {
		this.width = width;
		this.height = height;
		this.canvas.setAttribute('width', width);
		this.canvas.setAttribute('height', height);
		return true;
	}

	getSizesCanvas = () => {
		return [this.width, this.height];
	}

	setSizesFrames = (width, height) => {
		this.widthFrames = width;
		this.heightFrames = height;
		return true;
	}

	getSizesFrames = () => {
		return [this.widthFrames, this.heightFrames];
	}

	setCurrentFrame = (indexFrame) => {
		this.currentFrame = indexFrame;
		return true;
	}

	getCurrentFrame = () => {
		return this.currentFrame;
	}

	on = (method, callback) => {
		this.canvas.addEventListener(method, callback.bind(this));
	}

	eventInit = () => {
		this.canvas.dispatchEvent(new CustomEvent("init", {
			bubbles: true,
			detail: {}
		}));
	}

	eventLoad = () => {
		this.canvas.dispatchEvent(new CustomEvent("load", {
			bubbles: true,
			detail: {}
		}));
	}

	eventLoading = () => {
		this.canvas.dispatchEvent(new CustomEvent("loading", {
			bubbles: true,
			detail: {}
		}));
	}

	eventLoaded = () => {
		this.canvas.dispatchEvent(new CustomEvent("loaded", {
			bubbles: true,
			detail: {}
		}));
	}

	eventStart = () => {
		this.canvas.dispatchEvent(new CustomEvent("start", {
			bubbles: true,
			detail: {}
		}));
	}

	eventPause = () => {
		this.canvas.dispatchEvent(new CustomEvent("pause", {
			bubbles: true,
			detail: {}
		}));
	}

	eventPlay = () => {
		this.canvas.dispatchEvent(new CustomEvent("play", {
			bubbles: true,
			detail: {}
		}));
	}

	eventStop = () => {
		this.canvas.dispatchEvent(new CustomEvent("stop", {
			bubbles: true,
			detail: {}
		}));
	}

	eventRestart = () => {
		this.canvas.dispatchEvent(new CustomEvent("restart", {
			bubbles: true,
			detail: {}
		}));
	}

	eventUpdate = () => {
		this.canvas.dispatchEvent(new CustomEvent("update", {
			bubbles: true,
			detail: {}
		}));
	}

	eventLooped = () => {
		this.canvas.dispatchEvent(new CustomEvent("looped", {
			bubbles: true,
			detail: {}
		}));
	}

	errorRequired = (text) => {
		console.error('Required parameter is not specified: ', text);
		return false;
	}

	isWebpSupported = () => {
		let promise = new Promise( (resolve, reject) => {
			const img = new Image();
			img.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
			img.onload = img.onerror = function () {
				resolve(img.height === 2 ? true : false);
			}
		});
		return promise.then(value => this.webp = value);
	}

	getPathFrame = (indexFrame) => {
		return `${this.pathFrames + this.nameFrames + indexFrame.toString().padStart(this.padFrames, '0')}.${ (this.webp === true) ? 'webp' : this.formatFrames}`;
	}

	checkLoaded = () => {
		return (this.getLoadingPercent() === 100) ? true : false;
	}

	getLoadingPercent = () => {
		return parseInt(this.loadedFrames / (this.countFrames / 100));
	}

	loadedOneFrame = () => {
		this.loadedFrames++;
	}

}
