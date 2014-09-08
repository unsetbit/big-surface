# Big Surface is Limitless Space Within DOM Elements

Big Surface frees DOM elements from the shackles of scroll bars. WIth Big Surface, users are free to move through 
the space inside the element with their mouse pointer or via touch gestures. Developers (you) can place elements 
anywhere in side the element, whether it's `top:100px; left:-300px;` or `top:-47474px; left:348949px;`. Big Surface 
uses CSS3 transforms and hardware acceleration for smooth movement within the limitless plane.

## Use
For plain JavaScript applications, use the [dist/big-surface.js](https://raw.github.com/oztu/big-surface/master/dist/big-surface.js), which will inject the BigSurface object to the global
scope. You can also use the file as a AMD or CommonJS module.

## API
In the API `BigSurface` (capitalized) refers to the module object and `bigSurface` (lowercase) refers to a 
BigSurface instance which is created via `BigSurface.create`. Any parameter starting with `opt_` is optional.

### `BigSurface.create(container)`
Constructor function which returns a new BigSurface instance. The container is the element which will contain
the BigSurface.

```javascript
var bigSurface = BigSurface.create(document.body); // Create inside the entire document body
```

### `bigSurface.speed(target, opt_duration, opt_easingFunc, opt_callback)`
Sets the per-step movement speed limit in pixels for the bigSurface. For example, if target is "10", then at most the
user will be able to move 10 pixels per frame (assuming 60 frames/second). If a duration is given, the speed
will tween from the current value to the target value using an easing function (quadratic by default). If a callback
function is given, it will be called after the given duration.

```javascript
var bigSurface = BigSurface.create(document.body); // Create inside the entire document body
bigSurface.speed(8, 2); // Take 2 seconds to speed up to 8 pixels per frame in 2 second, this will trigger 'move start'
setTimeout(function(){
  bigSurface.speed(0, 10); // Take 10 seconds to come to a stop, after which the 'move stop' will fire
}, 2000);
```

### `bigSurface.horizontalSpeed(target, opt_duration, opt_easingFunc, opt_callback)`
Same as `bigSurface.speed` but only for horizontal movement.

### `bigSurface.verticalSpeed(target, opt_duration, opt_easingFunc, opt_callback)`
Same as `bigSurface.speed` but only for vertical movement.

### `bigSurface.on(eventName, callback)`
Allows for binding callbacks to the following events:

* "move start", triggered when a user has the ability to move within the bigSurface.
* "move stop", triggered when a bigSurface is locked and a user may not move within it.
* "pointer tracking start", triggered when the tracking of the users' pointer (mouse or touch) begins.
* "pointer tracking stop", triggered when the tracking of the users' pointer stops.

Just because a move event triggers doesn't mean the bigSurface is moving, it only signals that it's capable of moving
if the user interacts with it. Same with pointer tracking -- the pointer can be tracked even while the bigSurface
is locked so that when it's unlocked, it can react accordingly to the last known position of the users pointer.

```javascript
var bigSurface = BigSurface.create(document.body); // Create inside the entire document body
bigSurface.on('move start', function(){
  console.log("The user is free to move within the bigSurface!");
})
```

### `bigSurface.removeListener(eventName, callback)`
Detaches an event listener which was previously bound using `bigSurface.on`.

```javascript
var bigSurface = BigSurface.create(document.body); // Create inside the entire document body
bigSurface.on('move start', moveStartHandler); // bind a handler
bigSurface.removeListener('move start', moveStartHandler); // undo the previous line of code
```

### `bigSurface.element`
The "infinite" bigSurface element which you can append absolutely positioned elements to.

```javascript
var bigSurface = BigSurface.create(document.body); // Create inside the entire document body
bigSurface.appendChild(myElement); // Attach an element to the bigSurface (should be absolutely positioned)
```

### `bigSurface.container`
The element containing the bigSurface element. This is essentially the "window" at which the user sees the bigSurface through.

```javascript
var bigSurface = BigSurface.create(document.body); // Create inside the entire document body
bigSurface.container === document.body; // true
```

### `bigSurface.css(name, opt_value, opt_duration)`
Modifies a CSS property of the bigSurface element (sets the style named `name` to `value`). If a `opt_duration` is given,
a CSS transition will occur between the current value and the given value. If no value is given, this returns
the current value of the style.

```javascript
var bigSurface = BigSurface.create(document.body); // Create inside the entire document body
bigSurface.css('opacity', 0, 10); // take 10 seconds to fade out the bigSurface
```

### `bigSurface.cssTransform(name, opt_value, opt_duration)`
Modifies a CSS3 transform property of the bigSurface element (sets the style named `name` to `value`). If a 
`opt_duration` is given, a CSS transition will occur between the current value and the given value. If no 
value is given, this returns the current value of the transform.

```javascript
var bigSurface = BigSurface.create(document.body); // Create inside the entire document body
bigSurface.cssTransform('rotate', '10deg'); // rotate the bigSurface 10deg immediately
```

### `bigSurface.cssFilter(name, opt_value, opt_duration)`
Modifies a CSS3 filter property of the bigSurface element (sets the style named `name` to `value`). If a 
`opt_duration` is given, a CSS transition will occur between the current value and the given value. If no 
value is given, this returns the current value of the filter.

```javascript
var bigSurface = BigSurface.create(document.body); // Create inside the entire document body
bigSurface.cssFilter('blur', '100px', 20); // Take 20 seconds to blur the bigSurface at 100px
```

### `bigSurface.cssTransition(name, opt_value)`
Modifies a CSS3 transition property of the bigSurface element (sets the style named `name` to `value`). If no 
value is given, this returns the current value of the transition.

```javascript
var bigSurface = BigSurface.create(document.body); // Create inside the entire document body
bigSurface.cssFilter('opacity', '100'); // Set the transition time of opacity changes to 100 seconds
```

### `bigSurface.horizontalWind(target, opt_duration, opt_easingFunc, opt_callback)`
Sets the base horizontal movement of the bigSurface. For example, if target is "-10", the bigSurface will move towards the
left 10 pixels per frame. If a duration is given, the speed will tween from the current value to the target value 
using an easing function (quadratic by default). If a callback function is given, it will be called after the 
given duration.

```javascript
var bigSurface = BigSurface.create(document.body); // Create inside the entire document body
bigSurface.horizontalWind(5); // Move the bigSurface 5px to the right every frame
```

### `bigSurface.verticalWind(target, opt_duration, opt_easingFunc, opt_callback)`
Same as the horizontal wind, except for vertical movement.

### `bigSurface.speedGradient`
This is the function which tells the bigSurface to slow movement when the pointer is near the center of the bigSurface
and to speed up when it's near the edges. Use this to set or get the gradient funtion used to determine the 
speed of movement relative to the user's pointer positions relative to the bigSurface. The gradient is quadratic 
in by default. The gradient must have the following function signature: 
`speedGradient(currentPointerPosition, 0, 1 or -1 (depending on direction), halfWidth or halfHeight)`
it must return a value between -1 and 1 which will be used as a multiplier against the bigSurface speed limit.

### `bigSurface.horizontalSpeedGradient`
For getting/setting just the horizontal speed gradient.

### `bigSurface.verticalSpeedGradient`
For getting/setting just the horizontal speed gradient.

### `bigSurface.width`
Retrieves the current bigSurface width.

### `bigSurface.height`
Retrieves the current bigSurface height.

### `bigSurface.top`
Retrieves the current bigSurface top.

### `bigSurface.left`
Retrieves the current bigSurface left.


## Developing
This project uses [boilerplate-gulp](https://github.com/oztu/boilerplate-gulp). Run 'gulp dev' to develop and have incremental builds, continuous testing, etc. Run 'gulp' to run regenerate the dist files. 