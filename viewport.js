(function() {

function inViewport(obj, cb) {

	var element = obj instanceof HTMLElement ? obj : obj.element;
	if ( !element ) throw new Error('No element found to check if in viewport!');

	var threshold = obj.threshold || 0.5,
		timeout = obj.timeout || 0,
		once = obj.once || false,
		repeat = obj.repeat || false;

	var rect = element.getBoundingClientRect(),
		height = element.clientHeight,
		winHeight = window.innerHeight || document.documentElement.clientHeight;

	if ( 
		// Visual aid for conditions: http://i.imgur.com/SgFN3RS.jpg
		( rect.top < 0 && rect.bottom - height * threshold >= 0 ) ||
		( rect.top >= 0 && rect.top + height * threshold <= winHeight )
	) {

		// fire callback only if one is given and
		// don't fire if once === true and elem is already in viewport
		if ( 
			cb && 
			( 
				!( once && element._inViewportFired ) &&
				!( repeat && element._inViewport )
			) 
		) {
			
			if ( timeout > 0 && !element._isWaiting ) {
				
				element._isWaiting = true;

				setTimeout(function() {

					// if after the timeout, element is still in viewport, fire callback
					if ( element._inViewport ) {
						element._inViewportFired = true;
						cb();
					}
					
					element._isWaiting = false;

				}, timeout);

			} else if ( timeout === 0 ) {
				element._inViewportFired = true;
				cb();	
			}

		}

		element._inViewport = true;
		
		return true;
	
	} else {

		element._inViewport = false;

	}

	return false;
}

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'inViewport'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, inViewport);
    } else {
        // Browser globals
        factory(this, inViewport);
    }
}(this, function (exports) {
    exports.inViewport = inViewport;
}));

})();