//http://stackoverflow.com/questions/11661187/form-serialize-javascript-no-framework
(function() {
	'use strict';
	
	var serializeForm = function(form) {
	    var field;
	    var s = [];
	    var o = {};
	    if (typeof form == 'object' && form.nodeName == "FORM") {
	        // loop through form element
	        for (var i = 0; i < form.elements.length; i++) {
	            // current form element
	        	field = form.elements[i];
	            
	            if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
	                if (field.type == 'select-multiple') {
	                	// object value is an array
	                	o[field.name] = []
	                	
	                    for (var j = form.elements[i].options.length - 1; j >= 0; j--) {
	                        if (field.options[j].selected) {
	                        	s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
	                        	o[field.name].push(field.options[j].value);
	                        }
	                    }
	                	
	                } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
	                    s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
	                    o[field.name] = field.value;
	                }
	            }
	        }
	        
	        return {
	        	str: s.join('&').replace(/%20/g, '+'),
	        	obj: o 
	        }
	        
	    } else {
	    	// return a blank string if form is not a form element
	    	return '';
	    }
	}
	
	// make tabs function available on the window object in the global namespace
	window.serializeForm = serializeForm;
})();