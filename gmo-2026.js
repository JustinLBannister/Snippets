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

/* ============================
   RBC Hero Breadcrumbs
   BEM: rbccm-hero__breadcrumbs
   ============================ */

.rbccm-hero__breadcrumbs {
  padding: 0;
  margin: 0 0 16px 0; /* adjust based on hero spacing */
  font-family: inherit;
}

/* <ol> — flex horizontal layout */
.rbccm-hero__breadcrumbs ol {
  display: flex;
  align-items: center;
  gap: 0.25rem; /* minimal spacing before/after pipe */
  list-style: none;
  padding: 0;
  margin: 0;
  color: #ffffff;
}

/* <li> link style */
.rbccm-hero__breadcrumbs li a {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  line-height: 1.4;
}

/* Hover (optional, matches RBC links) */
.rbccm-hero__breadcrumbs li a:hover {
  text-decoration: underline;
}

/* Pipe separator */
.rbccm-hero__breadcrumbs li + li::before {
  content: "|";
  color: #ffffffd0;     /* slightly muted pipe */
  margin: 0 0.5rem;     /* left/right spacing around pipe */
  font-size: 14px;
  line-height: 1;
}

/* Responsive adjustment (optional) */
@media (max-width: 480px) {
  .rbccm-hero__breadcrumbs li a {
    font-size: 13px;
  }
  .rbccm-hero__breadcrumbs li + li::before {
    margin: 0 0.35rem;
  }
}