jQuery(function() {
	//添加鼠标事件
	$(document).mousemove(function (e) {
		if (!!this.move) {
			var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
				callback = document.call_down || function () {
						$(this.move_target).css({
							'top': e.pageY - posix.y,
							'left': e.pageX - posix.x
						});
					};

			callback.call(this, e, posix);
		}
	})
	$(document).mouseup(function (e) {
		if (!!this.move) {
			var callback = document.call_up || function () {
				};
			callback.call(this, e);
			$.extend(this, {
				'move': false,
				'move_target': null,
				'call_down': false,
				'call_up': false
			});
		}
	});

	//插件制作
	$.fn.Edraw = function (options) {
		$(this).each(function () {
			//元素
			var element = this;

			//属性调整
			if(options.draw == undefined)
				options.draw = "draw";

			//拉伸按钮
			var btn = '<div class="'+options.draw+'" style="width: 10px; height: 10px; overflow: hidden; cursor: se-resize; position: absolute; right: 0; bottom: 0; background-color: #09C;"></div>';
			$(element).append(btn);

			//设置元素
			$(element).on('mousedown',"."+options.draw, function (e) {
				var posix = {
					'w': $(element).width(),
					'h': $(element).height(),
					'x': e.pageX,
					'y': e.pageY
				};

				$.extend(document, {
					'move': true, 'call_down': function (e) {
						//计算值
						var width = Math.max(30, e.pageX - posix.x + posix.w);
						var height = Math.max(30, e.pageY - posix.y + posix.h);

						//获取坐标
						var top = $(element).position().top;
						var left = $(element).position().left;


						//如果存在作用域
						if(typeof(options.scope) != "function"){
							$(element).closest(options.scope).each(function(){
								var panel_width = $(this).width();
								var panel_height = $(this).height();
								width = Math.min(panel_width - left,width);
								height = Math.min(panel_height - top,height);
							})
						}

						//改变css
						$(element).css({
							'width': width,
							'height': height
						});

						//事件:尺寸更变
						if(typeof(options.sizeChange) == "function") {
							options.sizeChange(element,width,height);
						}
					}
				});
			})
		})
	}
})