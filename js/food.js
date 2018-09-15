	// 下面是食物部分的功能：
		(function () {
			// 立即执行函数：用于将多个独立的功能部分分别保存。
			function Food (options) {
				this.width = options.width || 20;
				this.height = options.height || 20;
				this.bgColor = options.bgColor || 'green';
				this.map = options.map;
			}
			// 设置初始化结构的方法：
			Food.prototype.init = function () {
				if (this.element) {
					this.map.removeChild(this.element);
				}

				// 根据对应的属性，创建一个div放入到map中即可
				var div = document.createElement('div');
				this.element = div;
				div.style.width = this.width + 'px';
				div.style.height = this.height + 'px';
				div.style.backgroundColor = this.bgColor;
				this.map.appendChild(div);

				// 通过观察我们发现，每次创建元素后均需要随机位置，就可以在这个方法中进行调用
				this.randomPos();
			};
			// 计算随机的位置：
			Food.prototype.randomPos = function () {
				this.x = Math.floor(Math.random() * (this.map.offsetWidth / this.width));
				this.y = Math.floor(Math.random() * (this.map.offsetHeight / this.height));

				// 根据随机的坐标，计算出对应的left与top，设置给元素即可
				this.element.style.left = this.x * this.width + 'px';
				this.element.style.top = this.y * this.height + 'px';
			};

			// 由于本功能中的Food构造函数需要被外界访问
			window.Food = Food;
		})();