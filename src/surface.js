'use strict';

var EventEmitter = require('../bower_components/eventEmitter/EventEmitter.js');
var hammer = require('../bower_components/hammerjs/hammer.js');

var isTouchDevice = 'ontouchstart' in document.documentElement;

var utils = require('./utils.js'),
	tween = require('../bower_components/easy-tween/dist/easyTween.js');

var Surface = module.exports = function(container){
	this.container = container;
	this.element = document.createElement('div');
	this.element.style.position = 'absolute';
	container.appendChild(this.element);

	this.refit();
	this.emitter = new EventEmitter();

	this.horizontalPosition = 0;
	this.verticalPosition = 0;
	
	this.horizontalVelocity = 0;
	this.verticalVelocity = 0;

	this.cssTransitions = {};
	this.cssFilters = {};
	this.cssTransforms = {};

	this.pointerEventHandler = this.pointerEventHandler.bind(this);
	this.dragEventHandler = this.dragEventHandler.bind(this);
	this.transformStep = this.transformStep.bind(this);
};

Surface.create = function(container){
	var surface = new Surface(container);

	return Surface.getApi(surface);
};

Surface.getApi = function(surface){
	var api = {};

	api.on = surface.emitter.on.bind(surface.emitter);
	api.removeListener = surface.emitter.removeListener.bind(surface.emitter);

	api.refit = surface.refit.bind(surface);
	api.element = surface.element;
	api.container = surface.container;

	api.css = surface.setCssStyle.bind(surface);
	api.cssTransform = surface.setCssTransform.bind(surface);
	api.cssFilter = surface.setCssFilter.bind(surface);
	api.cssTransition = surface.setCssTransition.bind(surface);

	api.speed = surface.setVelocityScalar.bind(surface);
	api.horizontalSpeed = surface.setHorizontalVelocityScalar.bind(surface);
	api.verticalSpeed = surface.setVerticalVelocityScalar.bind(surface);

	api.horizontalWind = surface.setBaseHorizontalVelocity.bind(surface);
	api.verticalWind = surface.setBaseVerticalVelocity.bind(surface);
	
	Object.defineProperty(api, 'speedGradient', {
		get: function(){
			return (surface.horizontalVelocityGradient === surface.verticalVelocityGradient)? 
						surface.horizontalVelocityGradient : 
						void 0;
		},
		set: function(value){
			surface.horizontalVelocityGradient = value;
			surface.verticalVelocityGradient = value;
		}
	});

	Object.defineProperty(api, 'horizontalVelocityGradient', {
		get: function(){ return surface.horizontalVelocityGradient;},
		set: function(value){ surface.horizontalVelocityGradient = value;}
	});

	Object.defineProperty(api, 'verticalVelocityGradient', {
		get: function(){ return surface.verticalVelocityGradient;},
		set: function(value){ surface.verticalVelocityGradient = value;}
	});

	Object.defineProperty(api, 'width', {
		get: function(){return surface.width;}
	});

	Object.defineProperty(api, 'height', {
		get: function(){return surface.height;}
	});

	Object.defineProperty(api, 'top', {
		get: function(){return surface.top;}
	});

	Object.defineProperty(api, 'left', {
		get: function(){return surface.left;}
	});

	return api;
};

Surface.prototype.horizontalVelocityScalar = 0;
Surface.prototype.verticalVelocityScalar = 0;

Surface.prototype.baseHorizontalVelocity = 0;
Surface.prototype.baseVerticalVelocity = 0;

Surface.prototype.msPerStep = 16; // Milliseconds per step

// These functions take current position relative to the center and return a number between -1 and 1
Surface.prototype.horizontalVelocityGradient = tween.easing.quadraticIn;
Surface.prototype.verticalVelocityGradient = tween.easing.quadraticIn;

Surface.prototype.pointerTrackingEvents = ['mousemove'];//, 'touchstart', 'touchend', 'touchmove'];

Surface.prototype.refit = function(){
	var rect = this.container.getBoundingClientRect();

	this.width = rect.width;
	this.halfWidth = this.width / 2;

	this.height = rect.height;
	this.halfHeight = this.height / 2;

	this.top = rect.top;
	this.left = rect.left;
};

