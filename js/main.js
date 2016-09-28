/* eslint-env browser*/
/* eslint-env jquery*/
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

	init: function () {
		this.canvas = document.getElementById("canvas");
		this.context = this.canvas.getContext("2d");
		this.initControl();
	},

	initControl: function () {
		var that = this;
		$("#refresh").click(that.onRefresh);
	},

	start: function () {
		this.lifeGame = window.createLifeGame();
		this.lifeGame.setArgs({
								width: Game.width,
								height: Game.height,
								density: Game.density
							});
		this.lifeGame.init();
		this.canvas.width = this.gridSize * this.lifeGame.width;
		this.canvas.height = this.gridSize * this.lifeGame.height;
	},

	paintGrids: function () {
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

	paintCells: function () {
		var lg = this.lifeGame;
		var l = this.gridSize;
		var lw = this.lineWidth;
		var i, j;
		for (i = 0; i < lg.height; ++i) {
			for (j = 0; j < lg.width; ++j) {
				// this.context.fillStyle = lg.cells[i][j] === 1 ?
				// this.ALIVECOLOR : this.DEADCOLOR;
				if (lg.cells[i][j] === 1) {
					this.context.fillStyle = this.ALIVECOLOR;
				} else {
					this.context.fillStyle = this.DEADCOLOR;
				}
				this.context.fillRect(l * j + lw, l * i + lw,
					l - 2 * lw, l - 2 * lw);
			}
		}
	},

	updateArgs: function () {
		var height = parseInt($("#height").val());
		var width = parseInt($("#width").val());
		var density = parseFloat($("#density").val());
		var framerate = parseInt($("#framerate").val());
		if (height <= 200 && height >= 5) {
			Game.height = height;
		}
		var maxWidth = Math.floor($(document).width() / this.gridSize);
		if (width <= maxWidth && width >= 5) {
			Game.width = width;
		}
		if (density >= 0 && density <= 1) {
			Game.density = density;
		}
		if (framerate >= 1 && framerate <= 20) {
			Game.framerate = Math.floor(framerate);
		}
	},

	onRefresh: function () {
		clearTimeout(Game.nextTimerID);
		Game.updateArgs();
		Game.act();
	},

	updateLoop: function () {
		Game.lifeGame.update();
		Game.paintCells();
		Game.nextTimerID = setTimeout(Game.updateLoop, 1000 / Game.framerate);
	},

	act: function () {
		Game.start();
		$("#height").val(Game.height);
		$("#width").val(Game.width);
		$("#wdensity").val(Game.density);
		$("#framerate").val(Game.framerate);
		Game.paintGrids();
		Game.paintCells();
		Game.nextTimerID = setTimeout(Game.updateLoop, 1000 / Game.framerate);
	}
};

Game.init();
Game.act();