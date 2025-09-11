// Track what player is currently active
var activePlayer = null; // 'video', 'audio', or null

function play_video() {
    var video_url = '//players.brightcove.net/6021289101001/eY0NaFfEF_default/index.html?videoId=6377123802112';
    
    // Remove any existing video player to prevent duplicates
    $(".page-banner .podcast-playing").remove();
    
    // Close audio player if it's open
    $(".podcast-player-wrapper").remove();
    
    var video_html = '<div class="podcast-playing img-stretch video-play" style="background: #000; min-height: 100px">' +
        '<button aria-label="Close Player" class="btn-close-video"><img src="/assets/rbccm/images/campaign/x.svg" alt="Close"></button>' +
        '<div style="position: relative;display: block;max-width: 1200px;margin: 0 auto;">' +
        '<div style="padding-top: 56.25%;">' +
        '<iframe frameborder="0" src="' + video_url + '" allowfullscreen="" allow="autoplay; encrypted-media; fullscreen" ' +
        'style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; width: 100%; height: 100%;"></iframe>' +
        '</div></div></div>';

    $(".page-banner").first().find(".header--story").hide();
    $(".page-banner").first().append(video_html);
    
    // Note: The original code references 'height' variable that isn't defined
    // You may want to define it or remove this line
    // $(".page-banner").first().find(".podcast-playing").css("min-height", height + "px").show();
    $(".page-banner").first().find(".podcast-playing").show();
    
    activePlayer = 'video';
}

$(document).ready(function () {
    // Video play button
    $(".watch-video-link").click(function () {
        play_video();
    });

    // Video close button - now using unique class
    $(document).on('click', '.btn-close-video', function () {
        $(this).parent(".podcast-playing").remove();
        $(".page-banner").first().find(".header--story").show();
        activePlayer = null;
    });
    
    // Audio play button from the inline player
    $(document).on("click", ".audio-play", function () {
        // Close video if it's playing
        if (activePlayer === 'video') {
            $(".page-banner .podcast-playing").remove();
            $(".page-banner").first().find(".header--story").show();
        }
        
        // Hide any currently visible inline podcast players
        $('.story-podcast-playing:visible').each(function () {
            var iframe = $(this).find("iframe");
            iframe.data("src", iframe.attr("src"));
            iframe.attr("src", "");
            $(this).hide();
        });

        // Show the selected inline podcast player
        var targetid = this.getAttribute("data-target");
        var podcastElement = $(document.getElementById(targetid));
        var iframe = podcastElement.find("iframe");

        if (!podcastElement.is(":visible")) {
            podcastElement.show();
            iframe.attr("src", iframe.data("src") || iframe.attr("src"));
        }
        
        activePlayer = 'audio-inline';
    });

    // Inline audio close button
    $(document).on("click", ".close-btn", function () {
        var podcastElement = $(this).closest(".story-podcast-playing");
        var iframe = podcastElement.find("iframe");
        
        podcastElement.hide();
        iframe.data("src", iframe.attr("src"));
        iframe.attr("src", "");
        
        // Only restore header if video wasn't playing
        if (activePlayer !== 'video') {
            activePlayer = null;
        }
    });
    
    // Bottom audio player button
    $(".btn-play-audio").click(function (event) {
        event.stopPropagation();
        
        // Close video if it's playing
        if (activePlayer === 'video') {
            $(".page-banner .podcast-playing").remove();
            $(".page-banner").first().find(".header--story").show();
        }
        
        // Hide inline podcast players
        $('.story-podcast-playing:visible').each(function () {
            var iframe = $(this).find("iframe");
            iframe.data("src", iframe.attr("src"));
            iframe.attr("src", "");
            $(this).hide();
        });

        // Toggle bottom audio player
        if ($(".podcast-player-wrapper").length > 0) {
            $(".podcast-player-wrapper").remove();
            activePlayer = null;
        } else {
            var podcastIframe = $("#podcast1 iframe")[0].outerHTML;
            podcastIframe = podcastIframe.replace(/height="[^"]*"/, 'height="200"');
            
            $("body").append(
                '<div class="podcast-player-wrapper" style="position:fixed;bottom:0;width:100%;background-color:#f9f9f9;z-index:9999;">' +
                '<button aria-label="Close Player" style="float: right;" class="btn-close-audio"><img src="/assets/rbccm/images/campaign/player-x.svg" alt="Close"></button>' +
                podcastIframe + '</div>'
            );
            
            activePlayer = 'audio-bottom';
        }
    });

    // Bottom audio close button - now using unique class
    $(document).on('click', '.btn-close-audio', function () {
        $(".podcast-player-wrapper").remove();
        activePlayer = null;
    });

    // Auto-play video if URL has 'watch' parameter
    var query = window.location.search;
    if (query.includes('watch')) {
        play_video();
    }
});