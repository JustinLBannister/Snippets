$(document).ready(function() {
    // Store the original container
    var $originalContainer = $('.bubble-container');
    
    // Clone the container for mobile
    var $mobileContainer = $originalContainer.clone();
    
    // Add classes to distinguish them
    $originalContainer.addClass('bubble-container-desktop');
    $mobileContainer.addClass('bubble-container-mobile').removeClass('bubble-container-desktop');
    
    // Insert the mobile container after the desktop one
    $mobileContainer.insertAfter($originalContainer);
    
    // Initialize Slick only on the mobile container
    $mobileContainer.slick({
        infinite: false,
        centerMode: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        initialSlide: 1
    });
    
    // Function to handle visibility based on viewport
    function handleContainerVisibility() {
        var windowWidth = $(window).width();
        
        if (windowWidth < 768) {
            // Mobile view
            $originalContainer.css('display', 'none');
            $mobileContainer.css('display', 'block');
            // Refresh slick position when becoming visible
            $mobileContainer.slick('setPosition');
        } else {
            // Desktop view
            $originalContainer.css('display', 'block');
            $mobileContainer.css('display', 'none');
        }
    }
    
    // Initial visibility setup
    handleContainerVisibility();
    
    // Handle resize events with debouncing
    var resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            handleContainerVisibility();
        }, 250);
    });
});