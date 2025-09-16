// Podcast episode replacer that finds first item WITH a podcast episode
(function() {
    console.log('🔍 Starting podcast episode replacement...');
    
    // Get all news items
    const newsItems = document.querySelectorAll('.news-listing .white-box');
    console.log(`📰 Found ${newsItems.length} total news items`);
    
    // Find the first item that actually has a podcast episode
    let firstEpisodeUrl = null;
    let foundAtIndex = -1;
    let itemsWithoutPodcast = [];
    
    for (let i = 0; i < newsItems.length; i++) {
        const iframe = newsItems[i].querySelector('.story-podcast-playing iframe');
        
        if (iframe && iframe.src && iframe.src.includes('player.captivate.fm')) {
            firstEpisodeUrl = iframe.src;
            foundAtIndex = i + 1;
            console.log(`✅ Found podcast in item #${foundAtIndex}`);
            
            // Get the article title for reference
            const title = newsItems[i].querySelector('h2')?.textContent?.trim();
            if (title) {
                console.log(`   Title: "${title}"`);
            }
            break;
        } else {
            // Track items without podcasts
            const title = newsItems[i].querySelector('h2')?.textContent?.trim() || 'Untitled';
            itemsWithoutPodcast.push(`#${i + 1}: ${title}`);
        }
    }
    
    // Log items that didn't have podcasts
    if (itemsWithoutPodcast.length > 0 && foundAtIndex > 1) {
        console.log(`⏭️ Skipped ${foundAtIndex - 1} items without podcasts:`);
        itemsWithoutPodcast.slice(0, foundAtIndex - 1).forEach(item => {
            console.log(`   - ${item}`);
        });
    }
    
    if (!firstEpisodeUrl) {
        console.log('❌ No podcast episodes found in any news items');
        return {
            success: false,
            message: 'No podcast episodes available in news listing'
        };
    }
    
    // Extract episode ID from URL
    const extractEpisodeId = (url) => {
        const match = url.match(/episode\/([a-f0-9-]+)\//);
        return match ? match[1] : 'unknown';
    };
    
    const newEpisodeId = extractEpisodeId(firstEpisodeUrl);
    console.log(`🎙️ Episode ID to use: ${newEpisodeId}`);
    
    // Find the hero/main podcast player
    const heroPlayer = document.querySelector('.podcast-playing.story-podcast-playing iframe');
    
    if (!heroPlayer) {
        console.log('❌ Hero podcast player not found');
        return {
            success: false,
            message: 'Could not find hero podcast player'
        };
    }
    
    // Get current episode for comparison
    const oldEpisodeId = extractEpisodeId(heroPlayer.src);
    
    if (oldEpisodeId === newEpisodeId) {
        console.log('ℹ️ Hero player already has this episode');
        return {
            success: true,
            message: 'Already up to date',
            episodeId: newEpisodeId
        };
    }
    
    // Replace the source
    console.log('🔄 Replacing hero player episode...');
    console.log(`   Old episode: ${oldEpisodeId}`);
    console.log(`   New episode: ${newEpisodeId}`);
    
    heroPlayer.src = firstEpisodeUrl;
    
    // Verify the update
    if (heroPlayer.src === firstEpisodeUrl) {
        console.log('✨ Successfully updated hero podcast player!');
        return {
            success: true,
            foundAtPosition: foundAtIndex,
            oldEpisodeId: oldEpisodeId,
            newEpisodeId: newEpisodeId,
            skippedItems: foundAtIndex - 1
        };
    } else {
        console.log('⚠️ Update may have failed - please verify');
        return {
            success: false,
            message: 'Could not verify update'
        };
    }
})();