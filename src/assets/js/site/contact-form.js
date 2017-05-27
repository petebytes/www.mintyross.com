//////////////////////////////////////////////////////////////////////
// 								Tabs								//
// http://callmenick.com/post/simple-responsive-tabs-javascript-css //
//////////////////////////////////////////////////////////////////////
// Immediately-Invoked Function Expression (IIFE)
(function() {
	'use strict';
	
	// usage var myTabs = tabs({el: '#id', tabNavLinks: '.class', tabContent: '.class'}); 
	var tabs = function(opt) {
		
		// the parent tab wrapper element
		var el = document.querySelector(opt.el);
		// NodeList of all matching element nodes
		var tabNavLinks = el.querySelectorAll(opt.tabNavLinks);
		var tabContent = el.querySelectorAll(opt.tabContent);
		// index of the active tab
		var activeIndex = 0;
		// check if init function has been called
		var initCalled = false;
		
		// initializer iterates over tab links and adds click listeners
		var init = function() {
			// only run if init function has not been called
			if (!initCalled) {
				// toggle initCalled
				initCalled = true;
				
				// remove the no-js class from the parent element
				el.classList.remove('no-js');
				
				// initialize to the first tab
				toTab(0);
				
				// iterate over the tab links and add click listeners
				for (var i = 0; i < tabNavLinks.length; i++) {
					// set the link variable to the tab navigation link element
					var link = tabNavLinks[i];
					handleClick(link, i);
				}
			}
		}
		
		// handle the click events
		var handleClick = function(link, index) {
			function goToTab(e) {
				// Cancels the event if it can be canceled which will prevent a page reload
				e.preventDefault();
				
				// call toTab in order to transition to the selected tab
				toTab(index);
			}
			
			// add a click event listener to the element
			if (link.addEventListener) {
				link.addEventListener('click', goToTab);
			} else {
				link.attachEvent('onclick', goToTab);
			}
		}
		
		var toTab = function(index) {
			// only run toTab if the passed index is valid
			if (index !== activeIndex && index >= 0 && index <= tabNavLinks.length) {
				// remove the is-active class from the current tab = display: none;
				tabNavLinks[activeIndex].classList.remove('is-active');
				tabContent[activeIndex].classList.remove('is-active');
				// add the is-active class to the clicked tab = display: block;
				tabNavLinks[index].classList.add('is-active');
				tabContent[index].classList.add('is-active');
				// set the activeIndex to the clicked index
				activeIndex = index;
			} else {
				tabNavLinks[activeIndex].classList.add('is-active');
				tabContent[activeIndex].classList.add('is-active');
			}
		}
		
		return {
			init: init,
			toTab: toTab
		}
	}
	
	var initializeTabs = function (opt) {
		if (document.querySelector('.contact-form')) {
			var contactForm = tabs(opt);
			contactForm.init();
			window.contactForm = contactForm;
		}	
	}
	
	// make tabs function available on the window object in the global namespace
	window.tabs = tabs;
	window.initializeTabs = initializeTabs;
	
	// initialize tabs
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', function() {
			initializeTabs({
				el: '.contact-form',
				tabNavLinks: '.contact-form-nav-link',
				tabContent: '.contact-form-tab'
			});
		}, false);
	} else {
		window.attachEvent('onload', function() {
			initializeTabs({
				el: '.contact-form',
				tabNavLinks: '.contact-form-nav-link',
				tabContent: '.contact-form-tab'
			});
		}, false);
	}
})();

