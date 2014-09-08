!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.BigSurface=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.easyTween=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

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

	return changeInValue / 2 * (-Math.pow(2, -10 * --currentTime) + 2) + startValue;
};

},{}],2:[function(_dereq_,module,exports){
'use strict';

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
			if(callback) callback();
		}
	}

	resume();

	return {
		resume: resume,
		pause: pause
	};
};

// Bind easing helpers
var easing = _dereq_('./easing.js'),
	easingFuncName;

for(easingFuncName in easing){
	if(easing.hasOwnProperty(easingFuncName)){
		tween[easingFuncName] = tween.bind(void 0, easing[easingFuncName]);
	}
}

tween.easing = easing;
},{"./easing.js":1}]},{},[2])

(2)
});


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
/*!
 * EventEmitter v4.2.8 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {
	'use strict';

	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class EventEmitter Manages event registering and emitting.
	 */
	function EventEmitter() {}

	// Shortcuts to improve speed and size
	var proto = EventEmitter.prototype;
	var exports = this;
	var originalGlobalValue = exports.EventEmitter;

	/**
	 * Finds the index of the listener for the event in its storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 */
	function alias(name) {
		return function aliasClosure() {
			return this[name].apply(this, arguments);
		};
	}

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (evt instanceof RegExp) {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;

		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener);
		}

		return flatListeners;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				});
			}
		}

		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = alias('addListener');

	/**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after its first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		});
	};

	/**
	 * Alias of addOnceListener.
	 */
	proto.once = alias('addOnceListener');

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = alias('removeListener');

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function addListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function removeListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of its properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
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
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (evt instanceof RegExp) {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		return this;
	};

	/**
	 * Alias of removeEvent.
	 *
	 * Added to mirror the node API.
	 */
	proto.removeAllListeners = alias('removeEvent');

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					listener = listeners[key][i];

					if (listener.once === true) {
						this.removeListener(evt, listener.listener);
					}

					response = listener.listener.apply(this, args || []);

					if (response === this._getOnceReturnValue()) {
						this.removeListener(evt, listener.listener);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = alias('emitEvent');

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	/**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this;
	};

	/**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue;
		}
		else {
			return true;
		}
	};

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};

	/**
	 * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	 *
	 * @return {Function} Non conflicting EventEmitter class.
	 */
	EventEmitter.noConflict = function noConflict() {
		exports.EventEmitter = originalGlobalValue;
		return EventEmitter;
	};

	// Expose the class either via AMD, CommonJS or the global object
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return EventEmitter;
		});
	}
	else if (typeof module === 'object' && module.exports){
		module.exports = EventEmitter;
	}
	else {
		this.EventEmitter = EventEmitter;
	}
}.call(this));

},{}],3:[function(_dereq_,module,exports){
/*! Hammer.JS - v1.0.11 - 2014-05-20
 * http://eightmedia.github.io/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(window, undefined) {
  'use strict';

/**
 * Hammer
 * use this to create instances
 * @param   {HTMLElement}   element
 * @param   {Object}        options
 * @returns {Hammer.Instance}
 * @constructor
 */
var Hammer = function(element, options) {
  return new Hammer.Instance(element, options || {});
};

Hammer.VERSION = '1.0.11';

// default settings
Hammer.defaults = {
  // add styles and attributes to the element to prevent the browser from doing
  // its native behavior. this doesnt prevent the scrolling, but cancels
  // the contextmenu, tap highlighting etc
  // set to false to disable this
  stop_browser_behavior: {
    // this also triggers onselectstart=false for IE
    userSelect       : 'none',
    // this makes the element blocking in IE10> and Chrome 35>, you could experiment with the value
    // see for more options the wiki: https://github.com/EightMedia/hammer.js/wiki
    touchAction      : 'pan-y',

    touchCallout     : 'none',
    contentZooming   : 'none',
    userDrag         : 'none',
    tapHighlightColor: 'rgba(0,0,0,0)'
  }

  //
  // more settings are defined per gesture at /gestures
  //
};


// detect touchevents
Hammer.HAS_POINTEREVENTS = window.navigator.pointerEnabled || window.navigator.msPointerEnabled;
Hammer.HAS_TOUCHEVENTS = ('ontouchstart' in window);

// dont use mouseevents on mobile devices
Hammer.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i;
Hammer.NO_MOUSEEVENTS = Hammer.HAS_TOUCHEVENTS && window.navigator.userAgent.match(Hammer.MOBILE_REGEX);

// eventtypes per touchevent (start, move, end)
// are filled by Event.determineEventTypes on setup
Hammer.EVENT_TYPES = {};

// interval in which Hammer recalculates current velocity in ms
Hammer.UPDATE_VELOCITY_INTERVAL = 16;

// hammer document where the base events are added at
Hammer.DOCUMENT = window.document;

// define these also as vars, for better minification
// direction defines
var DIRECTION_DOWN = Hammer.DIRECTION_DOWN = 'down';
var DIRECTION_LEFT = Hammer.DIRECTION_LEFT = 'left';
var DIRECTION_UP = Hammer.DIRECTION_UP = 'up';
var DIRECTION_RIGHT = Hammer.DIRECTION_RIGHT = 'right';

// pointer type
var POINTER_MOUSE = Hammer.POINTER_MOUSE = 'mouse';
var POINTER_TOUCH = Hammer.POINTER_TOUCH = 'touch';
var POINTER_PEN = Hammer.POINTER_PEN = 'pen';

// touch event defines
var EVENT_START = Hammer.EVENT_START = 'start';
var EVENT_MOVE = Hammer.EVENT_MOVE = 'move';
var EVENT_END = Hammer.EVENT_END = 'end';


// plugins and gestures namespaces
Hammer.plugins = Hammer.plugins || {};
Hammer.gestures = Hammer.gestures || {};


// if the window events are set...
Hammer.READY = false;


/**
 * setup events to detect gestures on the document
 */
function setup() {
  if(Hammer.READY) {
    return;
  }

  // find what eventtypes we add listeners to
  Event.determineEventTypes();

  // Register all gestures inside Hammer.gestures
  Utils.each(Hammer.gestures, function(gesture){
    Detection.register(gesture);
  });

  // Add touch events on the document
  Event.onTouch(Hammer.DOCUMENT, EVENT_MOVE, Detection.detect);
  Event.onTouch(Hammer.DOCUMENT, EVENT_END, Detection.detect);

  // Hammer is ready...!
  Hammer.READY = true;
}


var Utils = Hammer.utils = {
  /**
   * extend method,
   * also used for cloning when dest is an empty object
   * @param   {Object}    dest
   * @param   {Object}    src
   * @parm  {Boolean}  merge    do a merge
   * @returns {Object}    dest
   */
  extend: function extend(dest, src, merge) {
    for(var key in src) {
      if(dest[key] !== undefined && merge) {
        continue;
      }
      dest[key] = src[key];
    }
    return dest;
  },


  /**
   * for each
   * @param obj
   * @param iterator
   */
  each: function each(obj, iterator, context) {
    var i, o;
    // native forEach on arrays
    if ('forEach' in obj) {
      obj.forEach(iterator, context);
    }
    // arrays
    else if(obj.length !== undefined) {
      for(i=-1; (o=obj[++i]);) {
        if (iterator.call(context, o, i, obj) === false) {
          return;
        }
      }
    }
    // objects
    else {
      for(i in obj) {
        if(obj.hasOwnProperty(i) &&
            iterator.call(context, obj[i], i, obj) === false) {
          return;
        }
      }
    }
  },


  /**
   * find if a string contains the needle
   * @param   {String}  src
   * @param   {String}  needle
   * @returns {Boolean} found
   */
  inStr: function inStr(src, needle) {
    return src.indexOf(needle) > -1;
  },


  /**
   * find if a node is in the given parent
   * used for event delegation tricks
   * @param   {HTMLElement}   node
   * @param   {HTMLElement}   parent
   * @returns {boolean}       has_parent
   */
  hasParent: function hasParent(node, parent) {
    while(node) {
      if(node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  },


  /**
   * get the center of all the touches
   * @param   {Array}     touches
   * @returns {Object}    center pageXY clientXY
   */
  getCenter: function getCenter(touches) {
    var pageX = []
      , pageY = []
      , clientX = []
      , clientY = []
      , min = Math.min
      , max = Math.max;

    // no need to loop when only one touch
    if(touches.length === 1) {
      return {
        pageX: touches[0].pageX,
        pageY: touches[0].pageY,
        clientX: touches[0].clientX,
        clientY: touches[0].clientY
      };
    }

    Utils.each(touches, function(touch) {
      pageX.push(touch.pageX);
      pageY.push(touch.pageY);
      clientX.push(touch.clientX);
      clientY.push(touch.clientY);
    });

    return {
      pageX: (min.apply(Math, pageX) + max.apply(Math, pageX)) / 2,
      pageY: (min.apply(Math, pageY) + max.apply(Math, pageY)) / 2,
      clientX: (min.apply(Math, clientX) + max.apply(Math, clientX)) / 2,
      clientY: (min.apply(Math, clientY) + max.apply(Math, clientY)) / 2
    };
  },


  /**
   * calculate the velocity between two points
   * @param   {Number}    delta_time
   * @param   {Number}    delta_x
   * @param   {Number}    delta_y
   * @returns {Object}    velocity
   */
  getVelocity: function getVelocity(delta_time, delta_x, delta_y) {
    return {
      x: Math.abs(delta_x / delta_time) || 0,
      y: Math.abs(delta_y / delta_time) || 0
    };
  },


  /**
   * calculate the angle between two coordinates
   * @param   {Touch}     touch1
   * @param   {Touch}     touch2
   * @returns {Number}    angle
   */
  getAngle: function getAngle(touch1, touch2) {
    var x = touch2.clientX - touch1.clientX
      , y = touch2.clientY - touch1.clientY;
    return Math.atan2(y, x) * 180 / Math.PI;
  },


  /**
   * angle to direction define
   * @param   {Touch}     touch1
   * @param   {Touch}     touch2
   * @returns {String}    direction constant, like DIRECTION_LEFT
   */
  getDirection: function getDirection(touch1, touch2) {
    var x = Math.abs(touch1.clientX - touch2.clientX)
      , y = Math.abs(touch1.clientY - touch2.clientY);
    if(x >= y) {
      return touch1.clientX - touch2.clientX > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return touch1.clientY - touch2.clientY > 0 ? DIRECTION_UP : DIRECTION_DOWN;
  },


  /**
   * calculate the distance between two touches
   * @param   {Touch}     touch1
   * @param   {Touch}     touch2
   * @returns {Number}    distance
   */
  getDistance: function getDistance(touch1, touch2) {
    var x = touch2.clientX - touch1.clientX
      , y = touch2.clientY - touch1.clientY;
    return Math.sqrt((x * x) + (y * y));
  },


  /**
   * calculate the scale factor between two touchLists (fingers)
   * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
   * @param   {Array}     start
   * @param   {Array}     end
   * @returns {Number}    scale
   */
  getScale: function getScale(start, end) {
    // need two fingers...
    if(start.length >= 2 && end.length >= 2) {
      return this.getDistance(end[0], end[1]) / this.getDistance(start[0], start[1]);
    }
    return 1;
  },


  /**
   * calculate the rotation degrees between two touchLists (fingers)
   * @param   {Array}     start
   * @param   {Array}     end
   * @returns {Number}    rotation
   */
  getRotation: function getRotation(start, end) {
    // need two fingers
    if(start.length >= 2 && end.length >= 2) {
      return this.getAngle(end[1], end[0]) - this.getAngle(start[1], start[0]);
    }
    return 0;
  },


  /**
   * boolean if the direction is vertical
   * @param    {String}    direction
   * @returns  {Boolean}   is_vertical
   */
  isVertical: function isVertical(direction) {
    return direction == DIRECTION_UP || direction == DIRECTION_DOWN;
  },


  /**
   * toggle browser default behavior with css props
   * @param   {HtmlElement}   element
   * @param   {Object}        css_props
   * @param   {Boolean}       toggle
   */
  toggleDefaultBehavior: function toggleDefaultBehavior(element, css_props, toggle) {
    if(!css_props || !element || !element.style) {
      return;
    }

    // with css properties for modern browsers
    Utils.each(['webkit', 'moz', 'Moz', 'ms', 'o', ''], function setStyle(vendor) {
      Utils.each(css_props, function(value, prop) {
          // vender prefix at the property
          if(vendor) {
            prop = vendor + prop.substring(0, 1).toUpperCase() + prop.substring(1);
          }
          // set the style
          if(prop in element.style) {
            element.style[prop] = !toggle && value;
          }
      });
    });

    var false_fn = function(){ return false; };

    // also the disable onselectstart
    if(css_props.userSelect == 'none') {
      element.onselectstart = !toggle && false_fn;
    }
    // and disable ondragstart
    if(css_props.userDrag == 'none') {
      element.ondragstart = !toggle && false_fn;
    }
  }
};


/**
 * create new hammer instance
 * all methods should return the instance itself, so it is chainable.
 * @param   {HTMLElement}       element
 * @param   {Object}            [options={}]
 * @returns {Hammer.Instance}
 * @constructor
 */
Hammer.Instance = function(element, options) {
  var self = this;

  // setup HammerJS window events and register all gestures
  // this also sets up the default options
  setup();

  this.element = element;

  // start/stop detection option
  this.enabled = true;

  // merge options
  this.options = Utils.extend(
    Utils.extend({}, Hammer.defaults),
    options || {});

  // add some css to the element to prevent the browser from doing its native behavoir
  if(this.options.stop_browser_behavior) {
    Utils.toggleDefaultBehavior(this.element, this.options.stop_browser_behavior, false);
  }

  // start detection on touchstart
  this.eventStartHandler = Event.onTouch(element, EVENT_START, function(ev) {
    if(self.enabled) {
      Detection.startDetect(self, ev);
    }
  });

  // keep a list of user event handlers which needs to be removed when calling 'dispose'
  this.eventHandlers = [];

  // return instance
  return this;
};


Hammer.Instance.prototype = {
  /**
   * bind events to the instance
   * @param   {String}      gesture
   * @param   {Function}    handler
   * @returns {Hammer.Instance}
   */
  on: function onEvent(gesture, handler) {
    var gestures = gesture.split(' ');
    Utils.each(gestures, function(gesture) {
      this.element.addEventListener(gesture, handler, false);
      this.eventHandlers.push({ gesture: gesture, handler: handler });
    }, this);
    return this;
  },


  /**
   * unbind events to the instance
   * @param   {String}      gesture
   * @param   {Function}    handler
   * @returns {Hammer.Instance}
   */
  off: function offEvent(gesture, handler) {
    var gestures = gesture.split(' ')
      , i, eh;
    Utils.each(gestures, function(gesture) {
      this.element.removeEventListener(gesture, handler, false);

      // remove the event handler from the internal list
      for(i=-1; (eh=this.eventHandlers[++i]);) {
        if(eh.gesture === gesture && eh.handler === handler) {
          this.eventHandlers.splice(i, 1);
        }
      }
    }, this);
    return this;
  },


  /**
   * trigger gesture event
   * @param   {String}      gesture
   * @param   {Object}      [eventData]
   * @returns {Hammer.Instance}
   */
  trigger: function triggerEvent(gesture, eventData) {
    // optional
    if(!eventData) {
      eventData = {};
    }

    // create DOM event
    var event = Hammer.DOCUMENT.createEvent('Event');
    event.initEvent(gesture, true, true);
    event.gesture = eventData;

    // trigger on the target if it is in the instance element,
    // this is for event delegation tricks
    var element = this.element;
    if(Utils.hasParent(eventData.target, element)) {
      element = eventData.target;
    }

    element.dispatchEvent(event);
    return this;
  },


  /**
   * enable of disable hammer.js detection
   * @param   {Boolean}   state
   * @returns {Hammer.Instance}
   */
  enable: function enable(state) {
    this.enabled = state;
    return this;
  },


  /**
   * dispose this hammer instance
   * @returns {Hammer.Instance}
   */
  dispose: function dispose() {
    var i, eh;

    // undo all changes made by stop_browser_behavior
    if(this.options.stop_browser_behavior) {
      Utils.toggleDefaultBehavior(this.element, this.options.stop_browser_behavior, true);
    }

    // unbind all custom event handlers
    for(i=-1; (eh=this.eventHandlers[++i]);) {
      this.element.removeEventListener(eh.gesture, eh.handler, false);
    }
    this.eventHandlers = [];

    // unbind the start event listener
    Event.unbindDom(this.element, Hammer.EVENT_TYPES[EVENT_START], this.eventStartHandler);

    return null;
  }
};


/**
 * this holds the last move event,
 * used to fix empty touchend issue
 * see the onTouch event for an explanation
 * @type {Object}
 */
var last_move_event = null;

/**
 * when the mouse is hold down, this is true
 * @type {Boolean}
 */
var should_detect = false;

/**
 * when touch events have been fired, this is true
 * @type {Boolean}
 */
var touch_triggered = false;


var Event = Hammer.event = {
  /**
   * simple addEventListener
   * @param   {HTMLElement}   element
   * @param   {String}        type
   * @param   {Function}      handler
   */
  bindDom: function(element, type, handler) {
    var types = type.split(' ');
    Utils.each(types, function(type){
      element.addEventListener(type, handler, false);
    });
  },


  /**
   * simple removeEventListener
   * @param   {HTMLElement}   element
   * @param   {String}        type
   * @param   {Function}      handler
   */
  unbindDom: function(element, type, handler) {
    var types = type.split(' ');
    Utils.each(types, function(type){
      element.removeEventListener(type, handler, false);
    });
  },


  /**
   * touch events with mouse fallback
   * @param   {HTMLElement}   element
   * @param   {String}        eventType        like EVENT_MOVE
   * @param   {Function}      handler
   */
  onTouch: function onTouch(element, eventType, handler) {
    var self = this;


    var bindDomOnTouch = function bindDomOnTouch(ev) {
      var srcEventType = ev.type.toLowerCase();

      // onmouseup, but when touchend has been fired we do nothing.
      // this is for touchdevices which also fire a mouseup on touchend
      if(Utils.inStr(srcEventType, 'mouse') && touch_triggered) {
        return;
      }

      // mousebutton must be down or a touch event
      else if(Utils.inStr(srcEventType, 'touch') ||   // touch events are always on screen
        Utils.inStr(srcEventType, 'pointerdown') || // pointerevents touch
        (Utils.inStr(srcEventType, 'mouse') && ev.which === 1)   // mouse is pressed
        ) {
        should_detect = true;
      }

      // mouse isn't pressed
      else if(Utils.inStr(srcEventType, 'mouse') && !ev.which) {
        should_detect = false;
      }


      // we are in a touch event, set the touch triggered bool to true,
      // this for the conflicts that may occur on ios and android
      if(Utils.inStr(srcEventType, 'touch') || Utils.inStr(srcEventType, 'pointer')) {
        touch_triggered = true;
      }

      // count the total touches on the screen
      var count_touches = 0;

      // when touch has been triggered in this detection session
      // and we are now handling a mouse event, we stop that to prevent conflicts
      if(should_detect) {
        // update pointerevent
        if(Hammer.HAS_POINTEREVENTS && eventType != EVENT_END) {
          count_touches = PointerEvent.updatePointer(eventType, ev);
        }
        // touch
        else if(Utils.inStr(srcEventType, 'touch')) {
          count_touches = ev.touches.length;
        }
        // mouse
        else if(!touch_triggered) {
          count_touches = Utils.inStr(srcEventType, 'up') ? 0 : 1;
        }


        // if we are in a end event, but when we remove one touch and
        // we still have enough, set eventType to move
        if(count_touches > 0 && eventType == EVENT_END) {
          eventType = EVENT_MOVE;
        }
        // no touches, force the end event
        else if(!count_touches) {
          eventType = EVENT_END;
        }

        // store the last move event
        if(count_touches || last_move_event === null) {
          last_move_event = ev;
        }


        // trigger the handler
        handler.call(Detection, self.collectEventData(element, eventType,
                                  self.getTouchList(last_move_event, eventType),
                                  ev) );

        // remove pointerevent from list
        if(Hammer.HAS_POINTEREVENTS && eventType == EVENT_END) {
          count_touches = PointerEvent.updatePointer(eventType, ev);
        }
      }

      // on the end we reset everything
      if(!count_touches) {
        last_move_event = null;
        should_detect = false;
        touch_triggered = false;
        PointerEvent.reset();
      }
    };

    this.bindDom(element, Hammer.EVENT_TYPES[eventType], bindDomOnTouch);

    // return the bound function to be able to unbind it later
    return bindDomOnTouch;
  },


  /**
   * we have different events for each device/browser
   * determine what we need and set them in the Hammer.EVENT_TYPES constant
   */
  determineEventTypes: function determineEventTypes() {
    // determine the eventtype we want to set
    var types;

    // pointerEvents magic
    if(Hammer.HAS_POINTEREVENTS) {
      types = PointerEvent.getEvents();
    }
    // on Android, iOS, blackberry, windows mobile we dont want any mouseevents
    else if(Hammer.NO_MOUSEEVENTS) {
      types = [
        'touchstart',
        'touchmove',
        'touchend touchcancel'];
    }
    // for non pointer events browsers and mixed browsers,
    // like chrome on windows8 touch laptop
    else {
      types = [
        'touchstart mousedown',
        'touchmove mousemove',
        'touchend touchcancel mouseup'];
    }

    Hammer.EVENT_TYPES[EVENT_START] = types[0];
    Hammer.EVENT_TYPES[EVENT_MOVE] = types[1];
    Hammer.EVENT_TYPES[EVENT_END] = types[2];
  },


  /**
   * create touchlist depending on the event
   * @param   {Object}    ev
   * @param   {String}    eventType   used by the fakemultitouch plugin
   */
  getTouchList: function getTouchList(ev/*, eventType*/) {
    // get the fake pointerEvent touchlist
    if(Hammer.HAS_POINTEREVENTS) {
      return PointerEvent.getTouchList();
    }

    // get the touchlist
    if(ev.touches) {
      return ev.touches;
    }

    // make fake touchlist from mouse position
    ev.identifier = 1;
    return [ev];
  },


  /**
   * collect event data for Hammer js
   * @param   {HTMLElement}   element
   * @param   {String}        eventType        like EVENT_MOVE
   * @param   {Object}        eventData
   */
  collectEventData: function collectEventData(element, eventType, touches, ev) {
    // find out pointerType
    var pointerType = POINTER_TOUCH;
    if(Utils.inStr(ev.type, 'mouse') || PointerEvent.matchType(POINTER_MOUSE, ev)) {
      pointerType = POINTER_MOUSE;
    }

    return {
      center     : Utils.getCenter(touches),
      timeStamp  : Date.now(),
      target     : ev.target,
      touches    : touches,
      eventType  : eventType,
      pointerType: pointerType,
      srcEvent   : ev,

      /**
       * prevent the browser default actions
       * mostly used to disable scrolling of the browser
       */
      preventDefault: function() {
        var srcEvent = this.srcEvent;
        srcEvent.preventManipulation && srcEvent.preventManipulation();
        srcEvent.preventDefault && srcEvent.preventDefault();
      },

      /**
       * stop bubbling the event up to its parents
       */
      stopPropagation: function() {
        this.srcEvent.stopPropagation();
      },

      /**
       * immediately stop gesture detection
       * might be useful after a swipe was detected
       * @return {*}
       */
      stopDetect: function() {
        return Detection.stopDetect();
      }
    };
  }
};

var PointerEvent = Hammer.PointerEvent = {
  /**
   * holds all pointers
   * @type {Object}
   */
  pointers: {},

  /**
   * get a list of pointers
   * @returns {Array}     touchlist
   */
  getTouchList: function getTouchList() {
    var touchlist = [];
    // we can use forEach since pointerEvents only is in IE10
    Utils.each(this.pointers, function(pointer){
      touchlist.push(pointer);
    });

    return touchlist;
  },

  /**
   * update the position of a pointer
   * @param   {String}   type             EVENT_END
   * @param   {Object}   pointerEvent
   */
  updatePointer: function updatePointer(type, pointerEvent) {
    if(type == EVENT_END) {
      delete this.pointers[pointerEvent.pointerId];
    }
    else {
      pointerEvent.identifier = pointerEvent.pointerId;
      this.pointers[pointerEvent.pointerId] = pointerEvent;
    }

    // it's save to use Object.keys, since pointerEvents are only in newer browsers
    return Object.keys(this.pointers).length;
  },

  /**
   * check if ev matches pointertype
   * @param   {String}        pointerType     POINTER_MOUSE
   * @param   {PointerEvent}  ev
   */
  matchType: function matchType(pointerType, ev) {
    if(!ev.pointerType) {
      return false;
    }

    var pt = ev.pointerType
      , types = {};

    types[POINTER_MOUSE] = (pt === POINTER_MOUSE);
    types[POINTER_TOUCH] = (pt === POINTER_TOUCH);
    types[POINTER_PEN] = (pt === POINTER_PEN);
    return types[pointerType];
  },


  /**
   * get events
   */
  getEvents: function getEvents() {
    return [
      'pointerdown MSPointerDown',
      'pointermove MSPointerMove',
      'pointerup pointercancel MSPointerUp MSPointerCancel'
    ];
  },

  /**
   * reset the list
   */
  reset: function resetList() {
    this.pointers = {};
  }
};


var Detection = Hammer.detection = {
  // contains all registred Hammer.gestures in the correct order
  gestures: [],

  // data of the current Hammer.gesture detection session
  current : null,

  // the previous Hammer.gesture session data
  // is a full clone of the previous gesture.current object
  previous: null,

  // when this becomes true, no gestures are fired
  stopped : false,


  /**
   * start Hammer.gesture detection
   * @param   {Hammer.Instance}   inst
   * @param   {Object}            eventData
   */
  startDetect: function startDetect(inst, eventData) {
    // already busy with a Hammer.gesture detection on an element
    if(this.current) {
      return;
    }

    this.stopped = false;

    // holds current session
    this.current = {
      inst              : inst, // reference to HammerInstance we're working for
      startEvent        : Utils.extend({}, eventData), // start eventData for distances, timing etc
      lastEvent         : false, // last eventData
      lastVelocityEvent : false, // last eventData for velocity.
      velocity          : false, // current velocity
      name              : '' // current gesture we're in/detected, can be 'tap', 'hold' etc
    };

    this.detect(eventData);
  },


  /**
   * Hammer.gesture detection
   * @param   {Object}    eventData
   */
  detect: function detect(eventData) {
    if(!this.current || this.stopped) {
      return;
    }

    // extend event data with calculations about scale, distance etc
    eventData = this.extendEventData(eventData);

    // hammer instance and instance options
    var inst = this.current.inst,
        inst_options = inst.options;

    // call Hammer.gesture handlers
    Utils.each(this.gestures, function triggerGesture(gesture) {
      // only when the instance options have enabled this gesture
      if(!this.stopped && inst_options[gesture.name] !== false && inst.enabled !== false ) {
        // if a handler returns false, we stop with the detection
        if(gesture.handler.call(gesture, eventData, inst) === false) {
          this.stopDetect();
          return false;
        }
      }
    }, this);

    // store as previous event event
    if(this.current) {
      this.current.lastEvent = eventData;
    }

    // end event, but not the last touch, so dont stop
    if(eventData.eventType == EVENT_END && !eventData.touches.length - 1) {
      this.stopDetect();
    }

    return eventData;
  },


  /**
   * clear the Hammer.gesture vars
   * this is called on endDetect, but can also be used when a final Hammer.gesture has been detected
   * to stop other Hammer.gestures from being fired
   */
  stopDetect: function stopDetect() {
    // clone current data to the store as the previous gesture
    // used for the double tap gesture, since this is an other gesture detect session
    this.previous = Utils.extend({}, this.current);

    // reset the current
    this.current = null;

    // stopped!
    this.stopped = true;
  },


  /**
   * calculate velocity
   * @param   {Object}  ev
   * @param   {Number}  delta_time
   * @param   {Number}  delta_x
   * @param   {Number}  delta_y
   */
  getVelocityData: function getVelocityData(ev, delta_time, delta_x, delta_y) {
    var cur = this.current
      , velocityEv = cur.lastVelocityEvent
      , velocity = cur.velocity;

    // calculate velocity every x ms
    if (velocityEv && ev.timeStamp - velocityEv.timeStamp > Hammer.UPDATE_VELOCITY_INTERVAL) {
      velocity = Utils.getVelocity(ev.timeStamp - velocityEv.timeStamp,
                                   ev.center.clientX - velocityEv.center.clientX,
                                  ev.center.clientY - velocityEv.center.clientY);
      cur.lastVelocityEvent = ev;
    }
    else if(!cur.velocity) {
      velocity = Utils.getVelocity(delta_time, delta_x, delta_y);
      cur.lastVelocityEvent = ev;
    }

    cur.velocity = velocity;

    ev.velocityX = velocity.x;
    ev.velocityY = velocity.y;
  },


  /**
   * calculate interim angle and direction
   * @param   {Object}  ev
   */
  getInterimData: function getInterimData(ev) {
    var lastEvent = this.current.lastEvent
      , angle
      , direction;

    // end events (e.g. dragend) don't have useful values for interimDirection & interimAngle
    // because the previous event has exactly the same coordinates
    // so for end events, take the previous values of interimDirection & interimAngle
    // instead of recalculating them and getting a spurious '0'
    if(ev.eventType == EVENT_END) {
      angle = lastEvent && lastEvent.interimAngle;
      direction = lastEvent && lastEvent.interimDirection;
    }
    else {
      angle = lastEvent && Utils.getAngle(lastEvent.center, ev.center);
      direction = lastEvent && Utils.getDirection(lastEvent.center, ev.center);
    }

    ev.interimAngle = angle;
    ev.interimDirection = direction;
  },


  /**
   * extend eventData for Hammer.gestures
   * @param   {Object}   evData
   * @returns {Object}   evData
   */
  extendEventData: function extendEventData(ev) {
    var cur = this.current
      , startEv = cur.startEvent;

    // if the touches change, set the new touches over the startEvent touches
    // this because touchevents don't have all the touches on touchstart, or the
    // user must place his fingers at the EXACT same time on the screen, which is not realistic
    // but, sometimes it happens that both fingers are touching at the EXACT same time
    if(ev.touches.length != startEv.touches.length || ev.touches === startEv.touches) {
      // extend 1 level deep to get the touchlist with the touch objects
      startEv.touches = [];
      Utils.each(ev.touches, function(touch) {
        startEv.touches.push(Utils.extend({}, touch));
      });
    }

    var delta_time = ev.timeStamp - startEv.timeStamp
      , delta_x = ev.center.clientX - startEv.center.clientX
      , delta_y = ev.center.clientY - startEv.center.clientY;

    this.getVelocityData(ev, delta_time, delta_x, delta_y);
    this.getInterimData(ev);

    Utils.extend(ev, {
      startEvent: startEv,

      deltaTime : delta_time,
      deltaX    : delta_x,
      deltaY    : delta_y,

      distance  : Utils.getDistance(startEv.center, ev.center),
      angle     : Utils.getAngle(startEv.center, ev.center),
      direction : Utils.getDirection(startEv.center, ev.center),

      scale     : Utils.getScale(startEv.touches, ev.touches),
      rotation  : Utils.getRotation(startEv.touches, ev.touches)
    });

    return ev;
  },


  /**
   * register new gesture
   * @param   {Object}    gesture object, see gestures.js for documentation
   * @returns {Array}     gestures
   */
  register: function register(gesture) {
    // add an enable gesture options if there is no given
    var options = gesture.defaults || {};
    if(options[gesture.name] === undefined) {
      options[gesture.name] = true;
    }

    // extend Hammer default options with the Hammer.gesture options
    Utils.extend(Hammer.defaults, options, true);

    // set its index
    gesture.index = gesture.index || 1000;

    // add Hammer.gesture to the list
    this.gestures.push(gesture);

    // sort the list by index
    this.gestures.sort(function(a, b) {
      if(a.index < b.index) { return -1; }
      if(a.index > b.index) { return 1; }
      return 0;
    });

    return this.gestures;
  }
};


/**
 * Drag
 * Move with x fingers (default 1) around on the page. Blocking the scrolling when
 * moving left and right is a good practice. When all the drag events are blocking
 * you disable scrolling on that area.
 * @events  drag, drapleft, dragright, dragup, dragdown
 */
Hammer.gestures.Drag = {
  name     : 'drag',
  index    : 50,
  defaults : {
    drag_min_distance            : 10,

    // Set correct_for_drag_min_distance to true to make the starting point of the drag
    // be calculated from where the drag was triggered, not from where the touch started.
    // Useful to avoid a jerk-starting drag, which can make fine-adjustments
    // through dragging difficult, and be visually unappealing.
    correct_for_drag_min_distance: true,

    // set 0 for unlimited, but this can conflict with transform
    drag_max_touches             : 1,

    // prevent default browser behavior when dragging occurs
    // be careful with it, it makes the element a blocking element
    // when you are using the drag gesture, it is a good practice to set this true
    drag_block_horizontal        : false,
    drag_block_vertical          : false,

    // drag_lock_to_axis keeps the drag gesture on the axis that it started on,
    // It disallows vertical directions if the initial direction was horizontal, and vice versa.
    drag_lock_to_axis            : false,

    // drag lock only kicks in when distance > drag_lock_min_distance
    // This way, locking occurs only when the distance has become large enough to reliably determine the direction
    drag_lock_min_distance       : 25
  },

  triggered: false,
  handler  : function dragGesture(ev, inst) {
    var cur = Detection.current;

    // current gesture isnt drag, but dragged is true
    // this means an other gesture is busy. now call dragend
    if(cur.name != this.name && this.triggered) {
      inst.trigger(this.name + 'end', ev);
      this.triggered = false;
      return;
    }

    // max touches
    if(inst.options.drag_max_touches > 0 &&
      ev.touches.length > inst.options.drag_max_touches) {
      return;
    }

    switch(ev.eventType) {
      case EVENT_START:
        this.triggered = false;
        break;

      case EVENT_MOVE:
        // when the distance we moved is too small we skip this gesture
        // or we can be already in dragging
        if(ev.distance < inst.options.drag_min_distance &&
          cur.name != this.name) {
          return;
        }

        var startCenter = cur.startEvent.center;

        // we are dragging!
        if(cur.name != this.name) {
          cur.name = this.name;
          if(inst.options.correct_for_drag_min_distance && ev.distance > 0) {
            // When a drag is triggered, set the event center to drag_min_distance pixels from the original event center.
            // Without this correction, the dragged distance would jumpstart at drag_min_distance pixels instead of at 0.
            // It might be useful to save the original start point somewhere
            var factor = Math.abs(inst.options.drag_min_distance / ev.distance);
            startCenter.pageX += ev.deltaX * factor;
            startCenter.pageY += ev.deltaY * factor;
            startCenter.clientX += ev.deltaX * factor;
            startCenter.clientY += ev.deltaY * factor;

            // recalculate event data using new start point
            ev = Detection.extendEventData(ev);
          }
        }

        // lock drag to axis?
        if(cur.lastEvent.drag_locked_to_axis ||
            ( inst.options.drag_lock_to_axis &&
              inst.options.drag_lock_min_distance <= ev.distance
            )) {
          ev.drag_locked_to_axis = true;
        }
        var last_direction = cur.lastEvent.direction;
        if(ev.drag_locked_to_axis && last_direction !== ev.direction) {
          // keep direction on the axis that the drag gesture started on
          if(Utils.isVertical(last_direction)) {
            ev.direction = (ev.deltaY < 0) ? DIRECTION_UP : DIRECTION_DOWN;
          }
          else {
            ev.direction = (ev.deltaX < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
          }
        }

        // first time, trigger dragstart event
        if(!this.triggered) {
          inst.trigger(this.name + 'start', ev);
          this.triggered = true;
        }

        // trigger events
        inst.trigger(this.name, ev);
        inst.trigger(this.name + ev.direction, ev);

        var is_vertical = Utils.isVertical(ev.direction);

        // block the browser events
        if((inst.options.drag_block_vertical && is_vertical) ||
          (inst.options.drag_block_horizontal && !is_vertical)) {
          ev.preventDefault();
        }
        break;

      case EVENT_END:
        // trigger dragend
        if(this.triggered) {
          inst.trigger(this.name + 'end', ev);
        }

        this.triggered = false;
        break;
    }
  }
};

/**
 * Hold
 * Touch stays at the same place for x time
 * @events  hold
 */
Hammer.gestures.Hold = {
  name    : 'hold',
  index   : 10,
  defaults: {
    hold_timeout  : 500,
    hold_threshold: 2
  },
  timer   : null,

  handler : function holdGesture(ev, inst) {
    switch(ev.eventType) {
      case EVENT_START:
        // clear any running timers
        clearTimeout(this.timer);

        // set the gesture so we can check in the timeout if it still is
        Detection.current.name = this.name;

        // set timer and if after the timeout it still is hold,
        // we trigger the hold event
        this.timer = setTimeout(function() {
          if(Detection.current.name == 'hold') {
            inst.trigger('hold', ev);
          }
        }, inst.options.hold_timeout);
        break;

      // when you move or end we clear the timer
      case EVENT_MOVE:
        if(ev.distance > inst.options.hold_threshold) {
          clearTimeout(this.timer);
        }
        break;

      case EVENT_END:
        clearTimeout(this.timer);
        break;
    }
  }
};

/**
 * Release
 * Called as last, tells the user has released the screen
 * @events  release
 */
Hammer.gestures.Release = {
  name   : 'release',
  index  : Infinity,
  handler: function releaseGesture(ev, inst) {
    if(ev.eventType == EVENT_END) {
      inst.trigger(this.name, ev);
    }
  }
};

/**
 * Swipe
 * triggers swipe events when the end velocity is above the threshold
 * for best usage, set prevent_default (on the drag gesture) to true
 * @events  swipe, swipeleft, swiperight, swipeup, swipedown
 */
Hammer.gestures.Swipe = {
  name    : 'swipe',
  index   : 40,
  defaults: {
    swipe_min_touches: 1,
    swipe_max_touches: 1,
    swipe_velocity   : 0.7
  },
  handler : function swipeGesture(ev, inst) {
    if(ev.eventType == EVENT_END) {
      // max touches
      if(ev.touches.length < inst.options.swipe_min_touches ||
        ev.touches.length > inst.options.swipe_max_touches) {
        return;
      }

      // when the distance we moved is too small we skip this gesture
      // or we can be already in dragging
      if(ev.velocityX > inst.options.swipe_velocity ||
        ev.velocityY > inst.options.swipe_velocity) {
        // trigger swipe events
        inst.trigger(this.name, ev);
        inst.trigger(this.name + ev.direction, ev);
      }
    }
  }
};

/**
 * Tap/DoubleTap
 * Quick touch at a place or double at the same place
 * @events  tap, doubletap
 */
Hammer.gestures.Tap = {
  name    : 'tap',
  index   : 100,
  defaults: {
    tap_max_touchtime : 250,
    tap_max_distance  : 10,
    tap_always        : true,
    doubletap_distance: 20,
    doubletap_interval: 300
  },

  has_moved: false,

  handler : function tapGesture(ev, inst) {
    var prev, since_prev, did_doubletap;

    // reset moved state
    if(ev.eventType == EVENT_START) {
      this.has_moved = false;
    }

    // Track the distance we've moved. If it's above the max ONCE, remember that (fixes #406).
    else if(ev.eventType == EVENT_MOVE && !this.moved) {
      this.has_moved = (ev.distance > inst.options.tap_max_distance);
    }

    else if(ev.eventType == EVENT_END &&
        ev.srcEvent.type != 'touchcancel' &&
        ev.deltaTime < inst.options.tap_max_touchtime && !this.has_moved) {

      // previous gesture, for the double tap since these are two different gesture detections
      prev = Detection.previous;
      since_prev = prev && prev.lastEvent && ev.timeStamp - prev.lastEvent.timeStamp;
      did_doubletap = false;

      // check if double tap
      if(prev && prev.name == 'tap' &&
          (since_prev && since_prev < inst.options.doubletap_interval) &&
          ev.distance < inst.options.doubletap_distance) {
        inst.trigger('doubletap', ev);
        did_doubletap = true;
      }

      // do a single tap
      if(!did_doubletap || inst.options.tap_always) {
        Detection.current.name = 'tap';
        inst.trigger(Detection.current.name, ev);
      }
    }
  }
};

/**
 * Touch
 * Called as first, tells the user has touched the screen
 * @events  touch
 */
Hammer.gestures.Touch = {
  name    : 'touch',
  index   : -Infinity,
  defaults: {
    // call preventDefault at touchstart, and makes the element blocking by
    // disabling the scrolling of the page, but it improves gestures like
    // transforming and dragging.
    // be careful with using this, it can be very annoying for users to be stuck
    // on the page
    prevent_default    : false,

    // disable mouse events, so only touch (or pen!) input triggers events
    prevent_mouseevents: false
  },
  handler : function touchGesture(ev, inst) {
    if(inst.options.prevent_mouseevents &&
        ev.pointerType == POINTER_MOUSE) {
      ev.stopDetect();
      return;
    }

    if(inst.options.prevent_default) {
      ev.preventDefault();
    }

    if(ev.eventType == EVENT_START) {
      inst.trigger(this.name, ev);
    }
  }
};


/**
 * Transform
 * User want to scale or rotate with 2 fingers
 * @events  transform, pinch, pinchin, pinchout, rotate
 */
Hammer.gestures.Transform = {
  name     : 'transform',
  index    : 45,
  defaults : {
    // factor, no scale is 1, zoomin is to 0 and zoomout until higher then 1
    transform_min_scale      : 0.01,
    // rotation in degrees
    transform_min_rotation   : 1,
    // prevent default browser behavior when two touches are on the screen
    // but it makes the element a blocking element
    // when you are using the transform gesture, it is a good practice to set this true
    transform_always_block   : false,
    // ensures that all touches occurred within the instance element
    transform_within_instance: false
  },

  triggered: false,

  handler  : function transformGesture(ev, inst) {
    // current gesture isnt drag, but dragged is true
    // this means an other gesture is busy. now call dragend
    if(Detection.current.name != this.name && this.triggered) {
      inst.trigger(this.name + 'end', ev);
      this.triggered = false;
      return;
    }

    // at least multitouch
    if(ev.touches.length < 2) {
      return;
    }

    // prevent default when two fingers are on the screen
    if(inst.options.transform_always_block) {
      ev.preventDefault();
    }

    // check if all touches occurred within the instance element
    if(inst.options.transform_within_instance) {
      for(var i=-1; ev.touches[++i];) {
        if(!Utils.hasParent(ev.touches[i].target, inst.element)) {
          return;
        }
      }
    }

    switch(ev.eventType) {
      case EVENT_START:
        this.triggered = false;
        break;

      case EVENT_MOVE:
        var scale_threshold = Math.abs(1 - ev.scale);
        var rotation_threshold = Math.abs(ev.rotation);

        // when the distance we moved is too small we skip this gesture
        // or we can be already in dragging
        if(scale_threshold < inst.options.transform_min_scale &&
          rotation_threshold < inst.options.transform_min_rotation) {
          return;
        }

        // we are transforming!
        Detection.current.name = this.name;

        // first time, trigger dragstart event
        if(!this.triggered) {
          inst.trigger(this.name + 'start', ev);
          this.triggered = true;
        }

        inst.trigger(this.name, ev); // basic transform event

        // trigger rotate event
        if(rotation_threshold > inst.options.transform_min_rotation) {
          inst.trigger('rotate', ev);
        }

        // trigger pinch event
        if(scale_threshold > inst.options.transform_min_scale) {
          inst.trigger('pinch', ev);
          inst.trigger('pinch' + (ev.scale<1 ? 'in' : 'out'), ev);
        }
        break;

      case EVENT_END:
        // trigger dragend
        if(this.triggered) {
          inst.trigger(this.name + 'end', ev);
        }

        this.triggered = false;
        break;
    }
  }
};

// AMD export
if(typeof define == 'function' && define.amd) {
  define(function(){
    return Hammer;
  });
}
// commonjs export
else if(typeof module == 'object' && module.exports) {
  module.exports = Hammer;
}
// browser export
else {
  window.Hammer = Hammer;
}

})(window);
},{}],4:[function(_dereq_,module,exports){
'use strict';

var EventEmitter = _dereq_('../bower_components/eventEmitter/EventEmitter.js');
var hammer = _dereq_('../bower_components/hammerjs/hammer.js');

var isTouchDevice = 'ontouchstart' in document.documentElement;

var utils = _dereq_('./utils.js'),
	tween = _dereq_('../bower_components/easy-tween/dist/easyTween.js');

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

},{"../bower_components/easy-tween/dist/easyTween.js":1,"../bower_components/eventEmitter/EventEmitter.js":2,"../bower_components/hammerjs/hammer.js":3,"./utils.js":5}],5:[function(_dereq_,module,exports){
'use strict';

var noop = exports.noop = function(){};

exports.requestFullscreen = document.documentElement.requestFullscreen ||
							document.documentElement.mozRequestFullScreen ||
							document.documentElement.webkitRequestFullscreen ||
							noop;

var bodyStyle = document.body.style;
exports.transformAttribute = 	(bodyStyle.msTransform !== void 0) && 'msTransform' ||
								(bodyStyle.webkitTransform !== void 0) && 'webkitTransform' ||
								(bodyStyle.MozTransform !== void 0) && 'MozTransform' ||
								'transform';
								
exports.transitionAttribute =	(bodyStyle.msTransition !== void 0) && 'msTransition' ||
								(bodyStyle.webkitTransition !== void 0) && 'webkitTransition' ||
								(bodyStyle.MozTransition !== void 0) && 'MozTransition' || 
								'transition';

exports.filterAttribute = 		(bodyStyle.msFilter !== void 0) && 'msFilter' ||
								(bodyStyle.webkitFilter !== void 0) && 'webkitFilter' ||
								(bodyStyle.MozFilter !== void 0) && 'MozFilter' ||
								'filter';

exports.cssFilterAttribute = 	(bodyStyle.msFilter !== void 0) && '-ms-filter' ||
								(bodyStyle.webkitFilter !== void 0) && '-webkit-filter' ||
								(bodyStyle.MozFilter !== void 0) && '-moz-filter' ||
								'filter';

exports.cssTransformAttribute = (bodyStyle.msTransform !== void 0) && '-ms-transform' ||
								(bodyStyle.webkitTransform !== void 0) && '-webkit-transform' ||
								(bodyStyle.MozTransform !== void 0) && '-moz-transform' ||
								'filter';
},{}]},{},[4])

