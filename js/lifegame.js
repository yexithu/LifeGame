/* eslint-env browser*/
/* global createLifeGame */
/* exported createLifeGame */
window.createLifeGame = function () {
	return {
		width: 100,

		height: 100,

		density: 0.5,

		gridSize: 3,

		cells: [],

		countMap: [],

		NUMLIVE: 3,

		NUMSTAY: 2,

		init: function () {
			this.cells = new Array(this.height);
			this.countMap = new Array(this.height);
			var i, j;
			for (i = 0; i < this.height; ++i) {
				this.cells[i] = new Array(this.width);
				this.countMap[i] = new Array(this.width);
				for (j = 0; j < this.width; ++j) {
					this.cells[i][j] = 0;
					this.countMap[i][j] = 0;
				}
			}
			this.initStatus();
		},

		initStatus: function () {
			var count, randI, randJ, wanted;
			wanted = Math.floor(this.width * this.height * this.density);
			count = 0;
			while (count < wanted) {
				randI = this.randInt(this.height);
				randJ = this.randInt(this.width);
				if (this.cells[randI][randJ] === 0) {
					this.cells[randI][randJ] = 1;
					count += 1;
				}
			}
		},

		setArgs: function (args) {
			if (args.width) {
				this.width = args.width;
			}
			if (args.height) {
				this.height = args.height;
			}
			if (args.density) {
				this.density = args.density;
			}
			if (args.cells) {
				this.cells = args.cells.slice();
			}
		},

		updateCount: function () {
			var h, w;
			h = this.height;
			w = this.width;
			var that = this;

			var _i = function (a) {
				if (a < 0) {
					return a + h;
				}
				if (a >= h) {
					return a - h;
				}

				return a;
			};

			var _j = function (b) {
				if (b < 0) {
					return b + w;
				}
				if (b >= w) {
					return b - w;
				}

				return b;
			};

			var _countArround = function (m, n) {
				var x, y;
				var count = 0;
				for (x = m - 1; x <= m + 1; ++x) {
					for (y = n - 1; y <= n + 1; ++y) {
						count += that.cells[_i(x)][_j(y)];
					}
				}
				count -= that.cells[m][n];

				return count;
			};

			var i, j;
			for (i = 0; i < this.height; ++i) {
				for (j = 0; j < this.width; ++j) {
					this.countMap[i][j] = _countArround(i, j);
				}
			}
		},

		updateStatus: function () {
			var that = this;
			var _changeStatus = function (m, n) {
				if (that.countMap[m][n] === that.NUMSTAY) {
					return that.cells[m][n];
				} else if (that.countMap[m][n] === that.NUMLIVE) {
					return 1;
				} else {
					return 0;
				}
			};
			var i, j;
			for (i = 0; i < this.height; ++i) {
				for (j = 0; j < this.width; ++j) {
					this.cells[i][j] = _changeStatus(i, j);
				}
			}
		},

		update: function () {
			this.updateCount();
			this.updateStatus();
		},

		randInt: function (maxInt) {
			return Math.floor(Math.random() * maxInt);
		},
	};
};