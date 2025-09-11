(() => {
  // ---- Load FontAwesome (optional) ----
  const faScript = document.createElement('script');
  faScript.src = 'https://use.fontawesome.com/6c097a09a7.js';
  faScript.type = 'text/javascript';
  document.head.appendChild(faScript);

  // ---- Build Player (only if not already present) ----
  let wrapper = document.getElementById('dynamic-podcast-player');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'dynamic-podcast-player';
    wrapper.className = 'podcast-playing story-podcast-playing';
    wrapper.style.marginBottom = '10px';
    wrapper.style.display = 'none'; // hidden by default

    // ARIA dialog semantics
    wrapper.setAttribute('role', 'dialog');
    wrapper.setAttribute('aria-modal', 'true');
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.setAttribute('aria-label', 'Podcast player');
    wrapper.setAttribute('tabindex', '-1');

    const container = document.createElement('div');
    container.className = 'container';

    const row = document.createElement('div');
    row.className = 'row';

    const col = document.createElement('div');
    col.className = 'col-xs-12 col-md-12';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn-close-player';
    closeBtn.setAttribute('aria-label', 'Close player');

    const closeImg = document.createElement('img');
    closeImg.src = '/assets/rbccm/images/campaign/player-x.svg';
    closeImg.alt = '';
    closeImg.setAttribute('aria-hidden', 'true');
    closeBtn.appendChild(closeImg);

    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '200';
    iframe.title = 'SoundCloud Player';
    iframe.scrolling = 'no';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay';
    iframe.src = 'https://player.captivate.fm/episode/908727f7-d28f-4570-b6c2-13aee73637d0/';

    col.appendChild(closeBtn);
    col.appendChild(iframe);
    row.appendChild(col);
    container.appendChild(row);
    wrapper.appendChild(container);
    document.body.appendChild(wrapper);

    // ---- Accessibility + control logic ----
    let lastActiveEl = null;

    function getFocusable(containerEl) {
      return Array.from(containerEl.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])'
      )).filter(el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
    }

    function trapFocus(e) {
      if (e.key !== 'Tab') return;
      const focusables = getFocusable(wrapper);
      if (!focusables.length) return;
      const first = focusables[0];
      const last  = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }

    function onKeydown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePodcastPlayer();
      }
    }

    function openPodcastPlayer(openerEl) {
      lastActiveEl = openerEl || document.activeElement || null;
      wrapper.style.display = 'block';
      wrapper.setAttribute('aria-hidden', 'false');
      (getFocusable(wrapper)[0] || closeBtn).focus();
      document.addEventListener('keydown', onKeydown);
      wrapper.addEventListener('keydown', trapFocus);
    }

    function closePodcastPlayer() {
      wrapper.style.display = 'none';
      wrapper.setAttribute('aria-hidden', 'true');
      // stop playback
      iframe.src = iframe.src;
      document.removeEventListener('keydown', onKeydown);
      wrapper.removeEventListener('keydown', trapFocus);
      if (lastActiveEl && typeof lastActiveEl.focus === 'function') lastActiveEl.focus();
    }

    function togglePodcastPlayer(openerEl) {
      const hidden = wrapper.getAttribute('aria-hidden') !== 'false';
      hidden ? openPodcastPlayer(openerEl) : closePodcastPlayer();
    }

    // Expose toggle globally if you want to call it elsewhere
    window.togglePodcastPlayer = togglePodcastPlayer;

    // Close button click
    closeBtn.addEventListener('click', closePodcastPlayer);
  }

  // ---- Wire up your hero button(s) ----
  // Works for existing and future buttons via event delegation.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.hero-cta .btn-play-audio');
    if (!btn) return;
    e.preventDefault();
    window.togglePodcastPlayer(btn);
  });
})();