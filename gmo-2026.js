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

<section class="rbccm-transactions">
  <div class="rbccm-transactions__overlay"></div>

  <div class="rbccm-transactions__inner">
    <div class="rbccm-transactions__content">
      <h2 class="rbccm-transactions__title">RBC Transactions</h2>

      <p class="rbccm-transactions__body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas in justo nec
        efficitur. Pellentesque sollicitudin nisi in rutrum suscipit morbi ut leo cursus accumsan ante.
      </p>
    </div>

    <div class="rbccm-transactions__cta-wrap">
      <a href="#" class="rbccm-transactions__cta">
        Learn more
      </a>
    </div>
  </div>
</section>

/* ===== Base section ===== */

.rbccm-transactions {
  position: relative;
  overflow: hidden;
  color: #ffffff;
  background-color: #003168; /* fallback solid */
  background-image:
    url("/assets/rbccm/images/your-spacey-lines-texture.jpg");
  background-size: cover;
  background-position: center;
}

/* Optional extra darkening overlay if you need more contrast */
.rbccm-transactions__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  pointer-events: none;
}

.rbccm-transactions__inner {
  position: relative; /* stay above overlay */
  max-width: 1140px;
  margin: 0 auto;
  padding: 40px 24px 48px; /* mobile spacing */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;
}

/* ===== Text block ===== */

.rbccm-transactions__content {
  max-width: 40rem;
}

.rbccm-transactions__title {
  margin: 0 0 16px;
  font-family: "RBC Display", "Roboto", system-ui, -apple-system, sans-serif;
  font-weight: 500;
  font-size: 28px;
  line-height: 1.2;
  color: #ffd24d; /* RBC yellow for heading */
}

.rbccm-transactions__body {
  margin: 0;
  font-family: "Roboto", system-ui, -apple-system, sans-serif;
  font-size: 18px;
  line-height: 1.5;
}

/* ===== CTA ===== */

.rbccm-transactions__cta-wrap {
  /* on mobile the button spans full width */
}

.rbccm-transactions__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 56px;
  padding: 16px 24px;
  border-radius: 0;
  border: 1px solid transparent;
  background: #0051a5; /* Bright blue */
  color: #ffffff;
  font-family: "Roboto", system-ui, -apple-system, sans-serif;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.rbccm-transactions__cta:hover,
.rbccm-transactions__cta:focus-visible {
  background: #003168;
  border-color: #ffffff;
  outline: none;
}

/* ===== Tablet (optional tweak 768–1023) ===== */

@media (min-width: 768px) {
  .rbccm-transactions__inner {
    padding-inline: 40px;
  }
}

/* ===== Desktop ≥1024px: 2-column layout with gaps like Figma ===== */

@media (min-width: 1024px) {
  .rbccm-transactions__inner {
    padding: 80px 170px;         /* approx your 170 side / 40 top-bottom */
    flex-direction: row;
    align-items: center;
    gap: 80px;                   /* space between text and button column */
  }

  .rbccm-transactions__content {
    flex: 1 1 auto;
  }

  .rbccm-transactions__cta-wrap {
    flex: 0 0 auto;
    align-self: stretch;         /* so we can vertically center the button if needed */
    display: flex;
    align-items: center;
  }

  .rbccm-transactions__cta {
    width: auto;
    min-width: 260px;
  }
}