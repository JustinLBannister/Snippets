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

h2 What sets RBC Capital Markets apart? 

p We help the world’s leading organizations achieve their financial goals with innovative products and services, forward-looking advisory, and excellence in execution. From origination and structuring through to sales, trading, and risk management, we deliver capital solutions that support client ambitions. 

h3 Global Investment Banking



p We combine cross-border market capabilities with industry specific expertise to finance operations and strategic acquisitions.

learn more

h3 Global Markets


p With diverse asset class and currency expertise, we deliver insights and solutions on a range of trading and hedging activities.

learnm more

h3 Corporate Banking


p For corporate clients, we leverage our global platform to provide lending and financing strategies with seamless execution.
learn more 

RBC Transactions

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas in justo nec efficitur. Pellentesque sollicitudin nisi in rutrum suscipit morbi ut leo cursus accumsan ante.

<div class="container rbccm-gmo">

  <!-- Block Header -->
  <header class="rbccm-gmo__header">
    <h2 class="rbccm-gmo__title">What sets RBC Capital Markets apart?</h2>

    <p class="rbccm-gmo__intro">
      We help the world’s leading organizations achieve their financial goals with
      innovative products and services, forward-looking advisory, and excellence in
      execution. From origination and structuring through to sales, trading, and
      risk management, we deliver capital solutions that support client ambitions.
    </p>
  </header>

  <!-- Cards container -->
  <div class="rbccm-gmo__cards">

    <!-- CARD 1 -->
    <article class="rbccm-gmo__card">
      <h3 class="rbccm-gmo__card-title">Global Investment Banking</h3>

      <p class="rbccm-gmo__card-text">
        We combine cross-border market capabilities with industry specific expertise
        to finance operations and strategic acquisitions.
      </p>

      <a href="#" class="rbccm-gmo__card-link">Learn More</a>
    </article>

    <!-- CARD 2 -->
    <article class="rbccm-gmo__card">
      <h3 class="rbccm-gmo__card-title">Global Markets</h3>

      <p class="rbccm-gmo__card-text">
        With diverse asset class and currency expertise, we deliver insights and
        solutions on a range of trading and hedging activities.
      </p>

      <a href="#" class="rbccm-gmo__card-link">Learn More</a>
    </article>

    <!-- CARD 3 -->
    <article class="rbccm-gmo__card">
      <h3 class="rbccm-gmo__card-title">Corporate Banking</h3>

      <p class="rbccm-gmo__card-text">
        For corporate clients, we leverage our global platform to provide lending
        and financing strategies with seamless execution.
      </p>

      <a href="#" class="rbccm-gmo__card-link">Learn More</a>
    </article>

  </div>
</div>

/* --------------------------------------------------
   Block Wrapper
-------------------------------------------------- */
.rbccm-gmo {
  padding-block: 40px;
}

/* Header text */
.rbccm-gmo__title {
  font-size: 28px;
  margin-bottom: 16px;
}

.rbccm-gmo__intro {
  font-size: 18px;
  margin-bottom: 32px;
  max-width: 650px;
}

/* --------------------------------------------------
   Card Wrapper - Mobile (1 column)
-------------------------------------------------- */
.rbccm-gmo__cards {
  display: block;
}

/* Card */
.rbccm-gmo__card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: 24px;
  position: relative;
}

/* Mobile divider between stacked cards */
.rbccm-gmo__card + .rbccm-gmo__card {
  border-top: 1px solid #CED1D9;
}

/* Card Title */
.rbccm-gmo__card-title {
  font-size: 24px;
  color: #0051A5;
  margin-bottom: 16px;
}

/* Card text */
.rbccm-gmo__card-text {
  font-size: 18px;
  margin-bottom: 24px;
}

/* Link pinned to bottom */
.rbccm-gmo__card-link {
  margin-top: auto;
  color: #0051A5;
  font-weight: 500;
  text-decoration: none;
}

.rbccm-gmo__card-link:hover {
  text-decoration: underline;
}

/* --------------------------------------------------
   TABLET (768–1023)
   2 columns with 80px gap (divider centered)
-------------------------------------------------- */

@media (min-width: 768px) and (max-width: 1023px) {
  .rbccm-gmo__cards {
    display: flex;
    gap: 80px;
    padding-inline: 28px;
  }

  .rbccm-gmo__card {
    flex: 1 1 0;
    border: none;
  }

  /* Divider between col 1 and 2 */
  .rbccm-gmo__card:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 0;
    right: -40px;
    width: 1px;
    height: 100%;
    background-color: #CED1D9;
  }
}

/* --------------------------------------------------
   DESKTOP (1024+)
   3 columns with 80px gap and dividers
-------------------------------------------------- */

@media (min-width: 1024px) {
  .rbccm-gmo__cards {
    display: flex;
    gap: 80px;
    padding-inline: 28px;
  }

  .rbccm-gmo__card {
    flex: 1 1 0;
    border: none;
  }

  /* Divider between col 1 and 2, 2 and 3 */
  .rbccm-gmo__card:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 0;
    right: -40px;
    width: 1px;
    height: 100%;
    background-color: #CED1D9;
  }
}