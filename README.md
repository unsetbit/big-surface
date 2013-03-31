# Big Surface is Limitless Space Within DOM Elements

Big Surface frees DOM elements from the shackles of scroll bars. WIth Big Surface, users are free to move through 
the space inside the element with their mouse pointer or via touch gestures. Developers (you) can place elements 
anywhere in side the element, whether it's `top:100px; left:-300px;` or `top:-47474px; left:348949px;`. Big Surface 
uses CSS3 transforms and hardware acceleration for smooth movement within the limitless plane.

## Use
For plain JavaScript applications, use the [dist/surface.js](https://raw.github.com/ozanturgut/big-surface/master/dist/surface.js), which will inject the Surface object to the global
scope. If you're using NodeJS (or any system that uses the export/require pattern), use [dist/surface-module.js](https://raw.github.com/ozanturgut/big-surface/master/dist/surface-module.js), 
as it exports the Surface object.

## API
In the API `Surface` (capitalized) refers to the module object and `surface` (lowercase) refers to a 
Surface instance which is created via `Surface.create`. Any parameter starting with `opt_` is optional.

### `Surface.create(container)`
Constructor function which returns a new Surface instance. The container is the element which will contain
the surface.

```javascript
var surface = Surface.create(document.body); // Create inside the entire document body
```

### `surface.speed(target, opt_duration, opt_easingFunc, opt_callback)`
Sets the per-step movement speed limit in pixels for the surface. For example, if target is "10", then at most the
user will be able to move 10 pixels per frame (assuming 60 frames/second). If a duration is given, the speed
will tween from the current value to the target value using an easing function (quadratic by default). If a callback
function is given, it will be called after the given duration.

```javascript
var surface = Surface.create(document.body); // Create inside the entire document body
surface.speed(8, 2); // Take 2 seconds to speed up to 8 pixels per frame in 2 second, this will trigger 'move start'
setTimeout(function(){
  surface.speed(0, 10); // Take 10 seconds to come to a stop, after which the 'move stop' will fire
}, 2000);
```

### `surface.horizontalSpeed(target, opt_duration, opt_easingFunc, opt_callback)`
Same as `surface.speed` but only for horizontal movement.

### `surface.verticalSpeed(target, opt_duration, opt_easingFunc, opt_callback)`
Same as `surface.speed` but only for vertical movement.

### `surface.on(eventName, callback)`
Allows for binding callbacks to the following events:

* "move start", triggered when a user has the ability to move within the surface.
* "move stop", triggered when a surface is locked and a user may not move within it.
* "pointer tracking start", triggered when the tracking of the users' pointer (mouse or touch) begins.
* "pointer tracking stop", triggered when the tracking of the users' pointer stops.

Just because a move event triggers doesn't mean the surface is moving, it only signals that it's capable of moving
if the user interacts with it. Same with pointer tracking -- the pointer can be tracked even while the surface
is locked so that when it's unlocked, it can react accordingly to the last known position of the users pointer.

```javascript
var surface = Surface.create(document.body); // Create inside the entire document body
surface.on('move start', function(){
  console.log("The user is free to move within the surface!");
})
```

### `surface.removeListener(eventName, callback)`
Detaches an event listener which was previously bound using `surface.on`.

```javascript
var surface = Surface.create(document.body); // Create inside the entire document body
surface.on('move start', moveStartHandler); // bind a handler
surface.removeListener('move start', moveStartHandler); // undo the previous line of code
```

### `surface.element`
The "infinite" surface element which you can append absolutely positioned elements to.

```javascript
var surface = Surface.create(document.body); // Create inside the entire document body
surface.appendChild(myElement); // Attach an element to the surface (should be absolutely positioned)
```

### `surface.container`
The element containing the surface element. This is essentially the "window" at which the user sees the surface through.

```javascript
var surface = Surface.create(document.body); // Create inside the entire document body
surface.container === document.body; // true
```

### `surface.css(name, opt_value, opt_duration)`
Modifies a CSS property of the surface element (sets the style named `name` to `value`). If a `opt_duration` is given,
a CSS transition will occur between the current value and the given value. If no value is given, this returns
the current value of the style.

```javascript
var surface = Surface.create(document.body); // Create inside the entire document body
surface.css('opacity', 0, 10); // take 10 seconds to fade out the surface
```

### `surface.cssTransform(name, opt_value, opt_duration)`
Modifies a CSS3 transform property of the surface element (sets the style named `name` to `value`). If a 
`opt_duration` is given, a CSS transition will occur between the current value and the given value. If no 
value is given, this returns the current value of the transform.

```javascript
var surface = Surface.create(document.body); // Create inside the entire document body
surface.cssTransform('rotate', '10deg'); // rotate the surface 10deg immediately
```

### `surface.cssFilter(name, opt_value, opt_duration)`
Modifies a CSS3 filter property of the surface element (sets the style named `name` to `value`). If a 
`opt_duration` is given, a CSS transition will occur between the current value and the given value. If no 
value is given, this returns the current value of the filter.

```javascript
var surface = Surface.create(document.body); // Create inside the entire document body
surface.cssFilter('blur', '100px', 20); // Take 20 seconds to blur the surface at 100px
```

### `surface.cssTransition(name, opt_value)`
Modifies a CSS3 transition property of the surface element (sets the style named `name` to `value`). If no 
value is given, this returns the current value of the transition.

```javascript
var surface = Surface.create(document.body); // Create inside the entire document body
surface.cssFilter('opacity', '100'); // Set the transition time of opacity changes to 100 seconds
```

### `surface.horizontalWind(target, opt_duration, opt_easingFunc, opt_callback)`
Sets the base horizontal movement of the surface. For example, if target is "-10", the surface will move towards the
left 10 pixels per frame. If a duration is given, the speed will tween from the current value to the target value 
using an easing function (quadratic by default). If a callback function is given, it will be called after the 
given duration.

```javascript
var surface = Surface.create(document.body); // Create inside the entire document body
surface.horizontalWind(5); // Move the surface 5px to the right every frame
```

### `surface.verticalWind(target, opt_duration, opt_easingFunc, opt_callback)`
Same as the horizontal wind, except for vertical movement.

### `surface.speedGradient`
This is the function which tells the surface to slow movement when the pointer is near the center of the surface
and to speed up when it's near the edges. Use this to set or get the gradient funtion used to determine the 
speed of movement relative to the user's pointer positions relative to the surface. The gradient is quadratic 
in by default. The gradient must have the following function signature: 
`speedGradient(currentPointerPosition, 0, 1 or -1 (depending on direction), halfWidth or halfHeight)`
it must return a value between -1 and 1 which will be used as a multiplier against the surface speed limit.

### `surface.horizontalSpeedGradient`
For getting/setting just the horizontal speed gradient.

### `surface.verticalSpeedGradient`
For getting/setting just the horizontal speed gradient.

### `surface.width`
Retrieves the current surface width.

### `surface.height`
Retrieves the current surface height.

### `surface.top`
Retrieves the current surface top.

### `surface.left`
Retrieves the current surface left.
