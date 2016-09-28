var Game = {
	lifeGame: null,

	gridSize: 10,

	canvas: null,

	context: null,

	lineWidth: 1,

	ALIVECOLOR: "#000000",

	DEADCOLOR: "#FFFFFF",

	height: 100,

	width: 100,

	density: 0.5,

	framerate: 10,

	nextTimerID: null,

	init: function() {
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext("2d");
		this.initControl();
	},

	initControl: function() {
		var obj = this;
		$('#refresh').click(obj.onRefresh);
	},

	start: function() {
		this.lifeGame = createLifeGame();
		this.lifeGame.setArgs({width: Game.width, height: Game.height, density: Game.density});
		this.lifeGame.init();
		this.canvas.width = (this.gridSize * this.lifeGame.width);
		this.canvas.height = (this.gridSize * this.lifeGame.height);
	},

	paintGrids: function() {
		this.context.strokeStyle = "#C0C0C0";
		this.context.lineWidth = this.lineWidth;
		var s = this.gridSize;
		var i, j;
		for (i = 0; i < this.lifeGame.height; ++i) {
			for (j = 0; j < this.lifeGame.width; ++j) {
				this.context.strokeRect(s * j, s * i, s, s);
			}
		}
	},

	paintCells: function() {
		var lg = this.lifeGame;
		var l = this.gridSize;
		var lw = this.lineWidth;
		var i, j;
		for (i = 0; i < lg.height; ++i) {
			for (j = 0; j < lg.width; ++j) {
				this.context.fillStyle = (lg.cells[i][j] === 1) ?
					this.ALIVECOLOR : this.DEADCOLOR;
				this.context.fillRect(l * j + lw, l * i + lw, l - 2 * lw, l - 2 * lw);
			}
		}
	},

	updateArgs: function() {
		var height = parseInt($('#height').val());
		var width = parseInt($('#width').val());
		var density = parseFloat($('#wdensity').val());
		var framerate = parseInt($('#framerate').val());
		if (height <= 200 && height >= 5) {
			this.height = height;
		}
		var maxWidth = Math.floor($(document).width()/ this.gridSize);
		if (width <= maxWidth && width >= 5) {
			this.width = width;
		}
		if (density >= 0 && density <= 1) {
			this.density = density;
		}
		if (framerate >= 1 && framerate <= 20) {
			this.framerate = Math.floor(framerate);
		}
	},

	onRefresh: function() {
		clearTimeout(Game.nextTimerID);
		Game.updateArgs();	
		Game.act();
	},

	updateLoop: function() {
		Game.lifeGame.update();
		Game.paintCells();
		Game.nextTimerID = setTimeout(Game.updateLoop, 1000 / this.framerate);
	},

	act: function() {
		Game.start();
		console.log('HAHA');
		$('#height').val(this.height);
		$('#width').val(this.width);
		$('#wdensity').val(this.density);
		$('#framerate').val(this.framerate);
		Game.paintGrids();
		Game.updateLoop();
	}
}

Game.init();
Game.act();