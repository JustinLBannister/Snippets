<script>
// Themes Section Tabs/Accordion
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.rbccm-themes__tab');
  const panels = document.querySelectorAll('.rbccm-themes__panel');
  const panelsContainer = document.querySelector('.rbccm-themes__panels');
  const isDesktop = () => window.matchMedia('(min-width: 992px)').matches;
  let previousViewportState = isDesktop() ? 'desktop' : 'mobile';
  
  function handleTabClick(clickedTab) {
    const targetPanel = clickedTab.dataset.panel;
    
    if (isDesktop()) {
      // Desktop: tabs behavior
      tabs.forEach(tab => {
        tab.classList.remove('is-active');
        tab.setAttribute('aria-expanded', 'false');
      });
      
      panels.forEach(panel => {
        panel.classList.remove('is-active');
      });
      
      clickedTab.classList.add('is-active');
      clickedTab.setAttribute('aria-expanded', 'true');
      
      const activePanel = document.querySelector(`[data-panel="${targetPanel}"].rbccm-themes__panel`);
      if (activePanel) {
        activePanel.classList.add('is-active');
      }
    } else {
      // Mobile: accordion behavior
      const isActive = clickedTab.classList.contains('is-active');
      
      if (isActive) {
        clickedTab.classList.remove('is-active');
        clickedTab.setAttribute('aria-expanded', 'false');
      } else {
        clickedTab.classList.add('is-active');
        clickedTab.setAttribute('aria-expanded', 'true');
      }
    }
  }
  
  function reorganizeForDesktop() {
    if (isDesktop() && panelsContainer) {
      panels.forEach(panel => {
        panelsContainer.appendChild(panel);
      });
    } else {
      tabs.forEach((tab, index) => {
        if (panels[index]) {
          tab.after(panels[index]);
        }
      });
    }
  }
  
  function handleViewportChange() {
    const currentViewportState = isDesktop() ? 'desktop' : 'mobile';
    
    if (previousViewportState !== currentViewportState) {
      reorganizeForDesktop();
      
      if (currentViewportState === 'desktop') {
        const activeTabs = Array.from(tabs).filter(tab => tab.classList.contains('is-active'));
        
        tabs.forEach(tab => {
          tab.classList.remove('is-active');
          tab.setAttribute('aria-expanded', 'false');
        });
        panels.forEach(panel => {
          panel.classList.remove('is-active');
        });
        
        const tabToActivate = activeTabs.length > 0 ? activeTabs[0] : tabs[0];
        if (tabToActivate) {
          const targetPanel = tabToActivate.dataset.panel;
          tabToActivate.classList.add('is-active');
          tabToActivate.setAttribute('aria-expanded', 'true');
          
          const activePanel = document.querySelector(`[data-panel="${targetPanel}"].rbccm-themes__panel`);
          if (activePanel) {
            activePanel.classList.add('is-active');
          }
        }
      } else {
        const activeTab = document.querySelector('.rbccm-themes__tab.is-active');
        
        panels.forEach(panel => {
          panel.classList.remove('is-active');
        });
        
        if (!activeTab && tabs[0]) {
          tabs[0].classList.add('is-active');
          tabs[0].setAttribute('aria-expanded', 'true');
        }
      }
      
      previousViewportState = currentViewportState;
    }
  }
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      handleTabClick(this);
    });
  });
  
  reorganizeForDesktop();
  
  if (!document.querySelector('.rbccm-themes__tab.is-active')) {
    if (tabs[0]) {
      tabs[0].classList.add('is-active');
      tabs[0].setAttribute('aria-expanded', 'true');
      
      if (isDesktop() && panels[0]) {
        panels[0].classList.add('is-active');
      }
    }
  } else if (isDesktop()) {
    const activeTab = document.querySelector('.rbccm-themes__tab.is-active');
    if (activeTab) {
      const targetPanel = activeTab.dataset.panel;
      const activePanel = document.querySelector(`[data-panel="${targetPanel}"].rbccm-themes__panel`);
      if (activePanel) {
        activePanel.classList.add('is-active');
      }
    }
  }
  
  let resizing = false;
  window.addEventListener('resize', function() {
    if (!resizing) {
      resizing = true;
      requestAnimationFrame(function() {
        handleViewportChange();
        resizing = false;
      });
    }
  });
});

