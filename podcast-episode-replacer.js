// Podcast replacer that waits for dynamic content to load
(function() {
    console.log('⏳ Waiting for page content to load...');
    
    // Function to check if content is loaded and process
    function attemptReplacement(attemptNumber = 1) {
        console.log(`🔍 Attempt #${attemptNumber} - Checking for news items...`);
        
        // Get all news items
        const newsItems = document.querySelectorAll('.news-listing .white-box');
        
        if (newsItems.length === 0) {
            if (attemptNumber < 10) {
                console.log(`   No items found yet. Waiting 500ms and trying again...`);
                setTimeout(() => attemptReplacement(attemptNumber + 1), 500);
                return;
            } else {
                console.log('❌ No news items found after 5 seconds. Page structure may be different.');
                // Try alternative selectors
                console.log('🔍 Trying alternative selectors...');
                const altItems = document.querySelectorAll('.news-listing [class*="tile"]');
                console.log(`   Found ${altItems.length} items with alternative selector`);
                return;
            }
        }
        
        console.log(`📰 Found ${newsItems.length} news items`);
        
        // Find the first item that actually has a podcast episode
        let firstEpisodeUrl = null;
        let foundAtIndex = -1;
        let itemsChecked = [];
        
        for (let i = 0; i < newsItems.length; i++) {
            const iframe = newsItems[i].querySelector('.story-podcast-playing iframe');
            const title = newsItems[i].querySelector('h2')?.textContent?.trim() || `Item ${i + 1}`;
            
            if (iframe && iframe.src && iframe.src.includes('captivate.fm')) {
                firstEpisodeUrl = iframe.src;
                foundAtIndex = i + 1;
                console.log(`✅ Found podcast in item #${foundAtIndex}: "${title}"`);
                break;
            } else {
                itemsChecked.push(`   #${i + 1}: ${title} - No podcast`);
            }
        }
        
        // Log items checked
        if (itemsChecked.length > 0 && foundAtIndex === -1) {
            console.log('📋 Items checked:');
            itemsChecked.forEach(item => console.log(item));
        }
        
        if (!firstEpisodeUrl) {
            console.log('❌ No podcast episodes found in any news items');
            return {
                success: false,
                message: 'No podcast episodes available'
            };
        }
        
        // Extract episode ID
        const extractEpisodeId = (url) => {
            const match = url.match(/episode\/([a-f0-9-]+)\//);
            return match ? match[1] : 'unknown';
        };
        
        const newEpisodeId = extractEpisodeId(firstEpisodeUrl);
        console.log(`🎙️ Episode ID to use: ${newEpisodeId}`);
        
        // Find the hero/main podcast player
        const heroPlayer = document.querySelector('.podcast-playing.story-podcast-playing iframe');
        
        if (!heroPlayer) {
            console.log('⏳ Hero player not found, waiting for it...');
            if (attemptNumber < 10) {
                setTimeout(() => attemptReplacement(attemptNumber + 1), 500);
                return;
            }
            console.log('❌ Hero player not found after multiple attempts');
            return;
        }
        
        // Get current episode
        const oldEpisodeId = extractEpisodeId(heroPlayer.src);
        
        if (oldEpisodeId === newEpisodeId) {
            console.log('ℹ️ Hero player already has this episode');
            return;
        }
        
        // Replace the source
        console.log('🔄 Replacing hero player episode...');
        console.log(`   Old: ${oldEpisodeId}`);
        console.log(`   New: ${newEpisodeId}`);
        
        heroPlayer.src = firstEpisodeUrl;
        
        console.log('✨ Successfully updated hero podcast player!');
        return {
            success: true,
            foundAtPosition: foundAtIndex,
            oldEpisodeId: oldEpisodeId,
            newEpisodeId: newEpisodeId
        };
    }
    
    // Start the replacement process
    attemptReplacement();
})();