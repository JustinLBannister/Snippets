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
            }
        }
    });
});