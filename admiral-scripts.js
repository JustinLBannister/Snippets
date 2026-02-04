    // ===== DEPARTMENT DATA (tabs only - members come from hidden div) =====
    let activeBioState = null; // Track active bio: { deptId, memberIndex }
    
    const departments = [
      { id: 'firm-sponsorship', label: null, labelPosition: null, tabLabel: 'Firm Sponsorship', showOnWheel: false },
      { id: 'corporate-broking', label: 'Corporate Broking\n& Advisory', labelPosition: 'top', tabLabel: 'Corporate Broking & Advisory', showOnWheel: true },
      { id: 'fig-expertise', label: 'FIG Expertise', labelPosition: 'top-right', tabLabel: 'FIG Expertise', showOnWheel: true },
      { id: 'equity-sales', label: 'Equity\nSales', labelPosition: 'right', tabLabel: 'Equity Sales', showOnWheel: true },
      { id: 'equity-trading', label: 'Equity\nTrading', labelPosition: 'right', tabLabel: 'Equity Trading', showOnWheel: true },
      { id: 'research', label: 'Research', labelPosition: 'right', tabLabel: 'Unique Research Offering', showOnWheel: true },
      { id: 'corporate-banking', label: 'Corporate\nBanking', labelPosition: 'bottom', tabLabel: 'Corporate Banking', showOnWheel: true },
      { id: 'hedging-risk', label: 'Hedging &\nRisk Solution', labelPosition: 'bottom', tabLabel: 'Hedging & Risk Solution', showOnWheel: true },
      { id: 'balance-sheet', label: 'Balance Sheet\nAdvisory / DCM', labelPosition: 'bottom-left', tabLabel: 'Balance Sheet Advisory / DCM', showOnWheel: true },
      { id: 'equity-debt-capital', label: 'ECM', labelPosition: 'left', tabLabel: 'Equity Capital Markets', showOnWheel: true },
      { id: 'fig-portfolio', label: 'FIG Portfolio\nAdvisory', labelPosition: 'left', tabLabel: 'FIG Portfolio Advisory', showOnWheel: true },
      { id: 'ma-defence', label: 'M&A and\nDefence', labelPosition: 'top-left', tabLabel: 'M&A and Defence', showOnWheel: true },
      { id: 'continental-europe', label: 'Continental\nEurope', labelPosition: 'top-left', tabLabel: 'Continental Europe', showOnWheel: true }
    ];

    // ===== FORMAT BIO ITEM (yellow lead text before colon) =====
    function formatBioItem(item) {
      const colonIndex = item.indexOf(':');
      if (colonIndex > -1 && colonIndex < 40) {
        const lead = item.substring(0, colonIndex + 1);
        const rest = item.substring(colonIndex + 1);
        return `<li><strong class="rbccm-bio__lead">${lead}</strong>${rest}</li>`;
      }
      return `<li>${item}</li>`;
    }

    // ===== GET TEAM MEMBERS FROM HIDDEN DATA DIV =====
    function getTeamMembers(teamId) {
      const dataDiv = document.getElementById('team-data');
      const members = dataDiv.querySelectorAll(`.team-member[data-team="${teamId}"]`);
      
      const memberArray = Array.from(members).map(member => {
        const bioItems = member.querySelectorAll('ul li');
        const bioImagesStr = member.dataset.bioImages || '';
        const bioImages = bioImagesStr ? bioImagesStr.split(',').map(img => img.trim()).filter(img => img) : [];
        
        return {
          name: member.dataset.name,
          title: member.dataset.title,
          dept: member.dataset.dept,
          photo: member.dataset.photo,
          order: parseInt(member.dataset.order) || 999,
          videoId: member.dataset.videoId || '',
          videoType: member.dataset.videoType || 'vimeo',
          vimeoHash: member.dataset.vimeoHash || '',
          bioImages: bioImages,
          bio: Array.from(bioItems).map(li => li.textContent)
        };
      });
      
      // Sort by order
      return memberArray.sort((a, b) => a.order - b.order);
    }

    // ===== POSITION NODES ON WHEEL =====
    function positionNodes() {
      const container = document.querySelector('.value-wheel__container');
      const ring = document.querySelector('.value-wheel__ring');
      const nodesContainer = document.getElementById('nodes');
      
      // Preserve current active node ID before rebuilding
      const activeNode = nodesContainer.querySelector('.value-wheel__node--active');
      const activeNodeId = activeNode ? activeNode.dataset.id : null;
      
      nodesContainer.innerHTML = '';
      
      const containerRect = container.getBoundingClientRect();
      const ringRect = ring.getBoundingClientRect();
      
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      
      // Radius is half the ring width (nodes sit on the ring)
      const radius = ringRect.width / 2;

      // Only show departments that have showOnWheel: true
      const wheelDepartments = departments.filter(dept => dept.showOnWheel);

      wheelDepartments.forEach((dept, index) => {
        const angle = (index / wheelDepartments.length) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const node = document.createElement('a');
        node.href = '#teams';
        node.className = 'value-wheel__node';
        
        // Restore active state if this was the active node
        if (dept.id === activeNodeId) {
          node.classList.add('value-wheel__node--active');
        }
        
        node.dataset.id = dept.id;
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        
        const labelText = dept.label.replace(/\n/g, '<br>');
        node.innerHTML = `
          <div class="value-wheel__node-circle"></div>
          <span class="value-wheel__node-label value-wheel__node-label--${dept.labelPosition}">${labelText}</span>
        `;
        
        node.addEventListener('click', (e) => {
          e.preventDefault();
          activateTab(dept.id);
          document.getElementById('teams').scrollIntoView({ behavior: 'smooth' });
        });

        nodesContainer.appendChild(node);
      });
    }

    // ===== CREATE TABS AND PANELS =====
    function createTabsAndPanels() {
      const tablist = document.getElementById('tablist');
      const panelsContainer = document.getElementById('panels');
      tablist.innerHTML = '';
      panelsContainer.innerHTML = '';

      departments.forEach((dept, index) => {
        // Create tab
        const tab = document.createElement('button');
        tab.className = `rbccm-themes__tab${index === 1 ? ' is-active' : ''}`;
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
        tab.setAttribute('aria-controls', `panel-${dept.id}`);
        tab.dataset.panel = dept.id;
        tab.innerHTML = `
          ${dept.tabLabel}
          <svg class="rbccm-themes__chevron" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.59 15.555L12 10.9317L7.41 15.555L6 14.1316L12 8.07493L18 14.1316L16.59 15.555Z" fill="currentColor"/>
          </svg>
        `;
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          handleTabClick(tab);
        });
        tablist.appendChild(tab);

        // Create panel - content will be populated on tab click
        const panel = document.createElement('div');
        panel.className = `rbccm-themes__panel${index === 1 ? ' is-active' : ''}`;
        panel.setAttribute('role', 'tabpanel');
        panel.id = `panel-${dept.id}`;
        panel.dataset.panel = dept.id;
        panel.innerHTML = '<div class="rbccm-team__grid"></div>';
        panelsContainer.appendChild(panel);

        // Populate first panel on load
        if (index === 0) {
          populatePanel(dept.id);
        }
      });

      // Handle responsive behavior
      handleResponsive();
      window.addEventListener('resize', debounce(handleResponsive, 250));

      // Bio link click handlers (delegated)
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('rbccm-team__link--bio')) {
          e.preventDefault();
          const deptId = e.target.dataset.deptId;
          const memberIndex = parseInt(e.target.dataset.memberIndex);
          showBio(deptId, memberIndex, e.target);
        }
      });

      // Close bio button (desktop)
      document.querySelector('.rbccm-bio__close').addEventListener('click', () => {
        document.getElementById('bio-section').classList.remove('is-active');
        // Remove active class from all cards
        document.querySelectorAll('.rbccm-team__card.is-active').forEach(card => {
          card.classList.remove('is-active');
        });
        // Close all inline bios
        document.querySelectorAll('.rbccm-team__inline-bio.is-active').forEach(bio => {
          bio.classList.remove('is-active');
        });
        // Clear active bio state
        activeBioState = null;
      });

      // Video link click handlers (delegated)
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('rbccm-team__link--video')) {
          e.preventDefault();
          const deptId = e.target.dataset.deptId;
          const memberIndex = parseInt(e.target.dataset.memberIndex);
          const videoId = e.target.dataset.videoId;
          const videoType = e.target.dataset.videoType;
          const vimeoHash = e.target.dataset.vimeoHash;
          showVideoModal(deptId, memberIndex, videoId, videoType, vimeoHash);
        }
      });

      // Close video modal
      document.querySelector('.rbccm-video-modal__close').addEventListener('click', closeVideoModal);
      document.querySelector('.rbccm-video-modal__overlay').addEventListener('click', closeVideoModal);

      // Close modal on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeVideoModal();
        }
      });
    }

    // ===== SHOW VIDEO MODAL =====
    function showVideoModal(deptId, memberIndex, videoId, videoType, vimeoHash) {
      const members = getTeamMembers(deptId);
      const member = members[memberIndex];
      
      if (!member) return;
      
      document.getElementById('video-modal-name').textContent = member.name;
      
      const playerContainer = document.getElementById('video-modal-player');
      let embedHtml = '';
      
      switch(videoType) {
        case 'youtube':
          embedHtml = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
          break;
        case 'vimeo':
          const hashParam = vimeoHash ? `?h=${vimeoHash}&autoplay=1` : '?autoplay=1';
          embedHtml = `<iframe src="https://player.vimeo.com/video/${videoId}${hashParam}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
          break;
        default:
          // No video available
          embedHtml = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666;">Video coming soon</div>`;
      }
      
      playerContainer.innerHTML = embedHtml;
      document.getElementById('video-modal').classList.add('is-active');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    // ===== CLOSE VIDEO MODAL =====
    function closeVideoModal() {
      const modal = document.getElementById('video-modal');
      modal.classList.remove('is-active');
      document.getElementById('video-modal-player').innerHTML = ''; // Stop video
      document.body.style.overflow = ''; // Restore scroll
    }

    // ===== POPULATE PANEL WITH TEAM MEMBERS =====
    function populatePanel(deptId) {
      const panel = document.getElementById(`panel-${deptId}`);
      const grid = panel.querySelector('.rbccm-team__grid');
      const members = getTeamMembers(deptId);

      if (members.length === 0) {
        grid.innerHTML = '<p style="color: #666; text-align: center; padding: 40px;">Team members coming soon.</p>';
        return;
      }

      // Create cards
      const membersHTML = members.map((member, mIndex) => `
        <div class="rbccm-team__card" data-member-index="${mIndex}" data-dept-id="${deptId}">
          <div class="rbccm-team__photo">${member.photo ? `<img src="${member.photo}" alt="${member.name}">` : 'FPO'}</div>
          <div class="rbccm-team__name">${member.name}</div>
          ${member.title ? `<div class="rbccm-team__title">${member.title}</div>` : ''}
          <div class="rbccm-team__dept">${member.dept}</div>
          <div class="rbccm-team__links">
            <a href="#" class="rbccm-team__link rbccm-team__link--bio" data-member-index="${mIndex}" data-dept-id="${deptId}">Biography</a>
            ${member.videoId ? `<a href="#" class="rbccm-team__link rbccm-team__link--video" data-member-index="${mIndex}" data-dept-id="${deptId}" data-video-id="${member.videoId}" data-video-type="${member.videoType}" data-vimeo-hash="${member.vimeoHash || ''}">Video</a>` : ''}
          </div>
        </div>
      `).join('');

      // Add single inline bio element at the end
      const inlineBioHTML = `
        <div class="rbccm-team__inline-bio" data-dept-id="${deptId}">
          <button class="rbccm-team__inline-bio__close" aria-label="Close bio">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
              <line x1="1.41421" y1="1" x2="22" y2="21.5858" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <line x1="22" y1="1.41421" x2="1.41421" y2="22" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <div class="rbccm-team__inline-bio__text">
            <h3 class="rbccm-team__inline-bio__name"></h3>
            <ul class="rbccm-team__inline-bio__list"></ul>
          </div>
          <div class="rbccm-team__inline-bio__slider-wrapper">
            <div class="rbccm-team__inline-bio__slider"></div>
          </div>
        </div>
      `;

      grid.innerHTML = membersHTML + inlineBioHTML;

      // Add click handler for inline bio close button
      const closeBtn = grid.querySelector('.rbccm-team__inline-bio__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const bioEl = grid.querySelector('.rbccm-team__inline-bio');
          bioEl.classList.remove('is-active');
          grid.classList.remove('bio-on-last-row');
          // Remove active class from all cards
          grid.querySelectorAll('.rbccm-team__card.is-active').forEach(card => {
            card.classList.remove('is-active');
          });
          // Clear active bio state
          activeBioState = null;
        });
      }

      // Restore bio state if it exists for this department
      if (activeBioState && activeBioState.deptId === deptId) {
        const bioLink = grid.querySelector(`.rbccm-team__link--bio[data-member-index="${activeBioState.memberIndex}"][data-dept-id="${deptId}"]`);
        if (bioLink) {
          // Use setTimeout to ensure DOM is ready
          setTimeout(() => {
            showBio(activeBioState.deptId, activeBioState.memberIndex, bioLink);
          }, 50);
        }
      }
    }

    // ===== SHOW BIO =====
    function showBio(deptId, memberIndex, clickedElement) {
      const members = getTeamMembers(deptId);
      const member = members[memberIndex];
      
      if (!member) return;

      const card = clickedElement.closest('.rbccm-team__card');
      const grid = card.closest('.rbccm-team__grid');
      
      // Remove active class from all cards
      document.querySelectorAll('.rbccm-team__card.is-active').forEach(c => {
        c.classList.remove('is-active');
      });
      
      // Close all inline bios
      document.querySelectorAll('.rbccm-team__inline-bio.is-active').forEach(bio => {
        bio.classList.remove('is-active');
      });

      // Close global bio section (legacy desktop)
      document.getElementById('bio-section').classList.remove('is-active');
      
      // Save active bio state
      activeBioState = { deptId, memberIndex };

      // Show inline bio below the row (both mobile and desktop)
      const inlineBio = grid.querySelector('.rbccm-team__inline-bio');
      if (inlineBio) {
        // Get all cards
        const cards = Array.from(grid.querySelectorAll('.rbccm-team__card'));
        
        // Get the clicked card's vertical position
        const cardRect = card.getBoundingClientRect();
        const cardTop = cardRect.top;
        
        // Find the last card in the same row (same top position)
        let lastCardInRow = card;
        for (let i = 0; i < cards.length; i++) {
          const otherCardRect = cards[i].getBoundingClientRect();
          // Cards are in the same row if their tops are within 10px of each other
          if (Math.abs(otherCardRect.top - cardTop) < 10) {
            lastCardInRow = cards[i];
          }
        }
        
        // Move the bio element to be right after the last card in the row
        lastCardInRow.after(inlineBio);
        
        // Check if bio is on the last row — remove grid bottom padding if so
        const lastCard = cards[cards.length - 1];
        const lastCardTop = lastCard.getBoundingClientRect().top;
        const isLastRow = Math.abs(cardTop - lastCardTop) < 10;
        grid.classList.toggle('bio-on-last-row', isLastRow);
        
        // Update bio content
        inlineBio.querySelector('.rbccm-team__inline-bio__name').textContent = member.name;
        inlineBio.querySelector('.rbccm-team__inline-bio__list').innerHTML = 
          member.bio.map(item => formatBioItem(item)).join('');
        
        // Update inline bio slider
        const inlineSlider = inlineBio.querySelector('.rbccm-team__inline-bio__slider');
        const sliderWrapper = inlineBio.querySelector('.rbccm-team__inline-bio__slider-wrapper');
        if (inlineSlider) {
          // Destroy existing slick instance if any
          if ($(inlineSlider).hasClass('slick-initialized')) {
            $(inlineSlider).slick('unslick');
          }
          
          // Build slider HTML with background-image divs
          if (member.bioImages && member.bioImages.length > 0) {
            if (sliderWrapper) sliderWrapper.style.display = '';
            inlineSlider.innerHTML = member.bioImages.map(img => `<div class="rbccm-team__inline-bio__slide" style="background-image: url('${img}')"></div>`).join('');
            inlineSlider.classList.toggle('single-image', member.bioImages.length === 1);
            
            // Initialize slick
            $(inlineSlider).slick({
              dots: false,
              infinite: false,
              speed: 300,
              slidesToShow: 1,
              slidesToScroll: 1,
              prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"></button>',
              nextArrow: '<button type="button" class="slick-next" aria-label="Next"></button>'
            });
          } else {
            inlineSlider.innerHTML = '';
            if (sliderWrapper) sliderWrapper.style.display = 'none';
          }
        }
        
        card.classList.add('is-active');
        inlineBio.classList.add('is-active');
        
        // Scroll to the bio
        setTimeout(() => {
          inlineBio.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    }

    // ===== HANDLE TAB CLICK =====
    function handleTabClick(clickedTab) {
      const targetPanel = clickedTab.dataset.panel;
      const isDesktop = window.matchMedia('(min-width: 992px)').matches;

      // Close bio when switching tabs
      document.getElementById('bio-section').classList.remove('is-active');
      // Remove active class from all cards
      document.querySelectorAll('.rbccm-team__card.is-active').forEach(card => {
        card.classList.remove('is-active');
      });
      // Close all inline bios
      document.querySelectorAll('.rbccm-team__inline-bio.is-active').forEach(bio => {
        bio.classList.remove('is-active');
      });
      // Clear active bio state when switching tabs
      activeBioState = null;

      if (isDesktop) {
        // Desktop: traditional tab behavior
        document.querySelectorAll('.rbccm-themes__tab').forEach(tab => {
          tab.classList.remove('is-active');
          tab.setAttribute('aria-expanded', 'false');
        });
        document.querySelectorAll('.rbccm-themes__panel').forEach(panel => {
          panel.classList.remove('is-active');
        });
        clickedTab.classList.add('is-active');
        clickedTab.setAttribute('aria-expanded', 'true');
        const activePanel = document.querySelector(`[data-panel="${targetPanel}"].rbccm-themes__panel`);
        if (activePanel) activePanel.classList.add('is-active');
      } else {
        // Mobile: accordion behavior - only one open at a time
        const isActive = clickedTab.classList.contains('is-active');
        
        // Close all tabs first
        document.querySelectorAll('.rbccm-themes__tab').forEach(tab => {
          tab.classList.remove('is-active');
          tab.setAttribute('aria-expanded', 'false');
        });
        
        // If the clicked tab wasn't already active, open it
        if (!isActive) {
          clickedTab.classList.add('is-active');
          clickedTab.setAttribute('aria-expanded', 'true');
        }
      }

      // Populate the panel with team members (lazy load)
      populatePanel(targetPanel);

      // Update wheel nodes
      setActiveNode(targetPanel);
    }

    // ===== HANDLE RESPONSIVE =====
    function handleResponsive() {
      const isDesktop = window.matchMedia('(min-width: 992px)').matches;
      const tablist = document.getElementById('tablist');
      const panelsContainer = document.getElementById('panels');
      const panels = document.querySelectorAll('.rbccm-themes__panel');
      const tabs = document.querySelectorAll('.rbccm-themes__tab');

      if (isDesktop) {
        // Move panels to desktop container
        panels.forEach(panel => panelsContainer.appendChild(panel));
        
        // On desktop, ensure only one tab/panel is active
        const activeTab = document.querySelector('.rbccm-themes__tab.is-active');
        if (!activeTab) {
          // No active tab, activate the first one
          tabs[0]?.classList.add('is-active');
          tabs[0]?.setAttribute('aria-expanded', 'true');
          panels[0]?.classList.add('is-active');
        } else {
          // Make sure only the corresponding panel is active
          const activePanelId = activeTab.dataset.panel;
          panels.forEach(panel => {
            if (panel.id === `panel-${activePanelId}`) {
              panel.classList.add('is-active');
            } else {
              panel.classList.remove('is-active');
            }
          });
        }
      } else {
        // Mobile: move panels back after their tabs
        tabs.forEach((tab, index) => {
          const panelId = tab.dataset.panel;
          const panel = document.getElementById(`panel-${panelId}`);
          if (panel && tab.nextElementSibling !== panel) {
            tab.after(panel);
          }
        });
        
        // On mobile, remove is-active from all panels (CSS handles display via adjacent sibling)
        panels.forEach(panel => panel.classList.remove('is-active'));
        
        // Keep only one tab active (or none)
        const activeTabs = document.querySelectorAll('.rbccm-themes__tab.is-active');
        if (activeTabs.length > 1) {
          // Multiple active tabs, keep only the first one
          activeTabs.forEach((tab, index) => {
            if (index > 0) {
              tab.classList.remove('is-active');
              tab.setAttribute('aria-expanded', 'false');
            }
          });
        }
      }

      // Restore bio state if it exists
      if (activeBioState) {
        const bioLink = document.querySelector(`.rbccm-team__link--bio[data-member-index="${activeBioState.memberIndex}"][data-dept-id="${activeBioState.deptId}"]`);
        if (bioLink) {
          setTimeout(() => {
            showBio(activeBioState.deptId, activeBioState.memberIndex, bioLink);
          }, 100);
        }
      }
    }

    // ===== SET ACTIVE NODE =====
    function setActiveNode(id) {
      document.querySelectorAll('.value-wheel__node').forEach(node => {
        node.classList.toggle('value-wheel__node--active', node.dataset.id === id);
      });
    }

    // ===== ACTIVATE TAB (from wheel click) =====
    function activateTab(id) {
      const tab = document.querySelector(`.rbccm-themes__tab[data-panel="${id}"]`);
      if (tab) handleTabClick(tab);
    }

    // ===== DEBOUNCE =====
    function debounce(func, wait) {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    }

    // ===== INITIALIZE =====
    document.addEventListener('DOMContentLoaded', () => {
      positionNodes();
      createTabsAndPanels();
      if (departments.length > 1) {
        setActiveNode(departments[1].id);
      }
      window.addEventListener('resize', debounce(positionNodes, 250));

      // ===== STATS HORIZONTAL SCROLL =====
      initStatsScroll();
    });

    // ===== STATS TICKER + PROGRESS BAR =====
    function initStatsScroll() {
      const grid = document.querySelector('.rbccm-stats__grid');
      const progressBar = document.querySelector('.rbccm-stats__progress-bar');
      if (!grid) return;

      // Duplicate items for seamless loop
      const items = Array.from(grid.querySelectorAll('.rbccm-stats__item'));
      const originalCount = items.length;
      
      // Clone items twice for seamless infinite scroll
      for (let i = 0; i < 2; i++) {
        items.forEach(item => {
          const clone = item.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          grid.appendChild(clone);
        });
      }

      // Measure one set width
      let setWidth = 0;
      items.forEach(item => {
        setWidth += item.offsetWidth;
      });

      // Animation state
      let isPlaying = true;
      let wasPlayingBeforeHover = true;
      let scrollPos = 0;
      let animationId = null;
      const speed = 0.5; // pixels per frame

      // Drag state
      let isDragging = false;
      let dragStartX = 0;
      let dragStartScroll = 0;

      // Progress bar state
      let progressAnim = null;
      let currentBarWidth = 25;
      let currentBarLeft = 0;
      let targetBarWidth = 25;
      let targetBarLeft = 0;

      function updateProgressBar() {
        if (!progressBar) return;
        const progress = (scrollPos % setWidth) / setWidth;
        targetBarWidth = 25;
        targetBarLeft = progress * (100 - targetBarWidth);
        
        // Detect wrap-around for elastic effect
        if (targetBarLeft < currentBarLeft - 30) {
          // Bar is wrapping — shrink out to right, then grow from left
          elasticReset();
          return;
        }
        
        currentBarWidth = targetBarWidth;
        currentBarLeft = targetBarLeft;
        progressBar.style.width = currentBarWidth + '%';
        progressBar.style.left = currentBarLeft + '%';
      }

      function elasticReset() {
        if (!progressBar) return;
        // Phase 1: shrink to nothing on the right
        progressBar.style.transition = 'width 0.3s ease-in, left 0.3s ease-in';
        progressBar.style.left = '100%';
        progressBar.style.width = '0%';
        
        setTimeout(() => {
          // Phase 2: appear at left and grow
          progressBar.style.transition = 'none';
          progressBar.style.left = '0%';
          progressBar.style.width = '0%';
          
          requestAnimationFrame(() => {
            progressBar.style.transition = 'width 0.3s ease-out';
            progressBar.style.width = '25%';
            currentBarLeft = 0;
            currentBarWidth = 25;
            
            setTimeout(() => {
              progressBar.style.transition = '';
            }, 300);
          });
        }, 300);
      }

      function tick() {
        if (!isPlaying || isDragging) return;
        scrollPos += speed;
        
        // Reset seamlessly when we've scrolled one full set
        if (scrollPos >= setWidth) {
          scrollPos -= setWidth;
        }
        
        grid.scrollLeft = scrollPos;
        updateProgressBar();
        animationId = requestAnimationFrame(tick);
      }

      function play() {
        isPlaying = true;
        playBtn.setAttribute('aria-label', 'Pause ticker');
        playBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="4" height="12" rx="1" fill="white"/><rect x="9" y="1" width="4" height="12" rx="1" fill="white"/></svg>`;
        tick();
      }

      function pause() {
        isPlaying = false;
        if (animationId) cancelAnimationFrame(animationId);
        playBtn.setAttribute('aria-label', 'Play ticker');
        playBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polygon points="2,1 13,7 2,13" fill="white"/></svg>`;
      }

      // Create pause/play button
      const playBtn = document.createElement('button');
      playBtn.className = 'rbccm-stats__ticker-btn';
      playBtn.setAttribute('aria-label', 'Pause ticker');
      playBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="4" height="12" rx="1" fill="white"/><rect x="9" y="1" width="4" height="12" rx="1" fill="white"/></svg>`;
      
      // Insert button into the stats section
      const statsSection = document.querySelector('.rbccm-stats');
      statsSection.style.position = 'relative';
      statsSection.appendChild(playBtn);

      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
          wasPlayingBeforeHover = false;
          pause();
        } else {
          wasPlayingBeforeHover = true;
          play();
        }
      });

      // Hover: pause auto-scroll, enable drag
      grid.addEventListener('mouseenter', () => {
        wasPlayingBeforeHover = isPlaying;
        if (isPlaying) pause();
        grid.style.cursor = 'grab';
      });

      grid.addEventListener('mouseleave', () => {
        if (isDragging) {
          isDragging = false;
          grid.style.cursor = 'grab';
        }
        if (wasPlayingBeforeHover) play();
      });

      // Drag to scroll
      grid.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.pageX;
        dragStartScroll = scrollPos;
        grid.style.cursor = 'grabbing';
        e.preventDefault();
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = dragStartX - e.pageX;
        scrollPos = dragStartScroll + dx;
        
        // Keep within bounds
        while (scrollPos < 0) scrollPos += setWidth;
        while (scrollPos >= setWidth) scrollPos -= setWidth;
        
        grid.scrollLeft = scrollPos;
        updateProgressBar();
      });

      document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        grid.style.cursor = 'grab';
      });

      // Touch drag support
      let touchStartX = 0;
      let touchStartScroll = 0;

      grid.addEventListener('touchstart', (e) => {
        wasPlayingBeforeHover = isPlaying;
        if (isPlaying) pause();
        touchStartX = e.touches[0].pageX;
        touchStartScroll = scrollPos;
      }, { passive: true });

      grid.addEventListener('touchmove', (e) => {
        const dx = touchStartX - e.touches[0].pageX;
        scrollPos = touchStartScroll + dx;
        while (scrollPos < 0) scrollPos += setWidth;
        while (scrollPos >= setWidth) scrollPos -= setWidth;
        grid.scrollLeft = scrollPos;
        updateProgressBar();
      }, { passive: true });

      grid.addEventListener('touchend', () => {
        if (wasPlayingBeforeHover) play();
      });

      // Disable native scroll since we're animating
      grid.style.overflowX = 'hidden';
      grid.style.userSelect = 'none';
      grid.style.webkitUserSelect = 'none';

      // Style the button via JS
      Object.assign(playBtn.style, {
        position: 'absolute',
        bottom: '18px',
        right: '20px',
        background: 'rgba(255,255,255,0.2)',
        border: '1px solid rgba(255,255,255,0.4)',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: '10',
        padding: '0',
        transition: 'background 0.2s'
      });

      playBtn.addEventListener('mouseenter', () => {
        playBtn.style.background = 'rgba(255,255,255,0.35)';
      });
      playBtn.addEventListener('mouseleave', () => {
        playBtn.style.background = 'rgba(255,255,255,0.2)';
      });

      // Start ticker
      play();
    }
