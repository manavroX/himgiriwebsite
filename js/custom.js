/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

var home;

window.addEventListener('load', (event) => {
    var homeElement = document.getElementById('home');
    var homePosition = homeElement.getBoundingClientRect();
    if((homePosition.top <= 130 && homePosition.bottom >= 130)) {
        // console.log('home is partially visible in screen');
        document.getElementById('homeNav').classList.add('active');
        home = true;
    }
    else
    {
        document.getElementById('homeNav').classList.remove('active');
        home = false;
    }
});


 window.addEventListener('scroll', function() {
    var homeElement = document.getElementById('home');
    var aboutElement = document.getElementById('about');
    var motoElement = document.getElementById('moto');
    var visionElement = document.getElementById('vision');
    var meditationElement = document.getElementById('meditation');
    var mentorElement = document.getElementById('ourmentor');
    var sevaElement = document.getElementById('seva');
    var eventsElement = document.getElementById('events');
    var galleryElement = document.getElementById('gallery');
    var experiencesElement = document.getElementById('experiences');
    var contactusElement = document.getElementById('contactus');

    
    var homePosition = homeElement.getBoundingClientRect();
    var aboutPosition = aboutElement.getBoundingClientRect();
    var motoPosition = motoElement.getBoundingClientRect();
    var meditationPosition = meditationElement.getBoundingClientRect();
    var visionPosition = visionElement.getBoundingClientRect();
    var mentorPosition = mentorElement.getBoundingClientRect();
    var sevaPosition = sevaElement.getBoundingClientRect();
    var eventsPosition = eventsElement.getBoundingClientRect();
    var galleryPosition = galleryElement.getBoundingClientRect();
    var experiencesPosition = experiencesElement.getBoundingClientRect();
    var contactusPosition = contactusElement.getBoundingClientRect();

    
    // checking whether fully visible
    // if(mentorPosition.top >= 0 && mentorPosition.bottom <= window.innerHeight) {
    //  console.log('mentor is fully visible in screen');
    // }

    // checking for partial visibility
    // if((mentorPosition.top < window.innerHeight && mentorPosition.bottom >= 0)) {
    //  console.log('mentor is partially visible in screen');
    // }
    if((mentorPosition.top <= 125 && mentorPosition.bottom >= 125)) {
        // console.log('mentor is partially visible in screen');
        document.getElementById('mentorNav').classList.add('active');
    }
    else
    {
        // console.log("mentor is not visible on screen");
        document.getElementById('mentorNav').classList.remove('active');
    }

    if((visionPosition.top <= 125 && visionPosition.bottom >= 125)||(motoPosition.top <= 125 && motoPosition.bottom >= 125)) {
        // console.log('vision is partially visible in screen');
        document.getElementById('visionNav').classList.add('active');
    }
    else
    {
        // console.log("vision is not visible on screen");
        document.getElementById('visionNav').classList.remove('active');
    }

    if((aboutPosition.top <= 125 && aboutPosition.bottom >= 125)) {
        // console.log('about is partially visible in screen');
        document.getElementById('aboutNav').classList.add('active');
    }
    else
    {
        // console.log("about is not visible on screen");
        document.getElementById('aboutNav').classList.remove('active');
    }

    

    if((meditationPosition.top <= 125 && meditationPosition.bottom >= 125)) {
        // console.log('meditation is partially visible in screen');
        document.getElementById('meditationNav').classList.add('active');
    }
    else
    {
        // console.log("meditation is not visible on screen");
        document.getElementById('meditationNav').classList.remove('active');
    }

    if((homePosition.top <= 130 && homePosition.bottom >= 130)) {
        // console.log('home is partially visible in screen');
        document.getElementById('homeNav').classList.add('active');
        home = true;
    }
    else
    {
        // console.log("home is not visible on screen");
        // console.log(homePosition.top);
        // console.log(homePosition.bottom);
        document.getElementById('homeNav').classList.remove('active');
        home = false;
    }

    if((sevaPosition.top <= 125 && sevaPosition.bottom >= 125)) {
        // console.log('seva is partially visible in screen');
        document.getElementById('sevaNav').classList.add('active');
    }
    else
    {
        // console.log("seva is not visible on screen");
        document.getElementById('sevaNav').classList.remove('active');
    }
    if((eventsPosition.top <= 125 && eventsPosition.bottom >= 125)) {
        // console.log('events is partially visible in screen');
        document.getElementById('eventsNav').classList.add('active');
    }
    else
    {
        // console.log("events is not visible on screen");
        document.getElementById('eventsNav').classList.remove('active');
    }

    if((galleryPosition.top <= 125 && galleryPosition.bottom >= 125)) {
        // console.log('gallery is partially visible in screen');
        document.getElementById('galleryNav').classList.add('active');
    }
    else
    {
        // console.log("gallery is not visible on screen");
        document.getElementById('galleryNav').classList.remove('active');
    }

    if((experiencesPosition.top <= 125 && experiencesPosition.bottom >= 125)) {
        // console.log('experiences is partially visible in screen');
        document.getElementById('experiencesNav').classList.add('active');
    }
    else
    {
        // console.log("experiences is not visible on screen");
        document.getElementById('experiencesNav').classList.remove('active');
    }

    if((contactusPosition.top <= 125 && contactusPosition.bottom >= 125)) {
        // console.log('contactus is partially visible in screen');
        document.getElementById('contactusNav').classList.add('active');
    }
    else
    {
        // console.log("contactus is not visible on screen");
        document.getElementById('contactusNav').classList.remove('active');
    }
});

(function($) {
    "use strict"; // Start of use strict
	var top;
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    // $('a.page-scroll').bind('click', function(event) {
    //     var $anchor = $(this);
    //     $('html, body').stop().animate({
    //         scrollTop: ($($anchor.attr('href')).offset().top - 50)
    //     }, 1250, 'easeInOutExpo');
    //     event.preventDefault();
    // });


    $('a.page-scroll').bind('click', function(event) {
                var $anchor = $(this);
                if(home&& window.innerWidth>992)
                {
                    $('html, body').stop().animate({
                    scrollTop: ($($anchor.attr('href')).offset().top - 250)
                    }, 1250, 'easeInOutExpo');
                }
                else if(!home && window.innerWidth>992)
                {
                    $('html, body').stop().animate({
                    scrollTop: ($($anchor.attr('href')).offset().top - 120)
                    }, 1250, 'easeInOutExpo');
                }
                else
                {
                    $('html, body').stop().animate({
                    scrollTop: ($($anchor.attr('href')).offset().top)
                    }, 1250, 'easeInOutExpo');
                }
                event.preventDefault();
                $("ul").addClass('active');
            });
    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 200
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict

$(document).ready(function() {
/* ======= Header Background Slideshow - Flexslider ======= */    
    /* Ref: https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties */
    
    $('#bg-slider').flexslider({
        animation: "fade",
        directionNav: false, //remove the default direction-nav - https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties
        controlNav: false, //remove the default control-nav
        slideshowSpeed: 6000
    });
	/* ======= Fixed header when scrolled ======= */
	$(window).bind('scroll', function() {
         if ($(window).scrollTop() > 0) {
             $('#header').addClass('navbar-fixed-top');
         }
         else {
             $('#header').removeClass('navbar-fixed-top');
         }
    });
	
    });