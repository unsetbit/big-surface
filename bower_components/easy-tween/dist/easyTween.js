!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.easyTween=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9vemFuL2NvZGUvYm9pbGVycGxhdGUtZ3VscC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL296YW4vY29kZS9lYXN5LXR3ZWVuL3NyYy9lYXNpbmcuanMiLCIvVXNlcnMvb3phbi9jb2RlL2Vhc3ktdHdlZW4vc3JjL3R3ZWVuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImVhc3lUd2Vlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBBZGFwdGVkIGZyb20gaHR0cDovL2dpem1hLmNvbS9lYXNpbmcvICh3aGljaCB3YXMgY3JlYXRlZCBieSBSb2JlcnQgUGVubmVyKVxuXG5leHBvcnRzLmxpbmVhciA9IGZ1bmN0aW9uKGN1cnJlbnRUaW1lLCBzdGFydFZhbHVlLCBjaGFuZ2VJblZhbHVlLCB0b3RhbFRpbWUpIHtcblx0cmV0dXJuIGNoYW5nZUluVmFsdWUgKiBjdXJyZW50VGltZSAvIHRvdGFsVGltZSArIHN0YXJ0VmFsdWU7IFxufTtcblxuXG5leHBvcnRzLnF1YWRyYXRpY0luID0gZnVuY3Rpb24oY3VycmVudFRpbWUsIHN0YXJ0VmFsdWUsIGNoYW5nZUluVmFsdWUsIHRvdGFsVGltZSkge1xuXHRyZXR1cm4gY2hhbmdlSW5WYWx1ZSAqIChjdXJyZW50VGltZSAvPSB0b3RhbFRpbWUpICogY3VycmVudFRpbWUgKyBzdGFydFZhbHVlO1xufTtcblxuZXhwb3J0cy5xdWFkcmF0aWNPdXQgPSBmdW5jdGlvbihjdXJyZW50VGltZSwgc3RhcnRWYWx1ZSwgY2hhbmdlSW5WYWx1ZSwgdG90YWxUaW1lKSB7XG5cdHJldHVybiAtY2hhbmdlSW5WYWx1ZSAqIChjdXJyZW50VGltZSAvPSB0b3RhbFRpbWUpICogKGN1cnJlbnRUaW1lIC0gMikgKyBzdGFydFZhbHVlO1xufTtcblxuZXhwb3J0cy5xdWFkcmF0aWNJbk91dCA9IGZ1bmN0aW9uKGN1cnJlbnRUaW1lLCBzdGFydFZhbHVlLCBjaGFuZ2VJblZhbHVlLCB0b3RhbFRpbWUpIHtcblx0Y3VycmVudFRpbWUgLz0gdG90YWxUaW1lIC8gMjtcblx0XG5cdGlmKGN1cnJlbnRUaW1lIDwgMSkgcmV0dXJuIGNoYW5nZUluVmFsdWUgLyAyICogY3VycmVudFRpbWUgKiBjdXJyZW50VGltZSArIHN0YXJ0VmFsdWU7XG5cdFxuXHRyZXR1cm4gLWNoYW5nZUluVmFsdWUgLyAyICogKC0tY3VycmVudFRpbWUgKiAoY3VycmVudFRpbWUgLSAyKSAtIDEpICsgc3RhcnRWYWx1ZTtcbn07XG5cbmV4cG9ydHMuY3ViaWNJbiA9IGZ1bmN0aW9uKGN1cnJlbnRUaW1lLCBzdGFydFZhbHVlLCBjaGFuZ2VJblZhbHVlLCB0b3RhbFRpbWUpIHtcblx0cmV0dXJuIGNoYW5nZUluVmFsdWUgKiAoY3VycmVudFRpbWUgLz0gdG90YWxUaW1lKSAqIGN1cnJlbnRUaW1lICogY3VycmVudFRpbWUgKyBzdGFydFZhbHVlO1xufTtcblxuZXhwb3J0cy5jdWJpY091dCA9IGZ1bmN0aW9uKGN1cnJlbnRUaW1lLCBzdGFydFZhbHVlLCBjaGFuZ2VJblZhbHVlLCB0b3RhbFRpbWUpIHtcblx0Y3VycmVudFRpbWUgLz0gdG90YWxUaW1lO1xuXG5cdHJldHVybiBjaGFuZ2VJblZhbHVlICogKC0tY3VycmVudFRpbWUgKiBjdXJyZW50VGltZSAqIGN1cnJlbnRUaW1lICsgMSkgKyBzdGFydFZhbHVlO1xufTtcblxuZXhwb3J0cy5jdWJpY0luT3V0ID0gZnVuY3Rpb24oY3VycmVudFRpbWUsIHN0YXJ0VmFsdWUsIGNoYW5nZUluVmFsdWUsIHRvdGFsVGltZSkge1xuXHRjdXJyZW50VGltZSAvPSB0b3RhbFRpbWUgLyAyO1xuXHRcblx0aWYoY3VycmVudFRpbWUgPCAxKSByZXR1cm4gY2hhbmdlSW5WYWx1ZSAqIChjdXJyZW50VGltZSAvPSB0b3RhbFRpbWUpICogY3VycmVudFRpbWUgKiBjdXJyZW50VGltZSArIHN0YXJ0VmFsdWU7XG5cblx0cmV0dXJuIGNoYW5nZUluVmFsdWUgLyAyICogKChjdXJyZW50VGltZSAtPSAyKSAqIGN1cnJlbnRUaW1lICogY3VycmVudFRpbWUgKyAyKSArIHN0YXJ0VmFsdWU7XG59O1xuXG5cbnZhciBIQUxGX1BJID0gTWF0aC5QSSAvIDI7XG5leHBvcnRzLnNpbnVzb2lkYWxJbiA9IGZ1bmN0aW9uKGN1cnJlbnRUaW1lLCBzdGFydFZhbHVlLCBjaGFuZ2VJblZhbHVlLCB0b3RhbFRpbWUpIHtcblx0cmV0dXJuIC1jaGFuZ2VJblZhbHVlICogTWF0aC5jb3MoY3VycmVudFRpbWUgLyB0b3RhbFRpbWUgKiBIQUxGX1BJKSArIGNoYW5nZUluVmFsdWUgKyBzdGFydFZhbHVlO1xufTtcblxuZXhwb3J0cy5zaW51c29pZGFsT3V0ID0gZnVuY3Rpb24oY3VycmVudFRpbWUsIHN0YXJ0VmFsdWUsIGNoYW5nZUluVmFsdWUsIHRvdGFsVGltZSkge1xuXHRyZXR1cm4gY2hhbmdlSW5WYWx1ZSAqIE1hdGguc2luKGN1cnJlbnRUaW1lIC8gdG90YWxUaW1lICogSEFMRl9QSSkgKyBzdGFydFZhbHVlO1xufTtcblxuZXhwb3J0cy5zaW51c29pZGFsSW5PdXQgPSBmdW5jdGlvbihjdXJyZW50VGltZSwgc3RhcnRWYWx1ZSwgY2hhbmdlSW5WYWx1ZSwgdG90YWxUaW1lKXtcblx0cmV0dXJuIC1jaGFuZ2VJblZhbHVlIC8gMiAqIChNYXRoLmNvcyhNYXRoLlBJICogY3VycmVudFRpbWUgLyB0b3RhbFRpbWUpIC0gMSkgKyBzdGFydFZhbHVlO1xufTtcblxuXG5leHBvcnRzLmV4cG9uZW50aWFsSW4gPSBmdW5jdGlvbihjdXJyZW50VGltZSwgc3RhcnRWYWx1ZSwgY2hhbmdlSW5WYWx1ZSwgdG90YWxUaW1lKXtcblx0cmV0dXJuIGNoYW5nZUluVmFsdWUgKiBNYXRoLnBvdygyLCAxMCAqIChjdXJyZW50VGltZSAvIHRvdGFsVGltZSAtIDEpKSArIHN0YXJ0VmFsdWU7XG59O1xuXG5leHBvcnRzLmV4cG9uZW50aWFsT3V0ID0gZnVuY3Rpb24oY3VycmVudFRpbWUsIHN0YXJ0VmFsdWUsIGNoYW5nZUluVmFsdWUsIHRvdGFsVGltZSl7XG5cdHJldHVybiBjaGFuZ2VJblZhbHVlICogKC1NYXRoLnBvdygyLCAtMTAgKiBjdXJyZW50VGltZSAvIHRvdGFsVGltZSkgKyAxKSArIHN0YXJ0VmFsdWU7XG59O1xuXG5leHBvcnRzLmV4cG9uZW50aWFsSW5PdXQgPSBmdW5jdGlvbihjdXJyZW50VGltZSwgc3RhcnRWYWx1ZSwgY2hhbmdlSW5WYWx1ZSwgdG90YWxUaW1lKXtcblx0Y3VycmVudFRpbWUgLz0gdG90YWxUaW1lIC8gMjtcblx0XG5cdGlmKGN1cnJlbnRUaW1lIDwgMSkgcmV0dXJuIGNoYW5nZUluVmFsdWUgLyAyICogTWF0aC5wb3coMiwgMTAgKiAoY3VycmVudFRpbWUgLTEpKSAgKyBzdGFydFZhbHVlO1xuXG5cdHJldHVybiBjaGFuZ2VJblZhbHVlIC8gMiAqICgtTWF0aC5wb3coMiwgLTEwICogLS1jdXJyZW50VGltZSkgKyAyKSArIHN0YXJ0VmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHdlZW4gPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVhc2luZ0Z1bmMsIG9iaiwgcHJvcCwgdGFyZ2V0VmFsdWUsIGR1cmF0aW9uLCBjYWxsYmFjayl7XG5cdGR1cmF0aW9uID0gZHVyYXRpb24gfHwgMDtcblx0XG5cdHZhciBzdGFydFZhbHVlID0gb2JqW3Byb3BdLFxuXHRcdHZhbHVlRGlmZiA9IHRhcmdldFZhbHVlIC0gc3RhcnRWYWx1ZSxcblx0XHRzdGFydFRpbWUgPSBEYXRlLm5vdygpLFxuXHRcdHBhdXNlU3RhcnQgPSBzdGFydFRpbWUsXG5cdFx0cGF1c2VkID0gdHJ1ZSxcblx0XHRhbmltYXRpb25SZXF1ZXN0SWQ7XG5cblx0ZnVuY3Rpb24gcGF1c2UoKXtcblx0XHRpZihwYXVzZWQpIHJldHVybjtcblx0XHRwYXVzZWQgPSB0cnVlO1xuXG5cdFx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uUmVxdWVzdElkKTtcdFxuXHRcdHBhdXNlU3RhcnQgPSBEYXRlLm5vdygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcmVzdW1lKCl7XG5cdFx0aWYoIXBhdXNlZCkgcmV0dXJuO1xuXHRcdHBhdXNlZCA9IGZhbHNlO1xuXG5cdFx0c3RhcnRUaW1lICs9IERhdGUubm93KCkgLSBwYXVzZVN0YXJ0O1xuXHRcdFxuXHRcdGFuaW1hdGlvblJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHN0ZXAoKXtcblx0XHR2YXIgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuXG5cdFx0aWYoY3VycmVudFRpbWUgPCBkdXJhdGlvbil7XG5cdFx0XHRvYmpbcHJvcF0gPSBlYXNpbmdGdW5jKGN1cnJlbnRUaW1lLCBzdGFydFZhbHVlLCB2YWx1ZURpZmYsIGR1cmF0aW9uKTtcblx0XHRcdGFuaW1hdGlvblJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0b2JqW3Byb3BdID0gZWFzaW5nRnVuYyhkdXJhdGlvbiwgc3RhcnRWYWx1ZSwgdmFsdWVEaWZmLCBkdXJhdGlvbik7XG5cdFx0XHRpZihjYWxsYmFjaykgY2FsbGJhY2soKTtcblx0XHR9XG5cdH1cblxuXHRyZXN1bWUoKTtcblxuXHRyZXR1cm4ge1xuXHRcdHJlc3VtZTogcmVzdW1lLFxuXHRcdHBhdXNlOiBwYXVzZVxuXHR9O1xufTtcblxuLy8gQmluZCBlYXNpbmcgaGVscGVyc1xudmFyIGVhc2luZyA9IHJlcXVpcmUoJy4vZWFzaW5nLmpzJyksXG5cdGVhc2luZ0Z1bmNOYW1lO1xuXG5mb3IoZWFzaW5nRnVuY05hbWUgaW4gZWFzaW5nKXtcblx0aWYoZWFzaW5nLmhhc093blByb3BlcnR5KGVhc2luZ0Z1bmNOYW1lKSl7XG5cdFx0dHdlZW5bZWFzaW5nRnVuY05hbWVdID0gdHdlZW4uYmluZCh2b2lkIDAsIGVhc2luZ1tlYXNpbmdGdW5jTmFtZV0pO1xuXHR9XG59XG5cbnR3ZWVuLmVhc2luZyA9IGVhc2luZzsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=