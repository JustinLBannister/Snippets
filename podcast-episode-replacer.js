// Custom podcast overlay player - dynamically finds first episode from listing
(function() {
    console.log('Creating custom podcast overlay...');
    
    function getFirstEpisodeUrl() {
        const selectors = [
            '.insights-stories.initial .story-podcast-playing iframe[src*="captivate.fm"]',
            '.insights-stories .story-podcast-playing iframe[src*="captivate.fm"]',
            '.story-podcast-playing iframe[src*="captivate.fm"]'
        ];
        
        for (let i = 0; i < selectors.length; i++) {
            const iframe = document.querySelector(selectors[i]);
            if (iframe && iframe.src) {
                console.log('Found episode URL via selector ' + (i + 1) + ':', iframe.src);
                return iframe.src;
            }
        }
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
            z-index: 99999;
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
    
    function hideOriginalPlayer() {
        // Hide the original podcast player wrapper if it exists
        const originalWrapper = document.querySelector('.podcast-player-wrapper');
        if (originalWrapper) {
            originalWrapper.style.display = 'none';
            console.log('Hidden original .podcast-player-wrapper');
        }
        const originalContainer = document.getElementById('podcast-player-container');
        if (originalContainer) {
            originalContainer.style.display = 'none';
            console.log('Hidden original #podcast-player-container');
        }
    }
    
    function setupButton(episodeUrl) {
        const button = document.querySelector('.hero-cta .btn-play-audio');
        if (!button) {
            console.log('Hero button not found yet');
            return false;
        }
        
        console.log('Found hero button:', button);
        
        const newButton = button.cloneNode(true);
        newButton.removeAttribute('aria-controls');
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Hero play button clicked - showing overlay');
            
            // Hide any original player elements
            hideOriginalPlayer();
            
            // Create overlay on demand if content loaded late
            if (!document.getElementById('custom-podcast-overlay')) {
                const url = episodeUrl || getFirstEpisodeUrl();
                if (url) {
                    createPodcastOverlay(url);
                } else {
                    console.error('No episode found');
                    return;
                }
            }
            
            const overlay = document.getElementById('custom-podcast-overlay');
            if (overlay) {
                overlay.style.display = 'block';
                console.log('Podcast overlay now visible');
            }
            
            // Check again after a short delay in case original player gets injected after click
            setTimeout(hideOriginalPlayer, 100);
            setTimeout(hideOriginalPlayer, 300);
            setTimeout(hideOriginalPlayer, 500);
            
            return false;
        });
        
        console.log('Hero button handler attached');
        return true;
    }
    
    waitForDOM(() => {
        const episodeUrl = getFirstEpisodeUrl();
        if (episodeUrl) {
            createPodcastOverlay(episodeUrl);
        }
        
        let attempts = 0;
        function trySetup() {
            if (setupButton(episodeUrl)) {
                console.log('Custom podcast player ready!');
            } else if (attempts < 20) {
                attempts++;
                console.log(`Button setup attempt ${attempts}/20, retrying...`);
                setTimeout(trySetup, 500);
            } else {
                console.error('Could not find hero button after 20 attempts');
            }
        }
        trySetup();
    });
})();