Surface.prototype.startTransformLoop = function(){
	if(this.transforming) return;

	this.transforming = true;
	this.lastStepTime = Date.now();
	this.animationRequestId = requestAnimationFrame(this.transformStep);
	this.attachPointerListeners();
	this.emitter.emit('move start');
};

Surface.prototype.stopTransformLoop = function(){
	if(!this.transforming) return;

	this.transforming = false;
	cancelAnimationFrame(this.animationRequestId);
	this.emitter.emit('move stop');
};

Surface.prototype.transformStep = function(){
	var currentTime = Date.now(),
		lagScalar = (currentTime - this.lastStepTime) / this.msPerStep;
	
	this.lastHorizontalDisplacement = lagScalar * (this.baseHorizontalVelocity + 
		(this.horizontalVelocity * this.horizontalVelocityScalar));
	this.lastVerticalDisplacement = lagScalar * (this.baseVerticalVelocity + 
		(this.verticalVelocity * this.verticalVelocityScalar));
	this.lastStepTime = currentTime;
	
	if(this.lastHorizontalDisplacement || this.lastVerticalDisplacement){
		this.horizontalPosition += this.lastHorizontalDisplacement;
		this.verticalPosition += this.lastVerticalDisplacement;
		this.setCssTransform('translate', this.horizontalPosition + 'px, ' + this.verticalPosition + 'px');
		this.animationRequestId = requestAnimationFrame(this.transformStep);
	} else if(this.trackingPointer || this.baseHorizontalVelocity || this.baseVerticalVelocity){
		this.animationRequestId = requestAnimationFrame(this.transformStep);
	}
};

Surface.prototype.setBaseHorizontalVelocity = function(target, duration, easingFunc){
	if(target === void 0) return this.baseHorizontalVelocity;

	if(this.horizontalWindTween) this.horizontalWindTween.pause();

	if(duration){
		duration *= 1000; // Tweening occurs in milliseconds
		easingFunc = easingFunc || (this.baseHorizontalVelocity < target)? 
			tween.easing.quadraticIn : tween.easing.quadraticOut;
		this.horizontalWindTween = tween(easingFunc, this, 'baseHorizontalVelocity', target, duration);
	} else {
		this.baseHorizontalVelocity = target;
	}
};

Surface.prototype.setBaseVerticalVelocity = function(target, duration, easingFunc){
	if(target === void 0) return this.baseVerticalVelocity;
	
	if(this.verticalWindTween) this.verticalWindTween.pause();

	if(duration){
		duration *= 1000; // Tweening occurs in milliseconds
		easingFunc = easingFunc || (this.baseVerticalVelocity < target)? 
			tween.easing.quadraticIn : tween.easing.quadraticOut;
		this.verticalWindTween = tween(easingFunc, this, 'baseVerticalVelocity', target, duration);
	} else {
		this.baseVerticalVelocity = target;
	}
};

Surface.prototype.setVelocityScalar = function(target, duration, easingFunc, callback){
	if(target === void 0){
		if(this.horizontalVelocityScalar === this.verticalVelocityScalar){
			return this.horizontalVelocityScalar;
		}

		return void 0;
	}
	
	this.setHorizontalVelocityScalar(target, duration, easingFunc, callback);
	this.setVerticalVelocityScalar(target, duration, easingFunc);
};

Surface.prototype.setHorizontalVelocityScalar = function(target, duration, easingFunc, callback){
	if(target === void 0) return this.horizontalVelocityScalar;

	if(this.horizontalSpeedTween) this.horizontalSpeedTween.pause();

	if(duration){
		duration *= 1000; // Tweening occurs in milliseconds
		easingFunc = easingFunc || (this.horizontalVelocityScalar < target)? 
			tween.easing.quadraticIn : tween.easing.quadraticOut;
		this.horizontalSpeedTween = tween(easingFunc, this, 'horizontalVelocityScalar', target, duration, callback);
	} else {
		this.horizontalVelocityScalar = target;
	}
};

