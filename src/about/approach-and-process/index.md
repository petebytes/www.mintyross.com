---
layout: two-column-page
title: Approach and Process
permalink: /about/approach-and-process/
header: 
  include: header/header-relative.html
  class: dark
page-content:
  sections:
   - collections:
       - name: approach-and-process
         docs:
           - Discovery
   - collections:
       - name: approach-and-process
         docs:
           - Ideation
   - collections:
       - name: approach-and-process
         docs: 
          - Refinement
   - collections:
       - name: approach-and-process
         docs:
          - Delivery
forms:
  - name: general-inquiry
    title: General Inquiry
  - name: creative-work-inquiry
    title: Creative Work
---
<section id="inquiry" class="contact-wrapper">
	<h2>Let's work together</h2>
	{% include contact/tabbed-contact-form.html %}
</section>
<script>
	if (window.addEventListener) {
		window.addEventListener('load', function() {
			contactForm.toTab(1);
		}, false);
	} else {
		window.attachEvent('onload', function() {
			contactForm.toTab(1);
		}, false);
	}
</script>