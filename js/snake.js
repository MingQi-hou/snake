
function Snake (snake_obj) {
	this.arr = [
	{row: 4,col: 4},
	{row: 4,col: 5},
	{row: 4,col: 6},
	{row: 4,col: 7},
	{row: 4,col: 8}
	];
	this.direction = 39;
	this.lock = true;
	// 定义图片
	this.head_obj = snake_obj.head_obj;
	this.body_obj = snake_obj.body_obj;
	this.tail_obj = snake_obj.tail_obj;
	// 定义索引值
	this.head_idx = 2;
	this.tail_idx = 0;

}
// 蛇移动
Snake.prototype.move = function () {
	var newhead = {
		row:this.arr[this.arr.length - 1].row,
		col:this.arr[this.arr.length - 1].col,
	}
	// 根据蛇移动的方向添加蛇口的位置
	if(this.direction === 37) {
		newhead.col--;
	} else if (this.direction === 38) {
		newhead.row --;
	} else if (this.direction === 39) {
		newhead.col ++;
	} else if (this.direction === 40) {
		newhead.row ++;
	}
	this.arr.push(newhead);
	this.arr.shift();
	lock = true;

	var tail = this.arr[0];
	var pg = this.arr[1];
	if(tail.row === pg.row) {
		this.tail_idx = tail.col > pg.col ? 2 : 0;
	}else {
		this.tail_idx = tail.row > pg.row ? 3 : 1;
	}

}

// 蛇转向
Snake.prototype.change = function (direction) {
	// 判定用户传递的方向值是是否合法
	if(!lock) {
		return;
	}
	this.lock = false;
	var result = Math.abs(direction - this.direction);
	if(result === 2 || result === 0){
		return;
	}else {
		this.direction = direction;
	}

	// change的时候改变头部索引
	if (direction === 37) {
		this.head_idx = 0;
	} else if (direction === 38) {
		this.head_idx = 1;
	} else if (direction === 39) {
		this.head_idx = 2;
	} else {
		this.head_idx = 3;
	}
}

// 蛇生长
Snake.prototype.growup = function () {
	// 吃到food后在尾部添加一个
	var tail = this.arr[0];
	this.arr.unshift(tail);

}