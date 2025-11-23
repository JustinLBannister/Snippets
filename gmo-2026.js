// macro-market-sliders.js
// Requires: jQuery + Slick loaded before this file
(function ($) {
  $(function () {

    /* ============================================================
     * SHARED: custom Slick arrows (desktop + mobile)
     * ============================================================ */

    var prevArrowHtml =
      '<button type="button" class="slick-prev slick-arrow" aria-label="Previous slide">' +
        '<span class="rbccm-slider__arrow-icon rbccm-slider__arrow-icon--desktop">' +
          // DESKTOP prev SVG
          '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="23" viewBox="0 0 14 23" fill="none">' +
            '<path opacity="0.1" d="M12.1211 1.06067L2.12109 11.0607L12.1211 21.0607" stroke="black" stroke-width="3"/>' +
          '</svg>' +
        '</span>' +
        '<span class="rbccm-slider__arrow-icon rbccm-slider__arrow-icon--mobile">' +
          // MOBILE prev SVG
          '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">' +
            '<path d="M8.70557 16.4194L0.705519 8.38612L8.70557 0.35281" stroke="#0051A5" stroke-opacity="0.2"/>' +
          '</svg>' +
        '</span>' +
      '</button>';

    var nextArrowHtml =
      '<button type="button" class="slick-next slick-arrow" aria-label="Next slide">' +
        '<span class="rbccm-slider__arrow-icon rbccm-slider__arrow-icon--desktop">' +
          // DESKTOP next SVG
          '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="23" viewBox="0 0 14 23" fill="none">' +
            '<path d="M1.06055 21.0607L11.0605 11.0607L1.06055 1.06067" stroke="#0051A5" stroke-width="3"/>' +
          '</svg>' +
        '</span>' +
        '<span class="rbccm-slider__arrow-icon rbccm-slider__arrow-icon--mobile">' +
          // MOBILE next SVG
          '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">' +
            '<path d="M0.353516 0.353516L8.35356 8.35356L0.353516 16.3536" stroke="#0051A5"/>' +
          '</svg>' +
        '</span>' +
      '</button>';


    /* ============================================================
     * MACRO VIEWS SLIDER (always slick)
     * ID: #macro-views-slider
     * - Mobile-first styles are in CSS
     * - JS just fixes 6/6 -> 4/8 columns and inits Slick
     * ============================================================ */

    (function initMacroViewsSlider() {
      var $macroContainer = $('#macro-views-slider');
      if (!$macroContainer.length) return;

      // Adjust any inner rows that have two .col-sm-6.col-xs-12 children to 4/8
      $macroContainer.find('.row').each(function () {
        var $row = $(this);
        var $cols = $row.children('.col-sm-6.col-xs-12');

        if ($cols.length === 2) {
          $cols.eq(0)
            .removeClass('col-sm-6')
            .addClass('col-sm-4');

          $cols.eq(1)
            .removeClass('col-sm-6')
            .addClass('col-sm-8');
        }
      });

      // Slick is on the first row directly under the container
      var $macroRow = $macroContainer.children('.row').first();
      if (!$macroRow.length || $macroRow.hasClass('slick-initialized')) return;

      $macroRow.slick({
        dots: true,
        arrows: true,
        prevArrow: prevArrowHtml,
        nextArrow: nextArrowHtml
      });
    })();


    /* ============================================================
     * MARKET VIEWS SLIDER (mobile-first)
     * ID: #market-views-slider
     *
     * MOBILE (0–767px)  : NO slick, show 3 tiles + See all / Show fewer
     * DESKTOP (>=768px) : Slick carousel, ALL tiles visible, NO button
     * ============================================================ */

    var desktopMq = window.matchMedia('(min-width: 768px)');

    function marketViewsMobile() {
      var $section = $('#market-views-slider');
      if (!$section.length) return;

      var $row = $section.find('.row').first();
      if (!$row.length) return;

      // If slick is active, remove it for mobile
      if ($row.hasClass('slick-initialized')) {
        $row.slick('unslick');
      }

      // All tiles directly under the row
      var $tiles = $row.children('[class*="col-"]');

      // Reset visibility/classes
      $tiles
        .removeClass('market-views__extra')
        .attr('aria-hidden', 'false')
        .show();

      var $extras = $();
      if ($tiles.length > 3) {
        $extras = $tiles.slice(3)
          .addClass('market-views__extra')
          .attr('aria-hidden', 'true')
          .hide();
      }

      // If we have extras, ensure we have a "See all stories" trigger
      var $btn = $section.find('.market-views__see-all-trigger');

      if ($extras.length) {
        if (!$btn.length) {
          $btn = $('<button/>', {
            type: 'button',
            class: 'market-views__see-all-trigger',
            'aria-expanded': 'false'
          });

          $btn.on('click', function () {
            var expanded = $btn.attr('aria-expanded') === 'true';
            var $currentExtras = $row.children('.market-views__extra');

            if (!expanded) {
              $currentExtras.attr('aria-hidden', 'false').slideDown(200);
              $btn.attr('aria-expanded', 'true').addClass('is-expanded');
            } else {
              $currentExtras.attr('aria-hidden', 'true').slideUp(200);
              $btn.attr('aria-expanded', 'false').removeClass('is-expanded');
            }
          });

          $section.append($btn);
        }
      } else if ($btn.length) {
        // No extras but button exists (edge case) -> remove it
        $btn.remove();
      }
    }

    function marketViewsDesktop() {
      var $section = $('#market-views-slider');
      if (!$section.length) return;

      var $row = $section.find('.row').first();
      if (!$row.length) return;

      // Remove the mobile See all button if present
      var $btn = $section.find('.market-views__see-all-trigger');
      if ($btn.length) {
        $btn.remove();
      }

      // Show all tiles, clear mobile classes
      var $tiles = $row.children('[class*="col-"]');
      $tiles
        .removeClass('market-views__extra')
        .attr('aria-hidden', 'false')
        .show();

      // Init Slick only once
      if (!$row.hasClass('slick-initialized')) {
        $row.slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          prevArrow: prevArrowHtml,
          nextArrow: nextArrowHtml,
          responsive: [
            {
              breakpoint: 1100,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
      }
    }

    function handleMarketViewsMq(e) {
      if (e.matches) {
        // >= 768px
        marketViewsDesktop();
      } else {
        // < 768px
        marketViewsMobile();
      }
    }

    // Initial run (mobile-first)
    handleMarketViewsMq(desktopMq);

    // Listen for viewport changes
    if (typeof desktopMq.addEventListener === 'function') {
      desktopMq.addEventListener('change', handleMarketViewsMq);
    } else if (typeof desktopMq.addListener === 'function') {
      // Older browsers
      desktopMq.addListener(handleMarketViewsMq);
    }

  });
})(jQuery);