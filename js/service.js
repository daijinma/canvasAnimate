"use strict";

cardAnimation
.service('imageLoader',function(){
	function imageLoader(arr,callback){
		var len = arr.length;
		var image = [];
		if(len == 0){
			callback(image);
		};
		for (var i = 0; i<len; i++) {
			var img = new Image();
	        img.src = arr[i];
	        (function(img){
	        	if(img.complete) {
		        	image[i] = img;
		            len--;
		            if(len == 0) {
		                callback(image);
		            }
		        }else{
		            img.onload = (function(j) {
		                return function() {
		                	image[j] = img;
		                    len--;
		                    if(len == 0) {
		                        callback(image);
		                    }
		                };
		            })(i);
		            img.onerror = function() {
		                len--;
		                console.log('fail to load image');
		            };
		        }
	        })(img)
	        
		};

	};
	return imageLoader;
})
.service('animateCanvas',['$interval',function($interval){
	var animateArr = [];
	var animate;
	var fps = 30;
	ctx.clearRect(0,0,window.width,window.height);
	return {
		"draw":function(arr){
			if(typeof arr == 'object'){
				animateArr = arr;
			}else if(typeof arr == 'number'){
				fps = arr
			}
			var drawAnimate = function(){
				ctx.clearRect(0,0,window.width,window.height);
				angular.forEach(animateArr,function(value,index){
					animateArr[index].draw();
				})

				ctx.fillStyle="#000";
			    ctx.fillText("time:"+ new Date().getTime(), 10, 15);	
			}

		    animate = $interval(function(){
				drawAnimate();
				//
			},1000/fps);
		},
		"add":function(obj){
			animateArr.push(obj);
		},
		"remove":function(obj){
			if(!obj) {return false};
			var narr = []
			angular.forEach(animateArr,function(value,index){
				if(animateArr[index] != obj){
					narr.push(animateArr[index]);
				};
			});
			animateArr = narr;
		}
		,
		"stop":function(){
			$interval.cancel(animate);
		}
	};
}])
.factory('realSize',function(){
	var size = {};
	var screenW = window.width;
	var screenH = window.height;
	var ratio = screenW/screenH;
	size.getSize = function(w,h){
		var ratioImg = w/h;
		var ralWidth,ralHeight,x,y;
		if(ratioImg > ratio){
			var ratioInside = h/screenH;
			ralWidth = screenW*ratioInside;
			ralHeight = h;
			x = (w-ralWidth)/2;
			y = 0;
		}else{
			var ratioInside = w/screenW;
			ralHeight = screenH*ratioInside;
			ralWidth = w;
			x = 0;
			y = (h-ralHeight)/2;
		};
		return {
			point:[x,y],
			ralWidth:ralWidth,
			ralHeight:ralHeight,
			ratioImg:(ratioImg > ratio)
		}
	}
	return size;
})