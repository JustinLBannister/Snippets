// views-sliders.js
// Macro Views, Market Views, GMO Sliders
// Requires: jQuery + Slick

(function ($) {
  'use strict';

  $(function () {
    initMacroViewsSlider();
    initMarketViewsSlider();
    initRbccmGmoSlider();    // <— NEW SLIDER
  });

  // -------------------------------------------------------
  // MACRO VIEWS (Always Slick)
  // -------------------------------------------------------
  function initMacroViewsSlider() {
    var $container = $('#macro-views-slider');
    if (!$container.length) return;

    var $row = $container.children('.row').first();
    if (!$row.length) return;

    fixMacroColumns($row);

    if ($row.hasClass('slick-initialized')) return;

    console.log('[macro-views] initializing Slick');

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
        $col.removeClass('col-sm-6').addClass('col-sm-4');
      } else if ($col.find('.white-box-text').length) {
        $col.removeClass('col-sm-6').addClass('col-sm-8');
      }
    });
  }

  // -------------------------------------------------------
  // MARKET VIEWS (Mobile-first)
  // -------------------------------------------------------
  function initMarketViewsSlider() {
    var $container = $('#market-views-slider');
    if (!$container.length) return;

    var $row = $container.children('.row').first();
    if (!$row.length) return;

    var $tiles = $row.children('[class*="col-"]');

    // Remove empty bogus tiles
    var $validTiles = $tiles.filter(function () {
      return $(this).find('a.white-box, .white-box-text, .img-stretch').length > 0;
    });

    $tiles.not($validTiles).remove();
    $tiles = $validTiles;

    var totalSlides = $tiles.length;
    if (!totalSlides) return;

    // See all stories button
    var $seeAll = $container.find('.slider-see-all');
    if (!$seeAll.length) {
      $seeAll = $('<button class="slider-see-all">See all stories</button>');
      $container.append($seeAll);
    }

    $seeAll.off('click.sliderSeeAll').on('click.sliderSeeAll', function () {
      console.log('[market-views] see all clicked');
      $tiles.show();
      $seeAll.hide();
    });

    function applyMobileLayout() {
      console.log('[market-views] MOBILE');

      if ($row.hasClass('slick-initialized')) $row.slick('unslick');

      if (totalSlides > 3) {
        $tiles.each(function (i) {
          $(this).toggle(i < 3);
        });
        $seeAll.show();
      } else {
        $tiles.show();
        $seeAll.hide();
      }
    }

    function applyDesktopLayout() {
      console.log('[market-views] DESKTOP');

      $tiles.show();
      $seeAll.hide();

      var slidesToShow = 3;
      var slidesToScroll = 1;

      if (!$row.hasClass('slick-initialized')) {
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
      var isMobile = window.innerWidth < 992;  // BREAKPOINT UPDATED PER REQUEST

      if (isMobile) applyMobileLayout();
      else applyDesktopLayout();
    }

    handleLayout();

    var resizeTimer;
    $(window).on('resize.marketViews', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleLayout, 150);
    });
  }

  // -------------------------------------------------------
  // NEW GMO SLIDER — "What Sets Us Apart"
  // -------------------------------------------------------
  function initRbccmGmoSlider() {
    var $block = $('.rbccm-gmo');
    if (!$block.length) return;

    var $track = $block.find('.rbccm-gmo__cards').first();
    if (!$track.length || $track.hasClass('slick-initialized')) return;

    console.log('[gmo] initialize');

    // Mark dividers correctly on change
    $track.on('init', function (e, slick) {
      updateGmoVisibleDividers(slick);
    });

    $track.on('afterChange', function (e, slick) {
      updateGmoVisibleDividers(slick);
    });

    // Init Slick (desktop default = 3)
    $track.slick({
      arrows: true,
      dots: true,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,   // Tablet (2 columns)
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,    // Mobile (1 column)
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }

  // Mark the last visible slider to kill its right divider
  function updateGmoVisibleDividers(slick) {
    if (!slick) return;

    var slidesToShow = slick.options.slidesToShow || 1;
    var first = slick.currentSlide || 0;
    var last = Math.min(first + slidesToShow - 1, slick.$slides.length - 1);

    slick.$slides.find('.rbccm-gmo__card').removeClass('rbccm-gmo__card--last-visible');

    slick.$slides.eq(last).find('.rbccm-gmo__card').addClass('rbccm-gmo__card--last-visible');
  }

})(jQuery);

RBC Transactions

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas in justo nec efficitur. Pellentesque sollicitudin nisi in rutrum suscipit morbi ut leo cursus accumsan ante.