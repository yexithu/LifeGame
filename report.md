#LifeGame
叶曦　软件41  
2014013417

##实验环境
* OS: Windows 10
* NodeJs v 6.2.2
* mocha  v 3.0.2
* eslint v 3.5.0
* Chrome v 53.0

##作业要求
1. 独立完成生命游戏程序，使用JavaScript实现，注意源码质量。
2. 使用**mocha**进行单元测试

##地址
程序发布在Github  
[项目地址](https://github.com/yexithu/LifeGame)  
[游戏地址](https://yexithu.github.io/LifeGame/)  
[测试地址](https://yexithu.github.io/LifeGame/test.html)  

##程序实现
###程序运行示意
![](http://i.imgur.com/8H1rPBE.png)
###程序说明
**lifegame.js**中包含了游戏逻辑部分，其中比较重要的两个属性是`cells`和`countMap`：  
`cells`存储当前所有细胞的生死状态,**1**为生,**0**为死  
`countMap`缓存所有细胞周围**8**个细胞中活着细胞的数量  
**main.js**中包含了游戏绘图和控制逻辑  
###流程
1. 游戏开始
2. **LifeGame**初始化，初始化细胞状态，以及细胞周围活细胞数量两个**map**空间
3. 每经过一定的时间间隔，游戏将更新状态  
	1. 遍历所有细胞，计算其周围**8**个细胞中活着的数量，将其缓存到`countMap`中
	2. 根据`countMap`中的值和细胞现在的状态，更新细胞状态
4.图像重绘
###控制
可以通过输入框调整[高度]、[宽度]、[密度]、[帧率]通过[Refresh]按钮刷新

##单元测试
###测试环境
* mocha  v 3.0.2
* Chrome v 53.0
###测试方案
按照**BDD**方式设计测试方案，测试代码在**lifegame_test.js**中  
一共有**7**组测试
####Basic test
#####Should be an Object
	var LifeGame = window.createLifeGame();
	assert.isObject(LifeGame);
测试获取的`LifeGame`是需要的对象
####Test args set
	var LifeGame = window.createLifeGame();
	var args = ...
	LifeGame.setArgs(args);
	it('LifeGame members should be the same with args', function() {
		assert(LifeGame.height === args.height);
		assert(LifeGame.width === args.width);
		assert.deepEqual(LifeGame.cells, args.cells);
	});
游戏中需要可以**UI**中为其输入参数，同时测试中也需要给**LifeGame**指定测试用例，故利用该测试测试**LifeGame**设置参数接口准确性
####Test init part
这一系列测试为了测试**LifeGame**的初始化工作
#####cells should be a matrix
测试`cell`初始化的正确性，向**LifeGame**中输入参数,调用`init`函数，希望得到**m** X **n**大小的矩阵
#####all random numbers should be in boundary
	var maxInt = 10;
	var randNum;
	for (i = 0; i < 100; ++i) {
		randNum = LifeGame.randInt(maxInt);
		assert(randNum >= 0 && randNum < maxInt);
	}
初始化过程中需要使用随机数,**JS**标准函数没有产生一定范围整数随机数的函数，于是我在**LifeGame**中自己实现了一个，该测试利用自己实现的函数生成**100**个**[0,9]**的随机数，检验是否都在范围内。
#####cells should contain p% alive cells at the beginning
	var wanted = Math.floor(args.height * args.width * args.density);
	var count = 0;	
	for (var i in LifeGame.cells) {
		for (var j in LifeGame.cells[i]) {
			if (LifeGame.cells[i][j] === 1) {
				count = count + 1;
			}
		}				
	}
	assert(wanted === count);
初始化过程中，我们希望能设置最开始的活细胞密度**p**，使得**p%**的随机细胞(数量为`wanted`）是活，该测试统计初始化后活细胞的数量，检验是否符合要求
####Test update part
该系列测试测试游戏逻辑更新部分，包括更新`countMap`和更新`cell`
#####测试用例构造
我精心构造了一组测试数据

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
`input`是初始状态，`expectedMap`是`input`状态下每个细胞周围的活细胞数量，`expectedStatus`是更新后的状态。  
这组数据是经过设计的。根据要求，每个细胞周围活细胞数目状态有如下**3**种  
1. 数目**2**, 保持原来状态  
2. 数目**3**, 一定活  
3. 其他数目，一定死  
同时考虑到最容易出错的边缘位置，细胞位置有两种情况  
1. 边  
2. 角  
3. 内部   
所以在计算细胞周围活细胞数目时，考虑到**3**X**3**=**9**种情况即可，见`expectedMap`，测试用例在`边`，`角`，`内部`均出现了活细胞数目为`2`和`3`和`其他`情况，覆盖了可能的用例。  
同时，见`input`和`expectedStatus`对比，在外围和内部均有  
1. 活细胞转死  
2. 活细胞保持  
3. 死细胞转活  
4. 死细胞保持    
这四种情况，可见改组测试样例覆盖全面，可以验证程序的正确性。
#####test correctness of countMap
将运行结果和`expectedMap`对比，测试周围活细胞数量的计算是否正确
#####test correctness of status
将运行结果和`expectedStatus`对比，测试状态转换是否正确

####测试结果
可知测试全部通过

![](http://i.imgur.com/z2CEMDe.jpg)

###代码风格
代码风格通过**eslint**严格测试，测试没有出现`problem`和`error`


##实验体会
单元测试很关键，可以帮助理清程序思路，感觉使用BDD开发过程很流畅，总能找到bug在哪
