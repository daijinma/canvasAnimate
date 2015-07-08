"use strict";

cardAnimation
.controller('cardCtrl',['$scope','imageLoader','animateCanvas','realSize',function($scope,imageLoader,animateCanvas,realSize){

	$scope.w = window.width;
	$scope.h = window.height;
	$scope.wpx = $scope.w+'px';
	$scope.hpx = $scope.h+'px';
	$scope.animateStatus = 0;
	$scope.fps = 30;
	$scope.imageArr = [
		'images/loading.png',
		'images/my-card-bg.jpg'
	];
	
	$scope.canvasStyle={
		"width":$scope.w,
		"height":$scope.h
	};

	imageLoader($scope.imageArr,function(imageArr){
		//绘制自适应背景图片，回避微信不能将背景图自适应大小问题。
		var fullBgSize = realSize.getSize(imageArr[1].width,imageArr[1].height);
		fullBg.getContext('2d').drawImage(
			imageArr[1],
			fullBgSize.point[0],
			fullBgSize.point[1],
			fullBgSize.ralWidth,
			fullBgSize.ralHeight,
			0,
			0,
			window.width,
			window.height
		);
		
		//定义loading 帧动画
		var loading = {
		  x: 0,
		  y: 0,
		  width: 640,
		  height: 1136,
		  image:imageArr[0],
		  count:0,
		  size:realSize.getSize(640,1136),
		  draw: function() {
		    if(this.count == 20){
		    	animateCanvas.add(walkOff);
		    }
			var left = this.width*this.count+this.size.point[0];
			var top = this.size.point[1];
			ctx.drawImage(this.image,left,top,this.size.ralWidth,this.size.ralHeight,0,0,window.width, window.height);
			if(this.count == 27){
		    	this.count = 0;
		    }else{
		    	this.count++;
		    }
			
		  }
		};

		var walkOff = {
		  x: window.width,
		  y: window.height,
		  angle:12,
		  deg:0,
		  radius:Math.ceil(Math.sqrt(window.height*window.height+window.width*window.width)),
		  draw: function() {
		  	console.log(this.deg*Math.PI/180);
		  	ctx.save();
			ctx.beginPath();
			ctx.moveTo(0,this.y);
			ctx.arc( 0, this.y, this.radius, 0*Math.PI, -this.deg*Math.PI/180, true);
			ctx.lineTo(0,this.y);
			ctx.clip();
			ctx.clearRect(0,0,this.x,this.y);
			ctx.restore();

			this.deg = this.deg+this.angle;
			if(this.deg > 100){
		    	animateCanvas.remove(walkOff);
		    	animateCanvas.remove(loading);
		    	animateCanvas.stop();
		    }
		  }
		};

		animateCanvas.add(loading);
		animateCanvas.draw(10);
	})



}])
