<section class="rbccm-hero rbccm-hero--video" id="imagine-hero" aria-labelledby="rbccm-hero-title">

  <!-- Video background layer -->
  <div class="rbccm-hero__video-bg">
    <!-- Teaser background video (plays behind content) -->
    <video
      id="imagine-teaser-video"
      class="rbccm-hero__video-teaser"
      autoplay
      loop
      muted
      playsinline
    >
      <source src="/assets/rbccm/images/imagine-images/imagine-2025-tall-hero-clean.mp4" type="video/mp4">
    </video>

    <!-- Brightcove overlay (hidden by default, sits on top of teaser) -->
    <div id="imagine-brightcove-wrapper" class="rbccm-hero__video-main" style="display:none;">
      <video-js
        id="imagine-hero-player"
        data-account="6021289101001"
        data-player="eY0NaFfEF"
        data-embed="default"
        data-video-id="6307006575112"
        class="vjs-fluid"
        playsinline="true"
      ></video-js>
      <script src="https://players.brightcove.net/6021289101001/eY0NaFfEF_default/index.min.js"></script>
    </div>

    <!-- Close button for Brightcove view -->
    <button
      type="button"
      class="rbccm-hero__video-close"
      aria-label="Close the video player"
      style="display:none;"
    >
      ×
    </button>
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
        <!-- existing download button (still opens your Marketo modal) -->
        <a class="rbccm-hero__btn" href="#download">Download now</a>

        <!-- new watch button for the hero video -->
        <button
          type="button"
          class="rbccm-hero__btn rbccm-hero__btn--secondary js-imagine-start"
        >
          Start watching
        </button>
      </div>
    </div>
  </div>
</section>

.rbccm-hero--video {
  position: relative;
  overflow: hidden;
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

.rbccm-hero__video-main {
  position: absolute;
  inset: 0;
  max-width: 1200px;
  margin: auto;
}

.rbccm-hero__video-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  background: transparent;
  border: none;
  font-size: 32px;
  line-height: 1;
  color: #fff;
  cursor: pointer;
}

.rbccm-hero__container {
  position: relative;
  z-index: 1;
}

.rbccm-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.rbccm-hero__btn--secondary {
  background: transparent;
  border: 1px solid #fff;
}

.rbccm-hero--video {
  min-height: 300px;
}

.rbccm-hero--video.rbccm-hero--expanded {
  min-height: 600px; /* or 675px, whatever matches the old layout */
}

document.addEventListener('DOMContentLoaded', function () {
  var hero          = document.getElementById('imagine-hero');
  if (!hero) return;

  var startBtn      = hero.querySelector('.js-imagine-start');
  var closeBtn      = hero.querySelector('.rbccm-hero__video-close');
  var teaserVideo   = document.getElementById('imagine-teaser-video');
  var brightcoveWrap = document.getElementById('imagine-brightcove-wrapper');
  var brightcovePlayer = null;

  function initBrightcovePlayer() {
    if (!window.videojs) return null;

    try {
      return videojs('imagine-hero-player');
    } catch (e) {
      return null;
    }
  }

  function openHeroVideo(e) {
    if (e) e.preventDefault();

    if (!brightcovePlayer) {
      brightcovePlayer = initBrightcovePlayer();
    }

    // Show main video
    brightcoveWrap.style.display = 'block';
    closeBtn.style.display = '';
    hero.classList.add('rbccm-hero--expanded');

    // Pause teaser
    if (teaserVideo && !teaserVideo.paused) {
      teaserVideo.pause();
    }

    // Play Brightcove video
    if (brightcovePlayer) {
      brightcovePlayer.muted(false);
      brightcovePlayer.play();
    }
  }

  function closeHeroVideo(e) {
    if (e) e.preventDefault();

    // Hide main video
    brightcoveWrap.style.display = 'none';
    closeBtn.style.display = 'none';
    hero.classList.remove('rbccm-hero--expanded');

    // Pause Brightcove
    if (brightcovePlayer) {
      brightcovePlayer.pause();
    }

    // Restart teaser muted
    if (teaserVideo) {
      teaserVideo.muted = true;
      teaserVideo.play().catch(function(){});
    }
  }

  if (startBtn) {
    startBtn.addEventListener('click', openHeroVideo);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeHeroVideo);
  }
});