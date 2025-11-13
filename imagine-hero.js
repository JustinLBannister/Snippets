<section class="rbccm-hero rbccm-hero--video" id="imagine-hero" aria-labelledby="rbccm-hero-title">

  <!-- Video background layer -->
  <div class="rbccm-hero__video-bg">
    <!-- JS will inject the teaser <video> here -->
    <div id="imagine-teaser-mount"></div>
  </div>

  <!-- Hero content overlay -->
  <div class="rbccm-hero__container">
    <div class="rbccm-hero__intro">
      <div class="rbccm-hero__logo">
        <img
          class="rbccm-hero__logo-image"
          src="/assets/rbccm/images/imagine/rbc-imagine.png"
          alt="RBC Imagine logo"
        >
      </div>

      <h1 id="rbccm-hero-title" class="rbccm-hero__title">Think further forward.</h1>

      <p class="rbccm-hero__desc">
        Explore how RBC Imagine helps leaders anticipate disruption and identify opportunity across sectors.
      </p>

      <div class="rbccm-hero__actions">
        <!-- Existing download button (keeps your Marketo hero modal) -->
        <a class="rbccm-hero__btn" href="#download">Download now</a>
      </div>
    </div>
  </div>
</section>

.rbccm-hero--video {
  position: relative;
  overflow: hidden;
  min-height: 300px;          /* tweak if you want it taller */
}

.rbccm-hero__video-bg {
  position: absolute;
  inset: 0;
  background: #000;
  overflow: hidden;
  z-index: 0;
}

.rbccm-hero__video-teaser {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* make sure hero content sits above the video */
.rbccm-hero__container {
  position: relative;
  z-index: 1;
}

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

      const activePanel = document.querySelector(
        `[data-panel="${targetPanel}"].rbccm-themes__panel`
      );
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
        const activeTabs = Array.from(tabs).filter(tab =>
          tab.classList.contains('is-active')
        );

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

          const activePanel = document.querySelector(
            `[data-panel="${targetPanel}"].rbccm-themes__panel`
          );
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
      const activePanel = document.querySelector(
        `[data-panel="${targetPanel}"].rbccm-themes__panel`
      );
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
    const arrowWrapper = isDesktop
      ? '.rbccm-testimonials__arrows-desktop'
      : '.rbccm-testimonials__arrows';

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
      prevArrow:
        '<button type="button" class="custom-slick-prev">' +
        '<svg width="19" height="38" viewBox="0 0 12 21" fill="none">' +
        '<path d="M10.707 20.3535L0.707031 10.3535L10.707 0.353515" stroke="#979797"/></svg></button>',
      nextArrow:
        '<button type="button" class="custom-slick-next">' +
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
    const currentSlide = slidersInitialized
      ? $('#testimonialTextSlider').slick('slickCurrentSlide')
      : 0;

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
        if (Date.now() - t0 > 8000)
          return reject(new Error('Timed out waiting for Brightcove'));
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

      // force initialization for dynamically-added players
      try {
        if (window.bc) {
          window.bc(v);
        } else if (window.videojs) {
          window.videojs(v);
        }
      } catch (e) {
        console.error('Brightcove init failed:', e);
      }
    });
  }

  // Run on DOM ready without interfering with existing listeners
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBrightcoveContainers);
  } else {
    initBrightcoveContainers();
  }
})();

