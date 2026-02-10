// Custom podcast overlay player - dynamically finds first episode from listing
(function() {
    console.log('Creating custom podcast overlay...');
    
    // Find the first Captivate episode URL from the insights stories listing
    function getFirstEpisodeUrl() {
        const firstIframe = document.querySelector('.insights-stories.initial .story-podcast-playing iframe[src*="captivate.fm"]');
        if (firstIframe) {
            console.log('Found first episode URL:', firstIframe.src);
            return firstIframe.src;
        }
        console.warn('No Captivate episode found in .insights-stories.initial');
        return null;
    }
    
    function waitForDOM(callback) {
        if (document.body) {
            callback();
        } else {
            setTimeout(() => waitForDOM(callback), 100);
        }
    }
    
    function createPodcastOverlay(episodeUrl) {
        const existing = document.getElementById('custom-podcast-overlay');
        if (existing) existing.remove();
        
        const wrapperLink = document.createElement('a');
        wrapperLink.href = 'javascript:void(0)';
        wrapperLink.setAttribute('aria-label', 'Player');
        wrapperLink.id = 'custom-podcast-overlay';
        wrapperLink.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 10;
            display: none;
            text-decoration: none;
        `;
        
        const overlay = document.createElement('div');
        overlay.className = 'story-podcast-playing';
        overlay.style.cssText = `
            background-color: rgb(244, 244, 244);
            box-shadow: rgba(0, 0, 0, 0.1) 0px -2px 10px;
            padding: 0;
        `;
        
        const closeButton = document.createElement('button');
        closeButton.setAttribute('aria-label', 'Close Player');
        closeButton.className = 'btn-close-player close-btn';
        
        const closeImg = document.createElement('img');
        closeImg.src = '/assets/rbccm/images/campaign/player-x.svg';
        closeImg.alt = 'Close';
        closeButton.appendChild(closeImg);
        
        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '200';
        iframe.scrolling = 'no';
        iframe.frameBorder = 'no';
        iframe.allow = 'autoplay';
        iframe.src = episodeUrl;
        
        closeButton.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            wrapperLink.style.display = 'none';
            iframe.src = '';
            setTimeout(() => { iframe.src = episodeUrl; }, 100);
        };
        
        overlay.appendChild(closeButton);
        overlay.appendChild(iframe);
        wrapperLink.appendChild(overlay);
        
        if (document.body) {
            document.body.appendChild(wrapperLink);
            console.log('Podcast overlay created with episode:', episodeUrl);
            return wrapperLink;
        }
        return null;
    }
    
    function setupButton() {
        const button = document.querySelector('.btn-play-audio');
        if (!button) return false;
        
        // Clone button to remove existing handlers
        const newButton = button.cloneNode(true);
        
        // Remove aria-controls so original delegated JS doesn't recognize it
        newButton.removeAttribute('aria-controls');
        
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Hide the original player container if it exists
            const originalPlayer = document.getElementById('podcast-player-container');
            if (originalPlayer) {
                originalPlayer.style.display = 'none';
            }
            
            const overlay = document.getElementById('custom-podcast-overlay');
            if (overlay) overlay.style.display = 'block';
            return false;
        });
        
        return true;
    }
    
    waitForDOM(() => {
        const episodeUrl = getFirstEpisodeUrl();
        if (!episodeUrl) {
            console.error('No episode found - podcast overlay not created');
            return;
        }
        
        createPodcastOverlay(episodeUrl);
        
        let attempts = 0;
        function trySetup() {
            if (setupButton()) {
                console.log('Custom podcast player ready!');
            } else if (attempts < 5) {
                attempts++;
                setTimeout(trySetup, 500);
            }
        }
        trySetup();
    });
})();