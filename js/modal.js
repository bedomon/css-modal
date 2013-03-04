/*!
 * CSS Modal
 * http://drublic.github.com/css-modal
 *
 * @author Hans Christian Reinl - @drublic
 * @version 1.0
 */

(function () {

	'use strict';

	// Store for currently active element
	var activeElement;

	// Polyfill addEventListener for IE8 (only very basic)
	document._addEventListener = document.addEventListener || function (event, callback) {
		document.attachEvent('on' + event, callback);
	};

	// Hide overlay when ESC is pressed
	document._addEventListener('keyup', function (event) {
		var hash = window.location.hash.replace('#', '');

		// If hash is not set
		if (hash === '' || hash === '!') {
			return;
		}

		// If key ESC is pressed
		if (event.keyCode === 27) {
			window.location.hash = '!';
		}
	}, false);


	// When showing overlay, prevent background from scrolling
	window.onhashchange = function () {
		var hash = window.location.hash.replace('#', '');
		var modalChild;

		// If hash is set
		if (hash !== '' && hash !== '!') {

			// Get first element in selected element
			modalChild = document.getElementById(hash).children[0];

			// When we deal with a modal and class `has-overlay` is not set on body yet
			if (modalChild.className.match(/modal-inner/) && !document.body.className.match(/has-overlay/)) {
				document.body.className += ' has-overlay';

				// Mark modal as active
				document.getElementById(hash).className += ' is-active';
				activeElement = document.getElementById(hash);
			}
		} else {
			document.body.className = document.body.className.replace(' has-overlay', '');

			// If activeElement is already defined, delete it
			if (activeElement) {
				activeElement.className = activeElement.className.replace(' is-active', '');
				activeElement = null;
			}
		}
	};
}());