/* -----------------------------------------------------------
   Marketo Imagine Subscribe Form Loader
   Step 1: Form 1232  -> basic info + business email validation
   Step 2: Form 1182  -> follow-up preferences
----------------------------------------------------------- */
(function () {
  var MARKETO = {
    baseUrl: '//discover.rbccm.com',
    munchkinId: '577-RQV-784',
    stepOneFormId: 1232,
    stepTwoFormId: 1182,
    containerSelector: '#mkto_wrap'
  };

  function loadScript(src, id) {
    return new Promise(function (resolve, reject) {
      if (id && document.getElementById(id)) {
        resolve();
        return;
      }
      var s = document.createElement('script');
      if (id) s.id = id;
      s.src = src;
      s.async = true;
      s.onload = function () { resolve(); };
      s.onerror = function () {
        console.error('Failed to load script:', src);
        reject(new Error('Failed to load ' + src));
      };
      (document.head || document.body).appendChild(s);
    });
  }

  function ensureMktoForms2() {
    return new Promise(function (resolve, reject) {
      if (window.MktoForms2) return resolve(window.MktoForms2);

      loadScript(MARKETO.baseUrl + '/js/forms2/js/forms2.min.js', 'mkto-forms2-script')
        .then(function () {
          var start = Date.now();
          (function waitForMkto() {
            if (window.MktoForms2) return resolve(window.MktoForms2);
            if (Date.now() - start > 8000) {
              return reject(new Error('Timed out waiting for MktoForms2'));
            }
            requestAnimationFrame(waitForMkto);
          })();
        })
        .catch(reject);
    });
  }

  function injectLinkedInAutofill() {
    var subContent = document.getElementById('sub-content');
    if (!subContent) return;

    var autofillDiv = document.getElementById('autofill');
    if (!autofillDiv) {
      autofillDiv = document.createElement('div');
      autofillDiv.id = 'autofill';
      subContent.appendChild(autofillDiv);
    }

    loadScript('https://www.linkedin.com/autofill/js/autofill.js', 'linkedin-autofill-js')
      .then(function () {
        var initScript = document.getElementById('linkedin-autofill-init');
        if (!initScript) {
          initScript = document.createElement('script');
          initScript.id = 'linkedin-autofill-init';
          initScript.type = 'text/javascript';
          initScript.setAttribute('data-form', 'mktoForm_' + MARKETO.stepOneFormId);
          initScript.setAttribute('data-field-firstname', 'FirstName');
          initScript.setAttribute('data-field-lastname', 'LastName');
          initScript.setAttribute('data-field-email', 'Email');
          initScript.setAttribute('data-field-company', 'Company');
          initScript.setAttribute('data-field-title', 'Title');
          autofillDiv.appendChild(initScript);
        }

        var isSafari =
          navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
          navigator.userAgent &&
          navigator.userAgent.indexOf('CriOS') === -1 &&
          navigator.userAgent.indexOf('FxiOS') === -1;

        if (isSafari) {
          autofillDiv.style.display = 'none';
        }
      })
      .catch(function (err) {
        console.error('LinkedIn Autofill load error:', err);
      });
  }

  function initMarketoForm() {
    var container = document.querySelector(MARKETO.containerSelector);
    if (!container) return; // not on this page

    ensureMktoForms2()
      .then(function (MktoForms2) {
        // STEP 1: Load form 1232
        MktoForms2.loadForm(
          MARKETO.baseUrl,
          MARKETO.munchkinId,
          MARKETO.stepOneFormId,
          function (form1) {
            // Move the generated form into #mkto_wrap (in case Marketo puts it elsewhere)
            var formEl1 = form1.getFormElem()[0];
            container.innerHTML = '';
            container.appendChild(formEl1);

            // Make width flexible
            try {
              form1.getFormElem().css('width', 'auto');
            } catch (e) {}

            // Business-email-only validation for step 1
            var invalidDomains = ['@gmail.', '@hotmail.', '@live.', '@aol.', '@outlook.'];

            function isBusinessEmail(email) {
              for (var i = 0; i < invalidDomains.length; i++) {
                if (email.indexOf(invalidDomains[i]) !== -1) {
                  return false;
                }
              }
              return true;
            }

            form1.onValidate(function () {
              var vals = form1.vals();
              var email = vals.Email;

              if (email && !isBusinessEmail(email)) {
                form1.submitable(false);
                var emailElem = form1.getFormElem().find('#Email');
                form1.showErrorMessage('Must be Business email.', emailElem);
              } else {
                form1.submitable(true);
              }
            });

            // On success of step 1:
            //  - update heading to "Thank you!"
            //  - load form 1182 into #mkto_wrap
            form1.onSuccess(function (vals, thankYouURL) {
              var email = vals.Email;

              // Update copy
              var subPre = document.getElementById('sub-pre');
              if (subPre) {
                subPre.innerHTML =
                  '<h2 style="margin-top: 0;">Thank you!</h2>' +
                  '<p style="color: #002144;">We\'ll send you an email with a link to download your ' +
                  'RBC Imagine&trade; <strong>Preparing for Hyperdrive</strong> report.</p>';
              }

              // Clear first form and load step 2 (1182)
              container.innerHTML = '';

              MktoForms2.loadForm(
                MARKETO.baseUrl,
                MARKETO.munchkinId,
                MARKETO.stepTwoFormId,
                function (form2) {
                  var formEl2 = form2.getFormElem()[0];
                  container.appendChild(formEl2);

                  try {
                    form2.getFormElem().css('width', 'auto');
                  } catch (e) {}

                  // Pass email from step 1 into hidden field on step 2
                  if (email) {
                    form2.addHiddenFields({
                      Email: email
                    });
                  }

                  // Final success for step 2: stay on page, do nothing fancy
                  form2.onSuccess(function (vals2, thankYou2) {
                    // If you want to clear mkto_wrap at the very end:
                    // container.innerHTML = '';
                    return false;
                  });
                }
              );

              // Do NOT go to Marketo thank-you URL
              return false;
            });

            // Wire LinkedIn autofill to step 1
            injectLinkedInAutofill();
          }
        );
      })
      .catch(function (err) {
        console.error('Marketo init error:', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMarketoForm);
  } else {
    initMarketoForm();
  }
})();

/* -----------------------------------------------------------
   HERO DOWNLOAD MODAL + MARKETO 1225
----------------------------------------------------------- */
(function ($) {
  var MARKETO = {
    baseUrl: '//discover.rbccm.com',
    munchkinId: '577-RQV-784',
    formId: 1225
  };

  function loadMktoScript() {
    return new Promise(function (resolve, reject) {
      if (window.MktoForms2) return resolve();

      var s = document.createElement('script');
      s.src = MARKETO.baseUrl + '/js/forms2/js/forms2.min.js';
      s.async = true;

      s.onload = function () {
        var start = Date.now();
        (function check() {
          if (window.MktoForms2) return resolve();
          if (Date.now() - start > 8000)
            return reject(new Error('MktoForms2 load timeout'));
          requestAnimationFrame(check);
        })();
      };

      s.onerror = () => reject(new Error('Failed to load Mkto script'));
      document.head.appendChild(s);
    });
  }

  function businessEmailCheck(form) {
    var invalid = ['@gmail.', '@hotmail.', '@live.', '@aol.', '@outlook.'];

    form.onValidate(function () {
      var email = form.vals().Email;
      if (!email) return;

      var bad = invalid.some(function (d) {
        return email.indexOf(d) !== -1;
      });

      if (bad) {
        form.submitable(false);
        var emailElem = form.getFormElem().find('#Email');
        form.showErrorMessage('Must be Business email.', emailElem);
      } else {
        form.submitable(true);
      }
    });
  }

  function injectSuccessModal() {
    return `
<div class="modal-content">
  <div>
    <div class="modal-header" style="border: none;border-top: 8px #FBDE00 solid;padding: 0;height: 0;">
      <button class="close"
              style="font-size: 41px;color: #595959;font-weight: normal;position: absolute;top: 0;right: 0;z-index: 100;"
              type="button" data-dismiss="modal">×</button>
    </div>

    <div class="modal-body" style="padding: 0;background: #11223E;">
      <div class="row row-no-gutters">

        <div class="col-md-7">
          <div class="dark"
               style="background: #11223E; color: #fff; height: 600px; padding: 60px;">
            <div style="margin-bottom: 70px;">
              <img src="/assets/rbccm/images/imagine/rbc-imagine.png"
                   alt="RBC Imagine" style="width: 123px;">
            </div>

            <h2 style="color: #fff; font-size: 42px;">Thank you!</h2>

            <p style="color: #fff;font-size: 24px;">
              We'll send you an email with a link to download your RBC Imagine™
              <span style="color: #FBDE00;">Preparing for Hyperdrive</span> report.
            </p>

            <p style="margin-top: 70px;">
              <a class="modal-close-link" href="#" type="button" data-dismiss="modal">
                Close window
              </a>
            </p>
          </div>
        </div>

        <div class="col-md-5">
          <div class="img-stretch"
               style="height: 600px;
                      background-image: url('/assets/rbccm/images/imagine/confirmation-bg.jpg');
                      background-color: #000;"></div>
        </div>

      </div>
    </div>
  </div>
</div>`;
  }

  function initDownloadModal() {
    var $modal = $('#download');
    var formLoaded = false;

    $(document).on('click', '.rbccm-hero__btn[href="#download"]', function (e) {
      e.preventDefault();
      $modal.modal('show');

      if (formLoaded) return;
      formLoaded = true;

      loadMktoScript().then(function () {
        var container = document.getElementById('download-form-container');

        // Create empty form shell Marketo will populate
        var formShell = document.createElement('form');
        formShell.id = 'mktoForm_' + MARKETO.formId;
        container.appendChild(formShell);

        MktoForms2.loadForm(
          MARKETO.baseUrl,
          MARKETO.munchkinId,
          MARKETO.formId,
          function (form) {
            businessEmailCheck(form);

            form.onSuccess(function () {
              var html = injectSuccessModal();
              $modal.find('.modal-content').replaceWith(html);
              return false;
            });
          }
        );
      });
    });
  }

  $(initDownloadModal);

})(jQuery);

/* -----------------------------------------------------------
   IMAGINE HERO BACKGROUND VIDEO (TEASER ONLY)
   - Injects a looping, muted teaser into #imagine-teaser-mount
----------------------------------------------------------- */
(function () {
  function initImagineHeroTeaser() {
    var hero        = document.getElementById('imagine-hero');
    var teaserMount = document.getElementById('imagine-teaser-mount');

    if (!hero || !teaserMount) return;

    // Avoid double-injecting
    if (teaserMount.querySelector('video')) return;

    var video = document.createElement('video');
    video.id = 'imagine-teaser-video';
    video.className = 'rbccm-hero__video-teaser';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true; // iOS/Safari-friendly

    var source = document.createElement('source');
    source.src = '/assets/rbccm/images/imagine-images/imagine-2025-tall-hero-clean.mp4';
    source.type = 'video/mp4';

    video.appendChild(source);
    teaserMount.appendChild(video);

    // Best-effort autoplay, ignore failures
    video.play().catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImagineHeroTeaser);
  } else {
    initImagineHeroTeaser();
  }
})();




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

      const activePanel = document.querySelector(
        `[data-panel="${targetPanel}"].rbccm-themes__panel`
      );
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
        const activeTabs = Array.from(tabs).filter(tab =>
          tab.classList.contains('is-active')
        );

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

          const activePanel = document.querySelector(
            `[data-panel="${targetPanel}"].rbccm-themes__panel`
          );
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
      const activePanel = document.querySelector(
        `[data-panel="${targetPanel}"].rbccm-themes__panel`
      );
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
    const arrowWrapper = isDesktop
      ? '.rbccm-testimonials__arrows-desktop'
      : '.rbccm-testimonials__arrows';

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
      prevArrow:
        '<button type="button" class="custom-slick-prev">' +
        '<svg width="19" height="38" viewBox="0 0 12 21" fill="none">' +
        '<path d="M10.707 20.3535L0.707031 10.3535L10.707 0.353515" stroke="#979797"/></svg></button>',
      nextArrow:
        '<button type="button" class="custom-slick-next">' +
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
    const currentSlide = slidersInitialized
      ? $('#testimonialTextSlider').slick('slickCurrentSlide')
      : 0;

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
        if (Date.now() - t0 > 8000)
          return reject(new Error('Timed out waiting for Brightcove'));
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

      // force initialization for dynamically-added players
      try {
        if (window.bc) {
          window.bc(v);
        } else if (window.videojs) {
          window.videojs(v);
        }
      } catch (e) {
        console.error('Brightcove init failed:', e);
      }
    });
  }

  // Run on DOM ready without interfering with existing listeners
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBrightcoveContainers);
  } else {
    initBrightcoveContainers();
  }
})();

