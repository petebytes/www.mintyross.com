// explicity click button
function toggleOffcanvasNav(e) {
	// when clicking hamburger button in header
	document.querySelector('.header-menu-toggle-btn').onclick = function() {
		document.querySelector('.offcanvas-nav').classList.toggle('is-active');
	}
	
	// when clicking close button on an open navigation
	document.querySelector('.offcanvas-nav-close-btn').onclick = function() {
		document.querySelector('.offcanvas-nav').classList.remove('is-active');
	}
}

//when clicking anywhere on the document except the open offcanvas element close the offcanvas element
function clickAwayOffcanvasNav(e) {
	var clickedTarget = document.querySelector('.offcanvas-nav').contains(e.target);
	var clickedToggle = document.querySelector('.header-menu-toggle-btn').contains(e.target);
	
		if (!clickedTarget && !clickedToggle) {
			document.querySelector('.offcanvas-nav').classList.remove('is-active');
		}	
}

if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded', toggleOffcanvasNav);
} else {
	window.attachEvent('onload', toggleOffcanvasNav);
}

if (document.addEventListener) {
	document.addEventListener('click', clickAwayOffcanvasNav);
} else {
	document.attachEvent('onclick', clickAwayOffcanvasNav);
}
