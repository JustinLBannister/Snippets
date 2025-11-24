// views-sliders.js
// Macro & Market Views sliders + GMO "What sets us apart" cards
// Requires: jQuery + Slick

(function ($) {
  'use strict';

  $(function () {
    initMacroViewsSlider();
    initMarketViewsSlider();
    initGmoCardsSlider(); // NEW
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

    // Filter out truly empty tiles (e.g. bogus <br> slides)
    var $validTiles = $tiles.filter(function () {
      var $col = $(this);
      var hasContent = $col.find('a.white-box, .white-box-text, .img-stretch').length > 0;
      return hasContent;
    });

    // Remove the empties so Slick never sees them
    $tiles.not($validTiles).remove();

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
      var slidesToScroll = 1; // always 1 so we never land on an empty slot

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
      var isMobile = window.innerWidth < 992; // 0–991 = "mobile/tablet"

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

  // -------------------------------------------
  // GMO: "What sets us apart" cards slider
  // rbccm-gmo__cards -> 1 col mobile/tablet, 3 cols desktop, infinite
  // -------------------------------------------
  function initGmoCardsSlider() {
    var $cards = $('.rbccm-gmo__cards');
    if (!$cards.length) {
      return;
    }

    // Avoid double init
    if ($cards.hasClass('slick-initialized')) {
      return;
    }

    console.log('[gmo-cards] initializing Slick');

    $cards.slick({
      arrows: true,
      dots: true,
      infinite: true,         // <— wraps around
      slidesToShow: 3,        // desktop default (≥1024)
      slidesToScroll: 1,
      // mobile/tablet: 1 column
      responsive: [
        {
          breakpoint: 1024,   // <= 1024px
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

})(jQuery);

/* Base link style */
.rbccm-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;                 /* space between text and arrow */
  padding-bottom: 4px;     /* space between text and underline */
  border-bottom: 1.5px solid #0051A5;
  color: #0051A5;
  text-decoration: none;
  font-weight: 500;
  line-height: 1.3;
}

/* SVG Arrow */
.rbccm-link::after {
  content: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='9' viewBox='0 0 6 9' fill='none'><path d='M1.64326 8.76752L5.71588 5.09649C5.80591 5.01694 5.87736 4.92229 5.92613 4.81802C5.97489 4.71374 6 4.60189 6 4.48893C6 4.37596 5.97489 4.26411 5.92613 4.15984C5.87736 4.05556 5.80591 3.96092 5.71588 3.88137L1.64326 0.25312C1.55396 0.172915 1.44773 0.109254 1.33068 0.0658105C1.21363 0.0223668 1.08809 0 0.961285 0C0.834485 0 0.708939 0.0223668 0.59189 0.0658105C0.474841 0.109254 0.368606 0.172915 0.279313 0.25312C0.100414 0.41345 0 0.630333 0 0.856402C0 1.08247 0.100414 1.29935 0.279313 1.45968L3.67957 4.48893L0.279313 7.51817C0.101861 7.67756 0.00182152 7.89268 0.000760555 8.11717C3.00407e-05 8.22979 0.0242591 8.34143 0.0720592 8.44569C0.119859 8.54995 0.19029 8.64478 0.279313 8.72473C0.365393 8.8078 0.469097 8.87485 0.584433 8.92201C0.699768 8.96916 0.824449 8.99549 0.951272 8.99947C1.07809 9.00345 1.20455 8.985 1.32332 8.94519C1.44209 8.90537 1.55083 8.84499 1.64326 8.76752Z' fill='%230051A5'/></svg>");
  width: 6px;
  height: 9px;
  display: inline-block;
}

<a href="#" class="rbccm-link">Learn More</a>