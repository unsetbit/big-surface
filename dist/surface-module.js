;module.exports = (function(){
var __m2 = function(module,exports){module.exports=exports;
;module.exports = (function(){
var __m1 = function(module,exports){module.exports=exports;
// Adapted from http://gizma.com/easing/ (which was created by Robert Penner)

exports.linear = function(currentTime, startValue, changeInValue, totalTime) {
	return changeInValue * currentTime / totalTime + startValue; 
};


exports.quadraticIn = function(currentTime, startValue, changeInValue, totalTime) {
	return changeInValue * (currentTime /= totalTime) * currentTime + startValue;
};

exports.quadraticOut = function(currentTime, startValue, changeInValue, totalTime) {
	return -changeInValue * (currentTime /= totalTime) * (currentTime - 2) + startValue;
};

exports.quadraticInOut = function(currentTime, startValue, changeInValue, totalTime) {
	currentTime /= totalTime / 2;
	
	if(currentTime < 1) return changeInValue / 2 * currentTime * currentTime + startValue;
	
	return -changeInValue / 2 * (--currentTime * (currentTime - 2) - 1) + startValue;
};

exports.cubicIn = function(currentTime, startValue, changeInValue, totalTime) {
	return changeInValue * (currentTime /= totalTime) * currentTime * currentTime + startValue;
};

exports.cubicOut = function(currentTime, startValue, changeInValue, totalTime) {
	currentTime /= totalTime;

	return changeInValue * (--currentTime * currentTime * currentTime + 1) + startValue;
};

exports.cubicInOut = function(currentTime, startValue, changeInValue, totalTime) {
	currentTime /= totalTime / 2;
	
	if(currentTime < 1) return changeInValue * (currentTime /= totalTime) * currentTime * currentTime + startValue;

	return changeInValue / 2 * ((currentTime -= 2) * currentTime * currentTime + 2) + startValue;
};


var HALF_PI = Math.PI / 2;
exports.sinusoidalIn = function(currentTime, startValue, changeInValue, totalTime) {
	return -changeInValue * Math.cos(currentTime / totalTime * HALF_PI) + changeInValue + startValue;
};

exports.sinusoidalOut = function(currentTime, startValue, changeInValue, totalTime) {
	return changeInValue * Math.sin(currentTime / totalTime * HALF_PI) + startValue;
};

exports.sinusoidalInOut = function(currentTime, startValue, changeInValue, totalTime){
	return -changeInValue / 2 * (Math.cos(Math.PI * currentTime / totalTime) - 1) + startValue;
};


exports.exponentialIn = function(currentTime, startValue, changeInValue, totalTime){
	return changeInValue * Math.pow(2, 10 * (currentTime / totalTime - 1)) + startValue;
};

exports.exponentialOut = function(currentTime, startValue, changeInValue, totalTime){
	return changeInValue * (-Math.pow(2, -10 * currentTime / totalTime) + 1) + startValue;
};

exports.exponentialInOut = function(currentTime, startValue, changeInValue, totalTime){
	currentTime /= totalTime / 2;
	
	if(currentTime < 1) return changeInValue / 2 * Math.pow(2, 10 * (currentTime -1))  + startValue;

	return changeInValue / 2 * (-Math.pow(2, -10 * --t) + 2) + startValue;
};

;return module.exports;}({},{});
var __m0 = function(module,exports){module.exports=exports;
var tween = module.exports = function(easingFunc, obj, prop, targetValue, duration, callback){
	duration = duration || 0;
	
	var startValue = obj[prop],
		valueDiff = targetValue - startValue,
		startTime = Date.now(),
		pauseStart = startTime,
		paused = true,
		animationRequestId;

	function pause(){
		if(paused) return;
		paused = true;

		cancelAnimationFrame(animationRequestId);	
		pauseStart = Date.now();
	}

	function resume(){
		if(!paused) return;
		paused = false;

		startTime += Date.now() - pauseStart;
		
		animationRequestId = requestAnimationFrame(step);
	}

	function step(){
		var currentTime = Date.now() - startTime;

		if(currentTime < duration){
			obj[prop] = easingFunc(currentTime, startValue, valueDiff, duration);
			animationRequestId = requestAnimationFrame(step);
		} else {
			obj[prop] = easingFunc(duration, startValue, valueDiff, duration);
			callback && callback();
		}
	}

	resume();

	return {
		resume: resume,
		pause: pause
	};
};

// Bind easing helpers
var easing = __m1,
	easingFuncName;

for(easingFuncName in easing){
	if(easing.hasOwnProperty(easingFuncName)){
		tween[easingFuncName] = tween.bind(void 0, easing[easingFuncName]);
	}
}

tween.easing = easing;
;return module.exports;}({},{});return __m0;}());
;return module.exports;}({},{});
var __m1 = function(module,exports){module.exports=exports;
var noop = exports.noop = function(){};

exports.requestAnimationFrame = window.requestAnimationFrame || 
								window.mozRequestAnimationFrame ||
                              	window.webkitRequestAnimationFrame || 
                              	window.msRequestAnimationFrame || 
                              	function(cb){return setTimeout(cb, 15);};

exports.cancelAnimationFrame = 	window.cancelAnimationFrame || 
								window.mozCancelAnimationFrame ||
                              	window.webkitCancelAnimationFrame || 
                              	window.msCancelAnimationFrame || 
                              	function(timeout){return clearTimeout(timeout);};

exports.requestFullscreen = document.documentElement.requestFullscreen ||
							document.documentElement.mozRequestFullScreen ||
							document.documentElement.webkitRequestFullscreen ||
							noop;

var bodyStyle = document.body.style;
exports.transformAttribute = 	(bodyStyle.msTransform !== void 0) && "msTransform" ||
								(bodyStyle.webkitTransform !== void 0) && "webkitTransform" ||
								(bodyStyle.MozTransform !== void 0) && "MozTransform" ||
								(bodyStyle.transform !== void 0) && "transform";
								
exports.transitionAttribute =	(bodyStyle.msTransition !== void 0) && "msTransition" ||
								(bodyStyle.webkitTransition !== void 0) && "webkitTransition" ||
								(bodyStyle.MozTransition !== void 0) && "MozTransition" || 
								(bodyStyle.transition !== void 0) && "transition";

exports.filterAttribute = 		(bodyStyle.msFilter !== void 0) && "msFilter" ||
								(bodyStyle.webkitFilter !== void 0) && "webkitFilter" ||
								(bodyStyle.MozFilter !== void 0) && "MozFilter" ||
								(bodyStyle.filter !== void 0) && "filter";
;return module.exports;}({},{});
var __m0 = function(module,exports){module.exports=exports;
var utils = __m1,
	requestAnimationFrame = utils.requestAnimationFrame,
	cancelAnimationFrame = utils.cancelAnimationFrame,
	tween = __m2;

module.exports = function(container){
	var bigSurface = new BigSurface(container);

	return apiFactory(bigSurface);
};

var apiFactory = module.exports.apiFactory = function(bigSurface){
	var api = {};

	api.start = bigSurface.start.bind(bigSurface);
	api.pause = bigSurface.pause.bind(bigSurface);
	api.refit = bigSurface.refit.bind(bigSurface);
	api.element = bigSurface.element;

	api.blur = bigSurface.setBlur.bind(bigSurface);
	api.grayscale = bigSurface.setGrayscale.bind(bigSurface);
	api.opacity = bigSurface.setOpacity.bind(bigSurface);

	api.speed = bigSurface.setSpeedLimit.bind(bigSurface);
	api.horizontalSpeed = bigSurface.setHorizontalSpeedLimit.bind(bigSurface);
	api.verticalSpeed = bigSurface.setVerticalSpeedLimit.bind(bigSurface);

	api.horizontalWind = bigSurface.setHorizontalWind.bind(bigSurface);
	api.verticalWind = bigSurface.setVerticalWind.bind(bigSurface);
	
	return api;
};

var BigSurface = module.exports.constructor = function(container){
	this.container = container;
	this.element = document.createElement("div");
	this.element.style.position = "absolute";
	container.appendChild(this.element);

	this.refit();

	this.offsetX = 0;
	this.offsetY = 0;
	
	this.speedMultiplierX = 0;
	this.speedMultiplierY = 0;
	
	this.multiStyle = {};
	this.multiStyle[utils.transformAttribute] = {};
	this.multiStyle[utils.transitionAttribute] = {};
	this.multiStyle[utils.filterAttribute] = {};

	this.pointerEventHandler = this.pointerEventHandler.bind(this);
	this.step = this.step.bind(this);
}

BigSurface.prototype.horizontalSpeedLimit = 4;
BigSurface.prototype.verticalSpeedLimit = 4;

BigSurface.prototype.horizontalWind = 0;
BigSurface.prototype.verticalWind = 0;

BigSurface.prototype.msPerStep = 16; // Milliseconds per step

// These functions take current position relative to the center and return a number between -1 and 1
BigSurface.prototype.horizontalSpeedGradient = tween.easing.quadraticIn;
BigSurface.prototype.verticalSpeedGradient = tween.easing.quadraticIn;

BigSurface.prototype.pointerTrackingEvents = ['mousemove', 'touchstart', 'touchend', 'touchmove'];

BigSurface.prototype.start = function(){
	if(this.active) return;
	this.active = true;

	this.attachPointerListeners();
	
	this.lastStepTime = Date.now();

	this.animationRequestId = requestAnimationFrame(this.step);
};

BigSurface.prototype.pause = function(){
	if(!this.active) return;
	this.active = false;
	cancelAnimationFrame(this.animationRequestId);
	this.detachPointerListeners();
};

BigSurface.prototype.step = function(){
	this.refit();

	var currentTime = Date.now(),
		lagMultiplier = (currentTime - this.lastStepTime) / this.msPerStep;

	this.lastStepTime = currentTime;
	
	this.offsetX += lagMultiplier * (this.horizontalWind + (this.speedMultiplierX * this.horizontalSpeedLimit));
	this.offsetY += lagMultiplier * (this.verticalWind + (this.speedMultiplierY * this.verticalSpeedLimit));
	
	this.setCssTransform("translate", this.offsetX + "px, " + this.offsetY + "px");

	this.animationRequestId = requestAnimationFrame(this.step);
};

BigSurface.prototype.attachPointerListeners = function(){
	var self = this;
	this.pointerTrackingEvents.forEach(function(event){
		self.container.addEventListener(event, self.pointerEventHandler);
	});
	this.container.addEventListener("mousemove", self.pointerEventHandler);
};

BigSurface.prototype.detachPointerListeners = function(){
	var self = this;
	this.pointerTrackingEvents.forEach(function(event){
		self.container.removeEventListener(event, self.pointerEventHandler);
	});
};

// This updates the x and y speed multipliers based on the pointers relative position to the
// center of the container element
BigSurface.prototype.pointerEventHandler = function(e){
	// If touch event, find first touch
	var pointer = e.changedTouches && e.changedTouches[0] || e;

	var x = pointer.clientX - this.left;
		y = pointer.clientY - this.top;

	this.speedMultiplierX = this.horizontalSpeedGradient(x - this.halfWidth, 0, (x > this.halfWidth? -1 : 1), this.halfWidth);
	this.speedMultiplierY = this.verticalSpeedGradient(y - this.halfHeight, 0, (y > this.halfHeight? -1 : 1), this.halfHeight);
};

BigSurface.prototype.refit = function(width, height){
	var rect = this.container.getBoundingClientRect();

	this.width = rect.width;
	this.halfWidth = this.width / 2;

	this.height = rect.height;
	this.halfHeight = this.height / 2;

	this.top = rect.top;
	this.left = rect.left;
};

BigSurface.prototype.setHorizontalWind = function(target, duration, easingFunc){
	if(!duration) return this.horizontalWind = target;

	easingFunc = easingFunc || (this.horizontalWind < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;

	tween(easingFunc, this, "horizontalWind", target, duration);
};

BigSurface.prototype.setVerticalWind = function(target, duration, easingFunc){
	if(!duration) return this.verticalWind = target;

	easingFunc = easingFunc || (this.verticalWind < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;

	tween(easingFunc, this, "verticalWind", target, duration);
};

BigSurface.prototype.setSpeedLimit = function(target, duration, easingFunc, callback){
	if(!duration){
		this.horizontalSpeedLimit = target;
		this.verticalSpeedLimit = target;
		return;
	}

	this.setHorizontalSpeedLimit(target, duration, easingFunc, callback);
	this.setVerticalSpeedLimit(target, duration, easingFunc, callback);
};

BigSurface.prototype.setHorizontalSpeedLimit = function(target, duration, easingFunc, callback){
	if(!duration) return this.horizontalSpeedLimit = target;

	easingFunc = easingFunc || (this.horizontalSpeedLimit < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;

	tween(easingFunc, this, "horizontalSpeedLimit", target, duration, callback);
};

BigSurface.prototype.setVerticalSpeedLimit = function(target, duration, easingFunc, callback){
	if(!duration) return this.verticalSpeedLimit = target;
	
	easingFunc = easingFunc || (this.verticalSpeedLimit < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;

	tween(easingFunc, this, "verticalSpeedLimit", target, duration, callback);
};

BigSurface.prototype.setBlur = function(target, duration){
	if(duration !== void 0) this.setCssTransition("-webkit-filter", duration + "s");
	this.setCssFilter("blur", target + "px");
};

BigSurface.prototype.setGrayscale = function(target, duration){
	if(duration !== void 0) this.setCssTransition("-webkit-filter", duration + "s");
	this.setCssFilter("grayscale", target);
};

BigSurface.prototype.setOpacity = function(target, duration){
	if(duration !== void 0) this.setCssTransition("opacity", duration + "s");
	this.element.style.opacity = target;
};

BigSurface.prototype.setCssTransform = function(name, value){
	this.cssTransforms[name] = value;
	this.updateMultiAttributeStyle(utils.transformAttribute, this.cssTransforms);
};

BigSurface.prototype.setCssFilter = function(name, value){
	this.cssFilters[name] = value;
	this.updateMultiAttributeStyle(utils.filterAttribute, this.cssFilters);
};

BigSurface.prototype.setCssTransition = function(name, value){
	this.cssTransitions[name] = value;
	this.updateMultiAttributeStyle(utils.transitionAttribute, this.cssTransitions, true);
};

BigSurface.prototype.cssTransitions = {
	"-webkit-filter": "0s",
	opacity: "0s"	
};

BigSurface.prototype.cssFilters = {
	blur: "0px",
	grayscale: "0"
};

BigSurface.prototype.cssTransforms = {
	translate: "0px, 0px"
};

BigSurface.prototype.updateMultiAttributeStyle = function(styleName, attributes, withComma){
	var name,
		list = [];

	for(name in attributes){
		if(attributes.hasOwnProperty(name)){
			list.push(name + (withComma?" ":"(") + attributes[name] + (withComma?"":")"));
		}
	}

	this.element.style[styleName] = list.join((withComma?", ":" "));
}

;return module.exports;}({},{});return __m0;}());