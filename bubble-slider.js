$(document).ready(function() {
    var $slick_slider = $('.bubble-container');
    
    var settings = {
        infinite: false,
        centerMode: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        initialSlide: 1,
        responsive: [{
            breakpoint: 700,
            settings: {
                slidesToShow: 1,
                centerMode: true,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                dots: true
            }
        }]
    };
    
    // Initialize slick on mobile
    if ($(window).width() < 768) {
        $slick_slider.slick(settings);
    }
    
    // Handle resize events
    $(window).on('resize', function() {
        if (window.matchMedia("(max-width: 768px)").matches) {
            // Mobile view - initialize slick if not already initialized
            if (!$slick_slider.hasClass('slick-initialized')) {
                $slick_slider.slick(settings);
            }
        } else {
            // Desktop view - destroy slick if initialized
            if ($slick_slider.hasClass('slick-initialized')) {
                $slick_slider.slick('unslick');
                // Reset any inline styles that Slick may have added
                $slick_slider.find('.bubble').removeAttr('style');
                $slick_slider.removeAttr('style');
            }
        }
    });
});

/* 
Alternative approach using refresh instead of unslick:
This keeps the DOM more intact but disables slider on desktop
*/

$(document).ready(function() {
    var $slick_slider = $('.bubble-container');
    var isDesktop = $(window).width() >= 768;
    
    var settings = {
        infinite: false,
        centerMode: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        initialSlide: 1,
        mobileFirst: true,  // Important: starts from mobile up
        responsive: [
            {
                breakpoint: 768,
                settings: "unslick"  // This unslicks at 768px and above
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false,
                    dots: true
                }
            }
        ]
    };
    
    // Initialize slick (it will handle responsive automatically)
    $slick_slider.slick(settings);
    
    // Handle resize events - Slick will handle this automatically with responsive settings
    $(window).on('resize', function() {
        if (!$slick_slider.hasClass('slick-initialized') && $(window).width() < 768) {
            $slick_slider.slick(settings);
        }
    });
});

/*
Simplest approach - Let Slick handle everything:
*/

$(document).ready(function() {
    $('.bubble-container').slick({
        infinite: false,
        centerMode: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        initialSlide: 1,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 768,
                settings: "unslick"
            },
            {
                breakpoint: 0,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    });
    
    // Reinitialize on resize if needed
    $(window).on('resize', function() {
        $('.bubble-container').slick('resize');
    });
});