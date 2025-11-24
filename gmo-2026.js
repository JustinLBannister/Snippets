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
  // MACRO VIEWS SLIDER (always slick)
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

    // Create / reuse "See all stories" button
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

      // Show first 3, hide the rest (if more than 3)
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

      // Decide how many to scroll
      var slidesToShow = 3;
      var slidesToScroll =
        totalSlides >= 6 && totalSlides % 3 === 0 ? 3 : 1;

      console.log(
        '[market-views] desktop Slick config:',
        'slidesToShow=' + slidesToShow,
        'slidesToScroll=' + slidesToScroll,
        'totalSlides=' + totalSlides
      );

      // Initialise Slick only once
      if (!$row.hasClass('slick-initialized')) {
        console.log('[market-views] initializing Slick (desktop)');
        $row.slick({
          arrows: true,
          dots: true,
          infinite: true,
          slidesToShow: slidesToShow,
          slidesToScroll: slidesToScroll
        });
      } else {
        // If already initialized (e.g., coming back from resize),
        // make sure settings are updated
        $row.slick('slickSetOption', 'slidesToShow', slidesToShow, true);
        $row.slick('slickSetOption', 'slidesToScroll', slidesToScroll, true);
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

})(jQuery);

/* See All Stories Button — Market Views (Mobile Only) */
.slider-see-all {
  display: flex;
  height: 50px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  /* Background color: var(--Blue-Bright-Blue, #0051A5) */
  background: var(--Blue-Bright-Blue, #0051A5);

  /* Typography */
  color: var(--RBC-White, #FFF);
  text-align: center;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;

  /* Behavior */
  width: 100%;
  border: none;
  cursor: pointer;
}

/* Optional: Slight hover for desktop */
@media (hover: hover) {
  .slider-see-all:hover {
    opacity: 0.9;
  }
}