Surface.prototype.setVerticalVelocityScalar = function(target, duration, easingFunc, callback){
	if(target === void 0) return this.verticalVelocityScalar;

	if(this.verticalSpeedTween) this.verticalSpeedTween.pause();

	if(duration){
		duration *= 1000; // Tweening occurs in milliseconds
		easingFunc = easingFunc || (this.verticalVelocityScalar < target)? 
			tween.easing.quadraticIn : tween.easing.quadraticOut;
		this.verticalSpeedTween = tween(easingFunc, this, 'verticalVelocityScalar', target, duration, callback);
	} else {
		this.verticalVelocityScalar = target;
	}
};

function preventDefault(e){
	e.preventDefault();
}

Surface.prototype.attachPointerListeners = function(){
	if(this.trackingPointer) return;
	this.trackingPointer = true;

	if(isTouchDevice){
		hammer(this.container).on('drag', this.dragEventHandler);	
		this.container.addEventListener('touchmove', preventDefault);
	} else {
		this.container.addEventListener('mousemove', this.pointerEventHandler);
	}
	
	this.emitter.emit('pointer tracking start');
};

Surface.prototype.detachPointerListeners = function(){
	if(!this.trackingPointer) return;
	this.trackingPointer = false;
	
	if(isTouchDevice){
		hammer(this.container).off('drag', this.dragEventHandler);	
		this.container.removeEventListener('touchmove', preventDefault);
	} else {
		this.container.removeEventListener('mousemove', this.pointerEventHandler);
	}
	

	this.emitter.emit('pointer tracking stop');
};

Surface.prototype.dragEventHandler = function(e){
	this.horizontalVelocity = e.gesture.velocityX;
	this.verticalVelocity = e.gesture.velocityY;
	
	if(this.horizontalVelocity < 0.1) this.horizontalVelocity = 0;
	if(this.verticalVelocity < 0.1) this.verticalVelocity = 0;

	if(this.horizontalVelocity > 1) this.horizontalVelocity = 1;
	if(this.verticalVelocity > 1) this.verticalVelocity = 1;

	if(e.gesture.deltaX < 0) this.horizontalVelocity *= -1;
	if(e.gesture.deltaY < 0) this.verticalVelocity *= -1;

};

// This updates the x and y speed multipliers based on the pointers relative position to the
// center of the container element
Surface.prototype.pointerEventHandler = function(e){
	// If touch event, find first touch
	var pointer = (e.changedTouches && e.changedTouches[0] || e),
		x = pointer.clientX - this.left,
		y = pointer.clientY - this.top;

	this.horizontalVelocity = this.horizontalVelocityGradient(
		x - this.halfWidth, 
		0, 
		(x > this.halfWidth? -1 : 1), 
		this.halfWidth
	);
	this.verticalVelocity = this.verticalVelocityGradient(
		y - this.halfHeight, 
		0, 
		(y > this.halfHeight? -1 : 1), 
		this.halfHeight
	);
};

Surface.prototype.setCssStyle = function(name, value, duration){
	if(value === void 0) return this.element.style[name];

	if(duration !== void 0) this.setCssTransition(name, duration + 's');
	
	this.element.style[name] = value;
};

Surface.prototype.setCssTransform = function(name, value){
	if(value === void 0) return this.cssTransforms[name];

	this.cssTransforms[name] = value;
	this.updateMultiAttributeStyle(utils.transformAttribute, this.cssTransforms);
};

Surface.prototype.setCssFilter = function(name, value, duration){
	if(value === void 0) return this.cssFilters[name];
	
	if(duration !== void 0) this.setCssTransition(utils.cssFilterAttribute, duration + 's');
	
	this.cssFilters[name] = value;
	this.updateMultiAttributeStyle(utils.filterAttribute, this.cssFilters);
};

Surface.prototype.setCssTransition = function(name, value){
	if(value === void 0) return this.cssTransitions[name];
	
	this.cssTransitions[name] = value;
	this.updateMultiAttributeStyle(utils.transitionAttribute, this.cssTransitions, true);
};

Surface.prototype.updateMultiAttributeStyle = function(styleName, attributes, withComma){
	var name,
		style = '',
		first = true;

	for(name in attributes){
		if(attributes.hasOwnProperty(name)){
			if(first) first = false;
			else style += withComma?', ': ' ';

			if(withComma){
				style += name + ' ' + attributes[name];
			} else {
				style += name + '(' + attributes[name] + ')';
			}
		}
	}

	this.element.style[styleName] = style;
};
