/* =========================================
   RBC Imagine - JS
   - Themes tabs/accordion
   - Testimonials Slick carousel
   - Brightcove autoloader
   - Marketo multi-step forms
   - Hero download modal (with jump fix)
   - Hero background teaser video (with fade)
   ========================================= */

/* -----------------------------------------------------------
   Themes Section Tabs/Accordion
----------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('.rbccm-themes__tab');
  var panels = document.querySelectorAll('.rbccm-themes__panel');
  var panelsContainer = document.querySelector('.rbccm-themes__panels');

  if (!tabs.length || !panels.length) {
    return;
  }

  function isDesktop() {
    return window.matchMedia('(min-width: 992px)').matches;
  }

  var previousViewportState = isDesktop() ? 'desktop' : 'mobile';

  function handleTabClick(clickedTab) {
    var targetPanel = clickedTab.getAttribute('data-panel');

    if (isDesktop()) {
      // Desktop: classic tab behavior
      tabs.forEach(function (tab) {
        tab.classList.remove('is-active');
        tab.setAttribute('aria-expanded', 'false');
      });

      panels.forEach(function (panel) {
        panel.classList.remove('is-active');
      });

      clickedTab.classList.add('is-active');
      clickedTab.setAttribute('aria-expanded', 'true');

      var activePanel = document.querySelector(
        '[data-panel="' + targetPanel + '"].rbccm-themes__panel'
      );
      if (activePanel) {
        activePanel.classList.add('is-active');
      }
    } else {
      // Mobile: accordion behavior
      var isActive = clickedTab.classList.contains('is-active');

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
      panels.forEach(function (panel) {
        panelsContainer.appendChild(panel);
      });
    } else {
      tabs.forEach(function (tab, index) {
        if (panels[index]) {
          tab.after(panels[index]);
        }
      });
    }
  }

  function setDesktopDefaultState() {
    // Clear everything
    tabs.forEach(function (tab) {
      tab.classList.remove('is-active');
      tab.setAttribute('aria-expanded', 'false');
    });
    panels.forEach(function (panel) {
      panel.classList.remove('is-active');
    });

    // Activate first tab + first panel only
    var firstTab = tabs[0];
    var firstPanel = panels[0];
    if (firstTab && firstPanel) {
      firstTab.classList.add('is-active');
      firstTab.setAttribute('aria-expanded', 'true');
      firstPanel.classList.add('is-active');
    }
  }

  function setMobileDefaultState() {
    // Mobile: all tabs/panels inactive by default
    tabs.forEach(function (tab) {
      tab.classList.remove('is-active');
      tab.setAttribute('aria-expanded', 'false');
    });
    panels.forEach(function (panel) {
      panel.classList.remove('is-active');
    });
  }

  function handleViewportChange() {
    var currentViewportState = isDesktop() ? 'desktop' : 'mobile';

    if (previousViewportState === currentViewportState) {
      return;
    }

    reorganizeForDesktop();

    if (currentViewportState === 'desktop') {
      // Desktop: ensure we have exactly one active (first)
      setDesktopDefaultState();
    } else {
      // Mobile: everything collapsed
      setMobileDefaultState();
    }

    previousViewportState = currentViewportState;
  }

  // Bind clicks
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      handleTabClick(this);
    });
  });

  // Initial layout/state
  reorganizeForDesktop();
  if (isDesktop()) {
    setDesktopDefaultState();
  } else {
    setMobileDefaultState();
  }

  // Resize handler
  var resizing = false;
  window.addEventListener('resize', function () {
    if (resizing) return;
    resizing = true;
    requestAnimationFrame(function () {
      handleViewportChange();
      resizing = false;
    });
  });
});

/* -----------------------------------------------------------
   Testimonials Slick Carousel
----------------------------------------------------------- */
$(document).ready(function () {
  var slidersInitialized = false;

  function initSliders() {
    if (slidersInitialized) return;

    var isDesktop = $(window).width() >= 992;
    var arrowWrapper = isDesktop
      ? '.rbccm-testimonials__arrows-desktop'
      : '.rbccm-testimonials__arrows';

    // Text slider
    $('#testimonialTextSlider').slick({
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

    // Image slider
    $('#testimonialImageSlider').slick({
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
    var currentSlide = slidersInitialized
      ? $('#testimonialTextSlider').slick('slickCurrentSlide')
      : 0;

    destroySliders();
    initSliders();

    if (slidersInitialized && currentSlide > 0) {
      $('#testimonialTextSlider').slick('slickGoTo', currentSlide, true);
    }
  }

  initSliders();

  var resizeTimer;
  $(window).on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
  });
});

/* -----------------------------------------------------------
   Brightcove Autoloader (non-intrusive)
   Looks for containers with data-bc-* attrs and initializes
   Brightcove players without touching the rest of the code.
----------------------------------------------------------- */
(function () {
  var DEFAULTS = {
    account: '6021289101001',
    player: 'VyvCc9BZx',
    embed: 'default'
  };

  function ensureBrightcove(opts) {
    var account = opts.account;
    var player = opts.player;
    var embed = opts.embed;

    return new Promise(function (resolve, reject) {
      if (window.videojs) return resolve();

      var id = 'bc-' + account + '-' + player + '-' + embed;
      if (!document.getElementById(id)) {
        var s = document.createElement('script');
        s.id = id;
        s.async = true;
        s.src =
          'https://players.brightcove.net/' +
          account +
          '/' +
          player +
          '_' +
          embed +
          '/index.min.js';
        s.onload = function () {
          resolve();
        };
        s.onerror = function () {
          reject(new Error('Failed to load Brightcove runtime'));
        };
        (document.head || document.body).appendChild(s);
      }

      var t0 = Date.now();
      (function waitForVJS() {
        if (window.videojs) return resolve();
        if (Date.now() - t0 > 8000) {
          return reject(new Error('Timed out waiting for Brightcove'));
        }
        requestAnimationFrame(waitForVJS);
      })();
    });
  }

  function initBrightcoveContainers() {
    var nodes = document.querySelectorAll('[data-bc-video-id]');
    if (!nodes.length) return;

    var a = nodes[0].getAttribute('data-bc-account') || DEFAULTS.account;
    var p = nodes[0].getAttribute('data-bc-player') || DEFAULTS.player;
    var e = nodes[0].getAttribute('data-bc-embed') || DEFAULTS.embed;

    ensureBrightcove({ account: a, player: p, embed: e })
      .then(function () {
        nodes.forEach(function (el) {
          // Remove TinyMCE script placeholders if present
          el.querySelectorAll(
            'img.mce-object-script, [data-mce-object="script"]'
          ).forEach(function (n) {
            n.remove();
          });

          // Avoid duplicate init
          if (el.querySelector('video-js')) return;

          var account =
            el.getAttribute('data-bc-account') || a;
          var player =
            el.getAttribute('data-bc-player') || p;
          var embed =
            el.getAttribute('data-bc-embed') || e;
          var videoId = el.getAttribute('data-bc-video-id');

          if (!videoId) return;

          var v = document.createElement('video-js');
          v.className = 'video-js vjs-fluid';
          v.setAttribute('data-account', account);
          v.setAttribute('data-player', player);
          v.setAttribute('data-embed', embed);
          v.setAttribute('data-video-id', videoId);
          v.setAttribute('controls', '');
          v.setAttribute('width', '960');
          v.setAttribute('height', '540');

          var poster = el.getAttribute('data-bc-poster');
          if (poster) v.setAttribute('poster', poster);

          el.appendChild(v);

          try {
            if (window.bc) {
              window.bc(v);
            } else if (window.videojs) {
              window.videojs(v);
            }
          } catch (err) {
            console.error('Brightcove init failed:', err);
          }
        });
      })
      .catch(function (err) {
        console.error(err);
      });
  }

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
      s.onload = function () {
        resolve();
      };
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

      loadScript(
        MARKETO.baseUrl + '/js/forms2/js/forms2.min.js',
        'mkto-forms2-script'
      )
        .then(function () {
          var start = Date.now();
          (function waitForMkto() {
            if (window.MktoForms2) {
              return resolve(window.MktoForms2);
            }
            if (Date.now() - start > 8000) {
              return reject(
                new Error('Timed out waiting for MktoForms2')
              );
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

    loadScript(
      'https://www.linkedin.com/autofill/js/autofill.js',
      'linkedin-autofill-js'
    )
      .then(function () {
        var initScript = document.getElementById('linkedin-autofill-init');
        if (!initScript) {
          initScript = document.createElement('script');
          initScript.id = 'linkedin-autofill-init';
          initScript.type = 'text/javascript';
          initScript.setAttribute(
            'data-form',
            'mktoForm_' + MARKETO.stepOneFormId
          );
          initScript.setAttribute(
            'data-field-firstname',
            'FirstName'
          );
          initScript.setAttribute(
            'data-field-lastname',
            'LastName'
          );
          initScript.setAttribute('data-field-email', 'Email');
          initScript.setAttribute('data-field-company', 'Company');
          initScript.setAttribute('data-field-title', 'Title');
          autofillDiv.appendChild(initScript);
        }

        var isSafari =
          navigator.vendor &&
          navigator.vendor.indexOf('Apple') > -1 &&
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
    if (!container) return;

    ensureMktoForms2()
      .then(function (MktoForms2) {
        MktoForms2.loadForm(
          MARKETO.baseUrl,
          MARKETO.munchkinId,
          MARKETO.stepOneFormId,
          function (form1) {
            var formEl1 = form1.getFormElem()[0];
            container.innerHTML = '';
            container.appendChild(formEl1);

            try {
              form1.getFormElem().css('width', 'auto');
            } catch (e) {}

            var invalidDomains = [
              '@gmail.',
              '@hotmail.',
              '@live.',
              '@aol.',
              '@outlook.'
            ];

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
                var emailElem =
                  form1.getFormElem().find('#Email');
                form1.showErrorMessage(
                  'Must be Business email.',
                  emailElem
                );
              } else {
                form1.submitable(true);
              }
            });

            form1.onSuccess(function (vals) {
              var email = vals.Email;

              var subPre = document.getElementById('sub-pre');
              if (subPre) {
                subPre.innerHTML =
                  '<h2 style="margin-top: 0;">Thank you!</h2>' +
                  "<p style=\"color: #002144;\">We'll send you an email with a link to download your " +
                  'RBC Imagine&trade; <strong>Preparing for Hyperdrive</strong> report.</p>';
              }

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
                  } catch (e2) {}

                  if (email) {
                    form2.addHiddenFields({
                      Email: email
                    });
                  }

                  form2.onSuccess(function () {
                    return false;
                  });
                }
              );

              return false;
            });

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
   - Adds a small "no 19px jump" fix for the hero area
----------------------------------------------------------- */
(function ($) {
  var MARKETO = {
    baseUrl: '//discover.rbccm.com',
    munchkinId: '577-RQV-784',
    formId: 1225
  };

  function businessEmailCheck(form) {
    var invalid = [
      '@gmail.',
      '@hotmail.',
      '@live.',
      '@aol.',
      '@outlook.'
    ];

    form.onValidate(function () {
      var email = form.vals().Email;
      if (!email) return;

      var bad = invalid.some(function (d) {
        return email.indexOf(d) !== -1;
      });

      if (bad) {
        form.submitable(false);
        var emailElem = form.getFormElem().find('#Email');
        form.showErrorMessage(
          'Must be Business email.',
          emailElem
        );
      } else {
        form.submitable(true);
      }
    });
  }

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
          if (Date.now() - start > 8000) {
            return reject(
              new Error('MktoForms2 load timeout')
            );
          }
          requestAnimationFrame(check);
        })();
      };

      s.onerror = function () {
        reject(new Error('Failed to load Mkto script'));
      };
      document.head.appendChild(s);
    });
  }

  function injectSuccessModal() {
    return (
      '<div class="modal-content">' +
      '<div>' +
      '<div class="modal-header" style="border: none;border-top: 8px #FBDE00 solid;padding: 0;height: 0;">' +
      '<button class="close" ' +
      'style="font-size: 41px;color: #595959;font-weight: normal;position: absolute;top: 0;right: 0;z-index: 100;" ' +
      'type="button" data-dismiss="modal">\u00D7</button>' +
      '</div>' +
      '<div class="modal-body" style="padding: 0;background: #11223E;">' +
      '<div class="row row-no-gutters">' +
      '<div class="col-md-7">' +
      '<div class="dark" ' +
      'style="background: #11223E; color: #fff; height: 600px; padding: 60px;">' +
      '<div style="margin-bottom: 70px;">' +
      '<img src="/assets/rbccm/images/imagine/rbc-imagine.png" ' +
      'alt="RBC Imagine" style="width: 123px;">' +
      '</div>' +
      '<h2 style="color: #fff; font-size: 42px;">Thank you!</h2>' +
      '<p style="color: #fff;font-size: 24px;">' +
      "We'll send you an email with a link to download your RBC Imagine\u2122 " +
      '<span style="color: #FBDE00;">Preparing for Hyperdrive</span> report.' +
      '</p>' +
      '<p style="margin-top: 70px;">' +
      '<a class="modal-close-link" href="#" type="button" data-dismiss="modal">' +
      'Close window' +
      '</a>' +
      '</p>' +
      '</div>' +
      '</div>' +
      '<div class="col-md-5">' +
      '<div class="img-stretch" ' +
      "style=\"height: 600px; background-image: url('/assets/rbccm/images/imagine/confirmation-bg.jpg'); background-color: #000;\"></div>" +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  // Small helper: counteract body padding on hero to avoid visible "jump"
  function applyHeroShiftFix() {
    var body = document.body;
    var hero = document.getElementById('imagine-hero');
    if (!body || !hero) return;

    var pr = window.getComputedStyle(body).paddingRight || '0';
    var value = parseFloat(pr) || 0;
    hero.dataset.prevMarginRight = hero.style.marginRight || '';
    if (value > 0) {
      hero.style.marginRight = '-' + value + 'px';
    }
  }

  function clearHeroShiftFix() {
    var hero = document.getElementById('imagine-hero');
    if (!hero) return;
    if (hero.dataset.prevMarginRight !== undefined) {
      hero.style.marginRight = hero.dataset.prevMarginRight;
      delete hero.dataset.prevMarginRight;
    } else {
      hero.style.marginRight = '';
    }
  }

  function initDownloadModal() {
    var $modal = $('#download');
    var formLoaded = false;

    // Attach once: keep hero visually steady while modal is open
    $modal.on('shown.bs.modal', function () {
      applyHeroShiftFix();
    });
    $modal.on('hidden.bs.modal', function () {
      clearHeroShiftFix();
    });

    $(document).on(
      'click',
      '.rbccm-hero__btn[href="#download"]',
      function (e) {
        e.preventDefault();
        $modal.modal('show');

        if (formLoaded) return;
        formLoaded = true;

        loadMktoScript().then(function () {
          var container = document.getElementById(
            'download-form-container'
          );

          if (!container) return;

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
      }
    );
  }

  $(initDownloadModal);
})(jQuery);

/* -----------------------------------------------------------
   IMAGINE HERO BACKGROUND VIDEO (TEASER ONLY)
   - Injects teaser into #imagine-teaser-mount
   - Optional pauseAfterSeconds (set number or null)
   - Fades out .rbccm-hero__video-bg so CSS hero bg shows
----------------------------------------------------------- */
(function () {
  var HERO_VIDEO_CONFIG = {
    // Set to a number (e.g., 6) to stop early,
    // or null to fade when the video naturally ends.
    pauseAfterSeconds: null
  };

  function fadeOutVideoBg(videoBg, video) {
    if (!videoBg) return;

    // Prepare transition
    if (!videoBg.style.transition) {
      videoBg.style.transition = 'opacity 800ms ease';
    }
    if (video) {
      try {
        video.pause();
      } catch (e) {}
    }

    // Fade to transparent so underlying CSS background shows
    requestAnimationFrame(function () {
      videoBg.style.opacity = '0';
    });
  }

  function initImagineHeroTeaser() {
    var hero = document.getElementById('imagine-hero');
    var teaserMount = document.getElementById('imagine-teaser-mount');

    if (!hero || !teaserMount) return;

    // The wrapper that sits over the CSS background
    var videoBg = hero.querySelector('.rbccm-hero__video-bg');
    if (videoBg) {
      videoBg.style.opacity = '1';
      if (!videoBg.style.position) {
        videoBg.style.position = 'absolute';
        videoBg.style.inset = '0';
        videoBg.style.overflow = 'hidden';
      }
    }

    // Avoid double-injecting
    if (teaserMount.querySelector('video')) return;

    var video = document.createElement('video');
    video.id = 'imagine-teaser-video';
    video.className = 'rbccm-hero__video-teaser';
    video.autoplay = true;
    video.loop = false;
    video.muted = true;
    video.playsInline = true;

    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';

    var source = document.createElement('source');
    source.src =
      '/assets/rbccm/images/imagine-images/imagine-2025-tall-hero-clean.mp4';
    source.type = 'video/mp4';

    video.appendChild(source);
    teaserMount.appendChild(video);

    function handleFinished() {
      video.removeEventListener('ended', handleFinished);
      video.removeEventListener('timeupdate', checkPausePoint);
      fadeOutVideoBg(videoBg, video);
    }

    function checkPausePoint() {
      var limit = HERO_VIDEO_CONFIG.pauseAfterSeconds;
      if (
        typeof limit === 'number' &&
        limit >= 0 &&
        video.currentTime >= limit
      ) {
        handleFinished();
      }
    }

    if (typeof HERO_VIDEO_CONFIG.pauseAfterSeconds === 'number') {
      video.addEventListener('timeupdate', checkPausePoint);
    } else {
      video.addEventListener('ended', handleFinished);
    }

    // Best-effort autoplay
    video.play().catch(function () {
      // ignore autoplay failures
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImagineHeroTeaser);
  } else {
    initImagineHeroTeaser();
  }
})();