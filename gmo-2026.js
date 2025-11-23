// macro-market-sliders.js
// Requires: jQuery + Slick loaded before this file
// Mobile-first slider logic with logging
(function ($) {
  $(function () {

    var $macro = $('#macro-views-slider');
    var $market = $('#market-views-slider');

    initSlider($macro, 'macro');
    initSlider($market, 'market');

    function initSlider($container, name) {
      if (!$container.length) return;

      var $row = $container.children('.row').first();
      if (!$row.length) return;

      console.log(`[${name}] FOUND slider row`, $row);

      // "See all stories" button logic
      var $tiles = $row.children('[class*="col-"]');
      var totalSlides = $tiles.length;

      // Create a "See all" button (hidden by default)
      var $seeAll = $('<button class="slider-see-all">See all stories</button>');
      $seeAll.on('click', function () {
        console.log(`[${name}] "See all stories" CLICKED`);
        $tiles.show();
        $seeAll.hide();
      });

      $container.append($seeAll);

      function mobileInit() {
        console.log(`[${name}] MOBILE INIT`);

        // unslick if needed
        if ($row.hasClass('slick-initialized')) {
          console.log(`[${name}] unslicking main slider for mobile`);
          $row.slick('unslick');
        }

        // hide slides after #3
        if (totalSlides > 3) {
          console.log(`[${name}] hiding slides 4+ for mobile`);
          $tiles.each(function (i) {
            if (i >= 3) $(this).hide();
          });
          $seeAll.show();
        } else {
          console.log(`[${name}] < 4 slides, nothing hidden`);
          $seeAll.hide();
        }
      }

      function desktopInit() {
        console.log(`[${name}] DESKTOP INIT`);

        // show all tiles
        $tiles.show();
        $seeAll.hide();

        if ($row.hasClass('slick-initialized')) {
          console.log(`[${name}] already slick — skip init`);
          return;
        }

        console.log(`[${name}] initializing slick (desktop)`);

        $row.slick({
          arrows: true,
          dots: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1
        });
      }

      function handleResize() {
        var w = window.innerWidth;
        if (w < 768) {
          mobileInit();
        } else {
          desktopInit();
        }
      }

      // run immediately
      handleResize();

      // re-run on resize
      var resizeTimer;
      $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 150);
      });
    }
  });
})(jQuery);