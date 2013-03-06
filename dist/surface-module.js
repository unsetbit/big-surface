;module.exports = (function(){
var __m3 = function(module,exports){module.exports=exports;
/**
 * EventEmitter v4.0.5 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

;(function(exports) {
    // JSHint config - http://www.jshint.com/
    /*jshint laxcomma:true*/
    /*global define:true*/

    // Place the script in strict mode
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class Manages event registering and emitting.
     */
    function EventEmitter(){}

    // Shortcuts to improve speed and size

        // Easy access to the prototype
    var proto = EventEmitter.prototype

      // Existence of a native indexOf
      , nativeIndexOf = Array.prototype.indexOf ? true : false;

    /**
     * Finds the index of the listener for the event in it's storage array
     *
     * @param {Function} listener Method to look for.
     * @param {Function[]} listeners Array of listeners to search through.
     * @return {Number} Index of the specified listener, -1 if not found
     */
    function indexOfListener(listener, listeners) {
        // Return the index via the native method if possible
        if(nativeIndexOf) {
            return listeners.indexOf(listener);
        }

        // There is no native method
        // Use a manual loop to find the index
        var i = listeners.length;
        while(i--) {
            // If the listener matches, return it's index
            if(listeners[i] === listener) {
                return i;
            }
        }

        // Default to returning -1
        return -1;
    }

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     */
    proto._getEvents = function() {
        return this._events || (this._events = {});
    };

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     *
     * @param {String} evt Name of the event to return the listeners from.
     * @return {Function[]} All listener functions for the event.
     * @doc
     */
    proto.getListeners = function(evt) {
        // Create a shortcut to the storage object
        // Initialise it if it does not exists yet
        var events = this._getEvents();

        // Return the listener array
        // Initialise it if it does not exist
        return events[evt] || (events[evt] = []);
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     *
     * @param {String} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.addListener = function(evt, listener) {
        // Fetch the listeners
        var listeners = this.getListeners(evt);

        // Push the listener into the array if it is not already there
        if(indexOfListener(listener, listeners) === -1) {
            listeners.push(listener);
        }

        // Return the instance of EventEmitter to allow chaining
        return this;
    };

    /**
     * Alias of addListener
     * @doc
     */
    proto.on = proto.addListener;

    /**
     * Removes a listener function from the specified event.
     *
     * @param {String} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.removeListener = function(evt, listener) {
        // Fetch the listeners
        // And get the index of the listener in the array
        var listeners = this.getListeners(evt)
          , index = indexOfListener(listener, listeners);

        // If the listener was found then remove it
        if(index !== -1) {
            listeners.splice(index, 1);

            // If there are no more listeners in this array then remove it
            if(listeners.length === 0) {
                this.removeEvent(evt);
            }
        }

        // Return the instance of EventEmitter to allow chaining
        return this;
    };

    /**
     * Alias of removeListener
     * @doc
     */
    proto.off = proto.removeListener;

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added.
     *
     * @param {String|Object} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.addListeners = function(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     *
     * @param {String|Object} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.removeListeners = function(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.manipulateListeners = function(remove, evt, listeners) {
        // Initialise any required variables
        var i
          , value
          , single = remove ? this.removeListener : this.addListener
          , multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of it's properties to this method
        if(typeof evt === 'object') {
            for(i in evt) {
                if(evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if(typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while(i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        // Return the instance of EventEmitter to allow chaining
        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     *
     * @param {String} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.removeEvent = function(evt) {
        // Remove different things depending on the state of evt
        if(evt) {
            // Remove all listeners for the specified event
            delete this._getEvents()[evt];
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        // Return the instance of EventEmitter to allow chaining
        return this;
    };

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     *
     * @param {String} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.emitEvent = function(evt, args) {
        // Get the listeners for the event
        // Also initialise any other required variables
        var listeners = this.getListeners(evt)
          , i = listeners.length
          , response;

        // Loop over all listeners assigned to the event
        // Apply the arguments array to each listener function
        while(i--) {
            // If the listener returns true then it shall be removed from the event
            // The function is executed either with a basic call or an apply if there is an args array
            response = args ? listeners[i].apply(null, args) : listeners[i]();
            if(response === true) {
                this.removeListener(evt, listeners[i]);
            }
        }

        // Return the instance of EventEmitter to allow chaining
        return this;
    };

    /**
     * Alias of emitEvent
     * @doc
     */
    proto.trigger = proto.emitEvent;

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as
     * opposed to taking a single array of arguments to pass on.
     *
     * @param {String} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.emit = function(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    // Expose the class either via AMD or the global object
    if(typeof define === 'function' && define.amd) {
        define(function() {
            return EventEmitter;
        });
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}(this));
;return module.exports;}({},{});
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
var requestAnimationFrame = window.requestAnimationFrame || 
								window.mozRequestAnimationFrame ||
                              	window.webkitRequestAnimationFrame || 
                              	window.msRequestAnimationFrame || 
                              	function(cb){return setTimeout(cb, 15);};

var cancelAnimationFrame = 	window.cancelAnimationFrame || 
								window.mozCancelAnimationFrame ||
                              	window.webkitCancelAnimationFrame || 
                              	window.msCancelAnimationFrame || 
                              	function(timeout){return clearTimeout(timeout);};

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
								"transform";
								
exports.transitionAttribute =	(bodyStyle.msTransition !== void 0) && "msTransition" ||
								(bodyStyle.webkitTransition !== void 0) && "webkitTransition" ||
								(bodyStyle.MozTransition !== void 0) && "MozTransition" || 
								"transition";

exports.filterAttribute = 		(bodyStyle.msFilter !== void 0) && "msFilter" ||
								(bodyStyle.webkitFilter !== void 0) && "webkitFilter" ||
								(bodyStyle.MozFilter !== void 0) && "MozFilter" ||
								"filter";

exports.cssFilterAttribute = 	(bodyStyle.msFilter !== void 0) && "-ms-filter" ||
								(bodyStyle.webkitFilter !== void 0) && "-webkit-filter" ||
								(bodyStyle.MozFilter !== void 0) && "-moz-filter" ||
								"filter";

exports.cssTransformAttribute = (bodyStyle.msTransform !== void 0) && "-ms-transform" ||
								(bodyStyle.webkitTransform !== void 0) && "-webkit-transform" ||
								(bodyStyle.MozTransform !== void 0) && "-moz-transform" ||
								"filter";
;return module.exports;}({},{});
var __m0 = function(module,exports){module.exports=exports;
__m3;

var utils = __m1,
	requestAnimationFrame = utils.requestAnimationFrame,
	cancelAnimationFrame = utils.cancelAnimationFrame,
	tween = __m2;

var Surface = module.exports = function(container){
	this.container = container;
	this.element = document.createElement("div");
	this.element.style.position = "absolute";
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

	api.css = surface.setCssStyle.bind(surface);
	api.cssTransform = surface.setCssTransform.bind(surface);
	api.cssFilter = surface.setCssFilter.bind(surface);
	api.cssTransition = surface.setCssTransition.bind(surface);

	api.speed = surface.setVelocityScalar.bind(surface);
	api.horizontalSpeed = surface.setHorizontalVelocityScalar.bind(surface);
	api.verticalSpeed = surface.setVerticalVelocityScalar.bind(surface);

	api.horizontalWind = surface.setBaseHorizontalVelocity.bind(surface);
	api.verticalWind = surface.setBaseVerticalVelocity.bind(surface);
	
	Object.defineProperty(api, "speedGradient", {
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

	Object.defineProperty(api, "horizontalVelocityGradient", {
		get: function(){ return surface.horizontalVelocityGradient;},
		set: function(value){ surface.horizontalVelocityGradient = value;}
	});

	Object.defineProperty(api, "verticalVelocityGradient", {
		get: function(){ return surface.verticalVelocityGradient;},
		set: function(value){ surface.verticalVelocityGradient = value;}
	});

	Object.defineProperty(api, "width", {
		get: function(){return surface.width;}
	});

	Object.defineProperty(api, "height", {
		get: function(){return surface.height;}
	});

	Object.defineProperty(api, "top", {
		get: function(){return surface.top;}
	});

	Object.defineProperty(api, "left", {
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

Surface.prototype.pointerTrackingEvents = ['mousemove', 'touchstart', 'touchend', 'touchmove'];

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
	this.emitter.emit("move start");
};

Surface.prototype.stopTransformLoop = function(){
	if(!this.transforming) return;

	this.transforming = false;
	cancelAnimationFrame(this.animationRequestId);
	this.emitter.emit("move stop");
};

Surface.prototype.transformStep = function(){
	var currentTime = Date.now(),
		lagScalar = (currentTime - this.lastStepTime) / this.msPerStep;
	
	this.lastHorizontalDisplacement = lagScalar * (this.baseHorizontalVelocity + (this.horizontalVelocity * this.horizontalVelocityScalar));
	this.lastVerticalDisplacement = lagScalar * (this.baseVerticalVelocity + (this.verticalVelocity * this.verticalVelocityScalar));
	this.lastStepTime = currentTime;
	
	if(!(this.horizontalVelocityScalar || this.verticalVelocityScalar) && this.trackingPointer){
		this.detachPointerListeners();	
	}

	if(this.lastHorizontalDisplacement || this.lastVerticalDisplacement){
		this.horizontalPosition += this.lastHorizontalDisplacement;
		this.verticalPosition += this.lastVerticalDisplacement;
		this.setCssTransform("translate", this.horizontalPosition + "px, " + this.verticalPosition + "px");
		this.animationRequestId = requestAnimationFrame(this.transformStep);
	} else if(this.trackingPointer || this.baseHorizontalVelocity || this.baseVerticalVelocity){
		this.animationRequestId = requestAnimationFrame(this.transformStep);
	} else {
		// If the next step won't do anything, stop the transform loop
		this.stopTransformLoop();
	}
};

Surface.prototype.setBaseHorizontalVelocity = function(target, duration, easingFunc){
	if(target === void 0) return this.baseHorizontalVelocity;

	this.horizontalWindTween && this.horizontalWindTween.pause();

	if(duration){
		duration *= 1000; // Tweening occurs in milliseconds
		easingFunc = easingFunc || (this.baseHorizontalVelocity < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;
		this.horizontalWindTween = tween(easingFunc, this, "baseHorizontalVelocity", target, duration);
	} else {
		this.baseHorizontalVelocity = target;
	}

	if(!this.transforming && target) this.startTransformLoop();
};

Surface.prototype.setBaseVerticalVelocity = function(target, duration, easingFunc){
	if(target === void 0) return this.baseVerticalVelocity;
	
	this.verticalWindTween && this.verticalWindTween.pause();

	if(duration){
		duration *= 1000; // Tweening occurs in milliseconds
		easingFunc = easingFunc || (this.baseVerticalVelocity < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;
		this.verticalWindTween = tween(easingFunc, this, "baseVerticalVelocity", target, duration);
	} else {
		this.baseVerticalVelocity = target;
	}

	if(!this.transforming && target) this.startTransformLoop();
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

	this.horizontalSpeedTween && this.horizontalSpeedTween.pause();

	if(duration){
		duration *= 1000; // Tweening occurs in milliseconds
		easingFunc = easingFunc || (this.horizontalVelocityScalar < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;
		this.horizontalSpeedTween = tween(easingFunc, this, "horizontalVelocityScalar", target, duration, callback);
	} else {
		this.horizontalVelocityScalar = target;
	}

	if(target !== 0){
		if(!this.transforming) this.startTransformLoop();
		if(!this.trackingPointer) this.attachPointerListeners();
	}
};

Surface.prototype.setVerticalVelocityScalar = function(target, duration, easingFunc, callback){
	if(target === void 0) return this.verticalVelocityScalar;

	this.verticalSpeedTween && this.verticalSpeedTween.pause();

	if(duration){
		duration *= 1000; // Tweening occurs in milliseconds
		easingFunc = easingFunc || (this.verticalVelocityScalar < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;
		this.verticalSpeedTween = tween(easingFunc, this, "verticalVelocityScalar", target, duration, callback);
	} else {
		this.verticalVelocityScalar = target;
	}

	if(target !== 0){
		if(!this.transforming) this.startTransformLoop();
		if(!this.trackingPointer) this.attachPointerListeners();
	}
};

Surface.prototype.attachPointerListeners = function(){
	if(this.trackingPointer) return;
	this.trackingPointer = true;

	var self = this;
	this.pointerTrackingEvents.forEach(function(event){
		self.container.addEventListener(event, self.pointerEventHandler);
	});

	this.emitter.emit("pointer tracking start");
};

Surface.prototype.detachPointerListeners = function(){
	if(!this.trackingPointer) return;
	this.trackingPointer = false;
	
	var self = this;
	this.pointerTrackingEvents.forEach(function(event){
		self.container.removeEventListener(event, self.pointerEventHandler);
	});

	this.emitter.emit("pointer tracking stop");
};

// This updates the x and y speed multipliers based on the pointers relative position to the
// center of the container element
Surface.prototype.pointerEventHandler = function(e){
	// If touch event, find first touch
	var pointer = e.changedTouches && e.changedTouches[0] || e,
		x = pointer.clientX - this.left;
		y = pointer.clientY - this.top;

	this.horizontalVelocity = this.horizontalVelocityGradient(x - this.halfWidth, 0, (x > this.halfWidth? -1 : 1), this.halfWidth);
	this.verticalVelocity = this.verticalVelocityGradient(y - this.halfHeight, 0, (y > this.halfHeight? -1 : 1), this.halfHeight);
};

Surface.prototype.setCssStyle = function(name, value, duration){
	if(value === void 0) return this.element.style[name];

	if(duration !== void 0) this.setCssTransition(name, duration + "s");
	
	this.element.style[name] = value;
};

Surface.prototype.setCssTransform = function(name, value, duration){
	if(value === void 0) return this.cssTransforms[name];

	this.cssTransforms[name] = value;
	this.updateMultiAttributeStyle(utils.transformAttribute, this.cssTransforms);
};

Surface.prototype.setCssFilter = function(name, value, duration){
	if(value === void 0) return this.cssFilters[name];
	
	if(duration !== void 0) this.setCssTransition(utils.cssFilterAttribute, duration + "s");
	
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
		style = "",
		first = true;

	for(name in attributes){
		if(attributes.hasOwnProperty(name)){
			if(first) first = false;
			else style += withComma?", ": " ";

			if(withComma){
				style += name + " " + attributes[name];
			} else {
				style += name + "(" + attributes[name] + ")";
			}
		}
	}

	this.element.style[styleName] = style;
}

;return module.exports;}({},{});return __m0;}());