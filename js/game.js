	// 下面是游戏控制部分的功能：
		(function () {
			// 游戏功能所需要的内容：食物，小蛇，地图
			function Game (map2, score2) {
				this.score = score2;
				// 对于某个单独的游戏控制器来说，小蛇和食物和地图都是单独的一个
				this.map = map2;
				this.food = new Food({map : map2}); // 设置一个Food的实例对象
				this.snake = new Snake({map : map2}); // 设置一个Snake的实例对象
			}
			// 设置游戏的初始化功能：
			Game.prototype.start = function () {
				// 1 绘制食物
				this.food.init();
				// 2 绘制小蛇
				this.snake.init();
				// 3 设置小蛇运动(持续的运动效果)
				this.snakeRun();
				// 4 设置按键操作，控制小蛇的运动方向
				this.changeDir();
			};
			// 设置小蛇的运动功能：
			Game.prototype.snakeRun = function () {
				var snake = this.snake; // 小蛇
				var food = this.food; // 食物
				var count = 0; // 用于记录吃到的食物个数
				var num = 0; // 用于记录当前分数
				var score = this.score; // 显示分数的结构

				var snakeHead = snake.body[snake.body.length - 1];
				var timer = setInterval(function () {
					// --- 后期添加：获取运动前的蛇尾坐标(旧的)
					var sheWeiX = snake.body[0].x;
					var sheWeiY = snake.body[0].y;

					// 调用小蛇的move()和init()
					snake.move(); // 改蛇坐标

					// 在小蛇的运动过程中可能会吃到食物
					//   判断方式：蛇头的坐标与食物的坐标相同
					//	 操作方式：1 生成新的食物 2 添加一个蛇身的位置
					if (food.x === snakeHead.x && food.y === snakeHead.y) {
						food.init();
						// 根据本次运动前的旧的蛇尾坐标，设置新的蛇尾坐标
						// 将这个新的坐标对象放入到body属性中
						snake.body.unshift({x : sheWeiX, y : sheWeiY, bgColor : 'orange'});

						// 分数功能：
						count++;
						if (count > 2) {
							score.innerText = '当前分数为：' + (num += 20);	
						} else {
							score.innerText = '当前分数为：' + (num += 10);
						}
						
					}


					// 检测是否游戏结束:
					//  1 撞墙游戏结束:需要检测蛇头与坐标边界的关系
					if (snakeHead.x < 0 || snakeHead.y < 0 || snakeHead.x > this.map.offsetWidth / food.width - 1 || snakeHead.y > this.map.offsetHeight / food.height - 1) {
						alert('游戏结束！');
						// 清除定时器
						clearInterval(timer);
						return;
					}
					// 2 撞到蛇身后游戏结束：通过观察我们发现只有除前四个蛇身以外的其他蛇身才可能被撞到
					for (var i = 0; i < snake.body.length - 4; i++) {
						// 检测蛇身的某个部分与蛇头坐标是否一致
						if (snake.body[i].x === snakeHead.x && snake.body[i].y === snakeHead.y) {
							alert('游戏结束！');
							// 清除定时器
							clearInterval(timer);
							return;
						}
					}

					snake.init(); // 画小蛇

				}, 100);
			};
			// 设置运动方向更改功能:

			
			Game.prototype.changeDir = function () {
				var flag = true; // 如果变量值为true，表示事件功能可以触发
				// 设置keydown事件，按下后立刻做出改变方向的操作
				var that = this;
				document.onkeydown = function (e) {
					// 按键的功能是否触发，取决于flag的值
					if (flag === false) {
						return;
					}
					// 如果代码可以往if后面执行，说明flag为true，可以修改flag为false，限制下一次执行
					flag = false;
					// 希望xxx毫秒后可以再次点击
					setTimeout(function () {
						// 设置flag为true，可以再次触发事件效果
						flag = true;
					}, 100);

					// 左37 上38 右39 下40 
					switch (true) {
						// 更改小蛇的运动方向为对应方向，同时检测，当前运动方向不能与点击的方向相反
						case e.keyCode === 37 && that.snake.dir !== 'right': 
							that.snake.dir = 'left';
							break;
						case e.keyCode === 38 && that.snake.dir !== 'down':
							that.snake.dir = 'up';
							break;
						case e.keyCode === 39 && that.snake.dir !== 'left':
							that.snake.dir = 'right';
							break;
						case e.keyCode === 40 && that.snake.dir !== 'up':
							that.snake.dir = 'down';
							break;
					}
				};
			};

			window.Game = Game;
		})();