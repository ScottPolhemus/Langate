$(document).ready(function(){

	//MOBILE BURGER MENU

	$(".menu-burger").click(function(){
  		$(".menu-burger").toggleClass("open");
  		$("main").toggleClass("slide");
  		$(".mobile-nav").toggleClass("open");
	});

	//ACCORDION MOBILE

	$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}

		var accordion = new Accordion($('#accordion'), false);
	});

	//QUOTE SLIDESHOW

	jQuery(function($) {

	  var slideInterval = 3000,
	    fadeDuration = 600,
	    $slideshow = $('.quote-container'),
	    $slides = $slideshow.children();

	  $slides.eq(0).fadeIn(fadeDuration);

	  setInterval(function() {
	    $slides = $slideshow.children();
	    $slides.eq(0).fadeOut(fadeDuration,

	  function() {
	      $(this).appendTo($slideshow);
	    });
	    $slides.eq(1).fadeIn(fadeDuration);
	  }, slideInterval);

	});

})