// Testimonials Slick Carousel
$(document).ready(function() {
  let textSlider, imageSlider;
  let slidersInitialized = false;
  
  function initSliders() {
    if (slidersInitialized) return;
    
    const isDesktop = $(window).width() >= 992;
    const arrowWrapper = isDesktop ? '.rbccm-testimonials__arrows-desktop' : '.rbccm-testimonials__arrows';
    
    // Initialize text slider
    textSlider = $('#testimonialTextSlider').slick({
      adaptiveHeight: true,
      asNavFor: '#testimonialImageSlider',
      autoplay: false,
      arrows: true,
      dots: true,
      fade: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: '<button type="button" class="custom-slick-prev">' +
                 '<svg width="19" height="38" viewBox="0 0 12 21" fill="none">' +
                 '<path d="M10.707 20.3535L0.707031 10.3535L10.707 0.353515" stroke="#979797"/></svg></button>',
      nextArrow: '<button type="button" class="custom-slick-next">' +
                 '<svg width="19" height="38" viewBox="0 0 12 21" fill="none">' +
                 '<path d="M0.353516 0.353516L10.3535 10.3535L0.353516 20.3535" stroke="white"/></svg></button>',
      appendArrows: $(arrowWrapper),
      appendDots: $('.rbccm-testimonials__dots')
    });
    
    // Initialize image slider
    imageSlider = $('#testimonialImageSlider').slick({
      adaptiveHeight: true,
      asNavFor: '#testimonialTextSlider',
      autoplay: false,
      arrows: false,
      dots: false,
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    
    slidersInitialized = true;
  }
  
  function destroySliders() {
    if (!slidersInitialized) return;
    
    $('#testimonialTextSlider').slick('unslick');
    $('#testimonialImageSlider').slick('unslick');
    slidersInitialized = false;
  }
  
  function handleResize() {
    const isDesktop = $(window).width() >= 992;
    
    // Save current slide index
    const currentSlide = slidersInitialized ? $('#testimonialTextSlider').slick('slickCurrentSlide') : 0;
    
    // Destroy and reinitialize sliders
    destroySliders();
    initSliders();
    
    // Restore slide position
    if (slidersInitialized && currentSlide > 0) {
      $('#testimonialTextSlider').slick('slickGoTo', currentSlide, true);
    }
  }
  
  // Initialize on load
  initSliders();
  
  // Handle resize with debounce
  let resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
  });
});

/* -----------------------------------------------------------
   Brightcove Autoloader (non-intrusive)
   Looks for containers with data-bc-* attrs and initializes
   Brightcove players without touching the rest of your code.
----------------------------------------------------------- */
(function () {
  const DEFAULTS = {
    account: '6021289101001',
    player:  'VyvCc9BZx',
    embed:   'default'
  };

  function ensureBrightcove({account, player, embed}) {
    return new Promise((resolve, reject) => {
      if (window.videojs) return resolve();

      const id = `bc-${account}-${player}-${embed}`;
      if (!document.getElementById(id)) {
        const s = document.createElement('script');
        s.id = id;
        s.async = true;
        s.src = `https://players.brightcove.net/${account}/${player}_${embed}/index.min.js`;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Failed to load Brightcove runtime'));
        (document.head || document.body).appendChild(s);
      }

      const t0 = Date.now();
      (function waitForVJS() {
        if (window.videojs) return resolve();
        if (Date.now() - t0 > 8000) return reject(new Error('Timed out waiting for Brightcove'));
        requestAnimationFrame(waitForVJS);
      })();
    });
  }

  async function initBrightcoveContainers() {
    const nodes = document.querySelectorAll('[data-bc-video-id]');
    if (!nodes.length) return;

    const a = nodes[0].getAttribute('data-bc-account') || DEFAULTS.account;
    const p = nodes[0].getAttribute('data-bc-player')  || DEFAULTS.player;
    const e = nodes[0].getAttribute('data-bc-embed')   || DEFAULTS.embed;

    try {
      await ensureBrightcove({account: a, player: p, embed: e});
    } catch (err) {
      console.error(err);
      return;
    }

    nodes.forEach((el) => {
      // Remove TinyMCE script placeholders if present
      el.querySelectorAll('img.mce-object-script, [data-mce-object="script"]').forEach(n => n.remove());

      // Avoid duplicate init
      if (el.querySelector('video-js')) return;

      const account = el.getAttribute('data-bc-account') || a;
      const player  = el.getAttribute('data-bc-player')  || p;
      const embed   = el.getAttribute('data-bc-embed')   || e;
      const videoId = el.getAttribute('data-bc-video-id');

      if (!videoId) return;

      const v = document.createElement('video-js');
      v.className = 'video-js vjs-fluid';
      v.setAttribute('data-account', account);
      v.setAttribute('data-player',  player);
      v.setAttribute('data-embed',   embed);
      v.setAttribute('data-video-id', videoId);
      v.setAttribute('controls', '');
      v.setAttribute('width', '960');
      v.setAttribute('height','540');

      const poster = el.getAttribute('data-bc-poster');
      if (poster) v.setAttribute('poster', poster);

      el.appendChild(v);
    });
  }

  // Run on DOM ready without interfering with existing listeners
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBrightcoveContainers);
  } else {
    initBrightcoveContainers();
  }
})();
</script>

<div class="rbccm-approach__video"
     data-bc-account="6021289101001"
     data-bc-player="VyvCc9BZx"
     data-bc-embed="default"
     data-bc-video-id="6374198630112">
</div>