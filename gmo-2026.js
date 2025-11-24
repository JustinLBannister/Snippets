// views-sliders.js
// Macro & Market Views sliders
// Requires: jQuery + Slick

(function ($) {
  'use strict';

  $(function () {
    initMacroViewsSlider();
    initMarketViewsSlider();
  });

  // -----------------------------
  // MACRO VIEWS (always slick)
  // -----------------------------
  function initMacroViewsSlider() {
    var $container = $('#macro-views-slider');
    if (!$container.length) return;

    var $row = $container.children('.row').first();
    if (!$row.length) return;

    // 6/6 -> 4/8 before Slick
    fixMacroColumns($row);

    if ($row.hasClass('slick-initialized')) return;

    console.log('[macro-views] initializing Slick (all viewports)');

    $row.slick({
      arrows: true,
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });
  }

  function fixMacroColumns($row) {
    $row.find('.col-sm-6.col-xs-12').each(function () {
      var $col = $(this);

      if ($col.find('.img-stretch').length) {
        $col.removeClass('col-sm-6').addClass('col-sm-4'); // image
      } else if ($col.find('.white-box-text').length) {
        $col.removeClass('col-sm-6').addClass('col-sm-8'); // text
      }
    });
  }

  // -----------------------------
  // MARKET VIEWS (mobile-first)
  // -----------------------------
  function initMarketViewsSlider() {
    var $container = $('#market-views-slider');
    if (!$container.length) return;

    var $row = $container.children('.row').first();
    if (!$row.length) return;

    // Grab all potential tiles
    var $tiles = $row.children('[class*="col-"]');

    // *** NEW: filter out "empty" tiles (like your <br data-mce-bogus="1"> slide) ***
    var $validTiles = $tiles.filter(function () {
      var $col = $(this);

      // Consider it a real card only if it has a tile link / image / text block
      var hasContent = $col.find('a.white-box, .white-box-text, .img-stretch').length > 0;

      return hasContent;
    });

    // Remove the truly empty columns from the DOM so Slick never sees them
    $tiles.not($validTiles).remove();

    // Work only with the filtered set from here on
    $tiles = $validTiles;
    var totalSlides = $tiles.length;

    if (!totalSlides) {
      console.warn('[market-views] no valid tiles found');
      return;
    }

    // See all stories button (mobile only)
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

      if ($row.hasClass('slick-initialized')) {
        console.log('[market-views] unslicking for mobile');
        $row.slick('unslick');
      }

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

    function applyDesktopLayout() {
      console.log('[market-views] applying DESKTOP layout');

      $tiles.show();
      $seeAll.hide();

      var slidesToShow = 3;
      var slidesToScroll = 1; // <— always 1 now so you never "skip" into an empty spot

      console.log(
        '[market-views] desktop Slick config:',
        'slidesToShow=' + slidesToShow,
        'slidesToScroll=' + slidesToScroll,
        'totalSlides=' + totalSlides
      );

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
        $row.slick('slickSetOption', 'slidesToShow', slidesToShow, true);
        $row.slick('slickSetOption', 'slidesToScroll', slidesToScroll, true);
      }
    }

    function handleLayout() {
      var isMobile = window.innerWidth < 992; // using 992 as the desktop breakpoint

      if (isMobile) {
        applyMobileLayout();
      } else {
        applyDesktopLayout();
      }
    }

    handleLayout();

    var resizeTimer;
    $(window).on('resize.marketViews', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleLayout, 150);
    });
  }

})(jQuery);