// food: 定位
function  Food(x,y,img) {
	this.row = x;
	this.col = y;
	this.img = img;
}

// food被吃到后重置
Food.prototype.resetFood = function (row, col) {
	this.row = row;
	this.col = col;
}