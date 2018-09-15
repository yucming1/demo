		// 下面是小蛇部分的功能:
		(function () {
			// 功能分析：
			// 1 初始化小蛇的结构
			// 2 设置小蛇的运动功能

			function Snake (options) {
				// 需要的属性：宽、高、颜色、坐标、放置位置。
				this.width = options.width || 20;
				this.height = options.height || 20;
				// 初始化的时候，小蛇具有三个蛇身，并且蛇身的坐标以及颜色不同，需要分别设置
				this.body = [
					{x : 1, y : 1, bgColor : 'orange'},
					{x : 2, y : 1, bgColor : 'orange'},
					{x : 3, y : 1, bgColor : 'red'}
				];
				this.map = options.map;
				// 直接将elements属性设置为数组结构，防止第一次调用init出现报错
				this.elements = [];
				// --- 大后期添加：用于保存小蛇的运动方向，默认为向右运动
				this.dir = 'right';
			}
			// 设置初始化功能:
			Snake.prototype.init = function () {
				// --- 在绘制新的小蛇之前，先移除旧的小蛇结构
				for (var i = 0; i < this.elements.length; i++) {
					this.map.removeChild(this.elements[i]);
				}
				// --- 将已经从页面中移除的元素清空掉(从数组中清空)
				this.elements = [];

				// 根据this.body中的数据创建三个初始蛇身结构
				var body = this.body;
				for (var i = 0; i < body.length; i++) {
					var div = document.createElement('div');
					this.elements.push(div);
					// 设置样式：
					div.style.width = this.width + 'px';
					div.style.height = this.height + 'px';
					div.style.backgroundColor = body[i].bgColor;
					div.style.left = body[i].x * this.width + 'px';
					div.style.top = body[i].y * this.height + 'px';
					this.map.appendChild(div);
				}
			};
			// 设置小蛇的运动功能：(单步运动效果)
			Snake.prototype.move = function () {
				// 通过观察我们发现，除了蛇头以外，其余的蛇身均使用的是前面一个蛇身的上一次显示位置
				var body = this.body;
				for (var i = 0; i < body.length - 1; i++) {
					body[i].x = body[i + 1].x;
					body[i].y = body[i + 1].y;
				}

				// 设置蛇头坐标：默认向右运动
				// 根据小蛇的运动方向dir属性值，设置蛇头的运动方式
				switch (this.dir) {
					case 'right':
						body[body.length - 1].x++;
						break;
					case 'left':
						body[body.length - 1].x--;
						break;
					case 'up':
						body[body.length - 1].y--;
						break;
					case 'down':
						body[body.length - 1].y++;
						break;
				}
			};
			window.Snake = Snake;
		})();