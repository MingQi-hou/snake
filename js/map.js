//地图类 2个参数
function Map (row,col,width,height) {
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	this.arr = [];
	this.dom = document.createElement("div");
}

Map.prototype.fill = function () {

	for(var i = 0 ;i < this.row; i ++) {
		// 先创建每一行
		var row_dom = document.createElement("div");
		// 创建一个数组 便于获取每一个方格
		var row_arr = [];
		// 给每一行添加一个类名 便于设置样式
		row_dom.className = "row";
	
		for(var j = 0 ; j < this.col; j ++)  {
			// 创建每一个小方格
			var col_dom = document.createElement("span");
			// 把小方格添加到每一行里面
			row_dom.appendChild(col_dom);
			// 把所有的小方格添加到行的数组里面
			row_arr.push(col_dom);
			// 给每一行添加一个类名 便于设置样式
			col_dom.className = "grid";
			
		}
		// 把每一行放到大盒子中
		this.dom.appendChild(row_dom);
		// 将row——arr放到this.arr
		this.arr.push(row_arr);
		this.dom.className = "box";

	}

	// 上树
	document.body.appendChild(this.dom);
}

// 清屏
Map.prototype.clean = function () {

	for(var i = 0;i < this.arr.length; i ++) {
		for(var j = 0;j < this.arr[i].length;j ++) {
			this.arr[i][j].style.backgroundImage = "none";
		}
	}
}