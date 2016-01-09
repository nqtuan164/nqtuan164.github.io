/*
 * Hard Mode Views
 */

define([
	'jquery',
	'underscore',
 	'backbone',
 	'models/hard-mode',
 	'text!templates/hard-mode.html'
], function ($, _, Backbone, HardMode, HardModeTemplate) {
	var HardModeView = Backbone.View.extend({
		el: '#container',
		second: 60,
		interval: null, 
		number: 0,
		chooseArr: [],
		temporary: 0,
		mode: null,
		cells: null,
		cover: '.hover',
		isSuccess: false,
		isFlag: false;
		render: function() {
			this.mode = new HardMode();
			
            this.cells = this.mode.renderList();
            console.log(this.cells);
			this.$el.html(_.template(HardModeTemplate, {cells: this.cells}));
			$(this.cover).fadeIn('slow');

			$(".cell").on('click', _.bind(this.choose, this));
			$(".btn-facebook").on('click', _.bind(this.shareFacebook, this));
		},
		events: {
			'click .btn-control' : 'playGame'
		},
		playGame: function() {
			var role = $(".btn-control").attr("role");
			if( role == "start") {
				this.start();
				this.giveNumber();
				$(".hover").fadeOut('fast');
				$(".btn-control").html("Pause!").attr("role", "pause");
			} else if (role == "pause") {
				this.stop();
				$(".hover .text").html("Pausing...")
				$(".hover").fadeIn('slow');
				$(".btn-control").html("Resume!").attr("role", "resume");
			} else if (role == "resume") {
				this.start();
				$(".hover").fadeOut('fast');
				$(".btn-control").html("Pause!").attr("role", "pause");
			} else if (role == "restart") {
				this.second = 60;
				this.isSuccess = false;
				this.render();
				this.giveNumber();
				$(".result-hover").fadeOut('fast');
				$(".btn-control").html("Start!").attr("role", "start");
			}
		},
		giveNumber: function() {
			
			var count = _.random(1, 3);
			var arr_i = _.sample(this.cells, count);
			var sum = 0;
			
			_.each(arr_i, function(cell) {
				sum = sum + cell.value;
			});

			if (sum > 21) {
				this.giveNumber();
			}

			if (this.number !== sum) {
				$(".number").html(sum);
				this.number = sum;
			} else {
				this.giveNumber();
			}
			
		},
		choose: function(ev) {
			//console.log(ev.target.id);
			
			//Lấy giá trị id của ô số vừa được chọn
			var id = "#" + ev.target.id;
			//Lấy giá trị thức tự của ô số vừa được chọn
			var idx = $(id).attr('data-index');
			
			//Kiểm tra phần tử có đã được chọn, nếu không:
			if(_.contains(this.chooseArr, idx) == false || this.isFlag == false) {
				
				//thêm id của phần tử vào chooseArr
				this.chooseArr.push(idx);
				$(id).addClass('cell-checked');
				this.temporary += parseInt($(id).attr('data-value'));
				//console.log(this.temporary);

				this.isFlag = this.check();
			}
		},
		//Hàm kiểm tra những phần tử đã check với kết quả yêu cầu
		check: function() {
			if(this.temporary > this.number) {
				for(var i = 0; i < _.size(this.chooseArr); i++) {
					var id = this.chooseArr[i];
					$('#cell-' + id).removeClass('cell-checked');
				}
				this.temporary = 0;
				this.chooseArr = [];
				
				this.giveNumber();
				return false;
			} else if (this.temporary == this.number) {

				for(var i = 0; i < _.size(this.chooseArr); i++) {
					var id = this.chooseArr[i];
					var idx = -1;
					for(var j = 0; j < _.size(this.cells); j++) {
						if(this.cells[j].id == id) {
							idx = j;
							break;
						}
					}
					this.cells.splice(idx, 1);
					$('#cell-' + id).addClass('cell-hidden').removeClass('cell-checked');
				}
				
				//console.log(this.cells);
				if(_.size(this.cells) == 0) {
					this.checkResult();
				}


				this.temporary = 0;
				this.chooseArr = [];
				
				this.giveNumber();
				return true;
			}
			return false;

		},
		checkResult: function() {
			this.stop();
			$(".cell").off('click');
			console.log("check result");
			if(_.size(this.cells) == 0) {
				$(".result-hover-win").fadeIn("slow");
				$(".btn-control").html("Start again!").attr("role", "restart");
			} else {
				$(".result-hover-fail").fadeIn("slow");
				$(".btn-control").html("Start again!").attr("role", "restart");
			}
			
		}, 
		start: function() {
			var that = this;
			this.interval = setInterval(function() {
				that.second = that.second - 1;
				$('.countdown').html(that.second);

				if (that.second == 10) {
					$('.countdown').addClass('countdown-red');
				}
				if(that.second == 0) {
					that.checkResult();
				}

			}, 1000);
		}, 
		stop: function() {
			clearInterval(this.interval);
		},
		shareFacebook: function() {
			if(this.isSuccess == true) {
				var sec = 60 - this.second;
				FB.getLoginStatus(function(response) {
					FB.ui({
						method: 'feed',
						name: '60 Seconds',
						link: 'http://nqtuan164.github.io/60s/',
						picture: 'http://nqtuan164.github.io/60s/img/up.png',
						caption: 'You won!',
						description: 'You finished the Hard mode in ' + sec + ' seconds. You\'re the superman!'
					}, function(response) {
						if (response && response.post_id) {
							alert('Post was published.');
						} else {
							alert('Post was not published.');
						}
					});
				});
			} else {
				FB.getLoginStatus(function(response) {
					FB.ui({
						method: 'feed',
						name: '60 Seconds',
						link: 'http://nqtuan164.github.io/60s/',
						picture: 'http://nqtuan164.github.io/60s/img/down.png',
						caption: 'You failed!',
						description: 'Sorry, you failed. Try again!'
					}, function(response) {
						if (response && response.post_id) {
							alert('Post was published.');
						} else {
							alert('Post was not published.');
						}
					});
				});
			}
		}
	});
	return HardModeView;
})