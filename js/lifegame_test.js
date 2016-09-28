describe('LifeGame', function() {
	it('should be a Object', function() {
		var LifeGame = createLifeGame();
		assert.isObject(LifeGame);
	});

	context('Test args set', function() {
		var LifeGame = createLifeGame();
		var args = {
			height: 3,
			width: 3,
			cells: [
				[1, 0, 0],
				[0, 1, 0],
				[0, 0, 1]
			]
		};
		LifeGame.setArgs(args);
		it('LifeGame members should be the same with args', function() {
			assert(LifeGame.height === args.height);
			assert(LifeGame.width === args.width);
			assert.deepEqual(LifeGame.cells, args.cells);
		});
	});

	context('Test init part', function() {
		var LifeGame = createLifeGame();
		var i;
		var args = {
			height: 50,
			width: 100,
			density: 0.6
		}
		LifeGame.setArgs(args);
		LifeGame.init();
		it('cells should be a m*n matrix', function() {
			assert.isArray(LifeGame.cells);
			assert.lengthOf(LifeGame.cells, args.height);
			LifeGame.cells.forEach(function(e) {
				assert.isArray(e);
				assert.lengthOf(e, args.width);
			});
		});

		it('all random numbers should be in boundary', function () {
			var maxInt = 10;
			var randNum;
			for (i = 0; i < 100; ++i) {
				randNum = LifeGame.randInt(maxInt);
				assert(randNum >= 0 && randNum < maxInt);
			}
		});

		it('cells should contain p% alive cells at the beginning', function () {
			var wanted = Math.floor(args.height * args.width * args.density);
			var count = 0;
			var lineStr = '';
			for (var i in LifeGame.cells) {
				for (var j in LifeGame.cells[i]) {
					if (LifeGame.cells[i][j] === 1) {
						count = count + 1;
					}
				}				
			}
			assert(wanted === count);
		});
	});
	
	context('Test update part', function () {
		var LifeGame = createLifeGame();
		var input = [
			[1, 0, 1, 0, 1],
			[0, 1, 0, 0, 0],
			[0, 0, 1, 1, 0],
			[1, 0, 0, 0, 0],
			[0, 0, 1, 0, 1]		
		];

		var expectedMap = [
			[3, 4, 2, 4, 2],
			[3, 3, 4, 4, 3],
			[2, 3, 2, 1, 2],
			[1, 3, 3, 4, 3],
			[4, 4, 1, 4, 3]
		];

		var expectedStatus = [
			[1, 0, 1, 0, 1],
			[1, 1, 0, 0, 1],
			[0, 1, 1, 0, 0],
			[0, 1, 1, 0, 1],
			[0, 0, 0, 0, 1]	
		];
		LifeGame.setArgs({height: 5, width: 5, density: 0.5});
		LifeGame.init();
		LifeGame.setArgs({cells: input});
		LifeGame.update();	
		it('test correctness of countMap', function () {
			assert.deepEqual(LifeGame.countMap, expectedMap);
		});
		it('test correctness of status', function () {
			console.log(LifeGame.cells);
			assert.deepEqual(LifeGame.cells, expectedStatus);
		});
	});
	
});