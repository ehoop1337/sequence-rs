class SequenceRS {
		
		#requestId = 0;
		#fps = null;
		#fpsInterval = null;
		#startTime = null;
		#now = null;
		#then = null;
		#elapsed = null;
		
		constructor(settings) {
			this.canvas = settings.canvas;
			this.context = this.canvas.getContext('2d');
			this.width = settings.width || 1920;
			this.height = settings.height || 950;
			this.frames = settings.frames;
			this.fps = settings.fps || 0;
			this.path = settings.path || '/';
			this.webp = settings.webp || false;
			this.browserIsWebpSupported = this.#isWebpSupported();
			this.format = settings.format || 'jpg';
			this.name = settings.name || '';
			this.pad = settings.pad || 5;
			this.arrayFrames = new Array();
			this.loadedFrames = 0;
			this.currentFrame = settings.startFrame || 0;
			this.upload = settings.upload || false;
			this.obsession = settings.obsession || false;
			this.start = settings.start || false;
			this.setSizes();
			if (this.upload) {
				this.load();
			}
			this.animation = false;
		}
		
		#isWebpSupported() {
			return new Promise((resolve,reject) => {
				const img = new Image();
				img.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
				img.onload = img.onerror = function () {
					resolve(img.height === 2 ? true : false);
				}
			});
		}
		
		#getPathFrame = (indexFrame) => {
			if (this.browserIsWebpSupported && this.webp) {
				return `${this.path + this.name + indexFrame.toString().padStart(5, "0")}.webp`;
			} else {
				return `${this.path + this.name + indexFrame.toString().padStart(5, "0")}.${this.format}`;
			}
		}
		
		getLoadingPercent = () => {
			return parseInt(this.loadedFrames / (this.frames / 100));
		}
		
		#loadedOneFrame = () => {
			this.loadedFrames++;
		}
		
		load = () => {
			for (let i = 0; i < this.frames; i++) {
				const img = new Image();
				img.src = this.#getPathFrame(i);
				img.onload = () => {
					this.#loadedOneFrame();
					this.arrayFrames[i] = img;
					if (i == this.currentFrame) {
						this.#renderCurrentFrame(i);
					}
					this.#checkLoaded();
				};
				img.onerror = () => {
					const reImg = new Image();
					reImg.src = this.#getPathFrame(i);
					reImg.onload = () => {
						this.#loadedOneFrame();
						this.arrayFrames[i] = reImg;
						if (i == this.currentFrame) {
							this.#renderCurrentFrame(i);
							this.#checkLoaded();
						}
					};
				};
			}
		}
		
		#checkLoaded = () => {
			if (this.getLoadingPercent() === 100) {
				this.#eventInit();
				if (this.start) {
					if (this.fps > 0) {
						this.playFPS();
					} else {
						this.play();
					}
				}
			}
		}
		
		getCurrentFrame = () => {
			return this.currentFrame;
		}
		
		setCurrentFrame = (index) => {
			if (index < this.frames && index >= 0) {
				this.currentFrame = index;
			}
		}
		
		setSizes = (width = this.width, height = this.height) => {
			this.canvas.setAttribute('width', width);
			this.canvas.setAttribute('height', height);
		}
		
		setFPS = (fps) => {
			this.fps = fps;
		}
		
		playFPS = () => {
			this.animation = true;
			this.#fpsInterval = 1000 / this.fps;
			this.#then = Date.now();
			this.#startTime = this.#then;
			this.#loop();
		}
		
		#loop = () => {
			if (this.animation === true) {
				this.play();
				if (this.fps > 0) {
					this.#now = Date.now();
					this.#elapsed = this.#now - this.#then;
					if (this.#elapsed > this.#fpsInterval) {
						this.#then = this.#now - (this.#elapsed % this.#fpsInterval);
						this.#logicAnimation();
					}
				} else {
					this.#logicAnimation();
				}
			}
		}
		
		#logicAnimation = () => {
			if (this.currentFrame < this.frames - 1) {
				this.currentFrame = this.currentFrame + 1;
			} else if (this.obsession) {
				this.currentFrame = 0;
			} else {
				this.stop();
			}
		}
		
		play = () => {
			this.animation = true;
			this.#render(() => {
				this.#requestId = window.requestAnimationFrame(this.#loop);
			});
		}
		
		stop = () => {
			if (this.#requestId > 0) {
			    window.cancelAnimationFrame(this.#requestId);
			    this.animation = false;
				this.#requestId = 0;
				return;
			}
		}
		
		#render = (callback) => {
			if (this.animation === true) {
				this.#eventUpdate();
				this.context.clearRect(0, 0, this.width, this.height);
				this.context.drawImage(this.arrayFrames[this.currentFrame], 0, 0);
				callback();
			}
		}
		
		#renderCurrentFrame = (index = null) => {
			this.context.clearRect(0, 0, this.width, this.height);
			if (index != null) {
				this.context.drawImage(this.arrayFrames[index], 0, 0);
			} else {
				this.context.drawImage(this.arrayFrames[this.currentFrame], 0, 0);
			}
		}
		
		setObsession = (bool) => {
			this.obsession = bool;
		}
		
		on = (method, callback) => {
			this.canvas.addEventListener(method, callback);
		}
		
		#eventUpdate = () => {
			this.canvas.dispatchEvent(new CustomEvent("update", {
				bubbles: true,
				detail: {
					canvas: this.canvas,
					context: this.context,
					width: this.width,
					height: this.height,
					frames: this.frames,
					arrayFrames: this.arrayFrames,
					currentFrame: this.currentFrame,
					animation: this.animation
				}
			}));
		}
		
		#eventInit = () => {
			this.canvas.dispatchEvent(new CustomEvent("init", {
				bubbles: true,
				detail: {
					canvas: this.canvas,
					context: this.context,
					width: this.width,
					height: this.height,
					frames: this.frames,
					fps: this.fps,
					path: this.path,
					webp: this.webp,
					browserIsWebpSupported: this.browserIsWebpSupported,
					format: this.format,
					name: this.name,
					pad: this.pad,
					arrayFrames: this.arrayFrames,
					loadedFrames: this.loadedFrames,
					currentFrame: this.currentFrame,
					upload: this.upload,
					obsession: this.obsession,
					start: this.start,
					animation: this.animation
				}
			}));
		}
		
	}
