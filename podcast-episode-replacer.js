// Custom podcast overlay player with hardcoded episode
(function() {
    console.log('Creating custom podcast overlay...');
    
    // Hardcoded episode URL
    const episodeUrl = 'https://player.captivate.fm/episode/c5ceca3b-a4f5-4edf-ad41-f8d5ad6cac5f/';
    
    // Create the overlay player
    function createPodcastOverlay() {
        // Remove existing overlay if present
        const existing = document.getElementById('custom-podcast-overlay');
        if (existing) {
            existing.remove();
        }
        
        // Create wrapper link
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
        
        // Create overlay container
        const overlay = document.createElement('div');
        overlay.className = 'story-podcast-playing';
        overlay.style.cssText = `
            background-color: rgb(244, 244, 244);
            box-shadow: rgba(0, 0, 0, 0.1) 0px -2px 10px;
            padding: 0;
        `;
        
        // Create close button with proper styling
        const closeButton = document.createElement('button');
        closeButton.setAttribute('aria-label', 'Close Player');
        closeButton.className = 'btn-close-player close-btn';
        
        // Create close button image
        const closeImg = document.createElement('img');
        closeImg.src = '/assets/rbccm/images/campaign/player-x.svg';
        closeImg.alt = 'Close';
        closeButton.appendChild(closeImg);
        
        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '200';
        iframe.scrolling = 'no';
        iframe.frameBorder = 'no';
        iframe.allow = 'autoplay';
        iframe.src = episodeUrl;
        
        // Close button functionality
        closeButton.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            wrapperLink.style.display = 'none';
            iframe.src = ''; // Stop playback
            setTimeout(() => {
                iframe.src = episodeUrl; // Reset for next play
            }, 100);
        };
        
        // Assemble structure
        overlay.appendChild(closeButton);
        overlay.appendChild(iframe);
        wrapperLink.appendChild(overlay);
        document.body.appendChild(wrapperLink);
        
        console.log('Podcast overlay created');
        return overlay;
    }
    
    // Set up button handler
    function setupButton() {
        const button = document.querySelector('.btn-play-audio');
        if (!button) {
            console.log('Button .btn-play-audio not found');
            return false;
        }
        
        console.log('Found button:', button);
        
        // Clone button to remove existing handlers
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add click handler
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Start listening clicked - showing overlay');
            
            const overlay = document.getElementById('custom-podcast-overlay');
            if (overlay) {
                overlay.style.display = 'block';
                console.log('Podcast overlay now visible');
            }
            
            return false;
        });
        
        console.log('Button handler attached');
        return true;
    }
    
    // Initialize
    createPodcastOverlay();
    
    // Setup button with retry
    let attempts = 0;
    function trySetup() {
        if (setupButton()) {
            console.log('Custom podcast player ready!');
        } else if (attempts < 5) {
            attempts++;
            console.log(`Button setup attempt ${attempts} failed, retrying...`);
            setTimeout(trySetup, 500);
        } else {
            console.log('Could not find button after 5 attempts');
        }
    }
    
    trySetup();
})();