(4)
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9vemFuL2NvZGUvYm9pbGVycGxhdGUtZ3VscC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL296YW4vY29kZS9iaWctc3VyZmFjZS9ib3dlcl9jb21wb25lbnRzL2V2ZW50RW1pdHRlci9FdmVudEVtaXR0ZXIuanMiLCIvVXNlcnMvb3phbi9jb2RlL2JpZy1zdXJmYWNlL2Jvd2VyX2NvbXBvbmVudHMvaGFtbWVyanMvaGFtbWVyLmpzIiwiL1VzZXJzL296YW4vY29kZS9iaWctc3VyZmFjZS9zcmMvc3VyZmFjZS5qcyIsIi9Vc2Vycy9vemFuL2NvZGUvYmlnLXN1cmZhY2Uvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXpFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4ZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxZ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiQmlnU3VyZmFjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohXG4gKiBFdmVudEVtaXR0ZXIgdjQuMi44IC0gZ2l0LmlvL2VlXG4gKiBPbGl2ZXIgQ2FsZHdlbGxcbiAqIE1JVCBsaWNlbnNlXG4gKiBAcHJlc2VydmVcbiAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIENsYXNzIGZvciBtYW5hZ2luZyBldmVudHMuXG5cdCAqIENhbiBiZSBleHRlbmRlZCB0byBwcm92aWRlIGV2ZW50IGZ1bmN0aW9uYWxpdHkgaW4gb3RoZXIgY2xhc3Nlcy5cblx0ICpcblx0ICogQGNsYXNzIEV2ZW50RW1pdHRlciBNYW5hZ2VzIGV2ZW50IHJlZ2lzdGVyaW5nIGFuZCBlbWl0dGluZy5cblx0ICovXG5cdGZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHt9XG5cblx0Ly8gU2hvcnRjdXRzIHRvIGltcHJvdmUgc3BlZWQgYW5kIHNpemVcblx0dmFyIHByb3RvID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZTtcblx0dmFyIGV4cG9ydHMgPSB0aGlzO1xuXHR2YXIgb3JpZ2luYWxHbG9iYWxWYWx1ZSA9IGV4cG9ydHMuRXZlbnRFbWl0dGVyO1xuXG5cdC8qKlxuXHQgKiBGaW5kcyB0aGUgaW5kZXggb2YgdGhlIGxpc3RlbmVyIGZvciB0aGUgZXZlbnQgaW4gaXRzIHN0b3JhZ2UgYXJyYXkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gbGlzdGVuZXJzIEFycmF5IG9mIGxpc3RlbmVycyB0byBzZWFyY2ggdGhyb3VnaC5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIGxvb2sgZm9yLlxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ9IEluZGV4IG9mIHRoZSBzcGVjaWZpZWQgbGlzdGVuZXIsIC0xIGlmIG5vdCBmb3VuZFxuXHQgKiBAYXBpIHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnMsIGxpc3RlbmVyKSB7XG5cdFx0dmFyIGkgPSBsaXN0ZW5lcnMubGVuZ3RoO1xuXHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdGlmIChsaXN0ZW5lcnNbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAtMTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbGlhcyBhIG1ldGhvZCB3aGlsZSBrZWVwaW5nIHRoZSBjb250ZXh0IGNvcnJlY3QsIHRvIGFsbG93IGZvciBvdmVyd3JpdGluZyBvZiB0YXJnZXQgbWV0aG9kLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgdGFyZ2V0IG1ldGhvZC5cblx0ICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBhbGlhc2VkIG1ldGhvZFxuXHQgKiBAYXBpIHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIGFsaWFzKG5hbWUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gYWxpYXNDbG9zdXJlKCkge1xuXHRcdFx0cmV0dXJuIHRoaXNbbmFtZV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGxpc3RlbmVyIGFycmF5IGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuXHQgKiBXaWxsIGluaXRpYWxpc2UgdGhlIGV2ZW50IG9iamVjdCBhbmQgbGlzdGVuZXIgYXJyYXlzIGlmIHJlcXVpcmVkLlxuXHQgKiBXaWxsIHJldHVybiBhbiBvYmplY3QgaWYgeW91IHVzZSBhIHJlZ2V4IHNlYXJjaC4gVGhlIG9iamVjdCBjb250YWlucyBrZXlzIGZvciBlYWNoIG1hdGNoZWQgZXZlbnQuIFNvIC9iYVtyel0vIG1pZ2h0IHJldHVybiBhbiBvYmplY3QgY29udGFpbmluZyBiYXIgYW5kIGJhei4gQnV0IG9ubHkgaWYgeW91IGhhdmUgZWl0aGVyIGRlZmluZWQgdGhlbSB3aXRoIGRlZmluZUV2ZW50IG9yIGFkZGVkIHNvbWUgbGlzdGVuZXJzIHRvIHRoZW0uXG5cdCAqIEVhY2ggcHJvcGVydHkgaW4gdGhlIG9iamVjdCByZXNwb25zZSBpcyBhbiBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJldHVybiB0aGUgbGlzdGVuZXJzIGZyb20uXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9uW118T2JqZWN0fSBBbGwgbGlzdGVuZXIgZnVuY3Rpb25zIGZvciB0aGUgZXZlbnQuXG5cdCAqL1xuXHRwcm90by5nZXRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRMaXN0ZW5lcnMoZXZ0KSB7XG5cdFx0dmFyIGV2ZW50cyA9IHRoaXMuX2dldEV2ZW50cygpO1xuXHRcdHZhciByZXNwb25zZTtcblx0XHR2YXIga2V5O1xuXG5cdFx0Ly8gUmV0dXJuIGEgY29uY2F0ZW5hdGVkIGFycmF5IG9mIGFsbCBtYXRjaGluZyBldmVudHMgaWZcblx0XHQvLyB0aGUgc2VsZWN0b3IgaXMgYSByZWd1bGFyIGV4cHJlc3Npb24uXG5cdFx0aWYgKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuXHRcdFx0cmVzcG9uc2UgPSB7fTtcblx0XHRcdGZvciAoa2V5IGluIGV2ZW50cykge1xuXHRcdFx0XHRpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGtleSkgJiYgZXZ0LnRlc3Qoa2V5KSkge1xuXHRcdFx0XHRcdHJlc3BvbnNlW2tleV0gPSBldmVudHNba2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJlc3BvbnNlID0gZXZlbnRzW2V2dF0gfHwgKGV2ZW50c1tldnRdID0gW10pO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fTtcblxuXHQvKipcblx0ICogVGFrZXMgYSBsaXN0IG9mIGxpc3RlbmVyIG9iamVjdHMgYW5kIGZsYXR0ZW5zIGl0IGludG8gYSBsaXN0IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucy5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3RbXX0gbGlzdGVuZXJzIFJhdyBsaXN0ZW5lciBvYmplY3RzLlxuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbltdfSBKdXN0IHRoZSBsaXN0ZW5lciBmdW5jdGlvbnMuXG5cdCAqL1xuXHRwcm90by5mbGF0dGVuTGlzdGVuZXJzID0gZnVuY3Rpb24gZmxhdHRlbkxpc3RlbmVycyhsaXN0ZW5lcnMpIHtcblx0XHR2YXIgZmxhdExpc3RlbmVycyA9IFtdO1xuXHRcdHZhciBpO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0ZmxhdExpc3RlbmVycy5wdXNoKGxpc3RlbmVyc1tpXS5saXN0ZW5lcik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZsYXRMaXN0ZW5lcnM7XG5cdH07XG5cblx0LyoqXG5cdCAqIEZldGNoZXMgdGhlIHJlcXVlc3RlZCBsaXN0ZW5lcnMgdmlhIGdldExpc3RlbmVycyBidXQgd2lsbCBhbHdheXMgcmV0dXJuIHRoZSByZXN1bHRzIGluc2lkZSBhbiBvYmplY3QuIFRoaXMgaXMgbWFpbmx5IGZvciBpbnRlcm5hbCB1c2UgYnV0IG90aGVycyBtYXkgZmluZCBpdCB1c2VmdWwuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJldHVybiB0aGUgbGlzdGVuZXJzIGZyb20uXG5cdCAqIEByZXR1cm4ge09iamVjdH0gQWxsIGxpc3RlbmVyIGZ1bmN0aW9ucyBmb3IgYW4gZXZlbnQgaW4gYW4gb2JqZWN0LlxuXHQgKi9cblx0cHJvdG8uZ2V0TGlzdGVuZXJzQXNPYmplY3QgPSBmdW5jdGlvbiBnZXRMaXN0ZW5lcnNBc09iamVjdChldnQpIHtcblx0XHR2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnMoZXZ0KTtcblx0XHR2YXIgcmVzcG9uc2U7XG5cblx0XHRpZiAobGlzdGVuZXJzIGluc3RhbmNlb2YgQXJyYXkpIHtcblx0XHRcdHJlc3BvbnNlID0ge307XG5cdFx0XHRyZXNwb25zZVtldnRdID0gbGlzdGVuZXJzO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXNwb25zZSB8fCBsaXN0ZW5lcnM7XG5cdH07XG5cblx0LyoqXG5cdCAqIEFkZHMgYSBsaXN0ZW5lciBmdW5jdGlvbiB0byB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuXHQgKiBUaGUgbGlzdGVuZXIgd2lsbCBub3QgYmUgYWRkZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUuXG5cdCAqIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgaXQgaXMgY2FsbGVkLlxuXHQgKiBJZiB5b3UgcGFzcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhcyB0aGUgZXZlbnQgbmFtZSB0aGVuIHRoZSBsaXN0ZW5lciB3aWxsIGJlIGFkZGVkIHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0by5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkLiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkIGFmdGVyIGNhbGxpbmcuXG5cdCAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuXHQgKi9cblx0cHJvdG8uYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcihldnQsIGxpc3RlbmVyKSB7XG5cdFx0dmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcblx0XHR2YXIgbGlzdGVuZXJJc1dyYXBwZWQgPSB0eXBlb2YgbGlzdGVuZXIgPT09ICdvYmplY3QnO1xuXHRcdHZhciBrZXk7XG5cblx0XHRmb3IgKGtleSBpbiBsaXN0ZW5lcnMpIHtcblx0XHRcdGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzW2tleV0sIGxpc3RlbmVyKSA9PT0gLTEpIHtcblx0XHRcdFx0bGlzdGVuZXJzW2tleV0ucHVzaChsaXN0ZW5lcklzV3JhcHBlZCA/IGxpc3RlbmVyIDoge1xuXHRcdFx0XHRcdGxpc3RlbmVyOiBsaXN0ZW5lcixcblx0XHRcdFx0XHRvbmNlOiBmYWxzZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHQvKipcblx0ICogQWxpYXMgb2YgYWRkTGlzdGVuZXJcblx0ICovXG5cdHByb3RvLm9uID0gYWxpYXMoJ2FkZExpc3RlbmVyJyk7XG5cblx0LyoqXG5cdCAqIFNlbWktYWxpYXMgb2YgYWRkTGlzdGVuZXIuIEl0IHdpbGwgYWRkIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlXG5cdCAqIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZCBhZnRlciBpdHMgZmlyc3QgZXhlY3V0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVyIHRvLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgY2FsbGluZy5cblx0ICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG5cdCAqL1xuXHRwcm90by5hZGRPbmNlTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRPbmNlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuXHRcdHJldHVybiB0aGlzLmFkZExpc3RlbmVyKGV2dCwge1xuXHRcdFx0bGlzdGVuZXI6IGxpc3RlbmVyLFxuXHRcdFx0b25jZTogdHJ1ZVxuXHRcdH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBBbGlhcyBvZiBhZGRPbmNlTGlzdGVuZXIuXG5cdCAqL1xuXHRwcm90by5vbmNlID0gYWxpYXMoJ2FkZE9uY2VMaXN0ZW5lcicpO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIGFuIGV2ZW50IG5hbWUuIFRoaXMgaXMgcmVxdWlyZWQgaWYgeW91IHdhbnQgdG8gdXNlIGEgcmVnZXggdG8gYWRkIGEgbGlzdGVuZXIgdG8gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIElmIHlvdSBkb24ndCBkbyB0aGlzIHRoZW4gaG93IGRvIHlvdSBleHBlY3QgaXQgdG8ga25vdyB3aGF0IGV2ZW50IHRvIGFkZCB0bz8gU2hvdWxkIGl0IGp1c3QgYWRkIHRvIGV2ZXJ5IHBvc3NpYmxlIG1hdGNoIGZvciBhIHJlZ2V4PyBOby4gVGhhdCBpcyBzY2FyeSBhbmQgYmFkLlxuXHQgKiBZb3UgbmVlZCB0byB0ZWxsIGl0IHdoYXQgZXZlbnQgbmFtZXMgc2hvdWxkIGJlIG1hdGNoZWQgYnkgYSByZWdleC5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBjcmVhdGUuXG5cdCAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuXHQgKi9cblx0cHJvdG8uZGVmaW5lRXZlbnQgPSBmdW5jdGlvbiBkZWZpbmVFdmVudChldnQpIHtcblx0XHR0aGlzLmdldExpc3RlbmVycyhldnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBVc2VzIGRlZmluZUV2ZW50IHRvIGRlZmluZSBtdWx0aXBsZSBldmVudHMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nW119IGV2dHMgQW4gYXJyYXkgb2YgZXZlbnQgbmFtZXMgdG8gZGVmaW5lLlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cblx0ICovXG5cdHByb3RvLmRlZmluZUV2ZW50cyA9IGZ1bmN0aW9uIGRlZmluZUV2ZW50cyhldnRzKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBldnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHR0aGlzLmRlZmluZUV2ZW50KGV2dHNbaV0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHQvKipcblx0ICogUmVtb3ZlcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIGZyb20gdGhlIHNwZWNpZmllZCBldmVudC5cblx0ICogV2hlbiBwYXNzZWQgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgdGhlIGV2ZW50IG5hbWUsIGl0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gcmVtb3ZlIGZyb20gdGhlIGV2ZW50LlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cblx0ICovXG5cdHByb3RvLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuXHRcdHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCk7XG5cdFx0dmFyIGluZGV4O1xuXHRcdHZhciBrZXk7XG5cblx0XHRmb3IgKGtleSBpbiBsaXN0ZW5lcnMpIHtcblx0XHRcdGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRpbmRleCA9IGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnNba2V5XSwgbGlzdGVuZXIpO1xuXG5cdFx0XHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0XHRsaXN0ZW5lcnNba2V5XS5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0LyoqXG5cdCAqIEFsaWFzIG9mIHJlbW92ZUxpc3RlbmVyXG5cdCAqL1xuXHRwcm90by5vZmYgPSBhbGlhcygncmVtb3ZlTGlzdGVuZXInKTtcblxuXHQvKipcblx0ICogQWRkcyBsaXN0ZW5lcnMgaW4gYnVsayB1c2luZyB0aGUgbWFuaXB1bGF0ZUxpc3RlbmVycyBtZXRob2QuXG5cdCAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHlvdSBjYW4gYWRkIHRvIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGFuIGV2ZW50IG5hbWUgYW5kIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0byBiZSBhZGRlZC5cblx0ICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gYWRkIHRoZSBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuXHQgKiBZZWFoLCB0aGlzIGZ1bmN0aW9uIGRvZXMgcXVpdGUgYSBiaXQuIFRoYXQncyBwcm9iYWJseSBhIGJhZCB0aGluZy5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIGFkZCB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cblx0ICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gYWRkLlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cblx0ICovXG5cdHByb3RvLmFkZExpc3RlbmVycyA9IGZ1bmN0aW9uIGFkZExpc3RlbmVycyhldnQsIGxpc3RlbmVycykge1xuXHRcdC8vIFBhc3MgdGhyb3VnaCB0byBtYW5pcHVsYXRlTGlzdGVuZXJzXG5cdFx0cmV0dXJuIHRoaXMubWFuaXB1bGF0ZUxpc3RlbmVycyhmYWxzZSwgZXZ0LCBsaXN0ZW5lcnMpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGxpc3RlbmVycyBpbiBidWxrIHVzaW5nIHRoZSBtYW5pcHVsYXRlTGlzdGVuZXJzIG1ldGhvZC5cblx0ICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgeW91IGNhbiByZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLlxuXHQgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgcmVtb3ZlZC5cblx0ICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgZnJvbSBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byByZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cblx0ICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gcmVtb3ZlLlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cblx0ICovXG5cdHByb3RvLnJlbW92ZUxpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycyhldnQsIGxpc3RlbmVycykge1xuXHRcdC8vIFBhc3MgdGhyb3VnaCB0byBtYW5pcHVsYXRlTGlzdGVuZXJzXG5cdFx0cmV0dXJuIHRoaXMubWFuaXB1bGF0ZUxpc3RlbmVycyh0cnVlLCBldnQsIGxpc3RlbmVycyk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEVkaXRzIGxpc3RlbmVycyBpbiBidWxrLiBUaGUgYWRkTGlzdGVuZXJzIGFuZCByZW1vdmVMaXN0ZW5lcnMgbWV0aG9kcyBib3RoIHVzZSB0aGlzIHRvIGRvIHRoZWlyIGpvYi4gWW91IHNob3VsZCByZWFsbHkgdXNlIHRob3NlIGluc3RlYWQsIHRoaXMgaXMgYSBsaXR0bGUgbG93ZXIgbGV2ZWwuXG5cdCAqIFRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGRldGVybWluZSBpZiB0aGUgbGlzdGVuZXJzIGFyZSByZW1vdmVkICh0cnVlKSBvciBhZGRlZCAoZmFsc2UpLlxuXHQgKiBJZiB5b3UgcGFzcyBhbiBvYmplY3QgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB5b3UgY2FuIGFkZC9yZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLlxuXHQgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgYWRkZWQvcmVtb3ZlZC5cblx0ICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWFuaXB1bGF0ZSB0aGUgbGlzdGVuZXJzIG9mIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cblx0ICpcblx0ICogQHBhcmFtIHtCb29sZWFufSByZW1vdmUgVHJ1ZSBpZiB5b3Ugd2FudCB0byByZW1vdmUgbGlzdGVuZXJzLCBmYWxzZSBpZiB5b3Ugd2FudCB0byBhZGQuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byBhZGQvcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gW2xpc3RlbmVyc10gQW4gb3B0aW9uYWwgYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRvIGFkZC9yZW1vdmUuXG5cdCAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuXHQgKi9cblx0cHJvdG8ubWFuaXB1bGF0ZUxpc3RlbmVycyA9IGZ1bmN0aW9uIG1hbmlwdWxhdGVMaXN0ZW5lcnMocmVtb3ZlLCBldnQsIGxpc3RlbmVycykge1xuXHRcdHZhciBpO1xuXHRcdHZhciB2YWx1ZTtcblx0XHR2YXIgc2luZ2xlID0gcmVtb3ZlID8gdGhpcy5yZW1vdmVMaXN0ZW5lciA6IHRoaXMuYWRkTGlzdGVuZXI7XG5cdFx0dmFyIG11bHRpcGxlID0gcmVtb3ZlID8gdGhpcy5yZW1vdmVMaXN0ZW5lcnMgOiB0aGlzLmFkZExpc3RlbmVycztcblxuXHRcdC8vIElmIGV2dCBpcyBhbiBvYmplY3QgdGhlbiBwYXNzIGVhY2ggb2YgaXRzIHByb3BlcnRpZXMgdG8gdGhpcyBtZXRob2Rcblx0XHRpZiAodHlwZW9mIGV2dCA9PT0gJ29iamVjdCcgJiYgIShldnQgaW5zdGFuY2VvZiBSZWdFeHApKSB7XG5cdFx0XHRmb3IgKGkgaW4gZXZ0KSB7XG5cdFx0XHRcdGlmIChldnQuaGFzT3duUHJvcGVydHkoaSkgJiYgKHZhbHVlID0gZXZ0W2ldKSkge1xuXHRcdFx0XHRcdC8vIFBhc3MgdGhlIHNpbmdsZSBsaXN0ZW5lciBzdHJhaWdodCB0aHJvdWdoIHRvIHRoZSBzaW5ndWxhciBtZXRob2Rcblx0XHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRzaW5nbGUuY2FsbCh0aGlzLCBpLCB2YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gT3RoZXJ3aXNlIHBhc3MgYmFjayB0byB0aGUgbXVsdGlwbGUgZnVuY3Rpb25cblx0XHRcdFx0XHRcdG11bHRpcGxlLmNhbGwodGhpcywgaSwgdmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdC8vIFNvIGV2dCBtdXN0IGJlIGEgc3RyaW5nXG5cdFx0XHQvLyBBbmQgbGlzdGVuZXJzIG11c3QgYmUgYW4gYXJyYXkgb2YgbGlzdGVuZXJzXG5cdFx0XHQvLyBMb29wIG92ZXIgaXQgYW5kIHBhc3MgZWFjaCBvbmUgdG8gdGhlIG11bHRpcGxlIG1ldGhvZFxuXHRcdFx0aSA9IGxpc3RlbmVycy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRcdHNpbmdsZS5jYWxsKHRoaXMsIGV2dCwgbGlzdGVuZXJzW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHQvKipcblx0ICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGZyb20gYSBzcGVjaWZpZWQgZXZlbnQuXG5cdCAqIElmIHlvdSBkbyBub3Qgc3BlY2lmeSBhbiBldmVudCB0aGVuIGFsbCBsaXN0ZW5lcnMgd2lsbCBiZSByZW1vdmVkLlxuXHQgKiBUaGF0IG1lYW5zIGV2ZXJ5IGV2ZW50IHdpbGwgYmUgZW1wdGllZC5cblx0ICogWW91IGNhbiBhbHNvIHBhc3MgYSByZWdleCB0byByZW1vdmUgYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IFtldnRdIE9wdGlvbmFsIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvci4gV2lsbCByZW1vdmUgZnJvbSBldmVyeSBldmVudCBpZiBub3QgcGFzc2VkLlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cblx0ICovXG5cdHByb3RvLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZXZ0KSB7XG5cdFx0dmFyIHR5cGUgPSB0eXBlb2YgZXZ0O1xuXHRcdHZhciBldmVudHMgPSB0aGlzLl9nZXRFdmVudHMoKTtcblx0XHR2YXIga2V5O1xuXG5cdFx0Ly8gUmVtb3ZlIGRpZmZlcmVudCB0aGluZ3MgZGVwZW5kaW5nIG9uIHRoZSBzdGF0ZSBvZiBldnRcblx0XHRpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50XG5cdFx0XHRkZWxldGUgZXZlbnRzW2V2dF07XG5cdFx0fVxuXHRcdGVsc2UgaWYgKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuXHRcdFx0Ly8gUmVtb3ZlIGFsbCBldmVudHMgbWF0Y2hpbmcgdGhlIHJlZ2V4LlxuXHRcdFx0Zm9yIChrZXkgaW4gZXZlbnRzKSB7XG5cdFx0XHRcdGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBldnQudGVzdChrZXkpKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIGV2ZW50c1trZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Ly8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgaW4gYWxsIGV2ZW50c1xuXHRcdFx0ZGVsZXRlIHRoaXMuX2V2ZW50cztcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHQvKipcblx0ICogQWxpYXMgb2YgcmVtb3ZlRXZlbnQuXG5cdCAqXG5cdCAqIEFkZGVkIHRvIG1pcnJvciB0aGUgbm9kZSBBUEkuXG5cdCAqL1xuXHRwcm90by5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBhbGlhcygncmVtb3ZlRXZlbnQnKTtcblxuXHQvKipcblx0ICogRW1pdHMgYW4gZXZlbnQgb2YgeW91ciBjaG9pY2UuXG5cdCAqIFdoZW4gZW1pdHRlZCwgZXZlcnkgbGlzdGVuZXIgYXR0YWNoZWQgdG8gdGhhdCBldmVudCB3aWxsIGJlIGV4ZWN1dGVkLlxuXHQgKiBJZiB5b3UgcGFzcyB0aGUgb3B0aW9uYWwgYXJndW1lbnQgYXJyYXkgdGhlbiB0aG9zZSBhcmd1bWVudHMgd2lsbCBiZSBwYXNzZWQgdG8gZXZlcnkgbGlzdGVuZXIgdXBvbiBleGVjdXRpb24uXG5cdCAqIEJlY2F1c2UgaXQgdXNlcyBgYXBwbHlgLCB5b3VyIGFycmF5IG9mIGFyZ3VtZW50cyB3aWxsIGJlIHBhc3NlZCBhcyBpZiB5b3Ugd3JvdGUgdGhlbSBvdXQgc2VwYXJhdGVseS5cblx0ICogU28gdGhleSB3aWxsIG5vdCBhcnJpdmUgd2l0aGluIHRoZSBhcnJheSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhleSB3aWxsIGJlIHNlcGFyYXRlLlxuXHQgKiBZb3UgY2FuIGFsc28gcGFzcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBlbWl0IHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdCBhbmQgZXhlY3V0ZSBsaXN0ZW5lcnMgZm9yLlxuXHQgKiBAcGFyYW0ge0FycmF5fSBbYXJnc10gT3B0aW9uYWwgYXJyYXkgb2YgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBlYWNoIGxpc3RlbmVyLlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cblx0ICovXG5cdHByb3RvLmVtaXRFdmVudCA9IGZ1bmN0aW9uIGVtaXRFdmVudChldnQsIGFyZ3MpIHtcblx0XHR2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuXHRcdHZhciBsaXN0ZW5lcjtcblx0XHR2YXIgaTtcblx0XHR2YXIga2V5O1xuXHRcdHZhciByZXNwb25zZTtcblxuXHRcdGZvciAoa2V5IGluIGxpc3RlbmVycykge1xuXHRcdFx0aWYgKGxpc3RlbmVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGkgPSBsaXN0ZW5lcnNba2V5XS5sZW5ndGg7XG5cblx0XHRcdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0XHRcdC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCBzaGFsbCBiZSByZW1vdmVkIGZyb20gdGhlIGV2ZW50XG5cdFx0XHRcdFx0Ly8gVGhlIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGVpdGhlciB3aXRoIGEgYmFzaWMgY2FsbCBvciBhbiBhcHBseSBpZiB0aGVyZSBpcyBhbiBhcmdzIGFycmF5XG5cdFx0XHRcdFx0bGlzdGVuZXIgPSBsaXN0ZW5lcnNba2V5XVtpXTtcblxuXHRcdFx0XHRcdGlmIChsaXN0ZW5lci5vbmNlID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIubGlzdGVuZXIpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3BvbnNlID0gbGlzdGVuZXIubGlzdGVuZXIuYXBwbHkodGhpcywgYXJncyB8fCBbXSk7XG5cblx0XHRcdFx0XHRpZiAocmVzcG9uc2UgPT09IHRoaXMuX2dldE9uY2VSZXR1cm5WYWx1ZSgpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIubGlzdGVuZXIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBBbGlhcyBvZiBlbWl0RXZlbnRcblx0ICovXG5cdHByb3RvLnRyaWdnZXIgPSBhbGlhcygnZW1pdEV2ZW50Jyk7XG5cblx0LyoqXG5cdCAqIFN1YnRseSBkaWZmZXJlbnQgZnJvbSBlbWl0RXZlbnQgaW4gdGhhdCBpdCB3aWxsIHBhc3MgaXRzIGFyZ3VtZW50cyBvbiB0byB0aGUgbGlzdGVuZXJzLCBhcyBvcHBvc2VkIHRvIHRha2luZyBhIHNpbmdsZSBhcnJheSBvZiBhcmd1bWVudHMgdG8gcGFzcyBvbi5cblx0ICogQXMgd2l0aCBlbWl0RXZlbnQsIHlvdSBjYW4gcGFzcyBhIHJlZ2V4IGluIHBsYWNlIG9mIHRoZSBldmVudCBuYW1lIHRvIGVtaXQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBlbWl0IGFuZCBleGVjdXRlIGxpc3RlbmVycyBmb3IuXG5cdCAqIEBwYXJhbSB7Li4uKn0gT3B0aW9uYWwgYWRkaXRpb25hbCBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGVhY2ggbGlzdGVuZXIuXG5cdCAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuXHQgKi9cblx0cHJvdG8uZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZ0KSB7XG5cdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXHRcdHJldHVybiB0aGlzLmVtaXRFdmVudChldnQsIGFyZ3MpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBjdXJyZW50IHZhbHVlIHRvIGNoZWNrIGFnYWluc3Qgd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLiBJZiBhXG5cdCAqIGxpc3RlbmVycyByZXR1cm4gdmFsdWUgbWF0Y2hlcyB0aGUgb25lIHNldCBoZXJlIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkXG5cdCAqIGFmdGVyIGV4ZWN1dGlvbi4gVGhpcyB2YWx1ZSBkZWZhdWx0cyB0byB0cnVlLlxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBuZXcgdmFsdWUgdG8gY2hlY2sgZm9yIHdoZW4gZXhlY3V0aW5nIGxpc3RlbmVycy5cblx0ICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG5cdCAqL1xuXHRwcm90by5zZXRPbmNlUmV0dXJuVmFsdWUgPSBmdW5jdGlvbiBzZXRPbmNlUmV0dXJuVmFsdWUodmFsdWUpIHtcblx0XHR0aGlzLl9vbmNlUmV0dXJuVmFsdWUgPSB2YWx1ZTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHQvKipcblx0ICogRmV0Y2hlcyB0aGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBhZ2FpbnN0IHdoZW4gZXhlY3V0aW5nIGxpc3RlbmVycy4gSWZcblx0ICogdGhlIGxpc3RlbmVycyByZXR1cm4gdmFsdWUgbWF0Y2hlcyB0aGlzIG9uZSB0aGVuIGl0IHNob3VsZCBiZSByZW1vdmVkXG5cdCAqIGF1dG9tYXRpY2FsbHkuIEl0IHdpbGwgcmV0dXJuIHRydWUgYnkgZGVmYXVsdC5cblx0ICpcblx0ICogQHJldHVybiB7KnxCb29sZWFufSBUaGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBmb3Igb3IgdGhlIGRlZmF1bHQsIHRydWUuXG5cdCAqIEBhcGkgcHJpdmF0ZVxuXHQgKi9cblx0cHJvdG8uX2dldE9uY2VSZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uIF9nZXRPbmNlUmV0dXJuVmFsdWUoKSB7XG5cdFx0aWYgKHRoaXMuaGFzT3duUHJvcGVydHkoJ19vbmNlUmV0dXJuVmFsdWUnKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX29uY2VSZXR1cm5WYWx1ZTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIEZldGNoZXMgdGhlIGV2ZW50cyBvYmplY3QgYW5kIGNyZWF0ZXMgb25lIGlmIHJlcXVpcmVkLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBldmVudHMgc3RvcmFnZSBvYmplY3QuXG5cdCAqIEBhcGkgcHJpdmF0ZVxuXHQgKi9cblx0cHJvdG8uX2dldEV2ZW50cyA9IGZ1bmN0aW9uIF9nZXRFdmVudHMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZXZlcnRzIHRoZSBnbG9iYWwge0BsaW5rIEV2ZW50RW1pdHRlcn0gdG8gaXRzIHByZXZpb3VzIHZhbHVlIGFuZCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoaXMgdmVyc2lvbi5cblx0ICpcblx0ICogQHJldHVybiB7RnVuY3Rpb259IE5vbiBjb25mbGljdGluZyBFdmVudEVtaXR0ZXIgY2xhc3MuXG5cdCAqL1xuXHRFdmVudEVtaXR0ZXIubm9Db25mbGljdCA9IGZ1bmN0aW9uIG5vQ29uZmxpY3QoKSB7XG5cdFx0ZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBvcmlnaW5hbEdsb2JhbFZhbHVlO1xuXHRcdHJldHVybiBFdmVudEVtaXR0ZXI7XG5cdH07XG5cblx0Ly8gRXhwb3NlIHRoZSBjbGFzcyBlaXRoZXIgdmlhIEFNRCwgQ29tbW9uSlMgb3IgdGhlIGdsb2JhbCBvYmplY3Rcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gRXZlbnRFbWl0dGVyO1xuXHRcdH0pO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKXtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblx0fVxuXHRlbHNlIHtcblx0XHR0aGlzLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblx0fVxufS5jYWxsKHRoaXMpKTtcbiIsIi8qISBIYW1tZXIuSlMgLSB2MS4wLjExIC0gMjAxNC0wNS0yMFxuICogaHR0cDovL2VpZ2h0bWVkaWEuZ2l0aHViLmlvL2hhbW1lci5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBKb3JpayBUYW5nZWxkZXIgPGoudGFuZ2VsZGVyQGdtYWlsLmNvbT47XG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgKi9cblxuKGZ1bmN0aW9uKHdpbmRvdywgdW5kZWZpbmVkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBIYW1tZXJcbiAqIHVzZSB0aGlzIHRvIGNyZWF0ZSBpbnN0YW5jZXNcbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gICBlbGVtZW50XG4gKiBAcGFyYW0gICB7T2JqZWN0fSAgICAgICAgb3B0aW9uc1xuICogQHJldHVybnMge0hhbW1lci5JbnN0YW5jZX1cbiAqIEBjb25zdHJ1Y3RvclxuICovXG52YXIgSGFtbWVyID0gZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IEhhbW1lci5JbnN0YW5jZShlbGVtZW50LCBvcHRpb25zIHx8IHt9KTtcbn07XG5cbkhhbW1lci5WRVJTSU9OID0gJzEuMC4xMSc7XG5cbi8vIGRlZmF1bHQgc2V0dGluZ3NcbkhhbW1lci5kZWZhdWx0cyA9IHtcbiAgLy8gYWRkIHN0eWxlcyBhbmQgYXR0cmlidXRlcyB0byB0aGUgZWxlbWVudCB0byBwcmV2ZW50IHRoZSBicm93c2VyIGZyb20gZG9pbmdcbiAgLy8gaXRzIG5hdGl2ZSBiZWhhdmlvci4gdGhpcyBkb2VzbnQgcHJldmVudCB0aGUgc2Nyb2xsaW5nLCBidXQgY2FuY2Vsc1xuICAvLyB0aGUgY29udGV4dG1lbnUsIHRhcCBoaWdobGlnaHRpbmcgZXRjXG4gIC8vIHNldCB0byBmYWxzZSB0byBkaXNhYmxlIHRoaXNcbiAgc3RvcF9icm93c2VyX2JlaGF2aW9yOiB7XG4gICAgLy8gdGhpcyBhbHNvIHRyaWdnZXJzIG9uc2VsZWN0c3RhcnQ9ZmFsc2UgZm9yIElFXG4gICAgdXNlclNlbGVjdCAgICAgICA6ICdub25lJyxcbiAgICAvLyB0aGlzIG1ha2VzIHRoZSBlbGVtZW50IGJsb2NraW5nIGluIElFMTA+IGFuZCBDaHJvbWUgMzU+LCB5b3UgY291bGQgZXhwZXJpbWVudCB3aXRoIHRoZSB2YWx1ZVxuICAgIC8vIHNlZSBmb3IgbW9yZSBvcHRpb25zIHRoZSB3aWtpOiBodHRwczovL2dpdGh1Yi5jb20vRWlnaHRNZWRpYS9oYW1tZXIuanMvd2lraVxuICAgIHRvdWNoQWN0aW9uICAgICAgOiAncGFuLXknLFxuXG4gICAgdG91Y2hDYWxsb3V0ICAgICA6ICdub25lJyxcbiAgICBjb250ZW50Wm9vbWluZyAgIDogJ25vbmUnLFxuICAgIHVzZXJEcmFnICAgICAgICAgOiAnbm9uZScsXG4gICAgdGFwSGlnaGxpZ2h0Q29sb3I6ICdyZ2JhKDAsMCwwLDApJ1xuICB9XG5cbiAgLy9cbiAgLy8gbW9yZSBzZXR0aW5ncyBhcmUgZGVmaW5lZCBwZXIgZ2VzdHVyZSBhdCAvZ2VzdHVyZXNcbiAgLy9cbn07XG5cblxuLy8gZGV0ZWN0IHRvdWNoZXZlbnRzXG5IYW1tZXIuSEFTX1BPSU5URVJFVkVOVFMgPSB3aW5kb3cubmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkIHx8IHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZDtcbkhhbW1lci5IQVNfVE9VQ0hFVkVOVFMgPSAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KTtcblxuLy8gZG9udCB1c2UgbW91c2VldmVudHMgb24gbW9iaWxlIGRldmljZXNcbkhhbW1lci5NT0JJTEVfUkVHRVggPSAvbW9iaWxlfHRhYmxldHxpcChhZHxob25lfG9kKXxhbmRyb2lkfHNpbGsvaTtcbkhhbW1lci5OT19NT1VTRUVWRU5UUyA9IEhhbW1lci5IQVNfVE9VQ0hFVkVOVFMgJiYgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goSGFtbWVyLk1PQklMRV9SRUdFWCk7XG5cbi8vIGV2ZW50dHlwZXMgcGVyIHRvdWNoZXZlbnQgKHN0YXJ0LCBtb3ZlLCBlbmQpXG4vLyBhcmUgZmlsbGVkIGJ5IEV2ZW50LmRldGVybWluZUV2ZW50VHlwZXMgb24gc2V0dXBcbkhhbW1lci5FVkVOVF9UWVBFUyA9IHt9O1xuXG4vLyBpbnRlcnZhbCBpbiB3aGljaCBIYW1tZXIgcmVjYWxjdWxhdGVzIGN1cnJlbnQgdmVsb2NpdHkgaW4gbXNcbkhhbW1lci5VUERBVEVfVkVMT0NJVFlfSU5URVJWQUwgPSAxNjtcblxuLy8gaGFtbWVyIGRvY3VtZW50IHdoZXJlIHRoZSBiYXNlIGV2ZW50cyBhcmUgYWRkZWQgYXRcbkhhbW1lci5ET0NVTUVOVCA9IHdpbmRvdy5kb2N1bWVudDtcblxuLy8gZGVmaW5lIHRoZXNlIGFsc28gYXMgdmFycywgZm9yIGJldHRlciBtaW5pZmljYXRpb25cbi8vIGRpcmVjdGlvbiBkZWZpbmVzXG52YXIgRElSRUNUSU9OX0RPV04gPSBIYW1tZXIuRElSRUNUSU9OX0RPV04gPSAnZG93bic7XG52YXIgRElSRUNUSU9OX0xFRlQgPSBIYW1tZXIuRElSRUNUSU9OX0xFRlQgPSAnbGVmdCc7XG52YXIgRElSRUNUSU9OX1VQID0gSGFtbWVyLkRJUkVDVElPTl9VUCA9ICd1cCc7XG52YXIgRElSRUNUSU9OX1JJR0hUID0gSGFtbWVyLkRJUkVDVElPTl9SSUdIVCA9ICdyaWdodCc7XG5cbi8vIHBvaW50ZXIgdHlwZVxudmFyIFBPSU5URVJfTU9VU0UgPSBIYW1tZXIuUE9JTlRFUl9NT1VTRSA9ICdtb3VzZSc7XG52YXIgUE9JTlRFUl9UT1VDSCA9IEhhbW1lci5QT0lOVEVSX1RPVUNIID0gJ3RvdWNoJztcbnZhciBQT0lOVEVSX1BFTiA9IEhhbW1lci5QT0lOVEVSX1BFTiA9ICdwZW4nO1xuXG4vLyB0b3VjaCBldmVudCBkZWZpbmVzXG52YXIgRVZFTlRfU1RBUlQgPSBIYW1tZXIuRVZFTlRfU1RBUlQgPSAnc3RhcnQnO1xudmFyIEVWRU5UX01PVkUgPSBIYW1tZXIuRVZFTlRfTU9WRSA9ICdtb3ZlJztcbnZhciBFVkVOVF9FTkQgPSBIYW1tZXIuRVZFTlRfRU5EID0gJ2VuZCc7XG5cblxuLy8gcGx1Z2lucyBhbmQgZ2VzdHVyZXMgbmFtZXNwYWNlc1xuSGFtbWVyLnBsdWdpbnMgPSBIYW1tZXIucGx1Z2lucyB8fCB7fTtcbkhhbW1lci5nZXN0dXJlcyA9IEhhbW1lci5nZXN0dXJlcyB8fCB7fTtcblxuXG4vLyBpZiB0aGUgd2luZG93IGV2ZW50cyBhcmUgc2V0Li4uXG5IYW1tZXIuUkVBRFkgPSBmYWxzZTtcblxuXG4vKipcbiAqIHNldHVwIGV2ZW50cyB0byBkZXRlY3QgZ2VzdHVyZXMgb24gdGhlIGRvY3VtZW50XG4gKi9cbmZ1bmN0aW9uIHNldHVwKCkge1xuICBpZihIYW1tZXIuUkVBRFkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBmaW5kIHdoYXQgZXZlbnR0eXBlcyB3ZSBhZGQgbGlzdGVuZXJzIHRvXG4gIEV2ZW50LmRldGVybWluZUV2ZW50VHlwZXMoKTtcblxuICAvLyBSZWdpc3RlciBhbGwgZ2VzdHVyZXMgaW5zaWRlIEhhbW1lci5nZXN0dXJlc1xuICBVdGlscy5lYWNoKEhhbW1lci5nZXN0dXJlcywgZnVuY3Rpb24oZ2VzdHVyZSl7XG4gICAgRGV0ZWN0aW9uLnJlZ2lzdGVyKGdlc3R1cmUpO1xuICB9KTtcblxuICAvLyBBZGQgdG91Y2ggZXZlbnRzIG9uIHRoZSBkb2N1bWVudFxuICBFdmVudC5vblRvdWNoKEhhbW1lci5ET0NVTUVOVCwgRVZFTlRfTU9WRSwgRGV0ZWN0aW9uLmRldGVjdCk7XG4gIEV2ZW50Lm9uVG91Y2goSGFtbWVyLkRPQ1VNRU5ULCBFVkVOVF9FTkQsIERldGVjdGlvbi5kZXRlY3QpO1xuXG4gIC8vIEhhbW1lciBpcyByZWFkeS4uLiFcbiAgSGFtbWVyLlJFQURZID0gdHJ1ZTtcbn1cblxuXG52YXIgVXRpbHMgPSBIYW1tZXIudXRpbHMgPSB7XG4gIC8qKlxuICAgKiBleHRlbmQgbWV0aG9kLFxuICAgKiBhbHNvIHVzZWQgZm9yIGNsb25pbmcgd2hlbiBkZXN0IGlzIGFuIGVtcHR5IG9iamVjdFxuICAgKiBAcGFyYW0gICB7T2JqZWN0fSAgICBkZXN0XG4gICAqIEBwYXJhbSAgIHtPYmplY3R9ICAgIHNyY1xuICAgKiBAcGFybSAge0Jvb2xlYW59ICBtZXJnZSAgICBkbyBhIG1lcmdlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9ICAgIGRlc3RcbiAgICovXG4gIGV4dGVuZDogZnVuY3Rpb24gZXh0ZW5kKGRlc3QsIHNyYywgbWVyZ2UpIHtcbiAgICBmb3IodmFyIGtleSBpbiBzcmMpIHtcbiAgICAgIGlmKGRlc3Rba2V5XSAhPT0gdW5kZWZpbmVkICYmIG1lcmdlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgZGVzdFtrZXldID0gc3JjW2tleV07XG4gICAgfVxuICAgIHJldHVybiBkZXN0O1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIGZvciBlYWNoXG4gICAqIEBwYXJhbSBvYmpcbiAgICogQHBhcmFtIGl0ZXJhdG9yXG4gICAqL1xuICBlYWNoOiBmdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICB2YXIgaSwgbztcbiAgICAvLyBuYXRpdmUgZm9yRWFjaCBvbiBhcnJheXNcbiAgICBpZiAoJ2ZvckVhY2gnIGluIG9iaikge1xuICAgICAgb2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQpO1xuICAgIH1cbiAgICAvLyBhcnJheXNcbiAgICBlbHNlIGlmKG9iai5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yKGk9LTE7IChvPW9ialsrK2ldKTspIHtcbiAgICAgICAgaWYgKGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgbywgaSwgb2JqKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gb2JqZWN0c1xuICAgIGVsc2Uge1xuICAgICAgZm9yKGkgaW4gb2JqKSB7XG4gICAgICAgIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShpKSAmJlxuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG5cbiAgLyoqXG4gICAqIGZpbmQgaWYgYSBzdHJpbmcgY29udGFpbnMgdGhlIG5lZWRsZVxuICAgKiBAcGFyYW0gICB7U3RyaW5nfSAgc3JjXG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9ICBuZWVkbGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGZvdW5kXG4gICAqL1xuICBpblN0cjogZnVuY3Rpb24gaW5TdHIoc3JjLCBuZWVkbGUpIHtcbiAgICByZXR1cm4gc3JjLmluZGV4T2YobmVlZGxlKSA+IC0xO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIGZpbmQgaWYgYSBub2RlIGlzIGluIHRoZSBnaXZlbiBwYXJlbnRcbiAgICogdXNlZCBmb3IgZXZlbnQgZGVsZWdhdGlvbiB0cmlja3NcbiAgICogQHBhcmFtICAge0hUTUxFbGVtZW50fSAgIG5vZGVcbiAgICogQHBhcmFtICAge0hUTUxFbGVtZW50fSAgIHBhcmVudFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gICAgICAgaGFzX3BhcmVudFxuICAgKi9cbiAgaGFzUGFyZW50OiBmdW5jdGlvbiBoYXNQYXJlbnQobm9kZSwgcGFyZW50KSB7XG4gICAgd2hpbGUobm9kZSkge1xuICAgICAgaWYobm9kZSA9PSBwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cblxuICAvKipcbiAgICogZ2V0IHRoZSBjZW50ZXIgb2YgYWxsIHRoZSB0b3VjaGVzXG4gICAqIEBwYXJhbSAgIHtBcnJheX0gICAgIHRvdWNoZXNcbiAgICogQHJldHVybnMge09iamVjdH0gICAgY2VudGVyIHBhZ2VYWSBjbGllbnRYWVxuICAgKi9cbiAgZ2V0Q2VudGVyOiBmdW5jdGlvbiBnZXRDZW50ZXIodG91Y2hlcykge1xuICAgIHZhciBwYWdlWCA9IFtdXG4gICAgICAsIHBhZ2VZID0gW11cbiAgICAgICwgY2xpZW50WCA9IFtdXG4gICAgICAsIGNsaWVudFkgPSBbXVxuICAgICAgLCBtaW4gPSBNYXRoLm1pblxuICAgICAgLCBtYXggPSBNYXRoLm1heDtcblxuICAgIC8vIG5vIG5lZWQgdG8gbG9vcCB3aGVuIG9ubHkgb25lIHRvdWNoXG4gICAgaWYodG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhZ2VYOiB0b3VjaGVzWzBdLnBhZ2VYLFxuICAgICAgICBwYWdlWTogdG91Y2hlc1swXS5wYWdlWSxcbiAgICAgICAgY2xpZW50WDogdG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiB0b3VjaGVzWzBdLmNsaWVudFlcbiAgICAgIH07XG4gICAgfVxuXG4gICAgVXRpbHMuZWFjaCh0b3VjaGVzLCBmdW5jdGlvbih0b3VjaCkge1xuICAgICAgcGFnZVgucHVzaCh0b3VjaC5wYWdlWCk7XG4gICAgICBwYWdlWS5wdXNoKHRvdWNoLnBhZ2VZKTtcbiAgICAgIGNsaWVudFgucHVzaCh0b3VjaC5jbGllbnRYKTtcbiAgICAgIGNsaWVudFkucHVzaCh0b3VjaC5jbGllbnRZKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBwYWdlWDogKG1pbi5hcHBseShNYXRoLCBwYWdlWCkgKyBtYXguYXBwbHkoTWF0aCwgcGFnZVgpKSAvIDIsXG4gICAgICBwYWdlWTogKG1pbi5hcHBseShNYXRoLCBwYWdlWSkgKyBtYXguYXBwbHkoTWF0aCwgcGFnZVkpKSAvIDIsXG4gICAgICBjbGllbnRYOiAobWluLmFwcGx5KE1hdGgsIGNsaWVudFgpICsgbWF4LmFwcGx5KE1hdGgsIGNsaWVudFgpKSAvIDIsXG4gICAgICBjbGllbnRZOiAobWluLmFwcGx5KE1hdGgsIGNsaWVudFkpICsgbWF4LmFwcGx5KE1hdGgsIGNsaWVudFkpKSAvIDJcbiAgICB9O1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIGNhbGN1bGF0ZSB0aGUgdmVsb2NpdHkgYmV0d2VlbiB0d28gcG9pbnRzXG4gICAqIEBwYXJhbSAgIHtOdW1iZXJ9ICAgIGRlbHRhX3RpbWVcbiAgICogQHBhcmFtICAge051bWJlcn0gICAgZGVsdGFfeFxuICAgKiBAcGFyYW0gICB7TnVtYmVyfSAgICBkZWx0YV95XG4gICAqIEByZXR1cm5zIHtPYmplY3R9ICAgIHZlbG9jaXR5XG4gICAqL1xuICBnZXRWZWxvY2l0eTogZnVuY3Rpb24gZ2V0VmVsb2NpdHkoZGVsdGFfdGltZSwgZGVsdGFfeCwgZGVsdGFfeSkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBNYXRoLmFicyhkZWx0YV94IC8gZGVsdGFfdGltZSkgfHwgMCxcbiAgICAgIHk6IE1hdGguYWJzKGRlbHRhX3kgLyBkZWx0YV90aW1lKSB8fCAwXG4gICAgfTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBjYWxjdWxhdGUgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSAgIHtUb3VjaH0gICAgIHRvdWNoMVxuICAgKiBAcGFyYW0gICB7VG91Y2h9ICAgICB0b3VjaDJcbiAgICogQHJldHVybnMge051bWJlcn0gICAgYW5nbGVcbiAgICovXG4gIGdldEFuZ2xlOiBmdW5jdGlvbiBnZXRBbmdsZSh0b3VjaDEsIHRvdWNoMikge1xuICAgIHZhciB4ID0gdG91Y2gyLmNsaWVudFggLSB0b3VjaDEuY2xpZW50WFxuICAgICAgLCB5ID0gdG91Y2gyLmNsaWVudFkgLSB0b3VjaDEuY2xpZW50WTtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih5LCB4KSAqIDE4MCAvIE1hdGguUEk7XG4gIH0sXG5cblxuICAvKipcbiAgICogYW5nbGUgdG8gZGlyZWN0aW9uIGRlZmluZVxuICAgKiBAcGFyYW0gICB7VG91Y2h9ICAgICB0b3VjaDFcbiAgICogQHBhcmFtICAge1RvdWNofSAgICAgdG91Y2gyXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9ICAgIGRpcmVjdGlvbiBjb25zdGFudCwgbGlrZSBESVJFQ1RJT05fTEVGVFxuICAgKi9cbiAgZ2V0RGlyZWN0aW9uOiBmdW5jdGlvbiBnZXREaXJlY3Rpb24odG91Y2gxLCB0b3VjaDIpIHtcbiAgICB2YXIgeCA9IE1hdGguYWJzKHRvdWNoMS5jbGllbnRYIC0gdG91Y2gyLmNsaWVudFgpXG4gICAgICAsIHkgPSBNYXRoLmFicyh0b3VjaDEuY2xpZW50WSAtIHRvdWNoMi5jbGllbnRZKTtcbiAgICBpZih4ID49IHkpIHtcbiAgICAgIHJldHVybiB0b3VjaDEuY2xpZW50WCAtIHRvdWNoMi5jbGllbnRYID4gMCA/IERJUkVDVElPTl9MRUZUIDogRElSRUNUSU9OX1JJR0hUO1xuICAgIH1cbiAgICByZXR1cm4gdG91Y2gxLmNsaWVudFkgLSB0b3VjaDIuY2xpZW50WSA+IDAgPyBESVJFQ1RJT05fVVAgOiBESVJFQ1RJT05fRE9XTjtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHRvdWNoZXNcbiAgICogQHBhcmFtICAge1RvdWNofSAgICAgdG91Y2gxXG4gICAqIEBwYXJhbSAgIHtUb3VjaH0gICAgIHRvdWNoMlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSAgICBkaXN0YW5jZVxuICAgKi9cbiAgZ2V0RGlzdGFuY2U6IGZ1bmN0aW9uIGdldERpc3RhbmNlKHRvdWNoMSwgdG91Y2gyKSB7XG4gICAgdmFyIHggPSB0b3VjaDIuY2xpZW50WCAtIHRvdWNoMS5jbGllbnRYXG4gICAgICAsIHkgPSB0b3VjaDIuY2xpZW50WSAtIHRvdWNoMS5jbGllbnRZO1xuICAgIHJldHVybiBNYXRoLnNxcnQoKHggKiB4KSArICh5ICogeSkpO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIGNhbGN1bGF0ZSB0aGUgc2NhbGUgZmFjdG9yIGJldHdlZW4gdHdvIHRvdWNoTGlzdHMgKGZpbmdlcnMpXG4gICAqIG5vIHNjYWxlIGlzIDEsIGFuZCBnb2VzIGRvd24gdG8gMCB3aGVuIHBpbmNoZWQgdG9nZXRoZXIsIGFuZCBiaWdnZXIgd2hlbiBwaW5jaGVkIG91dFxuICAgKiBAcGFyYW0gICB7QXJyYXl9ICAgICBzdGFydFxuICAgKiBAcGFyYW0gICB7QXJyYXl9ICAgICBlbmRcbiAgICogQHJldHVybnMge051bWJlcn0gICAgc2NhbGVcbiAgICovXG4gIGdldFNjYWxlOiBmdW5jdGlvbiBnZXRTY2FsZShzdGFydCwgZW5kKSB7XG4gICAgLy8gbmVlZCB0d28gZmluZ2Vycy4uLlxuICAgIGlmKHN0YXJ0Lmxlbmd0aCA+PSAyICYmIGVuZC5sZW5ndGggPj0gMikge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzdGFuY2UoZW5kWzBdLCBlbmRbMV0pIC8gdGhpcy5nZXREaXN0YW5jZShzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgIH1cbiAgICByZXR1cm4gMTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBjYWxjdWxhdGUgdGhlIHJvdGF0aW9uIGRlZ3JlZXMgYmV0d2VlbiB0d28gdG91Y2hMaXN0cyAoZmluZ2VycylcbiAgICogQHBhcmFtICAge0FycmF5fSAgICAgc3RhcnRcbiAgICogQHBhcmFtICAge0FycmF5fSAgICAgZW5kXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9ICAgIHJvdGF0aW9uXG4gICAqL1xuICBnZXRSb3RhdGlvbjogZnVuY3Rpb24gZ2V0Um90YXRpb24oc3RhcnQsIGVuZCkge1xuICAgIC8vIG5lZWQgdHdvIGZpbmdlcnNcbiAgICBpZihzdGFydC5sZW5ndGggPj0gMiAmJiBlbmQubGVuZ3RoID49IDIpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEFuZ2xlKGVuZFsxXSwgZW5kWzBdKSAtIHRoaXMuZ2V0QW5nbGUoc3RhcnRbMV0sIHN0YXJ0WzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH0sXG5cblxuICAvKipcbiAgICogYm9vbGVhbiBpZiB0aGUgZGlyZWN0aW9uIGlzIHZlcnRpY2FsXG4gICAqIEBwYXJhbSAgICB7U3RyaW5nfSAgICBkaXJlY3Rpb25cbiAgICogQHJldHVybnMgIHtCb29sZWFufSAgIGlzX3ZlcnRpY2FsXG4gICAqL1xuICBpc1ZlcnRpY2FsOiBmdW5jdGlvbiBpc1ZlcnRpY2FsKGRpcmVjdGlvbikge1xuICAgIHJldHVybiBkaXJlY3Rpb24gPT0gRElSRUNUSU9OX1VQIHx8IGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fRE9XTjtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiB0b2dnbGUgYnJvd3NlciBkZWZhdWx0IGJlaGF2aW9yIHdpdGggY3NzIHByb3BzXG4gICAqIEBwYXJhbSAgIHtIdG1sRWxlbWVudH0gICBlbGVtZW50XG4gICAqIEBwYXJhbSAgIHtPYmplY3R9ICAgICAgICBjc3NfcHJvcHNcbiAgICogQHBhcmFtICAge0Jvb2xlYW59ICAgICAgIHRvZ2dsZVxuICAgKi9cbiAgdG9nZ2xlRGVmYXVsdEJlaGF2aW9yOiBmdW5jdGlvbiB0b2dnbGVEZWZhdWx0QmVoYXZpb3IoZWxlbWVudCwgY3NzX3Byb3BzLCB0b2dnbGUpIHtcbiAgICBpZighY3NzX3Byb3BzIHx8ICFlbGVtZW50IHx8ICFlbGVtZW50LnN0eWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gd2l0aCBjc3MgcHJvcGVydGllcyBmb3IgbW9kZXJuIGJyb3dzZXJzXG4gICAgVXRpbHMuZWFjaChbJ3dlYmtpdCcsICdtb3onLCAnTW96JywgJ21zJywgJ28nLCAnJ10sIGZ1bmN0aW9uIHNldFN0eWxlKHZlbmRvcikge1xuICAgICAgVXRpbHMuZWFjaChjc3NfcHJvcHMsIGZ1bmN0aW9uKHZhbHVlLCBwcm9wKSB7XG4gICAgICAgICAgLy8gdmVuZGVyIHByZWZpeCBhdCB0aGUgcHJvcGVydHlcbiAgICAgICAgICBpZih2ZW5kb3IpIHtcbiAgICAgICAgICAgIHByb3AgPSB2ZW5kb3IgKyBwcm9wLnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHNldCB0aGUgc3R5bGVcbiAgICAgICAgICBpZihwcm9wIGluIGVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSAhdG9nZ2xlICYmIHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdmFyIGZhbHNlX2ZuID0gZnVuY3Rpb24oKXsgcmV0dXJuIGZhbHNlOyB9O1xuXG4gICAgLy8gYWxzbyB0aGUgZGlzYWJsZSBvbnNlbGVjdHN0YXJ0XG4gICAgaWYoY3NzX3Byb3BzLnVzZXJTZWxlY3QgPT0gJ25vbmUnKSB7XG4gICAgICBlbGVtZW50Lm9uc2VsZWN0c3RhcnQgPSAhdG9nZ2xlICYmIGZhbHNlX2ZuO1xuICAgIH1cbiAgICAvLyBhbmQgZGlzYWJsZSBvbmRyYWdzdGFydFxuICAgIGlmKGNzc19wcm9wcy51c2VyRHJhZyA9PSAnbm9uZScpIHtcbiAgICAgIGVsZW1lbnQub25kcmFnc3RhcnQgPSAhdG9nZ2xlICYmIGZhbHNlX2ZuO1xuICAgIH1cbiAgfVxufTtcblxuXG4vKipcbiAqIGNyZWF0ZSBuZXcgaGFtbWVyIGluc3RhbmNlXG4gKiBhbGwgbWV0aG9kcyBzaG91bGQgcmV0dXJuIHRoZSBpbnN0YW5jZSBpdHNlbGYsIHNvIGl0IGlzIGNoYWluYWJsZS5cbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gICAgICAgZWxlbWVudFxuICogQHBhcmFtICAge09iamVjdH0gICAgICAgICAgICBbb3B0aW9ucz17fV1cbiAqIEByZXR1cm5zIHtIYW1tZXIuSW5zdGFuY2V9XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuSGFtbWVyLkluc3RhbmNlID0gZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLy8gc2V0dXAgSGFtbWVySlMgd2luZG93IGV2ZW50cyBhbmQgcmVnaXN0ZXIgYWxsIGdlc3R1cmVzXG4gIC8vIHRoaXMgYWxzbyBzZXRzIHVwIHRoZSBkZWZhdWx0IG9wdGlvbnNcbiAgc2V0dXAoKTtcblxuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gIC8vIHN0YXJ0L3N0b3AgZGV0ZWN0aW9uIG9wdGlvblxuICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gIC8vIG1lcmdlIG9wdGlvbnNcbiAgdGhpcy5vcHRpb25zID0gVXRpbHMuZXh0ZW5kKFxuICAgIFV0aWxzLmV4dGVuZCh7fSwgSGFtbWVyLmRlZmF1bHRzKSxcbiAgICBvcHRpb25zIHx8IHt9KTtcblxuICAvLyBhZGQgc29tZSBjc3MgdG8gdGhlIGVsZW1lbnQgdG8gcHJldmVudCB0aGUgYnJvd3NlciBmcm9tIGRvaW5nIGl0cyBuYXRpdmUgYmVoYXZvaXJcbiAgaWYodGhpcy5vcHRpb25zLnN0b3BfYnJvd3Nlcl9iZWhhdmlvcikge1xuICAgIFV0aWxzLnRvZ2dsZURlZmF1bHRCZWhhdmlvcih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucy5zdG9wX2Jyb3dzZXJfYmVoYXZpb3IsIGZhbHNlKTtcbiAgfVxuXG4gIC8vIHN0YXJ0IGRldGVjdGlvbiBvbiB0b3VjaHN0YXJ0XG4gIHRoaXMuZXZlbnRTdGFydEhhbmRsZXIgPSBFdmVudC5vblRvdWNoKGVsZW1lbnQsIEVWRU5UX1NUQVJULCBmdW5jdGlvbihldikge1xuICAgIGlmKHNlbGYuZW5hYmxlZCkge1xuICAgICAgRGV0ZWN0aW9uLnN0YXJ0RGV0ZWN0KHNlbGYsIGV2KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGtlZXAgYSBsaXN0IG9mIHVzZXIgZXZlbnQgaGFuZGxlcnMgd2hpY2ggbmVlZHMgdG8gYmUgcmVtb3ZlZCB3aGVuIGNhbGxpbmcgJ2Rpc3Bvc2UnXG4gIHRoaXMuZXZlbnRIYW5kbGVycyA9IFtdO1xuXG4gIC8vIHJldHVybiBpbnN0YW5jZVxuICByZXR1cm4gdGhpcztcbn07XG5cblxuSGFtbWVyLkluc3RhbmNlLnByb3RvdHlwZSA9IHtcbiAgLyoqXG4gICAqIGJpbmQgZXZlbnRzIHRvIHRoZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgIGdlc3R1cmVcbiAgICogQHBhcmFtICAge0Z1bmN0aW9ufSAgICBoYW5kbGVyXG4gICAqIEByZXR1cm5zIHtIYW1tZXIuSW5zdGFuY2V9XG4gICAqL1xuICBvbjogZnVuY3Rpb24gb25FdmVudChnZXN0dXJlLCBoYW5kbGVyKSB7XG4gICAgdmFyIGdlc3R1cmVzID0gZ2VzdHVyZS5zcGxpdCgnICcpO1xuICAgIFV0aWxzLmVhY2goZ2VzdHVyZXMsIGZ1bmN0aW9uKGdlc3R1cmUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGdlc3R1cmUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICAgIHRoaXMuZXZlbnRIYW5kbGVycy5wdXNoKHsgZ2VzdHVyZTogZ2VzdHVyZSwgaGFuZGxlcjogaGFuZGxlciB9KTtcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuXG4gIC8qKlxuICAgKiB1bmJpbmQgZXZlbnRzIHRvIHRoZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgIGdlc3R1cmVcbiAgICogQHBhcmFtICAge0Z1bmN0aW9ufSAgICBoYW5kbGVyXG4gICAqIEByZXR1cm5zIHtIYW1tZXIuSW5zdGFuY2V9XG4gICAqL1xuICBvZmY6IGZ1bmN0aW9uIG9mZkV2ZW50KGdlc3R1cmUsIGhhbmRsZXIpIHtcbiAgICB2YXIgZ2VzdHVyZXMgPSBnZXN0dXJlLnNwbGl0KCcgJylcbiAgICAgICwgaSwgZWg7XG4gICAgVXRpbHMuZWFjaChnZXN0dXJlcywgZnVuY3Rpb24oZ2VzdHVyZSkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZ2VzdHVyZSwgaGFuZGxlciwgZmFsc2UpO1xuXG4gICAgICAvLyByZW1vdmUgdGhlIGV2ZW50IGhhbmRsZXIgZnJvbSB0aGUgaW50ZXJuYWwgbGlzdFxuICAgICAgZm9yKGk9LTE7IChlaD10aGlzLmV2ZW50SGFuZGxlcnNbKytpXSk7KSB7XG4gICAgICAgIGlmKGVoLmdlc3R1cmUgPT09IGdlc3R1cmUgJiYgZWguaGFuZGxlciA9PT0gaGFuZGxlcikge1xuICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuXG4gIC8qKlxuICAgKiB0cmlnZ2VyIGdlc3R1cmUgZXZlbnRcbiAgICogQHBhcmFtICAge1N0cmluZ30gICAgICBnZXN0dXJlXG4gICAqIEBwYXJhbSAgIHtPYmplY3R9ICAgICAgW2V2ZW50RGF0YV1cbiAgICogQHJldHVybnMge0hhbW1lci5JbnN0YW5jZX1cbiAgICovXG4gIHRyaWdnZXI6IGZ1bmN0aW9uIHRyaWdnZXJFdmVudChnZXN0dXJlLCBldmVudERhdGEpIHtcbiAgICAvLyBvcHRpb25hbFxuICAgIGlmKCFldmVudERhdGEpIHtcbiAgICAgIGV2ZW50RGF0YSA9IHt9O1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBET00gZXZlbnRcbiAgICB2YXIgZXZlbnQgPSBIYW1tZXIuRE9DVU1FTlQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZXZlbnQuaW5pdEV2ZW50KGdlc3R1cmUsIHRydWUsIHRydWUpO1xuICAgIGV2ZW50Lmdlc3R1cmUgPSBldmVudERhdGE7XG5cbiAgICAvLyB0cmlnZ2VyIG9uIHRoZSB0YXJnZXQgaWYgaXQgaXMgaW4gdGhlIGluc3RhbmNlIGVsZW1lbnQsXG4gICAgLy8gdGhpcyBpcyBmb3IgZXZlbnQgZGVsZWdhdGlvbiB0cmlja3NcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgICBpZihVdGlscy5oYXNQYXJlbnQoZXZlbnREYXRhLnRhcmdldCwgZWxlbWVudCkpIHtcbiAgICAgIGVsZW1lbnQgPSBldmVudERhdGEudGFyZ2V0O1xuICAgIH1cblxuICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cblxuICAvKipcbiAgICogZW5hYmxlIG9mIGRpc2FibGUgaGFtbWVyLmpzIGRldGVjdGlvblxuICAgKiBAcGFyYW0gICB7Qm9vbGVhbn0gICBzdGF0ZVxuICAgKiBAcmV0dXJucyB7SGFtbWVyLkluc3RhbmNlfVxuICAgKi9cbiAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoc3RhdGUpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBzdGF0ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBkaXNwb3NlIHRoaXMgaGFtbWVyIGluc3RhbmNlXG4gICAqIEByZXR1cm5zIHtIYW1tZXIuSW5zdGFuY2V9XG4gICAqL1xuICBkaXNwb3NlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgIHZhciBpLCBlaDtcblxuICAgIC8vIHVuZG8gYWxsIGNoYW5nZXMgbWFkZSBieSBzdG9wX2Jyb3dzZXJfYmVoYXZpb3JcbiAgICBpZih0aGlzLm9wdGlvbnMuc3RvcF9icm93c2VyX2JlaGF2aW9yKSB7XG4gICAgICBVdGlscy50b2dnbGVEZWZhdWx0QmVoYXZpb3IodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMuc3RvcF9icm93c2VyX2JlaGF2aW9yLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvLyB1bmJpbmQgYWxsIGN1c3RvbSBldmVudCBoYW5kbGVyc1xuICAgIGZvcihpPS0xOyAoZWg9dGhpcy5ldmVudEhhbmRsZXJzWysraV0pOykge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZWguZ2VzdHVyZSwgZWguaGFuZGxlciwgZmFsc2UpO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50SGFuZGxlcnMgPSBbXTtcblxuICAgIC8vIHVuYmluZCB0aGUgc3RhcnQgZXZlbnQgbGlzdGVuZXJcbiAgICBFdmVudC51bmJpbmREb20odGhpcy5lbGVtZW50LCBIYW1tZXIuRVZFTlRfVFlQRVNbRVZFTlRfU1RBUlRdLCB0aGlzLmV2ZW50U3RhcnRIYW5kbGVyKTtcblxuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5cbi8qKlxuICogdGhpcyBob2xkcyB0aGUgbGFzdCBtb3ZlIGV2ZW50LFxuICogdXNlZCB0byBmaXggZW1wdHkgdG91Y2hlbmQgaXNzdWVcbiAqIHNlZSB0aGUgb25Ub3VjaCBldmVudCBmb3IgYW4gZXhwbGFuYXRpb25cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBsYXN0X21vdmVfZXZlbnQgPSBudWxsO1xuXG4vKipcbiAqIHdoZW4gdGhlIG1vdXNlIGlzIGhvbGQgZG93biwgdGhpcyBpcyB0cnVlXG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqL1xudmFyIHNob3VsZF9kZXRlY3QgPSBmYWxzZTtcblxuLyoqXG4gKiB3aGVuIHRvdWNoIGV2ZW50cyBoYXZlIGJlZW4gZmlyZWQsIHRoaXMgaXMgdHJ1ZVxuICogQHR5cGUge0Jvb2xlYW59XG4gKi9cbnZhciB0b3VjaF90cmlnZ2VyZWQgPSBmYWxzZTtcblxuXG52YXIgRXZlbnQgPSBIYW1tZXIuZXZlbnQgPSB7XG4gIC8qKlxuICAgKiBzaW1wbGUgYWRkRXZlbnRMaXN0ZW5lclxuICAgKiBAcGFyYW0gICB7SFRNTEVsZW1lbnR9ICAgZWxlbWVudFxuICAgKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgICAgdHlwZVxuICAgKiBAcGFyYW0gICB7RnVuY3Rpb259ICAgICAgaGFuZGxlclxuICAgKi9cbiAgYmluZERvbTogZnVuY3Rpb24oZWxlbWVudCwgdHlwZSwgaGFuZGxlcikge1xuICAgIHZhciB0eXBlcyA9IHR5cGUuc3BsaXQoJyAnKTtcbiAgICBVdGlscy5lYWNoKHR5cGVzLCBmdW5jdGlvbih0eXBlKXtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgfSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogc2ltcGxlIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICogQHBhcmFtICAge0hUTUxFbGVtZW50fSAgIGVsZW1lbnRcbiAgICogQHBhcmFtICAge1N0cmluZ30gICAgICAgIHR5cGVcbiAgICogQHBhcmFtICAge0Z1bmN0aW9ufSAgICAgIGhhbmRsZXJcbiAgICovXG4gIHVuYmluZERvbTogZnVuY3Rpb24oZWxlbWVudCwgdHlwZSwgaGFuZGxlcikge1xuICAgIHZhciB0eXBlcyA9IHR5cGUuc3BsaXQoJyAnKTtcbiAgICBVdGlscy5lYWNoKHR5cGVzLCBmdW5jdGlvbih0eXBlKXtcbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgfSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogdG91Y2ggZXZlbnRzIHdpdGggbW91c2UgZmFsbGJhY2tcbiAgICogQHBhcmFtICAge0hUTUxFbGVtZW50fSAgIGVsZW1lbnRcbiAgICogQHBhcmFtICAge1N0cmluZ30gICAgICAgIGV2ZW50VHlwZSAgICAgICAgbGlrZSBFVkVOVF9NT1ZFXG4gICAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gICAgICBoYW5kbGVyXG4gICAqL1xuICBvblRvdWNoOiBmdW5jdGlvbiBvblRvdWNoKGVsZW1lbnQsIGV2ZW50VHlwZSwgaGFuZGxlcikge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuXG4gICAgdmFyIGJpbmREb21PblRvdWNoID0gZnVuY3Rpb24gYmluZERvbU9uVG91Y2goZXYpIHtcbiAgICAgIHZhciBzcmNFdmVudFR5cGUgPSBldi50eXBlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIC8vIG9ubW91c2V1cCwgYnV0IHdoZW4gdG91Y2hlbmQgaGFzIGJlZW4gZmlyZWQgd2UgZG8gbm90aGluZy5cbiAgICAgIC8vIHRoaXMgaXMgZm9yIHRvdWNoZGV2aWNlcyB3aGljaCBhbHNvIGZpcmUgYSBtb3VzZXVwIG9uIHRvdWNoZW5kXG4gICAgICBpZihVdGlscy5pblN0cihzcmNFdmVudFR5cGUsICdtb3VzZScpICYmIHRvdWNoX3RyaWdnZXJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIG1vdXNlYnV0dG9uIG11c3QgYmUgZG93biBvciBhIHRvdWNoIGV2ZW50XG4gICAgICBlbHNlIGlmKFV0aWxzLmluU3RyKHNyY0V2ZW50VHlwZSwgJ3RvdWNoJykgfHwgICAvLyB0b3VjaCBldmVudHMgYXJlIGFsd2F5cyBvbiBzY3JlZW5cbiAgICAgICAgVXRpbHMuaW5TdHIoc3JjRXZlbnRUeXBlLCAncG9pbnRlcmRvd24nKSB8fCAvLyBwb2ludGVyZXZlbnRzIHRvdWNoXG4gICAgICAgIChVdGlscy5pblN0cihzcmNFdmVudFR5cGUsICdtb3VzZScpICYmIGV2LndoaWNoID09PSAxKSAgIC8vIG1vdXNlIGlzIHByZXNzZWRcbiAgICAgICAgKSB7XG4gICAgICAgIHNob3VsZF9kZXRlY3QgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBtb3VzZSBpc24ndCBwcmVzc2VkXG4gICAgICBlbHNlIGlmKFV0aWxzLmluU3RyKHNyY0V2ZW50VHlwZSwgJ21vdXNlJykgJiYgIWV2LndoaWNoKSB7XG4gICAgICAgIHNob3VsZF9kZXRlY3QgPSBmYWxzZTtcbiAgICAgIH1cblxuXG4gICAgICAvLyB3ZSBhcmUgaW4gYSB0b3VjaCBldmVudCwgc2V0IHRoZSB0b3VjaCB0cmlnZ2VyZWQgYm9vbCB0byB0cnVlLFxuICAgICAgLy8gdGhpcyBmb3IgdGhlIGNvbmZsaWN0cyB0aGF0IG1heSBvY2N1ciBvbiBpb3MgYW5kIGFuZHJvaWRcbiAgICAgIGlmKFV0aWxzLmluU3RyKHNyY0V2ZW50VHlwZSwgJ3RvdWNoJykgfHwgVXRpbHMuaW5TdHIoc3JjRXZlbnRUeXBlLCAncG9pbnRlcicpKSB7XG4gICAgICAgIHRvdWNoX3RyaWdnZXJlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvdW50IHRoZSB0b3RhbCB0b3VjaGVzIG9uIHRoZSBzY3JlZW5cbiAgICAgIHZhciBjb3VudF90b3VjaGVzID0gMDtcblxuICAgICAgLy8gd2hlbiB0b3VjaCBoYXMgYmVlbiB0cmlnZ2VyZWQgaW4gdGhpcyBkZXRlY3Rpb24gc2Vzc2lvblxuICAgICAgLy8gYW5kIHdlIGFyZSBub3cgaGFuZGxpbmcgYSBtb3VzZSBldmVudCwgd2Ugc3RvcCB0aGF0IHRvIHByZXZlbnQgY29uZmxpY3RzXG4gICAgICBpZihzaG91bGRfZGV0ZWN0KSB7XG4gICAgICAgIC8vIHVwZGF0ZSBwb2ludGVyZXZlbnRcbiAgICAgICAgaWYoSGFtbWVyLkhBU19QT0lOVEVSRVZFTlRTICYmIGV2ZW50VHlwZSAhPSBFVkVOVF9FTkQpIHtcbiAgICAgICAgICBjb3VudF90b3VjaGVzID0gUG9pbnRlckV2ZW50LnVwZGF0ZVBvaW50ZXIoZXZlbnRUeXBlLCBldik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdG91Y2hcbiAgICAgICAgZWxzZSBpZihVdGlscy5pblN0cihzcmNFdmVudFR5cGUsICd0b3VjaCcpKSB7XG4gICAgICAgICAgY291bnRfdG91Y2hlcyA9IGV2LnRvdWNoZXMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIC8vIG1vdXNlXG4gICAgICAgIGVsc2UgaWYoIXRvdWNoX3RyaWdnZXJlZCkge1xuICAgICAgICAgIGNvdW50X3RvdWNoZXMgPSBVdGlscy5pblN0cihzcmNFdmVudFR5cGUsICd1cCcpID8gMCA6IDE7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIGlmIHdlIGFyZSBpbiBhIGVuZCBldmVudCwgYnV0IHdoZW4gd2UgcmVtb3ZlIG9uZSB0b3VjaCBhbmRcbiAgICAgICAgLy8gd2Ugc3RpbGwgaGF2ZSBlbm91Z2gsIHNldCBldmVudFR5cGUgdG8gbW92ZVxuICAgICAgICBpZihjb3VudF90b3VjaGVzID4gMCAmJiBldmVudFR5cGUgPT0gRVZFTlRfRU5EKSB7XG4gICAgICAgICAgZXZlbnRUeXBlID0gRVZFTlRfTU9WRTtcbiAgICAgICAgfVxuICAgICAgICAvLyBubyB0b3VjaGVzLCBmb3JjZSB0aGUgZW5kIGV2ZW50XG4gICAgICAgIGVsc2UgaWYoIWNvdW50X3RvdWNoZXMpIHtcbiAgICAgICAgICBldmVudFR5cGUgPSBFVkVOVF9FTkQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdG9yZSB0aGUgbGFzdCBtb3ZlIGV2ZW50XG4gICAgICAgIGlmKGNvdW50X3RvdWNoZXMgfHwgbGFzdF9tb3ZlX2V2ZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgbGFzdF9tb3ZlX2V2ZW50ID0gZXY7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIHRyaWdnZXIgdGhlIGhhbmRsZXJcbiAgICAgICAgaGFuZGxlci5jYWxsKERldGVjdGlvbiwgc2VsZi5jb2xsZWN0RXZlbnREYXRhKGVsZW1lbnQsIGV2ZW50VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdldFRvdWNoTGlzdChsYXN0X21vdmVfZXZlbnQsIGV2ZW50VHlwZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXYpICk7XG5cbiAgICAgICAgLy8gcmVtb3ZlIHBvaW50ZXJldmVudCBmcm9tIGxpc3RcbiAgICAgICAgaWYoSGFtbWVyLkhBU19QT0lOVEVSRVZFTlRTICYmIGV2ZW50VHlwZSA9PSBFVkVOVF9FTkQpIHtcbiAgICAgICAgICBjb3VudF90b3VjaGVzID0gUG9pbnRlckV2ZW50LnVwZGF0ZVBvaW50ZXIoZXZlbnRUeXBlLCBldik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gb24gdGhlIGVuZCB3ZSByZXNldCBldmVyeXRoaW5nXG4gICAgICBpZighY291bnRfdG91Y2hlcykge1xuICAgICAgICBsYXN0X21vdmVfZXZlbnQgPSBudWxsO1xuICAgICAgICBzaG91bGRfZGV0ZWN0ID0gZmFsc2U7XG4gICAgICAgIHRvdWNoX3RyaWdnZXJlZCA9IGZhbHNlO1xuICAgICAgICBQb2ludGVyRXZlbnQucmVzZXQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5iaW5kRG9tKGVsZW1lbnQsIEhhbW1lci5FVkVOVF9UWVBFU1tldmVudFR5cGVdLCBiaW5kRG9tT25Ub3VjaCk7XG5cbiAgICAvLyByZXR1cm4gdGhlIGJvdW5kIGZ1bmN0aW9uIHRvIGJlIGFibGUgdG8gdW5iaW5kIGl0IGxhdGVyXG4gICAgcmV0dXJuIGJpbmREb21PblRvdWNoO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIHdlIGhhdmUgZGlmZmVyZW50IGV2ZW50cyBmb3IgZWFjaCBkZXZpY2UvYnJvd3NlclxuICAgKiBkZXRlcm1pbmUgd2hhdCB3ZSBuZWVkIGFuZCBzZXQgdGhlbSBpbiB0aGUgSGFtbWVyLkVWRU5UX1RZUEVTIGNvbnN0YW50XG4gICAqL1xuICBkZXRlcm1pbmVFdmVudFR5cGVzOiBmdW5jdGlvbiBkZXRlcm1pbmVFdmVudFR5cGVzKCkge1xuICAgIC8vIGRldGVybWluZSB0aGUgZXZlbnR0eXBlIHdlIHdhbnQgdG8gc2V0XG4gICAgdmFyIHR5cGVzO1xuXG4gICAgLy8gcG9pbnRlckV2ZW50cyBtYWdpY1xuICAgIGlmKEhhbW1lci5IQVNfUE9JTlRFUkVWRU5UUykge1xuICAgICAgdHlwZXMgPSBQb2ludGVyRXZlbnQuZ2V0RXZlbnRzKCk7XG4gICAgfVxuICAgIC8vIG9uIEFuZHJvaWQsIGlPUywgYmxhY2tiZXJyeSwgd2luZG93cyBtb2JpbGUgd2UgZG9udCB3YW50IGFueSBtb3VzZWV2ZW50c1xuICAgIGVsc2UgaWYoSGFtbWVyLk5PX01PVVNFRVZFTlRTKSB7XG4gICAgICB0eXBlcyA9IFtcbiAgICAgICAgJ3RvdWNoc3RhcnQnLFxuICAgICAgICAndG91Y2htb3ZlJyxcbiAgICAgICAgJ3RvdWNoZW5kIHRvdWNoY2FuY2VsJ107XG4gICAgfVxuICAgIC8vIGZvciBub24gcG9pbnRlciBldmVudHMgYnJvd3NlcnMgYW5kIG1peGVkIGJyb3dzZXJzLFxuICAgIC8vIGxpa2UgY2hyb21lIG9uIHdpbmRvd3M4IHRvdWNoIGxhcHRvcFxuICAgIGVsc2Uge1xuICAgICAgdHlwZXMgPSBbXG4gICAgICAgICd0b3VjaHN0YXJ0IG1vdXNlZG93bicsXG4gICAgICAgICd0b3VjaG1vdmUgbW91c2Vtb3ZlJyxcbiAgICAgICAgJ3RvdWNoZW5kIHRvdWNoY2FuY2VsIG1vdXNldXAnXTtcbiAgICB9XG5cbiAgICBIYW1tZXIuRVZFTlRfVFlQRVNbRVZFTlRfU1RBUlRdID0gdHlwZXNbMF07XG4gICAgSGFtbWVyLkVWRU5UX1RZUEVTW0VWRU5UX01PVkVdID0gdHlwZXNbMV07XG4gICAgSGFtbWVyLkVWRU5UX1RZUEVTW0VWRU5UX0VORF0gPSB0eXBlc1syXTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBjcmVhdGUgdG91Y2hsaXN0IGRlcGVuZGluZyBvbiB0aGUgZXZlbnRcbiAgICogQHBhcmFtICAge09iamVjdH0gICAgZXZcbiAgICogQHBhcmFtICAge1N0cmluZ30gICAgZXZlbnRUeXBlICAgdXNlZCBieSB0aGUgZmFrZW11bHRpdG91Y2ggcGx1Z2luXG4gICAqL1xuICBnZXRUb3VjaExpc3Q6IGZ1bmN0aW9uIGdldFRvdWNoTGlzdChldi8qLCBldmVudFR5cGUqLykge1xuICAgIC8vIGdldCB0aGUgZmFrZSBwb2ludGVyRXZlbnQgdG91Y2hsaXN0XG4gICAgaWYoSGFtbWVyLkhBU19QT0lOVEVSRVZFTlRTKSB7XG4gICAgICByZXR1cm4gUG9pbnRlckV2ZW50LmdldFRvdWNoTGlzdCgpO1xuICAgIH1cblxuICAgIC8vIGdldCB0aGUgdG91Y2hsaXN0XG4gICAgaWYoZXYudG91Y2hlcykge1xuICAgICAgcmV0dXJuIGV2LnRvdWNoZXM7XG4gICAgfVxuXG4gICAgLy8gbWFrZSBmYWtlIHRvdWNobGlzdCBmcm9tIG1vdXNlIHBvc2l0aW9uXG4gICAgZXYuaWRlbnRpZmllciA9IDE7XG4gICAgcmV0dXJuIFtldl07XG4gIH0sXG5cblxuICAvKipcbiAgICogY29sbGVjdCBldmVudCBkYXRhIGZvciBIYW1tZXIganNcbiAgICogQHBhcmFtICAge0hUTUxFbGVtZW50fSAgIGVsZW1lbnRcbiAgICogQHBhcmFtICAge1N0cmluZ30gICAgICAgIGV2ZW50VHlwZSAgICAgICAgbGlrZSBFVkVOVF9NT1ZFXG4gICAqIEBwYXJhbSAgIHtPYmplY3R9ICAgICAgICBldmVudERhdGFcbiAgICovXG4gIGNvbGxlY3RFdmVudERhdGE6IGZ1bmN0aW9uIGNvbGxlY3RFdmVudERhdGEoZWxlbWVudCwgZXZlbnRUeXBlLCB0b3VjaGVzLCBldikge1xuICAgIC8vIGZpbmQgb3V0IHBvaW50ZXJUeXBlXG4gICAgdmFyIHBvaW50ZXJUeXBlID0gUE9JTlRFUl9UT1VDSDtcbiAgICBpZihVdGlscy5pblN0cihldi50eXBlLCAnbW91c2UnKSB8fCBQb2ludGVyRXZlbnQubWF0Y2hUeXBlKFBPSU5URVJfTU9VU0UsIGV2KSkge1xuICAgICAgcG9pbnRlclR5cGUgPSBQT0lOVEVSX01PVVNFO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBjZW50ZXIgICAgIDogVXRpbHMuZ2V0Q2VudGVyKHRvdWNoZXMpLFxuICAgICAgdGltZVN0YW1wICA6IERhdGUubm93KCksXG4gICAgICB0YXJnZXQgICAgIDogZXYudGFyZ2V0LFxuICAgICAgdG91Y2hlcyAgICA6IHRvdWNoZXMsXG4gICAgICBldmVudFR5cGUgIDogZXZlbnRUeXBlLFxuICAgICAgcG9pbnRlclR5cGU6IHBvaW50ZXJUeXBlLFxuICAgICAgc3JjRXZlbnQgICA6IGV2LFxuXG4gICAgICAvKipcbiAgICAgICAqIHByZXZlbnQgdGhlIGJyb3dzZXIgZGVmYXVsdCBhY3Rpb25zXG4gICAgICAgKiBtb3N0bHkgdXNlZCB0byBkaXNhYmxlIHNjcm9sbGluZyBvZiB0aGUgYnJvd3NlclxuICAgICAgICovXG4gICAgICBwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzcmNFdmVudCA9IHRoaXMuc3JjRXZlbnQ7XG4gICAgICAgIHNyY0V2ZW50LnByZXZlbnRNYW5pcHVsYXRpb24gJiYgc3JjRXZlbnQucHJldmVudE1hbmlwdWxhdGlvbigpO1xuICAgICAgICBzcmNFdmVudC5wcmV2ZW50RGVmYXVsdCAmJiBzcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBzdG9wIGJ1YmJsaW5nIHRoZSBldmVudCB1cCB0byBpdHMgcGFyZW50c1xuICAgICAgICovXG4gICAgICBzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNyY0V2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBpbW1lZGlhdGVseSBzdG9wIGdlc3R1cmUgZGV0ZWN0aW9uXG4gICAgICAgKiBtaWdodCBiZSB1c2VmdWwgYWZ0ZXIgYSBzd2lwZSB3YXMgZGV0ZWN0ZWRcbiAgICAgICAqIEByZXR1cm4geyp9XG4gICAgICAgKi9cbiAgICAgIHN0b3BEZXRlY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gRGV0ZWN0aW9uLnN0b3BEZXRlY3QoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG52YXIgUG9pbnRlckV2ZW50ID0gSGFtbWVyLlBvaW50ZXJFdmVudCA9IHtcbiAgLyoqXG4gICAqIGhvbGRzIGFsbCBwb2ludGVyc1xuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgcG9pbnRlcnM6IHt9LFxuXG4gIC8qKlxuICAgKiBnZXQgYSBsaXN0IG9mIHBvaW50ZXJzXG4gICAqIEByZXR1cm5zIHtBcnJheX0gICAgIHRvdWNobGlzdFxuICAgKi9cbiAgZ2V0VG91Y2hMaXN0OiBmdW5jdGlvbiBnZXRUb3VjaExpc3QoKSB7XG4gICAgdmFyIHRvdWNobGlzdCA9IFtdO1xuICAgIC8vIHdlIGNhbiB1c2UgZm9yRWFjaCBzaW5jZSBwb2ludGVyRXZlbnRzIG9ubHkgaXMgaW4gSUUxMFxuICAgIFV0aWxzLmVhY2godGhpcy5wb2ludGVycywgZnVuY3Rpb24ocG9pbnRlcil7XG4gICAgICB0b3VjaGxpc3QucHVzaChwb2ludGVyKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0b3VjaGxpc3Q7XG4gIH0sXG5cbiAgLyoqXG4gICAqIHVwZGF0ZSB0aGUgcG9zaXRpb24gb2YgYSBwb2ludGVyXG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgdHlwZSAgICAgICAgICAgICBFVkVOVF9FTkRcbiAgICogQHBhcmFtICAge09iamVjdH0gICBwb2ludGVyRXZlbnRcbiAgICovXG4gIHVwZGF0ZVBvaW50ZXI6IGZ1bmN0aW9uIHVwZGF0ZVBvaW50ZXIodHlwZSwgcG9pbnRlckV2ZW50KSB7XG4gICAgaWYodHlwZSA9PSBFVkVOVF9FTkQpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnBvaW50ZXJzW3BvaW50ZXJFdmVudC5wb2ludGVySWRdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBvaW50ZXJFdmVudC5pZGVudGlmaWVyID0gcG9pbnRlckV2ZW50LnBvaW50ZXJJZDtcbiAgICAgIHRoaXMucG9pbnRlcnNbcG9pbnRlckV2ZW50LnBvaW50ZXJJZF0gPSBwb2ludGVyRXZlbnQ7XG4gICAgfVxuXG4gICAgLy8gaXQncyBzYXZlIHRvIHVzZSBPYmplY3Qua2V5cywgc2luY2UgcG9pbnRlckV2ZW50cyBhcmUgb25seSBpbiBuZXdlciBicm93c2Vyc1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnBvaW50ZXJzKS5sZW5ndGg7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGNoZWNrIGlmIGV2IG1hdGNoZXMgcG9pbnRlcnR5cGVcbiAgICogQHBhcmFtICAge1N0cmluZ30gICAgICAgIHBvaW50ZXJUeXBlICAgICBQT0lOVEVSX01PVVNFXG4gICAqIEBwYXJhbSAgIHtQb2ludGVyRXZlbnR9ICBldlxuICAgKi9cbiAgbWF0Y2hUeXBlOiBmdW5jdGlvbiBtYXRjaFR5cGUocG9pbnRlclR5cGUsIGV2KSB7XG4gICAgaWYoIWV2LnBvaW50ZXJUeXBlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHB0ID0gZXYucG9pbnRlclR5cGVcbiAgICAgICwgdHlwZXMgPSB7fTtcblxuICAgIHR5cGVzW1BPSU5URVJfTU9VU0VdID0gKHB0ID09PSBQT0lOVEVSX01PVVNFKTtcbiAgICB0eXBlc1tQT0lOVEVSX1RPVUNIXSA9IChwdCA9PT0gUE9JTlRFUl9UT1VDSCk7XG4gICAgdHlwZXNbUE9JTlRFUl9QRU5dID0gKHB0ID09PSBQT0lOVEVSX1BFTik7XG4gICAgcmV0dXJuIHR5cGVzW3BvaW50ZXJUeXBlXTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBnZXQgZXZlbnRzXG4gICAqL1xuICBnZXRFdmVudHM6IGZ1bmN0aW9uIGdldEV2ZW50cygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ3BvaW50ZXJkb3duIE1TUG9pbnRlckRvd24nLFxuICAgICAgJ3BvaW50ZXJtb3ZlIE1TUG9pbnRlck1vdmUnLFxuICAgICAgJ3BvaW50ZXJ1cCBwb2ludGVyY2FuY2VsIE1TUG9pbnRlclVwIE1TUG9pbnRlckNhbmNlbCdcbiAgICBdO1xuICB9LFxuXG4gIC8qKlxuICAgKiByZXNldCB0aGUgbGlzdFxuICAgKi9cbiAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0TGlzdCgpIHtcbiAgICB0aGlzLnBvaW50ZXJzID0ge307XG4gIH1cbn07XG5cblxudmFyIERldGVjdGlvbiA9IEhhbW1lci5kZXRlY3Rpb24gPSB7XG4gIC8vIGNvbnRhaW5zIGFsbCByZWdpc3RyZWQgSGFtbWVyLmdlc3R1cmVzIGluIHRoZSBjb3JyZWN0IG9yZGVyXG4gIGdlc3R1cmVzOiBbXSxcblxuICAvLyBkYXRhIG9mIHRoZSBjdXJyZW50IEhhbW1lci5nZXN0dXJlIGRldGVjdGlvbiBzZXNzaW9uXG4gIGN1cnJlbnQgOiBudWxsLFxuXG4gIC8vIHRoZSBwcmV2aW91cyBIYW1tZXIuZ2VzdHVyZSBzZXNzaW9uIGRhdGFcbiAgLy8gaXMgYSBmdWxsIGNsb25lIG9mIHRoZSBwcmV2aW91cyBnZXN0dXJlLmN1cnJlbnQgb2JqZWN0XG4gIHByZXZpb3VzOiBudWxsLFxuXG4gIC8vIHdoZW4gdGhpcyBiZWNvbWVzIHRydWUsIG5vIGdlc3R1cmVzIGFyZSBmaXJlZFxuICBzdG9wcGVkIDogZmFsc2UsXG5cblxuICAvKipcbiAgICogc3RhcnQgSGFtbWVyLmdlc3R1cmUgZGV0ZWN0aW9uXG4gICAqIEBwYXJhbSAgIHtIYW1tZXIuSW5zdGFuY2V9ICAgaW5zdFxuICAgKiBAcGFyYW0gICB7T2JqZWN0fSAgICAgICAgICAgIGV2ZW50RGF0YVxuICAgKi9cbiAgc3RhcnREZXRlY3Q6IGZ1bmN0aW9uIHN0YXJ0RGV0ZWN0KGluc3QsIGV2ZW50RGF0YSkge1xuICAgIC8vIGFscmVhZHkgYnVzeSB3aXRoIGEgSGFtbWVyLmdlc3R1cmUgZGV0ZWN0aW9uIG9uIGFuIGVsZW1lbnRcbiAgICBpZih0aGlzLmN1cnJlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN0b3BwZWQgPSBmYWxzZTtcblxuICAgIC8vIGhvbGRzIGN1cnJlbnQgc2Vzc2lvblxuICAgIHRoaXMuY3VycmVudCA9IHtcbiAgICAgIGluc3QgICAgICAgICAgICAgIDogaW5zdCwgLy8gcmVmZXJlbmNlIHRvIEhhbW1lckluc3RhbmNlIHdlJ3JlIHdvcmtpbmcgZm9yXG4gICAgICBzdGFydEV2ZW50ICAgICAgICA6IFV0aWxzLmV4dGVuZCh7fSwgZXZlbnREYXRhKSwgLy8gc3RhcnQgZXZlbnREYXRhIGZvciBkaXN0YW5jZXMsIHRpbWluZyBldGNcbiAgICAgIGxhc3RFdmVudCAgICAgICAgIDogZmFsc2UsIC8vIGxhc3QgZXZlbnREYXRhXG4gICAgICBsYXN0VmVsb2NpdHlFdmVudCA6IGZhbHNlLCAvLyBsYXN0IGV2ZW50RGF0YSBmb3IgdmVsb2NpdHkuXG4gICAgICB2ZWxvY2l0eSAgICAgICAgICA6IGZhbHNlLCAvLyBjdXJyZW50IHZlbG9jaXR5XG4gICAgICBuYW1lICAgICAgICAgICAgICA6ICcnIC8vIGN1cnJlbnQgZ2VzdHVyZSB3ZSdyZSBpbi9kZXRlY3RlZCwgY2FuIGJlICd0YXAnLCAnaG9sZCcgZXRjXG4gICAgfTtcblxuICAgIHRoaXMuZGV0ZWN0KGV2ZW50RGF0YSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogSGFtbWVyLmdlc3R1cmUgZGV0ZWN0aW9uXG4gICAqIEBwYXJhbSAgIHtPYmplY3R9ICAgIGV2ZW50RGF0YVxuICAgKi9cbiAgZGV0ZWN0OiBmdW5jdGlvbiBkZXRlY3QoZXZlbnREYXRhKSB7XG4gICAgaWYoIXRoaXMuY3VycmVudCB8fCB0aGlzLnN0b3BwZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBleHRlbmQgZXZlbnQgZGF0YSB3aXRoIGNhbGN1bGF0aW9ucyBhYm91dCBzY2FsZSwgZGlzdGFuY2UgZXRjXG4gICAgZXZlbnREYXRhID0gdGhpcy5leHRlbmRFdmVudERhdGEoZXZlbnREYXRhKTtcblxuICAgIC8vIGhhbW1lciBpbnN0YW5jZSBhbmQgaW5zdGFuY2Ugb3B0aW9uc1xuICAgIHZhciBpbnN0ID0gdGhpcy5jdXJyZW50Lmluc3QsXG4gICAgICAgIGluc3Rfb3B0aW9ucyA9IGluc3Qub3B0aW9ucztcblxuICAgIC8vIGNhbGwgSGFtbWVyLmdlc3R1cmUgaGFuZGxlcnNcbiAgICBVdGlscy5lYWNoKHRoaXMuZ2VzdHVyZXMsIGZ1bmN0aW9uIHRyaWdnZXJHZXN0dXJlKGdlc3R1cmUpIHtcbiAgICAgIC8vIG9ubHkgd2hlbiB0aGUgaW5zdGFuY2Ugb3B0aW9ucyBoYXZlIGVuYWJsZWQgdGhpcyBnZXN0dXJlXG4gICAgICBpZighdGhpcy5zdG9wcGVkICYmIGluc3Rfb3B0aW9uc1tnZXN0dXJlLm5hbWVdICE9PSBmYWxzZSAmJiBpbnN0LmVuYWJsZWQgIT09IGZhbHNlICkge1xuICAgICAgICAvLyBpZiBhIGhhbmRsZXIgcmV0dXJucyBmYWxzZSwgd2Ugc3RvcCB3aXRoIHRoZSBkZXRlY3Rpb25cbiAgICAgICAgaWYoZ2VzdHVyZS5oYW5kbGVyLmNhbGwoZ2VzdHVyZSwgZXZlbnREYXRhLCBpbnN0KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLnN0b3BEZXRlY3QoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcblxuICAgIC8vIHN0b3JlIGFzIHByZXZpb3VzIGV2ZW50IGV2ZW50XG4gICAgaWYodGhpcy5jdXJyZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnQubGFzdEV2ZW50ID0gZXZlbnREYXRhO1xuICAgIH1cblxuICAgIC8vIGVuZCBldmVudCwgYnV0IG5vdCB0aGUgbGFzdCB0b3VjaCwgc28gZG9udCBzdG9wXG4gICAgaWYoZXZlbnREYXRhLmV2ZW50VHlwZSA9PSBFVkVOVF9FTkQgJiYgIWV2ZW50RGF0YS50b3VjaGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMuc3RvcERldGVjdCgpO1xuICAgIH1cblxuICAgIHJldHVybiBldmVudERhdGE7XG4gIH0sXG5cblxuICAvKipcbiAgICogY2xlYXIgdGhlIEhhbW1lci5nZXN0dXJlIHZhcnNcbiAgICogdGhpcyBpcyBjYWxsZWQgb24gZW5kRGV0ZWN0LCBidXQgY2FuIGFsc28gYmUgdXNlZCB3aGVuIGEgZmluYWwgSGFtbWVyLmdlc3R1cmUgaGFzIGJlZW4gZGV0ZWN0ZWRcbiAgICogdG8gc3RvcCBvdGhlciBIYW1tZXIuZ2VzdHVyZXMgZnJvbSBiZWluZyBmaXJlZFxuICAgKi9cbiAgc3RvcERldGVjdDogZnVuY3Rpb24gc3RvcERldGVjdCgpIHtcbiAgICAvLyBjbG9uZSBjdXJyZW50IGRhdGEgdG8gdGhlIHN0b3JlIGFzIHRoZSBwcmV2aW91cyBnZXN0dXJlXG4gICAgLy8gdXNlZCBmb3IgdGhlIGRvdWJsZSB0YXAgZ2VzdHVyZSwgc2luY2UgdGhpcyBpcyBhbiBvdGhlciBnZXN0dXJlIGRldGVjdCBzZXNzaW9uXG4gICAgdGhpcy5wcmV2aW91cyA9IFV0aWxzLmV4dGVuZCh7fSwgdGhpcy5jdXJyZW50KTtcblxuICAgIC8vIHJlc2V0IHRoZSBjdXJyZW50XG4gICAgdGhpcy5jdXJyZW50ID0gbnVsbDtcblxuICAgIC8vIHN0b3BwZWQhXG4gICAgdGhpcy5zdG9wcGVkID0gdHJ1ZTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBjYWxjdWxhdGUgdmVsb2NpdHlcbiAgICogQHBhcmFtICAge09iamVjdH0gIGV2XG4gICAqIEBwYXJhbSAgIHtOdW1iZXJ9ICBkZWx0YV90aW1lXG4gICAqIEBwYXJhbSAgIHtOdW1iZXJ9ICBkZWx0YV94XG4gICAqIEBwYXJhbSAgIHtOdW1iZXJ9ICBkZWx0YV95XG4gICAqL1xuICBnZXRWZWxvY2l0eURhdGE6IGZ1bmN0aW9uIGdldFZlbG9jaXR5RGF0YShldiwgZGVsdGFfdGltZSwgZGVsdGFfeCwgZGVsdGFfeSkge1xuICAgIHZhciBjdXIgPSB0aGlzLmN1cnJlbnRcbiAgICAgICwgdmVsb2NpdHlFdiA9IGN1ci5sYXN0VmVsb2NpdHlFdmVudFxuICAgICAgLCB2ZWxvY2l0eSA9IGN1ci52ZWxvY2l0eTtcblxuICAgIC8vIGNhbGN1bGF0ZSB2ZWxvY2l0eSBldmVyeSB4IG1zXG4gICAgaWYgKHZlbG9jaXR5RXYgJiYgZXYudGltZVN0YW1wIC0gdmVsb2NpdHlFdi50aW1lU3RhbXAgPiBIYW1tZXIuVVBEQVRFX1ZFTE9DSVRZX0lOVEVSVkFMKSB7XG4gICAgICB2ZWxvY2l0eSA9IFV0aWxzLmdldFZlbG9jaXR5KGV2LnRpbWVTdGFtcCAtIHZlbG9jaXR5RXYudGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldi5jZW50ZXIuY2xpZW50WCAtIHZlbG9jaXR5RXYuY2VudGVyLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXYuY2VudGVyLmNsaWVudFkgLSB2ZWxvY2l0eUV2LmNlbnRlci5jbGllbnRZKTtcbiAgICAgIGN1ci5sYXN0VmVsb2NpdHlFdmVudCA9IGV2O1xuICAgIH1cbiAgICBlbHNlIGlmKCFjdXIudmVsb2NpdHkpIHtcbiAgICAgIHZlbG9jaXR5ID0gVXRpbHMuZ2V0VmVsb2NpdHkoZGVsdGFfdGltZSwgZGVsdGFfeCwgZGVsdGFfeSk7XG4gICAgICBjdXIubGFzdFZlbG9jaXR5RXZlbnQgPSBldjtcbiAgICB9XG5cbiAgICBjdXIudmVsb2NpdHkgPSB2ZWxvY2l0eTtcblxuICAgIGV2LnZlbG9jaXR5WCA9IHZlbG9jaXR5Lng7XG4gICAgZXYudmVsb2NpdHlZID0gdmVsb2NpdHkueTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBjYWxjdWxhdGUgaW50ZXJpbSBhbmdsZSBhbmQgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSAgIHtPYmplY3R9ICBldlxuICAgKi9cbiAgZ2V0SW50ZXJpbURhdGE6IGZ1bmN0aW9uIGdldEludGVyaW1EYXRhKGV2KSB7XG4gICAgdmFyIGxhc3RFdmVudCA9IHRoaXMuY3VycmVudC5sYXN0RXZlbnRcbiAgICAgICwgYW5nbGVcbiAgICAgICwgZGlyZWN0aW9uO1xuXG4gICAgLy8gZW5kIGV2ZW50cyAoZS5nLiBkcmFnZW5kKSBkb24ndCBoYXZlIHVzZWZ1bCB2YWx1ZXMgZm9yIGludGVyaW1EaXJlY3Rpb24gJiBpbnRlcmltQW5nbGVcbiAgICAvLyBiZWNhdXNlIHRoZSBwcmV2aW91cyBldmVudCBoYXMgZXhhY3RseSB0aGUgc2FtZSBjb29yZGluYXRlc1xuICAgIC8vIHNvIGZvciBlbmQgZXZlbnRzLCB0YWtlIHRoZSBwcmV2aW91cyB2YWx1ZXMgb2YgaW50ZXJpbURpcmVjdGlvbiAmIGludGVyaW1BbmdsZVxuICAgIC8vIGluc3RlYWQgb2YgcmVjYWxjdWxhdGluZyB0aGVtIGFuZCBnZXR0aW5nIGEgc3B1cmlvdXMgJzAnXG4gICAgaWYoZXYuZXZlbnRUeXBlID09IEVWRU5UX0VORCkge1xuICAgICAgYW5nbGUgPSBsYXN0RXZlbnQgJiYgbGFzdEV2ZW50LmludGVyaW1BbmdsZTtcbiAgICAgIGRpcmVjdGlvbiA9IGxhc3RFdmVudCAmJiBsYXN0RXZlbnQuaW50ZXJpbURpcmVjdGlvbjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBhbmdsZSA9IGxhc3RFdmVudCAmJiBVdGlscy5nZXRBbmdsZShsYXN0RXZlbnQuY2VudGVyLCBldi5jZW50ZXIpO1xuICAgICAgZGlyZWN0aW9uID0gbGFzdEV2ZW50ICYmIFV0aWxzLmdldERpcmVjdGlvbihsYXN0RXZlbnQuY2VudGVyLCBldi5jZW50ZXIpO1xuICAgIH1cblxuICAgIGV2LmludGVyaW1BbmdsZSA9IGFuZ2xlO1xuICAgIGV2LmludGVyaW1EaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gIH0sXG5cblxuICAvKipcbiAgICogZXh0ZW5kIGV2ZW50RGF0YSBmb3IgSGFtbWVyLmdlc3R1cmVzXG4gICAqIEBwYXJhbSAgIHtPYmplY3R9ICAgZXZEYXRhXG4gICAqIEByZXR1cm5zIHtPYmplY3R9ICAgZXZEYXRhXG4gICAqL1xuICBleHRlbmRFdmVudERhdGE6IGZ1bmN0aW9uIGV4dGVuZEV2ZW50RGF0YShldikge1xuICAgIHZhciBjdXIgPSB0aGlzLmN1cnJlbnRcbiAgICAgICwgc3RhcnRFdiA9IGN1ci5zdGFydEV2ZW50O1xuXG4gICAgLy8gaWYgdGhlIHRvdWNoZXMgY2hhbmdlLCBzZXQgdGhlIG5ldyB0b3VjaGVzIG92ZXIgdGhlIHN0YXJ0RXZlbnQgdG91Y2hlc1xuICAgIC8vIHRoaXMgYmVjYXVzZSB0b3VjaGV2ZW50cyBkb24ndCBoYXZlIGFsbCB0aGUgdG91Y2hlcyBvbiB0b3VjaHN0YXJ0LCBvciB0aGVcbiAgICAvLyB1c2VyIG11c3QgcGxhY2UgaGlzIGZpbmdlcnMgYXQgdGhlIEVYQUNUIHNhbWUgdGltZSBvbiB0aGUgc2NyZWVuLCB3aGljaCBpcyBub3QgcmVhbGlzdGljXG4gICAgLy8gYnV0LCBzb21ldGltZXMgaXQgaGFwcGVucyB0aGF0IGJvdGggZmluZ2VycyBhcmUgdG91Y2hpbmcgYXQgdGhlIEVYQUNUIHNhbWUgdGltZVxuICAgIGlmKGV2LnRvdWNoZXMubGVuZ3RoICE9IHN0YXJ0RXYudG91Y2hlcy5sZW5ndGggfHwgZXYudG91Y2hlcyA9PT0gc3RhcnRFdi50b3VjaGVzKSB7XG4gICAgICAvLyBleHRlbmQgMSBsZXZlbCBkZWVwIHRvIGdldCB0aGUgdG91Y2hsaXN0IHdpdGggdGhlIHRvdWNoIG9iamVjdHNcbiAgICAgIHN0YXJ0RXYudG91Y2hlcyA9IFtdO1xuICAgICAgVXRpbHMuZWFjaChldi50b3VjaGVzLCBmdW5jdGlvbih0b3VjaCkge1xuICAgICAgICBzdGFydEV2LnRvdWNoZXMucHVzaChVdGlscy5leHRlbmQoe30sIHRvdWNoKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgZGVsdGFfdGltZSA9IGV2LnRpbWVTdGFtcCAtIHN0YXJ0RXYudGltZVN0YW1wXG4gICAgICAsIGRlbHRhX3ggPSBldi5jZW50ZXIuY2xpZW50WCAtIHN0YXJ0RXYuY2VudGVyLmNsaWVudFhcbiAgICAgICwgZGVsdGFfeSA9IGV2LmNlbnRlci5jbGllbnRZIC0gc3RhcnRFdi5jZW50ZXIuY2xpZW50WTtcblxuICAgIHRoaXMuZ2V0VmVsb2NpdHlEYXRhKGV2LCBkZWx0YV90aW1lLCBkZWx0YV94LCBkZWx0YV95KTtcbiAgICB0aGlzLmdldEludGVyaW1EYXRhKGV2KTtcblxuICAgIFV0aWxzLmV4dGVuZChldiwge1xuICAgICAgc3RhcnRFdmVudDogc3RhcnRFdixcblxuICAgICAgZGVsdGFUaW1lIDogZGVsdGFfdGltZSxcbiAgICAgIGRlbHRhWCAgICA6IGRlbHRhX3gsXG4gICAgICBkZWx0YVkgICAgOiBkZWx0YV95LFxuXG4gICAgICBkaXN0YW5jZSAgOiBVdGlscy5nZXREaXN0YW5jZShzdGFydEV2LmNlbnRlciwgZXYuY2VudGVyKSxcbiAgICAgIGFuZ2xlICAgICA6IFV0aWxzLmdldEFuZ2xlKHN0YXJ0RXYuY2VudGVyLCBldi5jZW50ZXIpLFxuICAgICAgZGlyZWN0aW9uIDogVXRpbHMuZ2V0RGlyZWN0aW9uKHN0YXJ0RXYuY2VudGVyLCBldi5jZW50ZXIpLFxuXG4gICAgICBzY2FsZSAgICAgOiBVdGlscy5nZXRTY2FsZShzdGFydEV2LnRvdWNoZXMsIGV2LnRvdWNoZXMpLFxuICAgICAgcm90YXRpb24gIDogVXRpbHMuZ2V0Um90YXRpb24oc3RhcnRFdi50b3VjaGVzLCBldi50b3VjaGVzKVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGV2O1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIHJlZ2lzdGVyIG5ldyBnZXN0dXJlXG4gICAqIEBwYXJhbSAgIHtPYmplY3R9ICAgIGdlc3R1cmUgb2JqZWN0LCBzZWUgZ2VzdHVyZXMuanMgZm9yIGRvY3VtZW50YXRpb25cbiAgICogQHJldHVybnMge0FycmF5fSAgICAgZ2VzdHVyZXNcbiAgICovXG4gIHJlZ2lzdGVyOiBmdW5jdGlvbiByZWdpc3RlcihnZXN0dXJlKSB7XG4gICAgLy8gYWRkIGFuIGVuYWJsZSBnZXN0dXJlIG9wdGlvbnMgaWYgdGhlcmUgaXMgbm8gZ2l2ZW5cbiAgICB2YXIgb3B0aW9ucyA9IGdlc3R1cmUuZGVmYXVsdHMgfHwge307XG4gICAgaWYob3B0aW9uc1tnZXN0dXJlLm5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnNbZ2VzdHVyZS5uYW1lXSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gZXh0ZW5kIEhhbW1lciBkZWZhdWx0IG9wdGlvbnMgd2l0aCB0aGUgSGFtbWVyLmdlc3R1cmUgb3B0aW9uc1xuICAgIFV0aWxzLmV4dGVuZChIYW1tZXIuZGVmYXVsdHMsIG9wdGlvbnMsIHRydWUpO1xuXG4gICAgLy8gc2V0IGl0cyBpbmRleFxuICAgIGdlc3R1cmUuaW5kZXggPSBnZXN0dXJlLmluZGV4IHx8IDEwMDA7XG5cbiAgICAvLyBhZGQgSGFtbWVyLmdlc3R1cmUgdG8gdGhlIGxpc3RcbiAgICB0aGlzLmdlc3R1cmVzLnB1c2goZ2VzdHVyZSk7XG5cbiAgICAvLyBzb3J0IHRoZSBsaXN0IGJ5IGluZGV4XG4gICAgdGhpcy5nZXN0dXJlcy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIGlmKGEuaW5kZXggPCBiLmluZGV4KSB7IHJldHVybiAtMTsgfVxuICAgICAgaWYoYS5pbmRleCA+IGIuaW5kZXgpIHsgcmV0dXJuIDE7IH1cbiAgICAgIHJldHVybiAwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2VzdHVyZXM7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBEcmFnXG4gKiBNb3ZlIHdpdGggeCBmaW5nZXJzIChkZWZhdWx0IDEpIGFyb3VuZCBvbiB0aGUgcGFnZS4gQmxvY2tpbmcgdGhlIHNjcm9sbGluZyB3aGVuXG4gKiBtb3ZpbmcgbGVmdCBhbmQgcmlnaHQgaXMgYSBnb29kIHByYWN0aWNlLiBXaGVuIGFsbCB0aGUgZHJhZyBldmVudHMgYXJlIGJsb2NraW5nXG4gKiB5b3UgZGlzYWJsZSBzY3JvbGxpbmcgb24gdGhhdCBhcmVhLlxuICogQGV2ZW50cyAgZHJhZywgZHJhcGxlZnQsIGRyYWdyaWdodCwgZHJhZ3VwLCBkcmFnZG93blxuICovXG5IYW1tZXIuZ2VzdHVyZXMuRHJhZyA9IHtcbiAgbmFtZSAgICAgOiAnZHJhZycsXG4gIGluZGV4ICAgIDogNTAsXG4gIGRlZmF1bHRzIDoge1xuICAgIGRyYWdfbWluX2Rpc3RhbmNlICAgICAgICAgICAgOiAxMCxcblxuICAgIC8vIFNldCBjb3JyZWN0X2Zvcl9kcmFnX21pbl9kaXN0YW5jZSB0byB0cnVlIHRvIG1ha2UgdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBkcmFnXG4gICAgLy8gYmUgY2FsY3VsYXRlZCBmcm9tIHdoZXJlIHRoZSBkcmFnIHdhcyB0cmlnZ2VyZWQsIG5vdCBmcm9tIHdoZXJlIHRoZSB0b3VjaCBzdGFydGVkLlxuICAgIC8vIFVzZWZ1bCB0byBhdm9pZCBhIGplcmstc3RhcnRpbmcgZHJhZywgd2hpY2ggY2FuIG1ha2UgZmluZS1hZGp1c3RtZW50c1xuICAgIC8vIHRocm91Z2ggZHJhZ2dpbmcgZGlmZmljdWx0LCBhbmQgYmUgdmlzdWFsbHkgdW5hcHBlYWxpbmcuXG4gICAgY29ycmVjdF9mb3JfZHJhZ19taW5fZGlzdGFuY2U6IHRydWUsXG5cbiAgICAvLyBzZXQgMCBmb3IgdW5saW1pdGVkLCBidXQgdGhpcyBjYW4gY29uZmxpY3Qgd2l0aCB0cmFuc2Zvcm1cbiAgICBkcmFnX21heF90b3VjaGVzICAgICAgICAgICAgIDogMSxcblxuICAgIC8vIHByZXZlbnQgZGVmYXVsdCBicm93c2VyIGJlaGF2aW9yIHdoZW4gZHJhZ2dpbmcgb2NjdXJzXG4gICAgLy8gYmUgY2FyZWZ1bCB3aXRoIGl0LCBpdCBtYWtlcyB0aGUgZWxlbWVudCBhIGJsb2NraW5nIGVsZW1lbnRcbiAgICAvLyB3aGVuIHlvdSBhcmUgdXNpbmcgdGhlIGRyYWcgZ2VzdHVyZSwgaXQgaXMgYSBnb29kIHByYWN0aWNlIHRvIHNldCB0aGlzIHRydWVcbiAgICBkcmFnX2Jsb2NrX2hvcml6b250YWwgICAgICAgIDogZmFsc2UsXG4gICAgZHJhZ19ibG9ja192ZXJ0aWNhbCAgICAgICAgICA6IGZhbHNlLFxuXG4gICAgLy8gZHJhZ19sb2NrX3RvX2F4aXMga2VlcHMgdGhlIGRyYWcgZ2VzdHVyZSBvbiB0aGUgYXhpcyB0aGF0IGl0IHN0YXJ0ZWQgb24sXG4gICAgLy8gSXQgZGlzYWxsb3dzIHZlcnRpY2FsIGRpcmVjdGlvbnMgaWYgdGhlIGluaXRpYWwgZGlyZWN0aW9uIHdhcyBob3Jpem9udGFsLCBhbmQgdmljZSB2ZXJzYS5cbiAgICBkcmFnX2xvY2tfdG9fYXhpcyAgICAgICAgICAgIDogZmFsc2UsXG5cbiAgICAvLyBkcmFnIGxvY2sgb25seSBraWNrcyBpbiB3aGVuIGRpc3RhbmNlID4gZHJhZ19sb2NrX21pbl9kaXN0YW5jZVxuICAgIC8vIFRoaXMgd2F5LCBsb2NraW5nIG9jY3VycyBvbmx5IHdoZW4gdGhlIGRpc3RhbmNlIGhhcyBiZWNvbWUgbGFyZ2UgZW5vdWdoIHRvIHJlbGlhYmx5IGRldGVybWluZSB0aGUgZGlyZWN0aW9uXG4gICAgZHJhZ19sb2NrX21pbl9kaXN0YW5jZSAgICAgICA6IDI1XG4gIH0sXG5cbiAgdHJpZ2dlcmVkOiBmYWxzZSxcbiAgaGFuZGxlciAgOiBmdW5jdGlvbiBkcmFnR2VzdHVyZShldiwgaW5zdCkge1xuICAgIHZhciBjdXIgPSBEZXRlY3Rpb24uY3VycmVudDtcblxuICAgIC8vIGN1cnJlbnQgZ2VzdHVyZSBpc250IGRyYWcsIGJ1dCBkcmFnZ2VkIGlzIHRydWVcbiAgICAvLyB0aGlzIG1lYW5zIGFuIG90aGVyIGdlc3R1cmUgaXMgYnVzeS4gbm93IGNhbGwgZHJhZ2VuZFxuICAgIGlmKGN1ci5uYW1lICE9IHRoaXMubmFtZSAmJiB0aGlzLnRyaWdnZXJlZCkge1xuICAgICAgaW5zdC50cmlnZ2VyKHRoaXMubmFtZSArICdlbmQnLCBldik7XG4gICAgICB0aGlzLnRyaWdnZXJlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG1heCB0b3VjaGVzXG4gICAgaWYoaW5zdC5vcHRpb25zLmRyYWdfbWF4X3RvdWNoZXMgPiAwICYmXG4gICAgICBldi50b3VjaGVzLmxlbmd0aCA+IGluc3Qub3B0aW9ucy5kcmFnX21heF90b3VjaGVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3dpdGNoKGV2LmV2ZW50VHlwZSkge1xuICAgICAgY2FzZSBFVkVOVF9TVEFSVDpcbiAgICAgICAgdGhpcy50cmlnZ2VyZWQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRVZFTlRfTU9WRTpcbiAgICAgICAgLy8gd2hlbiB0aGUgZGlzdGFuY2Ugd2UgbW92ZWQgaXMgdG9vIHNtYWxsIHdlIHNraXAgdGhpcyBnZXN0dXJlXG4gICAgICAgIC8vIG9yIHdlIGNhbiBiZSBhbHJlYWR5IGluIGRyYWdnaW5nXG4gICAgICAgIGlmKGV2LmRpc3RhbmNlIDwgaW5zdC5vcHRpb25zLmRyYWdfbWluX2Rpc3RhbmNlICYmXG4gICAgICAgICAgY3VyLm5hbWUgIT0gdGhpcy5uYW1lKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXJ0Q2VudGVyID0gY3VyLnN0YXJ0RXZlbnQuY2VudGVyO1xuXG4gICAgICAgIC8vIHdlIGFyZSBkcmFnZ2luZyFcbiAgICAgICAgaWYoY3VyLm5hbWUgIT0gdGhpcy5uYW1lKSB7XG4gICAgICAgICAgY3VyLm5hbWUgPSB0aGlzLm5hbWU7XG4gICAgICAgICAgaWYoaW5zdC5vcHRpb25zLmNvcnJlY3RfZm9yX2RyYWdfbWluX2Rpc3RhbmNlICYmIGV2LmRpc3RhbmNlID4gMCkge1xuICAgICAgICAgICAgLy8gV2hlbiBhIGRyYWcgaXMgdHJpZ2dlcmVkLCBzZXQgdGhlIGV2ZW50IGNlbnRlciB0byBkcmFnX21pbl9kaXN0YW5jZSBwaXhlbHMgZnJvbSB0aGUgb3JpZ2luYWwgZXZlbnQgY2VudGVyLlxuICAgICAgICAgICAgLy8gV2l0aG91dCB0aGlzIGNvcnJlY3Rpb24sIHRoZSBkcmFnZ2VkIGRpc3RhbmNlIHdvdWxkIGp1bXBzdGFydCBhdCBkcmFnX21pbl9kaXN0YW5jZSBwaXhlbHMgaW5zdGVhZCBvZiBhdCAwLlxuICAgICAgICAgICAgLy8gSXQgbWlnaHQgYmUgdXNlZnVsIHRvIHNhdmUgdGhlIG9yaWdpbmFsIHN0YXJ0IHBvaW50IHNvbWV3aGVyZVxuICAgICAgICAgICAgdmFyIGZhY3RvciA9IE1hdGguYWJzKGluc3Qub3B0aW9ucy5kcmFnX21pbl9kaXN0YW5jZSAvIGV2LmRpc3RhbmNlKTtcbiAgICAgICAgICAgIHN0YXJ0Q2VudGVyLnBhZ2VYICs9IGV2LmRlbHRhWCAqIGZhY3RvcjtcbiAgICAgICAgICAgIHN0YXJ0Q2VudGVyLnBhZ2VZICs9IGV2LmRlbHRhWSAqIGZhY3RvcjtcbiAgICAgICAgICAgIHN0YXJ0Q2VudGVyLmNsaWVudFggKz0gZXYuZGVsdGFYICogZmFjdG9yO1xuICAgICAgICAgICAgc3RhcnRDZW50ZXIuY2xpZW50WSArPSBldi5kZWx0YVkgKiBmYWN0b3I7XG5cbiAgICAgICAgICAgIC8vIHJlY2FsY3VsYXRlIGV2ZW50IGRhdGEgdXNpbmcgbmV3IHN0YXJ0IHBvaW50XG4gICAgICAgICAgICBldiA9IERldGVjdGlvbi5leHRlbmRFdmVudERhdGEoZXYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxvY2sgZHJhZyB0byBheGlzP1xuICAgICAgICBpZihjdXIubGFzdEV2ZW50LmRyYWdfbG9ja2VkX3RvX2F4aXMgfHxcbiAgICAgICAgICAgICggaW5zdC5vcHRpb25zLmRyYWdfbG9ja190b19heGlzICYmXG4gICAgICAgICAgICAgIGluc3Qub3B0aW9ucy5kcmFnX2xvY2tfbWluX2Rpc3RhbmNlIDw9IGV2LmRpc3RhbmNlXG4gICAgICAgICAgICApKSB7XG4gICAgICAgICAgZXYuZHJhZ19sb2NrZWRfdG9fYXhpcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxhc3RfZGlyZWN0aW9uID0gY3VyLmxhc3RFdmVudC5kaXJlY3Rpb247XG4gICAgICAgIGlmKGV2LmRyYWdfbG9ja2VkX3RvX2F4aXMgJiYgbGFzdF9kaXJlY3Rpb24gIT09IGV2LmRpcmVjdGlvbikge1xuICAgICAgICAgIC8vIGtlZXAgZGlyZWN0aW9uIG9uIHRoZSBheGlzIHRoYXQgdGhlIGRyYWcgZ2VzdHVyZSBzdGFydGVkIG9uXG4gICAgICAgICAgaWYoVXRpbHMuaXNWZXJ0aWNhbChsYXN0X2RpcmVjdGlvbikpIHtcbiAgICAgICAgICAgIGV2LmRpcmVjdGlvbiA9IChldi5kZWx0YVkgPCAwKSA/IERJUkVDVElPTl9VUCA6IERJUkVDVElPTl9ET1dOO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGV2LmRpcmVjdGlvbiA9IChldi5kZWx0YVggPCAwKSA/IERJUkVDVElPTl9MRUZUIDogRElSRUNUSU9OX1JJR0hUO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpcnN0IHRpbWUsIHRyaWdnZXIgZHJhZ3N0YXJ0IGV2ZW50XG4gICAgICAgIGlmKCF0aGlzLnRyaWdnZXJlZCkge1xuICAgICAgICAgIGluc3QudHJpZ2dlcih0aGlzLm5hbWUgKyAnc3RhcnQnLCBldik7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdHJpZ2dlciBldmVudHNcbiAgICAgICAgaW5zdC50cmlnZ2VyKHRoaXMubmFtZSwgZXYpO1xuICAgICAgICBpbnN0LnRyaWdnZXIodGhpcy5uYW1lICsgZXYuZGlyZWN0aW9uLCBldik7XG5cbiAgICAgICAgdmFyIGlzX3ZlcnRpY2FsID0gVXRpbHMuaXNWZXJ0aWNhbChldi5kaXJlY3Rpb24pO1xuXG4gICAgICAgIC8vIGJsb2NrIHRoZSBicm93c2VyIGV2ZW50c1xuICAgICAgICBpZigoaW5zdC5vcHRpb25zLmRyYWdfYmxvY2tfdmVydGljYWwgJiYgaXNfdmVydGljYWwpIHx8XG4gICAgICAgICAgKGluc3Qub3B0aW9ucy5kcmFnX2Jsb2NrX2hvcml6b250YWwgJiYgIWlzX3ZlcnRpY2FsKSkge1xuICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRVZFTlRfRU5EOlxuICAgICAgICAvLyB0cmlnZ2VyIGRyYWdlbmRcbiAgICAgICAgaWYodGhpcy50cmlnZ2VyZWQpIHtcbiAgICAgICAgICBpbnN0LnRyaWdnZXIodGhpcy5uYW1lICsgJ2VuZCcsIGV2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBIb2xkXG4gKiBUb3VjaCBzdGF5cyBhdCB0aGUgc2FtZSBwbGFjZSBmb3IgeCB0aW1lXG4gKiBAZXZlbnRzICBob2xkXG4gKi9cbkhhbW1lci5nZXN0dXJlcy5Ib2xkID0ge1xuICBuYW1lICAgIDogJ2hvbGQnLFxuICBpbmRleCAgIDogMTAsXG4gIGRlZmF1bHRzOiB7XG4gICAgaG9sZF90aW1lb3V0ICA6IDUwMCxcbiAgICBob2xkX3RocmVzaG9sZDogMlxuICB9LFxuICB0aW1lciAgIDogbnVsbCxcblxuICBoYW5kbGVyIDogZnVuY3Rpb24gaG9sZEdlc3R1cmUoZXYsIGluc3QpIHtcbiAgICBzd2l0Y2goZXYuZXZlbnRUeXBlKSB7XG4gICAgICBjYXNlIEVWRU5UX1NUQVJUOlxuICAgICAgICAvLyBjbGVhciBhbnkgcnVubmluZyB0aW1lcnNcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgZ2VzdHVyZSBzbyB3ZSBjYW4gY2hlY2sgaW4gdGhlIHRpbWVvdXQgaWYgaXQgc3RpbGwgaXNcbiAgICAgICAgRGV0ZWN0aW9uLmN1cnJlbnQubmFtZSA9IHRoaXMubmFtZTtcblxuICAgICAgICAvLyBzZXQgdGltZXIgYW5kIGlmIGFmdGVyIHRoZSB0aW1lb3V0IGl0IHN0aWxsIGlzIGhvbGQsXG4gICAgICAgIC8vIHdlIHRyaWdnZXIgdGhlIGhvbGQgZXZlbnRcbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYoRGV0ZWN0aW9uLmN1cnJlbnQubmFtZSA9PSAnaG9sZCcpIHtcbiAgICAgICAgICAgIGluc3QudHJpZ2dlcignaG9sZCcsIGV2KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGluc3Qub3B0aW9ucy5ob2xkX3RpbWVvdXQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gd2hlbiB5b3UgbW92ZSBvciBlbmQgd2UgY2xlYXIgdGhlIHRpbWVyXG4gICAgICBjYXNlIEVWRU5UX01PVkU6XG4gICAgICAgIGlmKGV2LmRpc3RhbmNlID4gaW5zdC5vcHRpb25zLmhvbGRfdGhyZXNob2xkKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVWRU5UX0VORDpcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogUmVsZWFzZVxuICogQ2FsbGVkIGFzIGxhc3QsIHRlbGxzIHRoZSB1c2VyIGhhcyByZWxlYXNlZCB0aGUgc2NyZWVuXG4gKiBAZXZlbnRzICByZWxlYXNlXG4gKi9cbkhhbW1lci5nZXN0dXJlcy5SZWxlYXNlID0ge1xuICBuYW1lICAgOiAncmVsZWFzZScsXG4gIGluZGV4ICA6IEluZmluaXR5LFxuICBoYW5kbGVyOiBmdW5jdGlvbiByZWxlYXNlR2VzdHVyZShldiwgaW5zdCkge1xuICAgIGlmKGV2LmV2ZW50VHlwZSA9PSBFVkVOVF9FTkQpIHtcbiAgICAgIGluc3QudHJpZ2dlcih0aGlzLm5hbWUsIGV2KTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogU3dpcGVcbiAqIHRyaWdnZXJzIHN3aXBlIGV2ZW50cyB3aGVuIHRoZSBlbmQgdmVsb2NpdHkgaXMgYWJvdmUgdGhlIHRocmVzaG9sZFxuICogZm9yIGJlc3QgdXNhZ2UsIHNldCBwcmV2ZW50X2RlZmF1bHQgKG9uIHRoZSBkcmFnIGdlc3R1cmUpIHRvIHRydWVcbiAqIEBldmVudHMgIHN3aXBlLCBzd2lwZWxlZnQsIHN3aXBlcmlnaHQsIHN3aXBldXAsIHN3aXBlZG93blxuICovXG5IYW1tZXIuZ2VzdHVyZXMuU3dpcGUgPSB7XG4gIG5hbWUgICAgOiAnc3dpcGUnLFxuICBpbmRleCAgIDogNDAsXG4gIGRlZmF1bHRzOiB7XG4gICAgc3dpcGVfbWluX3RvdWNoZXM6IDEsXG4gICAgc3dpcGVfbWF4X3RvdWNoZXM6IDEsXG4gICAgc3dpcGVfdmVsb2NpdHkgICA6IDAuN1xuICB9LFxuICBoYW5kbGVyIDogZnVuY3Rpb24gc3dpcGVHZXN0dXJlKGV2LCBpbnN0KSB7XG4gICAgaWYoZXYuZXZlbnRUeXBlID09IEVWRU5UX0VORCkge1xuICAgICAgLy8gbWF4IHRvdWNoZXNcbiAgICAgIGlmKGV2LnRvdWNoZXMubGVuZ3RoIDwgaW5zdC5vcHRpb25zLnN3aXBlX21pbl90b3VjaGVzIHx8XG4gICAgICAgIGV2LnRvdWNoZXMubGVuZ3RoID4gaW5zdC5vcHRpb25zLnN3aXBlX21heF90b3VjaGVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gd2hlbiB0aGUgZGlzdGFuY2Ugd2UgbW92ZWQgaXMgdG9vIHNtYWxsIHdlIHNraXAgdGhpcyBnZXN0dXJlXG4gICAgICAvLyBvciB3ZSBjYW4gYmUgYWxyZWFkeSBpbiBkcmFnZ2luZ1xuICAgICAgaWYoZXYudmVsb2NpdHlYID4gaW5zdC5vcHRpb25zLnN3aXBlX3ZlbG9jaXR5IHx8XG4gICAgICAgIGV2LnZlbG9jaXR5WSA+IGluc3Qub3B0aW9ucy5zd2lwZV92ZWxvY2l0eSkge1xuICAgICAgICAvLyB0cmlnZ2VyIHN3aXBlIGV2ZW50c1xuICAgICAgICBpbnN0LnRyaWdnZXIodGhpcy5uYW1lLCBldik7XG4gICAgICAgIGluc3QudHJpZ2dlcih0aGlzLm5hbWUgKyBldi5kaXJlY3Rpb24sIGV2KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogVGFwL0RvdWJsZVRhcFxuICogUXVpY2sgdG91Y2ggYXQgYSBwbGFjZSBvciBkb3VibGUgYXQgdGhlIHNhbWUgcGxhY2VcbiAqIEBldmVudHMgIHRhcCwgZG91YmxldGFwXG4gKi9cbkhhbW1lci5nZXN0dXJlcy5UYXAgPSB7XG4gIG5hbWUgICAgOiAndGFwJyxcbiAgaW5kZXggICA6IDEwMCxcbiAgZGVmYXVsdHM6IHtcbiAgICB0YXBfbWF4X3RvdWNodGltZSA6IDI1MCxcbiAgICB0YXBfbWF4X2Rpc3RhbmNlICA6IDEwLFxuICAgIHRhcF9hbHdheXMgICAgICAgIDogdHJ1ZSxcbiAgICBkb3VibGV0YXBfZGlzdGFuY2U6IDIwLFxuICAgIGRvdWJsZXRhcF9pbnRlcnZhbDogMzAwXG4gIH0sXG5cbiAgaGFzX21vdmVkOiBmYWxzZSxcblxuICBoYW5kbGVyIDogZnVuY3Rpb24gdGFwR2VzdHVyZShldiwgaW5zdCkge1xuICAgIHZhciBwcmV2LCBzaW5jZV9wcmV2LCBkaWRfZG91YmxldGFwO1xuXG4gICAgLy8gcmVzZXQgbW92ZWQgc3RhdGVcbiAgICBpZihldi5ldmVudFR5cGUgPT0gRVZFTlRfU1RBUlQpIHtcbiAgICAgIHRoaXMuaGFzX21vdmVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVHJhY2sgdGhlIGRpc3RhbmNlIHdlJ3ZlIG1vdmVkLiBJZiBpdCdzIGFib3ZlIHRoZSBtYXggT05DRSwgcmVtZW1iZXIgdGhhdCAoZml4ZXMgIzQwNikuXG4gICAgZWxzZSBpZihldi5ldmVudFR5cGUgPT0gRVZFTlRfTU9WRSAmJiAhdGhpcy5tb3ZlZCkge1xuICAgICAgdGhpcy5oYXNfbW92ZWQgPSAoZXYuZGlzdGFuY2UgPiBpbnN0Lm9wdGlvbnMudGFwX21heF9kaXN0YW5jZSk7XG4gICAgfVxuXG4gICAgZWxzZSBpZihldi5ldmVudFR5cGUgPT0gRVZFTlRfRU5EICYmXG4gICAgICAgIGV2LnNyY0V2ZW50LnR5cGUgIT0gJ3RvdWNoY2FuY2VsJyAmJlxuICAgICAgICBldi5kZWx0YVRpbWUgPCBpbnN0Lm9wdGlvbnMudGFwX21heF90b3VjaHRpbWUgJiYgIXRoaXMuaGFzX21vdmVkKSB7XG5cbiAgICAgIC8vIHByZXZpb3VzIGdlc3R1cmUsIGZvciB0aGUgZG91YmxlIHRhcCBzaW5jZSB0aGVzZSBhcmUgdHdvIGRpZmZlcmVudCBnZXN0dXJlIGRldGVjdGlvbnNcbiAgICAgIHByZXYgPSBEZXRlY3Rpb24ucHJldmlvdXM7XG4gICAgICBzaW5jZV9wcmV2ID0gcHJldiAmJiBwcmV2Lmxhc3RFdmVudCAmJiBldi50aW1lU3RhbXAgLSBwcmV2Lmxhc3RFdmVudC50aW1lU3RhbXA7XG4gICAgICBkaWRfZG91YmxldGFwID0gZmFsc2U7XG5cbiAgICAgIC8vIGNoZWNrIGlmIGRvdWJsZSB0YXBcbiAgICAgIGlmKHByZXYgJiYgcHJldi5uYW1lID09ICd0YXAnICYmXG4gICAgICAgICAgKHNpbmNlX3ByZXYgJiYgc2luY2VfcHJldiA8IGluc3Qub3B0aW9ucy5kb3VibGV0YXBfaW50ZXJ2YWwpICYmXG4gICAgICAgICAgZXYuZGlzdGFuY2UgPCBpbnN0Lm9wdGlvbnMuZG91YmxldGFwX2Rpc3RhbmNlKSB7XG4gICAgICAgIGluc3QudHJpZ2dlcignZG91YmxldGFwJywgZXYpO1xuICAgICAgICBkaWRfZG91YmxldGFwID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gZG8gYSBzaW5nbGUgdGFwXG4gICAgICBpZighZGlkX2RvdWJsZXRhcCB8fCBpbnN0Lm9wdGlvbnMudGFwX2Fsd2F5cykge1xuICAgICAgICBEZXRlY3Rpb24uY3VycmVudC5uYW1lID0gJ3RhcCc7XG4gICAgICAgIGluc3QudHJpZ2dlcihEZXRlY3Rpb24uY3VycmVudC5uYW1lLCBldik7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFRvdWNoXG4gKiBDYWxsZWQgYXMgZmlyc3QsIHRlbGxzIHRoZSB1c2VyIGhhcyB0b3VjaGVkIHRoZSBzY3JlZW5cbiAqIEBldmVudHMgIHRvdWNoXG4gKi9cbkhhbW1lci5nZXN0dXJlcy5Ub3VjaCA9IHtcbiAgbmFtZSAgICA6ICd0b3VjaCcsXG4gIGluZGV4ICAgOiAtSW5maW5pdHksXG4gIGRlZmF1bHRzOiB7XG4gICAgLy8gY2FsbCBwcmV2ZW50RGVmYXVsdCBhdCB0b3VjaHN0YXJ0LCBhbmQgbWFrZXMgdGhlIGVsZW1lbnQgYmxvY2tpbmcgYnlcbiAgICAvLyBkaXNhYmxpbmcgdGhlIHNjcm9sbGluZyBvZiB0aGUgcGFnZSwgYnV0IGl0IGltcHJvdmVzIGdlc3R1cmVzIGxpa2VcbiAgICAvLyB0cmFuc2Zvcm1pbmcgYW5kIGRyYWdnaW5nLlxuICAgIC8vIGJlIGNhcmVmdWwgd2l0aCB1c2luZyB0aGlzLCBpdCBjYW4gYmUgdmVyeSBhbm5veWluZyBmb3IgdXNlcnMgdG8gYmUgc3R1Y2tcbiAgICAvLyBvbiB0aGUgcGFnZVxuICAgIHByZXZlbnRfZGVmYXVsdCAgICA6IGZhbHNlLFxuXG4gICAgLy8gZGlzYWJsZSBtb3VzZSBldmVudHMsIHNvIG9ubHkgdG91Y2ggKG9yIHBlbiEpIGlucHV0IHRyaWdnZXJzIGV2ZW50c1xuICAgIHByZXZlbnRfbW91c2VldmVudHM6IGZhbHNlXG4gIH0sXG4gIGhhbmRsZXIgOiBmdW5jdGlvbiB0b3VjaEdlc3R1cmUoZXYsIGluc3QpIHtcbiAgICBpZihpbnN0Lm9wdGlvbnMucHJldmVudF9tb3VzZWV2ZW50cyAmJlxuICAgICAgICBldi5wb2ludGVyVHlwZSA9PSBQT0lOVEVSX01PVVNFKSB7XG4gICAgICBldi5zdG9wRGV0ZWN0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYoaW5zdC5vcHRpb25zLnByZXZlbnRfZGVmYXVsdCkge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZihldi5ldmVudFR5cGUgPT0gRVZFTlRfU1RBUlQpIHtcbiAgICAgIGluc3QudHJpZ2dlcih0aGlzLm5hbWUsIGV2KTtcbiAgICB9XG4gIH1cbn07XG5cblxuLyoqXG4gKiBUcmFuc2Zvcm1cbiAqIFVzZXIgd2FudCB0byBzY2FsZSBvciByb3RhdGUgd2l0aCAyIGZpbmdlcnNcbiAqIEBldmVudHMgIHRyYW5zZm9ybSwgcGluY2gsIHBpbmNoaW4sIHBpbmNob3V0LCByb3RhdGVcbiAqL1xuSGFtbWVyLmdlc3R1cmVzLlRyYW5zZm9ybSA9IHtcbiAgbmFtZSAgICAgOiAndHJhbnNmb3JtJyxcbiAgaW5kZXggICAgOiA0NSxcbiAgZGVmYXVsdHMgOiB7XG4gICAgLy8gZmFjdG9yLCBubyBzY2FsZSBpcyAxLCB6b29taW4gaXMgdG8gMCBhbmQgem9vbW91dCB1bnRpbCBoaWdoZXIgdGhlbiAxXG4gICAgdHJhbnNmb3JtX21pbl9zY2FsZSAgICAgIDogMC4wMSxcbiAgICAvLyByb3RhdGlvbiBpbiBkZWdyZWVzXG4gICAgdHJhbnNmb3JtX21pbl9yb3RhdGlvbiAgIDogMSxcbiAgICAvLyBwcmV2ZW50IGRlZmF1bHQgYnJvd3NlciBiZWhhdmlvciB3aGVuIHR3byB0b3VjaGVzIGFyZSBvbiB0aGUgc2NyZWVuXG4gICAgLy8gYnV0IGl0IG1ha2VzIHRoZSBlbGVtZW50IGEgYmxvY2tpbmcgZWxlbWVudFxuICAgIC8vIHdoZW4geW91IGFyZSB1c2luZyB0aGUgdHJhbnNmb3JtIGdlc3R1cmUsIGl0IGlzIGEgZ29vZCBwcmFjdGljZSB0byBzZXQgdGhpcyB0cnVlXG4gICAgdHJhbnNmb3JtX2Fsd2F5c19ibG9jayAgIDogZmFsc2UsXG4gICAgLy8gZW5zdXJlcyB0aGF0IGFsbCB0b3VjaGVzIG9jY3VycmVkIHdpdGhpbiB0aGUgaW5zdGFuY2UgZWxlbWVudFxuICAgIHRyYW5zZm9ybV93aXRoaW5faW5zdGFuY2U6IGZhbHNlXG4gIH0sXG5cbiAgdHJpZ2dlcmVkOiBmYWxzZSxcblxuICBoYW5kbGVyICA6IGZ1bmN0aW9uIHRyYW5zZm9ybUdlc3R1cmUoZXYsIGluc3QpIHtcbiAgICAvLyBjdXJyZW50IGdlc3R1cmUgaXNudCBkcmFnLCBidXQgZHJhZ2dlZCBpcyB0cnVlXG4gICAgLy8gdGhpcyBtZWFucyBhbiBvdGhlciBnZXN0dXJlIGlzIGJ1c3kuIG5vdyBjYWxsIGRyYWdlbmRcbiAgICBpZihEZXRlY3Rpb24uY3VycmVudC5uYW1lICE9IHRoaXMubmFtZSAmJiB0aGlzLnRyaWdnZXJlZCkge1xuICAgICAgaW5zdC50cmlnZ2VyKHRoaXMubmFtZSArICdlbmQnLCBldik7XG4gICAgICB0aGlzLnRyaWdnZXJlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGF0IGxlYXN0IG11bHRpdG91Y2hcbiAgICBpZihldi50b3VjaGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBwcmV2ZW50IGRlZmF1bHQgd2hlbiB0d28gZmluZ2VycyBhcmUgb24gdGhlIHNjcmVlblxuICAgIGlmKGluc3Qub3B0aW9ucy50cmFuc2Zvcm1fYWx3YXlzX2Jsb2NrKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIGFsbCB0b3VjaGVzIG9jY3VycmVkIHdpdGhpbiB0aGUgaW5zdGFuY2UgZWxlbWVudFxuICAgIGlmKGluc3Qub3B0aW9ucy50cmFuc2Zvcm1fd2l0aGluX2luc3RhbmNlKSB7XG4gICAgICBmb3IodmFyIGk9LTE7IGV2LnRvdWNoZXNbKytpXTspIHtcbiAgICAgICAgaWYoIVV0aWxzLmhhc1BhcmVudChldi50b3VjaGVzW2ldLnRhcmdldCwgaW5zdC5lbGVtZW50KSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHN3aXRjaChldi5ldmVudFR5cGUpIHtcbiAgICAgIGNhc2UgRVZFTlRfU1RBUlQ6XG4gICAgICAgIHRoaXMudHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVWRU5UX01PVkU6XG4gICAgICAgIHZhciBzY2FsZV90aHJlc2hvbGQgPSBNYXRoLmFicygxIC0gZXYuc2NhbGUpO1xuICAgICAgICB2YXIgcm90YXRpb25fdGhyZXNob2xkID0gTWF0aC5hYnMoZXYucm90YXRpb24pO1xuXG4gICAgICAgIC8vIHdoZW4gdGhlIGRpc3RhbmNlIHdlIG1vdmVkIGlzIHRvbyBzbWFsbCB3ZSBza2lwIHRoaXMgZ2VzdHVyZVxuICAgICAgICAvLyBvciB3ZSBjYW4gYmUgYWxyZWFkeSBpbiBkcmFnZ2luZ1xuICAgICAgICBpZihzY2FsZV90aHJlc2hvbGQgPCBpbnN0Lm9wdGlvbnMudHJhbnNmb3JtX21pbl9zY2FsZSAmJlxuICAgICAgICAgIHJvdGF0aW9uX3RocmVzaG9sZCA8IGluc3Qub3B0aW9ucy50cmFuc2Zvcm1fbWluX3JvdGF0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2UgYXJlIHRyYW5zZm9ybWluZyFcbiAgICAgICAgRGV0ZWN0aW9uLmN1cnJlbnQubmFtZSA9IHRoaXMubmFtZTtcblxuICAgICAgICAvLyBmaXJzdCB0aW1lLCB0cmlnZ2VyIGRyYWdzdGFydCBldmVudFxuICAgICAgICBpZighdGhpcy50cmlnZ2VyZWQpIHtcbiAgICAgICAgICBpbnN0LnRyaWdnZXIodGhpcy5uYW1lICsgJ3N0YXJ0JywgZXYpO1xuICAgICAgICAgIHRoaXMudHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluc3QudHJpZ2dlcih0aGlzLm5hbWUsIGV2KTsgLy8gYmFzaWMgdHJhbnNmb3JtIGV2ZW50XG5cbiAgICAgICAgLy8gdHJpZ2dlciByb3RhdGUgZXZlbnRcbiAgICAgICAgaWYocm90YXRpb25fdGhyZXNob2xkID4gaW5zdC5vcHRpb25zLnRyYW5zZm9ybV9taW5fcm90YXRpb24pIHtcbiAgICAgICAgICBpbnN0LnRyaWdnZXIoJ3JvdGF0ZScsIGV2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRyaWdnZXIgcGluY2ggZXZlbnRcbiAgICAgICAgaWYoc2NhbGVfdGhyZXNob2xkID4gaW5zdC5vcHRpb25zLnRyYW5zZm9ybV9taW5fc2NhbGUpIHtcbiAgICAgICAgICBpbnN0LnRyaWdnZXIoJ3BpbmNoJywgZXYpO1xuICAgICAgICAgIGluc3QudHJpZ2dlcigncGluY2gnICsgKGV2LnNjYWxlPDEgPyAnaW4nIDogJ291dCcpLCBldik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRVZFTlRfRU5EOlxuICAgICAgICAvLyB0cmlnZ2VyIGRyYWdlbmRcbiAgICAgICAgaWYodGhpcy50cmlnZ2VyZWQpIHtcbiAgICAgICAgICBpbnN0LnRyaWdnZXIodGhpcy5uYW1lICsgJ2VuZCcsIGV2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufTtcblxuLy8gQU1EIGV4cG9ydFxuaWYodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIEhhbW1lcjtcbiAgfSk7XG59XG4vLyBjb21tb25qcyBleHBvcnRcbmVsc2UgaWYodHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IEhhbW1lcjtcbn1cbi8vIGJyb3dzZXIgZXhwb3J0XG5lbHNlIHtcbiAgd2luZG93LkhhbW1lciA9IEhhbW1lcjtcbn1cblxufSkod2luZG93KTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuLi9ib3dlcl9jb21wb25lbnRzL2V2ZW50RW1pdHRlci9FdmVudEVtaXR0ZXIuanMnKTtcbnZhciBoYW1tZXIgPSByZXF1aXJlKCcuLi9ib3dlcl9jb21wb25lbnRzL2hhbW1lcmpzL2hhbW1lci5qcycpO1xuXG52YXIgaXNUb3VjaERldmljZSA9ICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscy5qcycpLFxuXHR0d2VlbiA9IHJlcXVpcmUoJy4uL2Jvd2VyX2NvbXBvbmVudHMvZWFzeS10d2Vlbi9kaXN0L2Vhc3lUd2Vlbi5qcycpO1xuXG52YXIgU3VyZmFjZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGFpbmVyKXtcblx0dGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cdHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcblxuXHR0aGlzLnJlZml0KCk7XG5cdHRoaXMuZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHR0aGlzLmhvcml6b250YWxQb3NpdGlvbiA9IDA7XG5cdHRoaXMudmVydGljYWxQb3NpdGlvbiA9IDA7XG5cdFxuXHR0aGlzLmhvcml6b250YWxWZWxvY2l0eSA9IDA7XG5cdHRoaXMudmVydGljYWxWZWxvY2l0eSA9IDA7XG5cblx0dGhpcy5jc3NUcmFuc2l0aW9ucyA9IHt9O1xuXHR0aGlzLmNzc0ZpbHRlcnMgPSB7fTtcblx0dGhpcy5jc3NUcmFuc2Zvcm1zID0ge307XG5cblx0dGhpcy5wb2ludGVyRXZlbnRIYW5kbGVyID0gdGhpcy5wb2ludGVyRXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG5cdHRoaXMuZHJhZ0V2ZW50SGFuZGxlciA9IHRoaXMuZHJhZ0V2ZW50SGFuZGxlci5iaW5kKHRoaXMpO1xuXHR0aGlzLnRyYW5zZm9ybVN0ZXAgPSB0aGlzLnRyYW5zZm9ybVN0ZXAuYmluZCh0aGlzKTtcbn07XG5cblN1cmZhY2UuY3JlYXRlID0gZnVuY3Rpb24oY29udGFpbmVyKXtcblx0dmFyIHN1cmZhY2UgPSBuZXcgU3VyZmFjZShjb250YWluZXIpO1xuXG5cdHJldHVybiBTdXJmYWNlLmdldEFwaShzdXJmYWNlKTtcbn07XG5cblN1cmZhY2UuZ2V0QXBpID0gZnVuY3Rpb24oc3VyZmFjZSl7XG5cdHZhciBhcGkgPSB7fTtcblxuXHRhcGkub24gPSBzdXJmYWNlLmVtaXR0ZXIub24uYmluZChzdXJmYWNlLmVtaXR0ZXIpO1xuXHRhcGkucmVtb3ZlTGlzdGVuZXIgPSBzdXJmYWNlLmVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIuYmluZChzdXJmYWNlLmVtaXR0ZXIpO1xuXG5cdGFwaS5yZWZpdCA9IHN1cmZhY2UucmVmaXQuYmluZChzdXJmYWNlKTtcblx0YXBpLmVsZW1lbnQgPSBzdXJmYWNlLmVsZW1lbnQ7XG5cdGFwaS5jb250YWluZXIgPSBzdXJmYWNlLmNvbnRhaW5lcjtcblxuXHRhcGkuY3NzID0gc3VyZmFjZS5zZXRDc3NTdHlsZS5iaW5kKHN1cmZhY2UpO1xuXHRhcGkuY3NzVHJhbnNmb3JtID0gc3VyZmFjZS5zZXRDc3NUcmFuc2Zvcm0uYmluZChzdXJmYWNlKTtcblx0YXBpLmNzc0ZpbHRlciA9IHN1cmZhY2Uuc2V0Q3NzRmlsdGVyLmJpbmQoc3VyZmFjZSk7XG5cdGFwaS5jc3NUcmFuc2l0aW9uID0gc3VyZmFjZS5zZXRDc3NUcmFuc2l0aW9uLmJpbmQoc3VyZmFjZSk7XG5cblx0YXBpLnNwZWVkID0gc3VyZmFjZS5zZXRWZWxvY2l0eVNjYWxhci5iaW5kKHN1cmZhY2UpO1xuXHRhcGkuaG9yaXpvbnRhbFNwZWVkID0gc3VyZmFjZS5zZXRIb3Jpem9udGFsVmVsb2NpdHlTY2FsYXIuYmluZChzdXJmYWNlKTtcblx0YXBpLnZlcnRpY2FsU3BlZWQgPSBzdXJmYWNlLnNldFZlcnRpY2FsVmVsb2NpdHlTY2FsYXIuYmluZChzdXJmYWNlKTtcblxuXHRhcGkuaG9yaXpvbnRhbFdpbmQgPSBzdXJmYWNlLnNldEJhc2VIb3Jpem9udGFsVmVsb2NpdHkuYmluZChzdXJmYWNlKTtcblx0YXBpLnZlcnRpY2FsV2luZCA9IHN1cmZhY2Uuc2V0QmFzZVZlcnRpY2FsVmVsb2NpdHkuYmluZChzdXJmYWNlKTtcblx0XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcGksICdzcGVlZEdyYWRpZW50Jywge1xuXHRcdGdldDogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAoc3VyZmFjZS5ob3Jpem9udGFsVmVsb2NpdHlHcmFkaWVudCA9PT0gc3VyZmFjZS52ZXJ0aWNhbFZlbG9jaXR5R3JhZGllbnQpPyBcblx0XHRcdFx0XHRcdHN1cmZhY2UuaG9yaXpvbnRhbFZlbG9jaXR5R3JhZGllbnQgOiBcblx0XHRcdFx0XHRcdHZvaWQgMDtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24odmFsdWUpe1xuXHRcdFx0c3VyZmFjZS5ob3Jpem9udGFsVmVsb2NpdHlHcmFkaWVudCA9IHZhbHVlO1xuXHRcdFx0c3VyZmFjZS52ZXJ0aWNhbFZlbG9jaXR5R3JhZGllbnQgPSB2YWx1ZTtcblx0XHR9XG5cdH0pO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcGksICdob3Jpem9udGFsVmVsb2NpdHlHcmFkaWVudCcsIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBzdXJmYWNlLmhvcml6b250YWxWZWxvY2l0eUdyYWRpZW50O30sXG5cdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSl7IHN1cmZhY2UuaG9yaXpvbnRhbFZlbG9jaXR5R3JhZGllbnQgPSB2YWx1ZTt9XG5cdH0pO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcGksICd2ZXJ0aWNhbFZlbG9jaXR5R3JhZGllbnQnLCB7XG5cdFx0Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gc3VyZmFjZS52ZXJ0aWNhbFZlbG9jaXR5R3JhZGllbnQ7fSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKXsgc3VyZmFjZS52ZXJ0aWNhbFZlbG9jaXR5R3JhZGllbnQgPSB2YWx1ZTt9XG5cdH0pO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcGksICd3aWR0aCcsIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCl7cmV0dXJuIHN1cmZhY2Uud2lkdGg7fVxuXHR9KTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoYXBpLCAnaGVpZ2h0Jywge1xuXHRcdGdldDogZnVuY3Rpb24oKXtyZXR1cm4gc3VyZmFjZS5oZWlnaHQ7fVxuXHR9KTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoYXBpLCAndG9wJywge1xuXHRcdGdldDogZnVuY3Rpb24oKXtyZXR1cm4gc3VyZmFjZS50b3A7fVxuXHR9KTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoYXBpLCAnbGVmdCcsIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCl7cmV0dXJuIHN1cmZhY2UubGVmdDt9XG5cdH0pO1xuXG5cdHJldHVybiBhcGk7XG59O1xuXG5TdXJmYWNlLnByb3RvdHlwZS5ob3Jpem9udGFsVmVsb2NpdHlTY2FsYXIgPSAwO1xuU3VyZmFjZS5wcm90b3R5cGUudmVydGljYWxWZWxvY2l0eVNjYWxhciA9IDA7XG5cblN1cmZhY2UucHJvdG90eXBlLmJhc2VIb3Jpem9udGFsVmVsb2NpdHkgPSAwO1xuU3VyZmFjZS5wcm90b3R5cGUuYmFzZVZlcnRpY2FsVmVsb2NpdHkgPSAwO1xuXG5TdXJmYWNlLnByb3RvdHlwZS5tc1BlclN0ZXAgPSAxNjsgLy8gTWlsbGlzZWNvbmRzIHBlciBzdGVwXG5cbi8vIFRoZXNlIGZ1bmN0aW9ucyB0YWtlIGN1cnJlbnQgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIGNlbnRlciBhbmQgcmV0dXJuIGEgbnVtYmVyIGJldHdlZW4gLTEgYW5kIDFcblN1cmZhY2UucHJvdG90eXBlLmhvcml6b250YWxWZWxvY2l0eUdyYWRpZW50ID0gdHdlZW4uZWFzaW5nLnF1YWRyYXRpY0luO1xuU3VyZmFjZS5wcm90b3R5cGUudmVydGljYWxWZWxvY2l0eUdyYWRpZW50ID0gdHdlZW4uZWFzaW5nLnF1YWRyYXRpY0luO1xuXG5TdXJmYWNlLnByb3RvdHlwZS5wb2ludGVyVHJhY2tpbmdFdmVudHMgPSBbJ21vdXNlbW92ZSddOy8vLCAndG91Y2hzdGFydCcsICd0b3VjaGVuZCcsICd0b3VjaG1vdmUnXTtcblxuU3VyZmFjZS5wcm90b3R5cGUucmVmaXQgPSBmdW5jdGlvbigpe1xuXHR2YXIgcmVjdCA9IHRoaXMuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdHRoaXMud2lkdGggPSByZWN0LndpZHRoO1xuXHR0aGlzLmhhbGZXaWR0aCA9IHRoaXMud2lkdGggLyAyO1xuXG5cdHRoaXMuaGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG5cdHRoaXMuaGFsZkhlaWdodCA9IHRoaXMuaGVpZ2h0IC8gMjtcblxuXHR0aGlzLnRvcCA9IHJlY3QudG9wO1xuXHR0aGlzLmxlZnQgPSByZWN0LmxlZnQ7XG59O1xuXG5TdXJmYWNlLnByb3RvdHlwZS5zdGFydFRyYW5zZm9ybUxvb3AgPSBmdW5jdGlvbigpe1xuXHRpZih0aGlzLnRyYW5zZm9ybWluZykgcmV0dXJuO1xuXG5cdHRoaXMudHJhbnNmb3JtaW5nID0gdHJ1ZTtcblx0dGhpcy5sYXN0U3RlcFRpbWUgPSBEYXRlLm5vdygpO1xuXHR0aGlzLmFuaW1hdGlvblJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnRyYW5zZm9ybVN0ZXApO1xuXHR0aGlzLmF0dGFjaFBvaW50ZXJMaXN0ZW5lcnMoKTtcblx0dGhpcy5lbWl0dGVyLmVtaXQoJ21vdmUgc3RhcnQnKTtcbn07XG5cblN1cmZhY2UucHJvdG90eXBlLnN0b3BUcmFuc2Zvcm1Mb29wID0gZnVuY3Rpb24oKXtcblx0aWYoIXRoaXMudHJhbnNmb3JtaW5nKSByZXR1cm47XG5cblx0dGhpcy50cmFuc2Zvcm1pbmcgPSBmYWxzZTtcblx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25SZXF1ZXN0SWQpO1xuXHR0aGlzLmVtaXR0ZXIuZW1pdCgnbW92ZSBzdG9wJyk7XG59O1xuXG5TdXJmYWNlLnByb3RvdHlwZS50cmFuc2Zvcm1TdGVwID0gZnVuY3Rpb24oKXtcblx0dmFyIGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKSxcblx0XHRsYWdTY2FsYXIgPSAoY3VycmVudFRpbWUgLSB0aGlzLmxhc3RTdGVwVGltZSkgLyB0aGlzLm1zUGVyU3RlcDtcblx0XG5cdHRoaXMubGFzdEhvcml6b250YWxEaXNwbGFjZW1lbnQgPSBsYWdTY2FsYXIgKiAodGhpcy5iYXNlSG9yaXpvbnRhbFZlbG9jaXR5ICsgXG5cdFx0KHRoaXMuaG9yaXpvbnRhbFZlbG9jaXR5ICogdGhpcy5ob3Jpem9udGFsVmVsb2NpdHlTY2FsYXIpKTtcblx0dGhpcy5sYXN0VmVydGljYWxEaXNwbGFjZW1lbnQgPSBsYWdTY2FsYXIgKiAodGhpcy5iYXNlVmVydGljYWxWZWxvY2l0eSArIFxuXHRcdCh0aGlzLnZlcnRpY2FsVmVsb2NpdHkgKiB0aGlzLnZlcnRpY2FsVmVsb2NpdHlTY2FsYXIpKTtcblx0dGhpcy5sYXN0U3RlcFRpbWUgPSBjdXJyZW50VGltZTtcblx0XG5cdGlmKHRoaXMubGFzdEhvcml6b250YWxEaXNwbGFjZW1lbnQgfHwgdGhpcy5sYXN0VmVydGljYWxEaXNwbGFjZW1lbnQpe1xuXHRcdHRoaXMuaG9yaXpvbnRhbFBvc2l0aW9uICs9IHRoaXMubGFzdEhvcml6b250YWxEaXNwbGFjZW1lbnQ7XG5cdFx0dGhpcy52ZXJ0aWNhbFBvc2l0aW9uICs9IHRoaXMubGFzdFZlcnRpY2FsRGlzcGxhY2VtZW50O1xuXHRcdHRoaXMuc2V0Q3NzVHJhbnNmb3JtKCd0cmFuc2xhdGUnLCB0aGlzLmhvcml6b250YWxQb3NpdGlvbiArICdweCwgJyArIHRoaXMudmVydGljYWxQb3NpdGlvbiArICdweCcpO1xuXHRcdHRoaXMuYW5pbWF0aW9uUmVxdWVzdElkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudHJhbnNmb3JtU3RlcCk7XG5cdH0gZWxzZSBpZih0aGlzLnRyYWNraW5nUG9pbnRlciB8fCB0aGlzLmJhc2VIb3Jpem9udGFsVmVsb2NpdHkgfHwgdGhpcy5iYXNlVmVydGljYWxWZWxvY2l0eSl7XG5cdFx0dGhpcy5hbmltYXRpb25SZXF1ZXN0SWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy50cmFuc2Zvcm1TdGVwKTtcblx0fVxufTtcblxuU3VyZmFjZS5wcm90b3R5cGUuc2V0QmFzZUhvcml6b250YWxWZWxvY2l0eSA9IGZ1bmN0aW9uKHRhcmdldCwgZHVyYXRpb24sIGVhc2luZ0Z1bmMpe1xuXHRpZih0YXJnZXQgPT09IHZvaWQgMCkgcmV0dXJuIHRoaXMuYmFzZUhvcml6b250YWxWZWxvY2l0eTtcblxuXHRpZih0aGlzLmhvcml6b250YWxXaW5kVHdlZW4pIHRoaXMuaG9yaXpvbnRhbFdpbmRUd2Vlbi5wYXVzZSgpO1xuXG5cdGlmKGR1cmF0aW9uKXtcblx0XHRkdXJhdGlvbiAqPSAxMDAwOyAvLyBUd2VlbmluZyBvY2N1cnMgaW4gbWlsbGlzZWNvbmRzXG5cdFx0ZWFzaW5nRnVuYyA9IGVhc2luZ0Z1bmMgfHwgKHRoaXMuYmFzZUhvcml6b250YWxWZWxvY2l0eSA8IHRhcmdldCk/IFxuXHRcdFx0dHdlZW4uZWFzaW5nLnF1YWRyYXRpY0luIDogdHdlZW4uZWFzaW5nLnF1YWRyYXRpY091dDtcblx0XHR0aGlzLmhvcml6b250YWxXaW5kVHdlZW4gPSB0d2VlbihlYXNpbmdGdW5jLCB0aGlzLCAnYmFzZUhvcml6b250YWxWZWxvY2l0eScsIHRhcmdldCwgZHVyYXRpb24pO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuYmFzZUhvcml6b250YWxWZWxvY2l0eSA9IHRhcmdldDtcblx0fVxufTtcblxuU3VyZmFjZS5wcm90b3R5cGUuc2V0QmFzZVZlcnRpY2FsVmVsb2NpdHkgPSBmdW5jdGlvbih0YXJnZXQsIGR1cmF0aW9uLCBlYXNpbmdGdW5jKXtcblx0aWYodGFyZ2V0ID09PSB2b2lkIDApIHJldHVybiB0aGlzLmJhc2VWZXJ0aWNhbFZlbG9jaXR5O1xuXHRcblx0aWYodGhpcy52ZXJ0aWNhbFdpbmRUd2VlbikgdGhpcy52ZXJ0aWNhbFdpbmRUd2Vlbi5wYXVzZSgpO1xuXG5cdGlmKGR1cmF0aW9uKXtcblx0XHRkdXJhdGlvbiAqPSAxMDAwOyAvLyBUd2VlbmluZyBvY2N1cnMgaW4gbWlsbGlzZWNvbmRzXG5cdFx0ZWFzaW5nRnVuYyA9IGVhc2luZ0Z1bmMgfHwgKHRoaXMuYmFzZVZlcnRpY2FsVmVsb2NpdHkgPCB0YXJnZXQpPyBcblx0XHRcdHR3ZWVuLmVhc2luZy5xdWFkcmF0aWNJbiA6IHR3ZWVuLmVhc2luZy5xdWFkcmF0aWNPdXQ7XG5cdFx0dGhpcy52ZXJ0aWNhbFdpbmRUd2VlbiA9IHR3ZWVuKGVhc2luZ0Z1bmMsIHRoaXMsICdiYXNlVmVydGljYWxWZWxvY2l0eScsIHRhcmdldCwgZHVyYXRpb24pO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuYmFzZVZlcnRpY2FsVmVsb2NpdHkgPSB0YXJnZXQ7XG5cdH1cbn07XG5cblN1cmZhY2UucHJvdG90eXBlLnNldFZlbG9jaXR5U2NhbGFyID0gZnVuY3Rpb24odGFyZ2V0LCBkdXJhdGlvbiwgZWFzaW5nRnVuYywgY2FsbGJhY2spe1xuXHRpZih0YXJnZXQgPT09IHZvaWQgMCl7XG5cdFx0aWYodGhpcy5ob3Jpem9udGFsVmVsb2NpdHlTY2FsYXIgPT09IHRoaXMudmVydGljYWxWZWxvY2l0eVNjYWxhcil7XG5cdFx0XHRyZXR1cm4gdGhpcy5ob3Jpem9udGFsVmVsb2NpdHlTY2FsYXI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZvaWQgMDtcblx0fVxuXHRcblx0dGhpcy5zZXRIb3Jpem9udGFsVmVsb2NpdHlTY2FsYXIodGFyZ2V0LCBkdXJhdGlvbiwgZWFzaW5nRnVuYywgY2FsbGJhY2spO1xuXHR0aGlzLnNldFZlcnRpY2FsVmVsb2NpdHlTY2FsYXIodGFyZ2V0LCBkdXJhdGlvbiwgZWFzaW5nRnVuYyk7XG59O1xuXG5TdXJmYWNlLnByb3RvdHlwZS5zZXRIb3Jpem9udGFsVmVsb2NpdHlTY2FsYXIgPSBmdW5jdGlvbih0YXJnZXQsIGR1cmF0aW9uLCBlYXNpbmdGdW5jLCBjYWxsYmFjayl7XG5cdGlmKHRhcmdldCA9PT0gdm9pZCAwKSByZXR1cm4gdGhpcy5ob3Jpem9udGFsVmVsb2NpdHlTY2FsYXI7XG5cblx0aWYodGhpcy5ob3Jpem9udGFsU3BlZWRUd2VlbikgdGhpcy5ob3Jpem9udGFsU3BlZWRUd2Vlbi5wYXVzZSgpO1xuXG5cdGlmKGR1cmF0aW9uKXtcblx0XHRkdXJhdGlvbiAqPSAxMDAwOyAvLyBUd2VlbmluZyBvY2N1cnMgaW4gbWlsbGlzZWNvbmRzXG5cdFx0ZWFzaW5nRnVuYyA9IGVhc2luZ0Z1bmMgfHwgKHRoaXMuaG9yaXpvbnRhbFZlbG9jaXR5U2NhbGFyIDwgdGFyZ2V0KT8gXG5cdFx0XHR0d2Vlbi5lYXNpbmcucXVhZHJhdGljSW4gOiB0d2Vlbi5lYXNpbmcucXVhZHJhdGljT3V0O1xuXHRcdHRoaXMuaG9yaXpvbnRhbFNwZWVkVHdlZW4gPSB0d2VlbihlYXNpbmdGdW5jLCB0aGlzLCAnaG9yaXpvbnRhbFZlbG9jaXR5U2NhbGFyJywgdGFyZ2V0LCBkdXJhdGlvbiwgY2FsbGJhY2spO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuaG9yaXpvbnRhbFZlbG9jaXR5U2NhbGFyID0gdGFyZ2V0O1xuXHR9XG59O1xuXG5TdXJmYWNlLnByb3RvdHlwZS5zZXRWZXJ0aWNhbFZlbG9jaXR5U2NhbGFyID0gZnVuY3Rpb24odGFyZ2V0LCBkdXJhdGlvbiwgZWFzaW5nRnVuYywgY2FsbGJhY2spe1xuXHRpZih0YXJnZXQgPT09IHZvaWQgMCkgcmV0dXJuIHRoaXMudmVydGljYWxWZWxvY2l0eVNjYWxhcjtcblxuXHRpZih0aGlzLnZlcnRpY2FsU3BlZWRUd2VlbikgdGhpcy52ZXJ0aWNhbFNwZWVkVHdlZW4ucGF1c2UoKTtcblxuXHRpZihkdXJhdGlvbil7XG5cdFx0ZHVyYXRpb24gKj0gMTAwMDsgLy8gVHdlZW5pbmcgb2NjdXJzIGluIG1pbGxpc2Vjb25kc1xuXHRcdGVhc2luZ0Z1bmMgPSBlYXNpbmdGdW5jIHx8ICh0aGlzLnZlcnRpY2FsVmVsb2NpdHlTY2FsYXIgPCB0YXJnZXQpPyBcblx0XHRcdHR3ZWVuLmVhc2luZy5xdWFkcmF0aWNJbiA6IHR3ZWVuLmVhc2luZy5xdWFkcmF0aWNPdXQ7XG5cdFx0dGhpcy52ZXJ0aWNhbFNwZWVkVHdlZW4gPSB0d2VlbihlYXNpbmdGdW5jLCB0aGlzLCAndmVydGljYWxWZWxvY2l0eVNjYWxhcicsIHRhcmdldCwgZHVyYXRpb24sIGNhbGxiYWNrKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnZlcnRpY2FsVmVsb2NpdHlTY2FsYXIgPSB0YXJnZXQ7XG5cdH1cbn07XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGUpe1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cblN1cmZhY2UucHJvdG90eXBlLmF0dGFjaFBvaW50ZXJMaXN0ZW5lcnMgPSBmdW5jdGlvbigpe1xuXHRpZih0aGlzLnRyYWNraW5nUG9pbnRlcikgcmV0dXJuO1xuXHR0aGlzLnRyYWNraW5nUG9pbnRlciA9IHRydWU7XG5cblx0aWYoaXNUb3VjaERldmljZSl7XG5cdFx0aGFtbWVyKHRoaXMuY29udGFpbmVyKS5vbignZHJhZycsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlcik7XHRcblx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBwcmV2ZW50RGVmYXVsdCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5wb2ludGVyRXZlbnRIYW5kbGVyKTtcblx0fVxuXHRcblx0dGhpcy5lbWl0dGVyLmVtaXQoJ3BvaW50ZXIgdHJhY2tpbmcgc3RhcnQnKTtcbn07XG5cblN1cmZhY2UucHJvdG90eXBlLmRldGFjaFBvaW50ZXJMaXN0ZW5lcnMgPSBmdW5jdGlvbigpe1xuXHRpZighdGhpcy50cmFja2luZ1BvaW50ZXIpIHJldHVybjtcblx0dGhpcy50cmFja2luZ1BvaW50ZXIgPSBmYWxzZTtcblx0XG5cdGlmKGlzVG91Y2hEZXZpY2Upe1xuXHRcdGhhbW1lcih0aGlzLmNvbnRhaW5lcikub2ZmKCdkcmFnJywgdGhpcy5kcmFnRXZlbnRIYW5kbGVyKTtcdFxuXHRcdHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZlbnREZWZhdWx0KTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnBvaW50ZXJFdmVudEhhbmRsZXIpO1xuXHR9XG5cdFxuXG5cdHRoaXMuZW1pdHRlci5lbWl0KCdwb2ludGVyIHRyYWNraW5nIHN0b3AnKTtcbn07XG5cblN1cmZhY2UucHJvdG90eXBlLmRyYWdFdmVudEhhbmRsZXIgPSBmdW5jdGlvbihlKXtcblx0dGhpcy5ob3Jpem9udGFsVmVsb2NpdHkgPSBlLmdlc3R1cmUudmVsb2NpdHlYO1xuXHR0aGlzLnZlcnRpY2FsVmVsb2NpdHkgPSBlLmdlc3R1cmUudmVsb2NpdHlZO1xuXHRcblx0aWYodGhpcy5ob3Jpem9udGFsVmVsb2NpdHkgPCAwLjEpIHRoaXMuaG9yaXpvbnRhbFZlbG9jaXR5ID0gMDtcblx0aWYodGhpcy52ZXJ0aWNhbFZlbG9jaXR5IDwgMC4xKSB0aGlzLnZlcnRpY2FsVmVsb2NpdHkgPSAwO1xuXG5cdGlmKHRoaXMuaG9yaXpvbnRhbFZlbG9jaXR5ID4gMSkgdGhpcy5ob3Jpem9udGFsVmVsb2NpdHkgPSAxO1xuXHRpZih0aGlzLnZlcnRpY2FsVmVsb2NpdHkgPiAxKSB0aGlzLnZlcnRpY2FsVmVsb2NpdHkgPSAxO1xuXG5cdGlmKGUuZ2VzdHVyZS5kZWx0YVggPCAwKSB0aGlzLmhvcml6b250YWxWZWxvY2l0eSAqPSAtMTtcblx0aWYoZS5nZXN0dXJlLmRlbHRhWSA8IDApIHRoaXMudmVydGljYWxWZWxvY2l0eSAqPSAtMTtcblxufTtcblxuLy8gVGhpcyB1cGRhdGVzIHRoZSB4IGFuZCB5IHNwZWVkIG11bHRpcGxpZXJzIGJhc2VkIG9uIHRoZSBwb2ludGVycyByZWxhdGl2ZSBwb3NpdGlvbiB0byB0aGVcbi8vIGNlbnRlciBvZiB0aGUgY29udGFpbmVyIGVsZW1lbnRcblN1cmZhY2UucHJvdG90eXBlLnBvaW50ZXJFdmVudEhhbmRsZXIgPSBmdW5jdGlvbihlKXtcblx0Ly8gSWYgdG91Y2ggZXZlbnQsIGZpbmQgZmlyc3QgdG91Y2hcblx0dmFyIHBvaW50ZXIgPSAoZS5jaGFuZ2VkVG91Y2hlcyAmJiBlLmNoYW5nZWRUb3VjaGVzWzBdIHx8IGUpLFxuXHRcdHggPSBwb2ludGVyLmNsaWVudFggLSB0aGlzLmxlZnQsXG5cdFx0eSA9IHBvaW50ZXIuY2xpZW50WSAtIHRoaXMudG9wO1xuXG5cdHRoaXMuaG9yaXpvbnRhbFZlbG9jaXR5ID0gdGhpcy5ob3Jpem9udGFsVmVsb2NpdHlHcmFkaWVudChcblx0XHR4IC0gdGhpcy5oYWxmV2lkdGgsIFxuXHRcdDAsIFxuXHRcdCh4ID4gdGhpcy5oYWxmV2lkdGg/IC0xIDogMSksIFxuXHRcdHRoaXMuaGFsZldpZHRoXG5cdCk7XG5cdHRoaXMudmVydGljYWxWZWxvY2l0eSA9IHRoaXMudmVydGljYWxWZWxvY2l0eUdyYWRpZW50KFxuXHRcdHkgLSB0aGlzLmhhbGZIZWlnaHQsIFxuXHRcdDAsIFxuXHRcdCh5ID4gdGhpcy5oYWxmSGVpZ2h0PyAtMSA6IDEpLCBcblx0XHR0aGlzLmhhbGZIZWlnaHRcblx0KTtcbn07XG5cblN1cmZhY2UucHJvdG90eXBlLnNldENzc1N0eWxlID0gZnVuY3Rpb24obmFtZSwgdmFsdWUsIGR1cmF0aW9uKXtcblx0aWYodmFsdWUgPT09IHZvaWQgMCkgcmV0dXJuIHRoaXMuZWxlbWVudC5zdHlsZVtuYW1lXTtcblxuXHRpZihkdXJhdGlvbiAhPT0gdm9pZCAwKSB0aGlzLnNldENzc1RyYW5zaXRpb24obmFtZSwgZHVyYXRpb24gKyAncycpO1xuXHRcblx0dGhpcy5lbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XG59O1xuXG5TdXJmYWNlLnByb3RvdHlwZS5zZXRDc3NUcmFuc2Zvcm0gPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSl7XG5cdGlmKHZhbHVlID09PSB2b2lkIDApIHJldHVybiB0aGlzLmNzc1RyYW5zZm9ybXNbbmFtZV07XG5cblx0dGhpcy5jc3NUcmFuc2Zvcm1zW25hbWVdID0gdmFsdWU7XG5cdHRoaXMudXBkYXRlTXVsdGlBdHRyaWJ1dGVTdHlsZSh1dGlscy50cmFuc2Zvcm1BdHRyaWJ1dGUsIHRoaXMuY3NzVHJhbnNmb3Jtcyk7XG59O1xuXG5TdXJmYWNlLnByb3RvdHlwZS5zZXRDc3NGaWx0ZXIgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgZHVyYXRpb24pe1xuXHRpZih2YWx1ZSA9PT0gdm9pZCAwKSByZXR1cm4gdGhpcy5jc3NGaWx0ZXJzW25hbWVdO1xuXHRcblx0aWYoZHVyYXRpb24gIT09IHZvaWQgMCkgdGhpcy5zZXRDc3NUcmFuc2l0aW9uKHV0aWxzLmNzc0ZpbHRlckF0dHJpYnV0ZSwgZHVyYXRpb24gKyAncycpO1xuXHRcblx0dGhpcy5jc3NGaWx0ZXJzW25hbWVdID0gdmFsdWU7XG5cdHRoaXMudXBkYXRlTXVsdGlBdHRyaWJ1dGVTdHlsZSh1dGlscy5maWx0ZXJBdHRyaWJ1dGUsIHRoaXMuY3NzRmlsdGVycyk7XG59O1xuXG5TdXJmYWNlLnByb3RvdHlwZS5zZXRDc3NUcmFuc2l0aW9uID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpe1xuXHRpZih2YWx1ZSA9PT0gdm9pZCAwKSByZXR1cm4gdGhpcy5jc3NUcmFuc2l0aW9uc1tuYW1lXTtcblx0XG5cdHRoaXMuY3NzVHJhbnNpdGlvbnNbbmFtZV0gPSB2YWx1ZTtcblx0dGhpcy51cGRhdGVNdWx0aUF0dHJpYnV0ZVN0eWxlKHV0aWxzLnRyYW5zaXRpb25BdHRyaWJ1dGUsIHRoaXMuY3NzVHJhbnNpdGlvbnMsIHRydWUpO1xufTtcblxuU3VyZmFjZS5wcm90b3R5cGUudXBkYXRlTXVsdGlBdHRyaWJ1dGVTdHlsZSA9IGZ1bmN0aW9uKHN0eWxlTmFtZSwgYXR0cmlidXRlcywgd2l0aENvbW1hKXtcblx0dmFyIG5hbWUsXG5cdFx0c3R5bGUgPSAnJyxcblx0XHRmaXJzdCA9IHRydWU7XG5cblx0Zm9yKG5hbWUgaW4gYXR0cmlidXRlcyl7XG5cdFx0aWYoYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSl7XG5cdFx0XHRpZihmaXJzdCkgZmlyc3QgPSBmYWxzZTtcblx0XHRcdGVsc2Ugc3R5bGUgKz0gd2l0aENvbW1hPycsICc6ICcgJztcblxuXHRcdFx0aWYod2l0aENvbW1hKXtcblx0XHRcdFx0c3R5bGUgKz0gbmFtZSArICcgJyArIGF0dHJpYnV0ZXNbbmFtZV07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzdHlsZSArPSBuYW1lICsgJygnICsgYXR0cmlidXRlc1tuYW1lXSArICcpJztcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR0aGlzLmVsZW1lbnQuc3R5bGVbc3R5bGVOYW1lXSA9IHN0eWxlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG5vb3AgPSBleHBvcnRzLm5vb3AgPSBmdW5jdGlvbigpe307XG5cbmV4cG9ydHMucmVxdWVzdEZ1bGxzY3JlZW4gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4gfHxcblx0XHRcdFx0XHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuIHx8XG5cdFx0XHRcdFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiB8fFxuXHRcdFx0XHRcdFx0XHRub29wO1xuXG52YXIgYm9keVN0eWxlID0gZG9jdW1lbnQuYm9keS5zdHlsZTtcbmV4cG9ydHMudHJhbnNmb3JtQXR0cmlidXRlID0gXHQoYm9keVN0eWxlLm1zVHJhbnNmb3JtICE9PSB2b2lkIDApICYmICdtc1RyYW5zZm9ybScgfHxcblx0XHRcdFx0XHRcdFx0XHQoYm9keVN0eWxlLndlYmtpdFRyYW5zZm9ybSAhPT0gdm9pZCAwKSAmJiAnd2Via2l0VHJhbnNmb3JtJyB8fFxuXHRcdFx0XHRcdFx0XHRcdChib2R5U3R5bGUuTW96VHJhbnNmb3JtICE9PSB2b2lkIDApICYmICdNb3pUcmFuc2Zvcm0nIHx8XG5cdFx0XHRcdFx0XHRcdFx0J3RyYW5zZm9ybSc7XG5cdFx0XHRcdFx0XHRcdFx0XG5leHBvcnRzLnRyYW5zaXRpb25BdHRyaWJ1dGUgPVx0KGJvZHlTdHlsZS5tc1RyYW5zaXRpb24gIT09IHZvaWQgMCkgJiYgJ21zVHJhbnNpdGlvbicgfHxcblx0XHRcdFx0XHRcdFx0XHQoYm9keVN0eWxlLndlYmtpdFRyYW5zaXRpb24gIT09IHZvaWQgMCkgJiYgJ3dlYmtpdFRyYW5zaXRpb24nIHx8XG5cdFx0XHRcdFx0XHRcdFx0KGJvZHlTdHlsZS5Nb3pUcmFuc2l0aW9uICE9PSB2b2lkIDApICYmICdNb3pUcmFuc2l0aW9uJyB8fCBcblx0XHRcdFx0XHRcdFx0XHQndHJhbnNpdGlvbic7XG5cbmV4cG9ydHMuZmlsdGVyQXR0cmlidXRlID0gXHRcdChib2R5U3R5bGUubXNGaWx0ZXIgIT09IHZvaWQgMCkgJiYgJ21zRmlsdGVyJyB8fFxuXHRcdFx0XHRcdFx0XHRcdChib2R5U3R5bGUud2Via2l0RmlsdGVyICE9PSB2b2lkIDApICYmICd3ZWJraXRGaWx0ZXInIHx8XG5cdFx0XHRcdFx0XHRcdFx0KGJvZHlTdHlsZS5Nb3pGaWx0ZXIgIT09IHZvaWQgMCkgJiYgJ01vekZpbHRlcicgfHxcblx0XHRcdFx0XHRcdFx0XHQnZmlsdGVyJztcblxuZXhwb3J0cy5jc3NGaWx0ZXJBdHRyaWJ1dGUgPSBcdChib2R5U3R5bGUubXNGaWx0ZXIgIT09IHZvaWQgMCkgJiYgJy1tcy1maWx0ZXInIHx8XG5cdFx0XHRcdFx0XHRcdFx0KGJvZHlTdHlsZS53ZWJraXRGaWx0ZXIgIT09IHZvaWQgMCkgJiYgJy13ZWJraXQtZmlsdGVyJyB8fFxuXHRcdFx0XHRcdFx0XHRcdChib2R5U3R5bGUuTW96RmlsdGVyICE9PSB2b2lkIDApICYmICctbW96LWZpbHRlcicgfHxcblx0XHRcdFx0XHRcdFx0XHQnZmlsdGVyJztcblxuZXhwb3J0cy5jc3NUcmFuc2Zvcm1BdHRyaWJ1dGUgPSAoYm9keVN0eWxlLm1zVHJhbnNmb3JtICE9PSB2b2lkIDApICYmICctbXMtdHJhbnNmb3JtJyB8fFxuXHRcdFx0XHRcdFx0XHRcdChib2R5U3R5bGUud2Via2l0VHJhbnNmb3JtICE9PSB2b2lkIDApICYmICctd2Via2l0LXRyYW5zZm9ybScgfHxcblx0XHRcdFx0XHRcdFx0XHQoYm9keVN0eWxlLk1velRyYW5zZm9ybSAhPT0gdm9pZCAwKSAmJiAnLW1vei10cmFuc2Zvcm0nIHx8XG5cdFx0XHRcdFx0XHRcdFx0J2ZpbHRlcic7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9