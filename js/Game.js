// 游戏类
function Game (map,block,food,snake) {
	this.map = map;
	this.block = block;
	this.food = food;
	this.snake = snake;
	this.timer = null;
	this.flag = true;
	this.init();
}
Game.prototype.init = function () {
	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.renderblock();
	this.start();
	this.bindEvent();


}
 // 地图
Game.prototype.renderMap = function () {
	this.map.fill();
}


// 食物
Game.prototype.renderFood = function () {
	var row = this.food.row;
	var col = this.food.col;
	this.map.arr[row][col].style.backgroundImage = "url("+ this.food.img +")";
	this.map.arr[row][col].style.backgroundSize = "cover";
}

//渲染蛇
Game.prototype.renderSnake = function () {
	// 定义蛇头图片
	var head = this.snake.arr[this.snake.arr.length -1];
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_obj[this.snake.head_idx]+")"
	for(var i = 1;i < this.snake.arr.length -1; i ++) {
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = "url("+ this.snake.body_obj[0]+")";
	}

	// 定义蛇头图片
	var tail = this.snake.arr[0];
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_obj[this.snake.tail_idx]+")"
}

// 游戏开始（开启定时器）

Game.prototype.start = function() {
	this.flag = true;
	var me = this;
	this.timer = setInterval(function() {
		
		// 蛇移动
		me.snake.move();
		// 是否撞墙
		me.checkMap();
		me.checkFood();
		me.checkblock();
		// 判断蛇是否在运动();，运动才渲染以下；蛇没运动还在渲染的话会让蛇减短
		if(me.flag) {
			// 先清屏
			me.map.clean();
			// 渲染食物
			me.renderFood();
			// 渲染蛇
			me.renderSnake();
			me.renderblock();
		}
		
	},200)
}

// 绑定事件
Game.prototype.bindEvent = function () {
	var me = this;
	document.onkeydown = function (e) {
		// 获取用户按下的方向键
		var code = e.keyCode;
		if(code === 37 || code === 38 || code === 39 ||code === 40 ) {
			// 改变它的方向
			me.snake.change(code);
		}

	}
}
// 游戏结束
Game.prototype.Gameover = function () {
	this.flag = false;
	clearInterval(this.timer);
}


// 设置边界，一旦蛇的头部到达边界就停下来
Game.prototype.checkMap = function () {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length -1];
	// 与地图中的row跟col进行判断
	if(head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
		console.log("哎呀，撞死了")
		// 蛇撞死了，那么游戏就结束了
		this.Gameover();

	}
}

// 检测蛇是否吃到食物（蛇头的row跟col 跟food的重合
Game.prototype.checkFood = function () {
	// 获取蛇头
	var head = this.snake.arr[this.snake.arr.length- 1];
	// 检测蛇头的row跟col 跟food的重合
	if(head.row === this.food.row && head.col === this.food.col) {
		console.log("吃到食物了");
		// 吃到食物后，蛇长大
		this.snake.growup();
		// 食物
		this.resetFood();
	}
}

//重合后食物原消失后新的随机消失
Game.prototype.resetFood = function () {
	// 随机生成row 和col
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);
	// 判断这个row跟col有没有跟蛇的每一节身体重合
	for(var i = 0 ; i < this.snake.arr.length; i ++) {
		// 调出蛇的某一节
		var one = this.snake.arr[i];
		if(one.row === row && one.col === col) {
			alert("重合到蛇身上了");
			this.resetFood();
			return;

		}
	}

	// 判断这个row跟col有没有跟障碍物的每一节身体重合
	for(var i = 0 ; i < this.block.arr.length; i ++) {
		// 调出蛇的某一节
		var one = this.block.arr[i];
		if(one.row === row && one.col === col) {
			alert("重合到障碍物身上了");
			this.resetFood();
			return;

		}
	}
	this.food.resetFood(row,col);
}

// 检测蛇是否吃到自己
Game.prototype.checkSnake = function () {
	var head = this.snake.arr[this.snake.arr.length- 1];
	for(var i = 0;i < this.snake.arr.length-1;i ++) {
		// 获取蛇身体的某一节
		var one = this.snake.arr[i];
		if(head.row === one.row && head.col === one.col) {
			alert("你真笨，吃到自己啦");
			this.Gameover();
		}
	}
}

// 障碍物
Game.prototype.renderblock = function () {
	for(var i = 1;i < this.block.arr.length; i ++) {
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = "url("+ this.block.img+")";
		this.map.arr[row][col].style.backgroundSize = "cover";
	}
}

// 检测蛇是否撞到墙
Game.prototype.checkblock = function () {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length -1];
	// 与障碍物中的row跟col进行判断
	for(var i = 0;i < this.block.arr.length;i ++) {
		// 获取蛇身体的某一节
		var one = this.block.arr[i];
		if(head.row === one.row && head.col === one.col) {
			alert("你真笨，撞到墙啦");
			this.Gameover();
		}
	}
}