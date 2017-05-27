---
layout: splash
header: 
  include: header/header-transparent.html
  class: light
hero:
  type: css
  elements:
    - class: stars
    - class: twinkling
    - class: clouds
  foreground:
    include: hero/foreground/hero-foreground-centered.html
    class: light
    heading:
      type: image
      img: assets/img/minty-ross-banner-logo-light.png
      alt: Minty Ross
      title: Minty Ross
    excerpt: Perfecting the Art of Commerce 
  aspect_ratio: 16x9
forms:
  - name: general-inquiry
    title: General Inqury
  - name: creative-work-inquiry
    title: Creative Work
---
## Let's get to know each other
{% include contact/tabbed-contact-form.html %}
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