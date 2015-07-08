"use strict";
var cardAnimation = angular.module("cardAnimation",[]);
var cvs = document.getElementById("bskCvs");
var fullBg = document.getElementById("fullBg");
var ctx = cvs.getContext('2d');
window.width = window.innerWidth;
window.height = window.innerHeight;
cvs.width=window.width;
cvs.height=window.height;
fullBg.width=window.width;
fullBg.height=window.height;

cardAnimation
.run(function(){

});