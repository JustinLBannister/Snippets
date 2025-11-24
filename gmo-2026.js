// views-sliders.js
// Macro & Market Views sliders
// Requires: jQuery + Slick

(function ($) {
  'use strict';

  $(function () {
    initMacroViewsSlider();
    initMarketViewsSlider();
  });

  // ------------------------------------
  // MACRO VIEWS SLIDER (always slick, 1-up)
  // ------------------------------------
  function initMacroViewsSlider() {
    var $container = $('#macro-views-slider');
    if (!$container.length) {
      return;
    }

    var $row = $container.children('.row').first();
    if (!$row.length) {
      return;
    }

    // Fix 6/6 ➜ 4/8 columns before Slick reads widths
    fixMacroColumns($row);

    // Only initialize once
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

  // Turn col-sm-6 col-xs-12 into 4/8 for macro cards
  function fixMacroColumns($row) {
    $row.find('.col-sm-6.col-xs-12').each(function () {
      var $col = $(this);

      if ($col.find('.img-stretch').length) {
        // Image column
        $col.removeClass('col-sm-6').addClass('col-sm-4');
      } else if ($col.find('.white-box-text').length) {
        // Text column
        $col.removeClass('col-sm-6').addClass('col-sm-8');
      }
    });
  }

  // ------------------------------------
  // MARKET VIEWS SLIDER (mobile-first)
  // ------------------------------------
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

    // Create / reuse "See all stories" button (mobile-only behavior)
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

    // ----- MOBILE LAYOUT (< 768px): unslick + 3 + see-all -----
    function applyMobileLayout() {
      console.log('[market-views] applying MOBILE layout (<768)');

      // Unslick for mobile
      if ($row.hasClass('slick-initialized')) {
        console.log('[market-views] unslicking for mobile');
        $row.slick('unslick');
      }

      // Show first 3, hide the rest (if more than 3)
      if (totalSlides > 3) {
        $tiles.each(function (index) {
          $(this).toggle(index < 3);
        });
        $seeAll.show();
      } else {
        $tiles.show();
        $seeAll.hide();
      }
    }

    // ----- TABLET + DESKTOP (>= 768px): slick on, 2-up tablet, 3-up desktop -----
    function applySliderLayout() {
      var width = window.innerWidth;
      var isTablet = width >= 768 && width < 1024; // iPad-ish
      var slidesToShow = isTablet ? 2 : 3;

      // ✅ ALWAYS move 1 slide per click to avoid "empty card" artifacts
      var slidesToScroll = 1;

      console.log(
        '[market-views] applying SLIDER layout (>=768)',
        'width=' + width,
        'slidesToShow=' + slidesToShow,
        'slidesToScroll=' + slidesToScroll,
        'totalSlides=' + totalSlides
      );

      // Show everything, hide button on tablet/desktop
      $tiles.show();
      $seeAll.hide();

      if (!$row.hasClass('slick-initialized')) {
        console.log('[market-views] initializing Slick (tablet/desktop)');
        $row.slick({
          arrows: true,
          dots: true,
          infinite: true,
          slidesToShow: slidesToShow,
          slidesToScroll: slidesToScroll
        });
      } else {
        // Update Slick settings when crossing breakpoints
        $row.slick('slickSetOption', 'slidesToShow', slidesToShow, true);
        $row.slick('slickSetOption', 'slidesToScroll', slidesToScroll, true);
      }
    }

    function handleLayout() {
      var isMobile = window.innerWidth < 768;

      if (isMobile) {
        applyMobileLayout();
      } else {
        applySliderLayout(); // tablet + desktop
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

})(jQuery);

/* Remove Slick's default font arrows */
.slick-prev:before,
.slick-next:before {
  content: "" !important;
  display: block;
  width: 19px;
  height: 38px;
  background-repeat: no-repeat;
  background-size: contain;
  flex-shrink: 0;
  opacity: 1;
}

/* PREV ARROW (←) */
.slick-prev:before {
  background-image: url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='19' height='38' viewBox='0 0 21 40' fill='none'>\
<path d='M0.530273 0.530273L19.5303 19.5303L0.530273 38.5303' stroke='%230051A5' stroke-width='1.5'/>\
</svg>");
  transform: rotate(180deg); /* flip for left arrow */
}

/* NEXT ARROW (→) */
.slick-next:before {
  background-image: url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='19' height='38' viewBox='0 0 21 40' fill='none'>\
<path d='M0.530273 0.530273L19.5303 19.5303L0.530273 38.5303' stroke='%230051A5' stroke-width='1.5'/>\
</svg>");
}