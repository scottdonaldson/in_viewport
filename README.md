# inViewport

## Usage

Return a boolean depending on if the element is in the viewport or not.

```
var el = document.getElementById('foo');

inViewport(el); // returns true or false
```

By default, `inViewport` returns `true` if at least 50% (vertically) of the element is in the viewport. This can be adjusted by passing in a configuration object instead of an `HTMLelement`.

```
inViewport({
	element: el,
	threshold: 0.75 // 75% (vertically) must be in the viewport
});
```

You might want to run a callback function if the element is in the viewport:

```
inViewport(el, function() {
	console.log('The element is in the viewport!');
});
```

This behavior can also be modified in configuration.

```
// If the element is detected in the viewport, wait x seconds,
// then check if it's *still* in viewport, and if so, fire callback

inViewport({
	element: el,
	timeout: 2000
}, function() {
	console.log('After 2 seconds, the element is still in the viewport.');
});
```

It's often helpful to add a `scroll` event listener and check if elements are in viewport.

```
window.addEventListener('scroll', function() {
	console.log(inViewport(el));
});
```

But, if you are executing a callback function, you might not want it to fire continuously as the user scrolls.

```
inViewport({
	element: el,
	repeat: true
}, function() {
	// This callback fires whenever the element appears in view (from out of view)
	// But does not fire continuously on scroll
});
```

You might want to make sure that a callback only fires once, ever:

```
inViewport({
	element: el,
	once: true
}, function() {
	// This callback fires when the element appears in view
	// And then never fires again
});
```