/* -----------------------------------------------------------
   Marketo Imagine Subscribe Form Loader
   Step 1: Form 1232  -> basic info + business email validation
   Step 2: Form 1182  -> follow-up preferences
----------------------------------------------------------- */
(function () {
  var MARKETO = {
    baseUrl: '//discover.rbccm.com',
    munchkinId: '577-RQV-784',
    stepOneFormId: 1232,
    stepTwoFormId: 1182,
    containerSelector: '#mkto_wrap'
  };

  function loadScript(src, id) {
    return new Promise(function (resolve, reject) {
      if (id && document.getElementById(id)) {
        resolve();
        return;
      }
      var s = document.createElement('script');
      if (id) s.id = id;
      s.src = src;
      s.async = true;
      s.onload = function () { resolve(); };
      s.onerror = function () {
        console.error('Failed to load script:', src);
        reject(new Error('Failed to load ' + src));
      };
      (document.head || document.body).appendChild(s);
    });
  }

  function ensureMktoForms2() {
    return new Promise(function (resolve, reject) {
      if (window.MktoForms2) return resolve(window.MktoForms2);

      loadScript(MARKETO.baseUrl + '/js/forms2/js/forms2.min.js', 'mkto-forms2-script')
        .then(function () {
          var start = Date.now();
          (function waitForMkto() {
            if (window.MktoForms2) return resolve(window.MktoForms2);
            if (Date.now() - start > 8000) {
              return reject(new Error('Timed out waiting for MktoForms2'));
            }
            requestAnimationFrame(waitForMkto);
          })();
        })
        .catch(reject);
    });
  }

  function injectLinkedInAutofill() {
    var subContent = document.getElementById('sub-content');
    if (!subContent) return;

    var autofillDiv = document.getElementById('autofill');
    if (!autofillDiv) {
      autofillDiv = document.createElement('div');
      autofillDiv.id = 'autofill';
      subContent.appendChild(autofillDiv);
    }

    loadScript('https://www.linkedin.com/autofill/js/autofill.js', 'linkedin-autofill-js')
      .then(function () {
        var initScript = document.getElementById('linkedin-autofill-init');
        if (!initScript) {
          initScript = document.createElement('script');
          initScript.id = 'linkedin-autofill-init';
          initScript.type = 'text/javascript';
          initScript.setAttribute('data-form', 'mktoForm_' + MARKETO.stepOneFormId);
          initScript.setAttribute('data-field-firstname', 'FirstName');
          initScript.setAttribute('data-field-lastname', 'LastName');
          initScript.setAttribute('data-field-email', 'Email');
          initScript.setAttribute('data-field-company', 'Company');
          initScript.setAttribute('data-field-title', 'Title');
          autofillDiv.appendChild(initScript);
        }

        var isSafari =
          navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
          navigator.userAgent &&
          navigator.userAgent.indexOf('CriOS') === -1 &&
          navigator.userAgent.indexOf('FxiOS') === -1;

        if (isSafari) {
          autofillDiv.style.display = 'none';
        }
      })
      .catch(function (err) {
        console.error('LinkedIn Autofill load error:', err);
      });
  }

  function initMarketoForm() {
    var container = document.querySelector(MARKETO.containerSelector);
    if (!container) return; // not on this page

    ensureMktoForms2()
      .then(function (MktoForms2) {
        // STEP 1: Load form 1232
        MktoForms2.loadForm(
          MARKETO.baseUrl,
          MARKETO.munchkinId,
          MARKETO.stepOneFormId,
          function (form1) {
            // Move the generated form into #mkto_wrap (in case Marketo puts it elsewhere)
            var formEl1 = form1.getFormElem()[0];
            container.innerHTML = '';
            container.appendChild(formEl1);

            // Make width flexible
            try {
              form1.getFormElem().css('width', 'auto');
            } catch (e) {}

            // Business-email-only validation for step 1
            var invalidDomains = ['@gmail.', '@hotmail.', '@live.', '@aol.', '@outlook.'];

            function isBusinessEmail(email) {
              for (var i = 0; i < invalidDomains.length; i++) {
                if (email.indexOf(invalidDomains[i]) !== -1) {
                  return false;
                }
              }
              return true;
            }

            form1.onValidate(function () {
              var vals = form1.vals();
              var email = vals.Email;

              if (email && !isBusinessEmail(email)) {
                form1.submitable(false);
                var emailElem = form1.getFormElem().find('#Email');
                form1.showErrorMessage('Must be Business email.', emailElem);
              } else {
                form1.submitable(true);
              }
            });

            // On success of step 1:
            //  - update heading to "Thank you!"
            //  - load form 1182 into #mkto_wrap
            form1.onSuccess(function (vals, thankYouURL) {
              var email = vals.Email;

              // Update copy
              var subPre = document.getElementById('sub-pre');
              if (subPre) {
                subPre.innerHTML =
                  '<h2 style="margin-top: 0;">Thank you!</h2>' +
                  '<p style="color: #002144;">We\'ll send you an email with a link to download your ' +
                  'RBC Imagine&trade; <strong>Preparing for Hyperdrive</strong> report.</p>';
              }

              // Clear first form and load step 2 (1182)
              container.innerHTML = '';

              MktoForms2.loadForm(
                MARKETO.baseUrl,
                MARKETO.munchkinId,
                MARKETO.stepTwoFormId,
                function (form2) {
                  var formEl2 = form2.getFormElem()[0];
                  container.appendChild(formEl2);

                  try {
                    form2.getFormElem().css('width', 'auto');
                  } catch (e) {}

                  // Pass email from step 1 into hidden field on step 2
                  if (email) {
                    form2.addHiddenFields({
                      Email: email
                    });
                  }

                  // Final success for step 2: stay on page, do nothing fancy
                  form2.onSuccess(function (vals2, thankYou2) {
                    // If you want to clear mkto_wrap at the very end:
                    // container.innerHTML = '';
                    return false;
                  });
                }
              );

              // Do NOT go to Marketo thank-you URL
              return false;
            });

            // Wire LinkedIn autofill to step 1
            injectLinkedInAutofill();
          }
        );
      })
      .catch(function (err) {
        console.error('Marketo init error:', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMarketoForm);
  } else {
    initMarketoForm();
  }
})();

/* -----------------------------------------------------------
   HERO DOWNLOAD MODAL + MARKETO 1225
----------------------------------------------------------- */
(function ($) {
  var MARKETO = {
    baseUrl: '//discover.rbccm.com',
    munchkinId: '577-RQV-784',
    formId: 1225
  };

  function loadMktoScript() {
    return new Promise(function (resolve, reject) {
      if (window.MktoForms2) return resolve();

      var s = document.createElement('script');
      s.src = MARKETO.baseUrl + '/js/forms2/js/forms2.min.js';
      s.async = true;

      s.onload = function () {
        var start = Date.now();
        (function check() {
          if (window.MktoForms2) return resolve();
          if (Date.now() - start > 8000)
            return reject(new Error('MktoForms2 load timeout'));
          requestAnimationFrame(check);
        })();
      };

      s.onerror = () => reject(new Error('Failed to load Mkto script'));
      document.head.appendChild(s);
    });
  }

  function businessEmailCheck(form) {
    var invalid = ['@gmail.', '@hotmail.', '@live.', '@aol.', '@outlook.'];

    form.onValidate(function () {
      var email = form.vals().Email;
      if (!email) return;

      var bad = invalid.some(function (d) {
        return email.indexOf(d) !== -1;
      });

      if (bad) {
        form.submitable(false);
        var emailElem = form.getFormElem().find('#Email');
        form.showErrorMessage('Must be Business email.', emailElem);
      } else {
        form.submitable(true);
      }
    });
  }

  function injectSuccessModal() {
    return `
<div class="modal-content">
  <div>
    <div class="modal-header" style="border: none;border-top: 8px #FBDE00 solid;padding: 0;height: 0;">
      <button class="close"
              style="font-size: 41px;color: #595959;font-weight: normal;position: absolute;top: 0;right: 0;z-index: 100;"
              type="button" data-dismiss="modal">×</button>
    </div>

    <div class="modal-body" style="padding: 0;background: #11223E;">
      <div class="row row-no-gutters">

        <div class="col-md-7">
          <div class="dark"
               style="background: #11223E; color: #fff; height: 600px; padding: 60px;">
            <div style="margin-bottom: 70px;">
              <img src="/assets/rbccm/images/imagine/rbc-imagine.png"
                   alt="RBC Imagine" style="width: 123px;">
            </div>

            <h2 style="color: #fff; font-size: 42px;">Thank you!</h2>

            <p style="color: #fff;font-size: 24px;">
              We'll send you an email with a link to download your RBC Imagine™
              <span style="color: #FBDE00;">Preparing for Hyperdrive</span> report.
            </p>

            <p style="margin-top: 70px;">
              <a class="modal-close-link" href="#" type="button" data-dismiss="modal">
                Close window
              </a>
            </p>
          </div>
        </div>

        <div class="col-md-5">
          <div class="img-stretch"
               style="height: 600px;
                      background-image: url('/assets/rbccm/images/imagine/confirmation-bg.jpg');
                      background-color: #000;"></div>
        </div>

      </div>
    </div>
  </div>
</div>`;
  }

  function initDownloadModal() {
    var $modal = $('#download');
    var formLoaded = false;

    $(document).on('click', '.rbccm-hero__btn[href="#download"]', function (e) {
      e.preventDefault();
      $modal.modal('show');

      if (formLoaded) return;
      formLoaded = true;

      loadMktoScript().then(function () {
        var container = document.getElementById('download-form-container');

        // Create empty form shell Marketo will populate
        var formShell = document.createElement('form');
        formShell.id = 'mktoForm_' + MARKETO.formId;
        container.appendChild(formShell);

        MktoForms2.loadForm(
          MARKETO.baseUrl,
          MARKETO.munchkinId,
          MARKETO.formId,
          function (form) {
            businessEmailCheck(form);

            form.onSuccess(function () {
              var html = injectSuccessModal();
              $modal.find('.modal-content').replaceWith(html);
              return false;
            });
          }
        );
      });
    });
  }

  $(initDownloadModal);

})(jQuery);

/* -----------------------------------------------------------
   IMAGINE HERO BACKGROUND VIDEO (TEASER ONLY)
   - Injects a looping, muted teaser into #imagine-teaser-mount
----------------------------------------------------------- */
(function () {
  function initImagineHeroTeaser() {
    var hero        = document.getElementById('imagine-hero');
    var teaserMount = document.getElementById('imagine-teaser-mount');

    if (!hero || !teaserMount) return;

    // Avoid double-injecting
    if (teaserMount.querySelector('video')) return;

    var video = document.createElement('video');
    video.id = 'imagine-teaser-video';
    video.className = 'rbccm-hero__video-teaser';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true; // iOS/Safari-friendly

    var source = document.createElement('source');
    source.src = '/assets/rbccm/images/imagine-images/imagine-2025-tall-hero-clean.mp4';
    source.type = 'video/mp4';

    video.appendChild(source);
    teaserMount.appendChild(video);

    // Best-effort autoplay, ignore failures
    video.play().catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImagineHeroTeaser);
  } else {
    initImagineHeroTeaser();
  }
})();