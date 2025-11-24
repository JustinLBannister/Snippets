// views-sliders.js
// Macro & Market views sliders – mobile-first behaviour
// Requires jQuery and Slick

(function ($) {
  $(function () {

    initMacroViewsSlider();
    initMarketViewsSlider();

    // ----------------------------
    // MACRO VIEWS SLIDER
    // ----------------------------
    function initMacroViewsSlider() {
      var $container = $('#macro-views-slider');
      if (!$container.length) {
        return;
      }

      var $row = $container.children('.row').first();
      if (!$row.length) {
        return;
      }

      // Force 4/8 layout (image/text) before Slick reads widths
      fixMacroColumns($row);

      // Only init once – macro is ALWAYS slicked (mobile + desktop)
      if ($row.hasClass('slick-initialized')) {
        return;
      }

      console.log('[macro-views] initializing Slick (all viewports)');

      $row.slick({
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
      });
    }

    // Turn col-sm-6 / col-xs-12 into 4/8 for macro cards
    function fixMacroColumns($row) {
      $row.find('.col-sm-6.col-xs-12').each(function () {
        var $col = $(this);

        if ($col.find('.img-stretch').length) {
          // Image column → 4
          $col.removeClass('col-sm-6').addClass('col-sm-4');
        } else if ($col.find('.white-box-text').length) {
          // Text column → 8
          $col.removeClass('col-sm-6').addClass('col-sm-8');
        }
      });
    }

    // ----------------------------
    // MARKET VIEWS SLIDER
    // ----------------------------
    function initMarketViewsSlider() {
      var $container = $('#market-views-slider');
      if (!$container.length) {
        return;
      }

      var $row = $container.children('.row').first();
      if (!$row.length) {
        return;
      }

      var $tiles = $row.children('[class*="col-"]');
      var totalSlides = $tiles.length;

      // Create / reuse "See all stories" button (MARKET ONLY)
      var $seeAll = $container.find('.slider-see-all');
      if (!$seeAll.length) {
        $seeAll = $('<button class="slider-see-all">See all stories</button>');
        $container.append($seeAll);
      }

      $seeAll.off('click.sliderSeeAll').on('click.sliderSeeAll', function () {
        console.log('[market-views] "See all stories" clicked');
        $tiles.show();
        $seeAll.hide();
      });

      function applyMobileLayout() {
        console.log('[market-views] applying MOBILE layout');

        // Ensure Slick is removed on mobile
        if ($row.hasClass('slick-initialized')) {
          console.log('[market-views] unslicking for mobile');
          $row.slick('unslick');
        }

        // Show first 3, hide the rest
        if (totalSlides > 3) {
          $tiles.each(function (index) {
            $(this).toggle(index < 3);
          });
          $seeAll.show();
        } else {
          // Nothing to hide
          $tiles.show();
          $seeAll.hide();
        }
      }

      function applyDesktopLayout() {
        console.log('[market-views] applying DESKTOP layout');

        // Show everything
        $tiles.show();
        $seeAll.hide();

        // Initialise Slick only once
        if (!$row.hasClass('slick-initialized')) {
          console.log('[market-views] initializing Slick (desktop)');
          $row.slick({
            arrows: true,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
          });
        }
      }

      function handleLayout() {
        var isMobile = window.innerWidth < 768;

        if (isMobile) {
          applyMobileLayout();
        } else {
          applyDesktopLayout();
        }
      }

      // Initial layout
      handleLayout();

      // Re-evaluate on resize (debounced)
      var resizeTimer;
      $(window).on('resize.marketViews', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleLayout, 150);
      });
    }

  });
})(jQuery);