/////////////////////
// Form Submission //
/////////////////////
(function() {
	'use strict';
	
	var clientSideFormValidation = function(querySelectors) {
		
		for (var i = 0; i < querySelectors.length; i++) {
			
			var form = document.querySelector(querySelectors[i]);
			var formData = serializeForm(form)['obj'];
			
			// keystroke event listeners
			for (var k = 0; k < Object.keys(formData).length; k++) {
				var elemName = Object.keys(formData)[k];
				if (document.querySelector('input[name="' + elemName + '"]')) {
					// input elements
					if (document.querySelector('input[name="' + elemName + '"]').addEventListener) {
						document.querySelector('input[name="' + elemName + '"]').addEventListener("keyup", typingValidation, false);
					} else {
						document.querySelector('input[name="' + elemName + '"]').attachEvent("onkeyup", typingValidation);
					}	
				} else if (document.querySelector('textarea[name="' + elemName + '"]')) {
					// textarea elements
					if (document.querySelector('textarea[name="' + elemName + '"]').addEventListener) {
						document.querySelector('textarea[name="' + elemName + '"]').addEventListener("keyup", typingValidation, false);
					} else {
						document.querySelector('textarea[name="' + elemName + '"]').attachEvent("onkeyup", typingValidation);
					}
				}
			}
			
			// form submission event listener
			if (form.addEventListener) {
				form.addEventListener('submit', formSubmissionValidation);
			} else {
				form.attachEvent('onsubmit', formSubmissionValidation);
			}	
			// keystroke validation
			function typingValidation(event) {
				
				// once a user begins typing remove the error message under the submit button
				var submitBtnErr = document.querySelectorAll("section.submit-form span.form-error");
				for (var l = 0; l < submitBtnErr.length; l++) {
					submitBtnErr[l].innerHTML = "";
					submitBtnErr[l].classList.add('form-error');
					submitBtnErr[l].classList.remove('is-visible');	
				}
				
				// the span that contains the error
				var errorElem = document.querySelector("#" + event.currentTarget.name + " .form-error");
				
				if (event.currentTarget.checkValidity()) {
					// reset the error message
					errorElem.innerHTML = "";
					errorElem.classList.add('form-error');
					errorElem.classList.remove('is-visible');
				} else {
					if (document.querySelector('input[name="' + event.currentTarget.name + '"]')) {
						errorElem.innerHTML = document.querySelector('input[name="' + event.currentTarget.name + '"]').validationMessage;
						errorElem.classList.add('form-error');
						errorElem.classList.add('is-visible');
					} else if (document.querySelector('textarea[name="' + event.currentTarget.name + '"]')) {
						errorElem.innerHTML = document.querySelector('textarea[name="' + event.currentTarget.name + '"]').validationMessage;
						errorElem.classList.add('form-error');
						errorElem.classList.add('is-visible');
					}
				}
			}
			
			// form submission validation
			function formSubmissionValidation(event) {
				event.preventDefault();
				
				var formData = serializeForm(event.currentTarget)['obj'];
				
				if (!event.currentTarget.checkValidity()) {
					
					// display an error message under the form submission button
					var submitBtnErr = document.querySelector("form#" + event.currentTarget.id + " section.submit-form span.form-error");
					submitBtnErr.innerHTML = "There were errors in your form. Please review your entries and try again.";
					submitBtnErr.classList.add('form-error');
					submitBtnErr.classList.add('is-visible');
					
					// loop through form elements to apply error messages
					for (var j = 0; j < Object.keys(formData).length; j++) {
						
						var elemName = Object.keys(formData)[j];
						var errorElem = document.querySelector("#" + elemName + " .form-error");
						if (document.querySelector('input[name="' + elemName + '"]')) {
							// input elements
							if (!document.querySelector('input[name="' + elemName + '"]').checkValidity()) {
								errorElem.innerHTML = document.querySelector('input[name="' + elemName + '"]').validationMessage;
								errorElem.classList.add('form-error');
								errorElem.classList.add('is-visible');
							}
							
						} else if (document.querySelector('textarea[name="' + elemName + '"]')) {
							// textarea elements
							if (!document.querySelector('textarea[name="' + elemName + '"]').checkValidity()) {
								errorElem.innerHTML = document.querySelector('textarea[name="' + elemName + '"]').validationMessage;
								errorElem.classList.add('form-error');
								errorElem.classList.add('is-visible');
							}
						}
					}
				}
			}
		}
	}
	
	var mauticFormSubmission = function(e, opt) {
		
		var baseUrl = opt['baseUrl'];
		var formId = opt['formId'];
		
		var mauticFormUrl = baseUrl + "/form/submit/ajax?formId=" + formId;
		
		// stop form submission
		e.preventDefault();
		
		var XHR = new XMLHttpRequest();
		var FD = new FormData(e.currentTarget);
		var formData = serializeForm(e.currentTarget)['obj'];
		
		
		//mautic striped dashes from field names
		var mauticReadyFormData = {}
		for (var i = 0; i < Object.keys(formData).length; i++) {
			mauticReadyFormData["mauticform[" + Object.keys(formData)[i].split('-').join('') + "]"] = formData[Object.keys(formData)[i]];
		}
		
		// check form validation
		if (e.currentTarget.checkValidity()) {
			// make the form look busy
			document.querySelector('.contact-form-busy').classList.add('is-active');
			// disable the submit button
			document.querySelector("form#" + event.currentTarget.id + " section.submit-form button").disabled = true;
			
			MauticJS.makeCORSRequest('POST', mauticFormUrl, mauticReadyFormData, handleMauticSuccess, handleMauticError);	
			
		} else  {
			// event listener on the form submit button will trigger formSubmissionValidation()
		}
		
		//The callback methods receive the server response and the xhr object as arguments
		function handleMauticSuccess(response, xhr) {
			// remove form loading div
			document.querySelector('.contact-form-busy').classList.remove('is-active');
			
			if (response.success) {
				document.querySelector('.contact-form').classList.add('hidden');
				// show the success div
				document.querySelector('.contact-form-success').classList.add('is-active');
			} else {
				// enable the submit button
				document.querySelector("form#" + e.currentTarget.id + " section.submit-form button").disabled = false;
				// display an error message under the form submission button
				var submitBtnErr = document.querySelector("form#" + e.currentTarget.id + " section.submit-form span.form-error");
				
				if (response.type == 'error') {
					// print response.errorMessage
					submitBtnErr.innerHTML = response.errorMessage;
					submitBtnErr.classList.add('form-error');
					submitBtnErr.classList.add('is-visible');
				} else {
					// do something with the response.message
					submitBtnErr.innerHTML = response.message;
					submitBtnErr.classList.add('form-error');
					submitBtnErr.classList.add('is-visible');
				}
			}
		}
		
		//The callback methods receive the server response and the xhr object as arguments
		function handleMauticError(err, xhr) {
			// remove form loading div
			document.querySelector('.contact-form-busy').classList.remove('is-active');
			// enable the submit button
			document.querySelector("form#" + e.currentTarget.id + " section.submit-form button").disabled = false;
			// display an error message under the form submission button
			var submitBtnErr = document.querySelector("form#" + e.currentTarget.id + " section.submit-form span.form-error");
			submitBtnErr.innerHTML = err.message;
			submitBtnErr.classList.add('form-error');
			submitBtnErr.classList.add('is-visible');
		}
	}
	
	var contactFormEventListeners = function() {
		var mauticFormOptions = {}
		var querySelectors = [];
		//loop through forms to add form submission event listeners
		for (var i = 0; i < arguments.length; i++) {
			
			querySelectors.push(arguments[i]);
			
			if (document.querySelector(arguments[i])) {
				if (document.querySelector(arguments[i]).addEventListener) {
					document.querySelector(arguments[i]).addEventListener('submit', function(e) {
						mauticFormOptions['formId'] = document.querySelector("#" + e.currentTarget.id + " input[name='formId']").value;
						mauticFormOptions['baseUrl'] = document.querySelector("#" + e.currentTarget.id + " input[name='baseUrl']").value;
						mauticFormSubmission(e, mauticFormOptions);
					}, false);
				} else {
					document.querySelector(arguments[i]).attachEvent('onsubmit', function(e) {
						mauticFormOptions['formId'] = document.querySelector("#" + e.currentTarget.id + " input[name='formId']").value;
						mauticFormOptions['baseUrl'] = document.querySelector("#" + e.currentTarget.id + " input[name='baseUrl']").value;
						mauticFormSubmission(e, mauticFormOptions);
					}, false);
				}
			}	
		}
		
		// there is not a good way to add an event listener when an element renders
		// pass both forms to the form validation function
		if (window.addEventListener) {
			window.addEventListener('load', function() {
				// pass in the form querySelectors
				if (querySelectorsOnPage(querySelectors)) {
					clientSideFormValidation(querySelectors);	
				}
			}, false);
		} else {
			window.attachEvent('onload', function() {
				if (querySelectorsOnPage(querySelectors)) {
					clientSideFormValidation(querySelectors);	
				}
			}, false);
		}
		
		function querySelectorsOnPage(selectors) {
			var status = true;
			for (var i = 0; i < selectors.length; i++) {
				if (!document.querySelector(selectors[i])) {
					status = false;
				}
			}
			return status;
		}
	}
	
	// make functions available on the window object in the global namespace
	window.mauticFormSubmission = mauticFormSubmission;
	window.clientSideFormValidation = clientSideFormValidation;
	window.contactFormEventListeners = contactFormEventListeners
	
	// attach event listeners
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', function() {
			contactFormEventListeners('#general-inquiry-form', '#creative-work-inquiry-form');
		}, false);
	} else {
		window.attachEvent('onload', function() {
			contactFormEventListeners('#general-inquiry-form', '#creative-work-inquiry-form');
		}, false);
	}	
})();