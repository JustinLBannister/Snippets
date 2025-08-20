// TeamSite Editor Z-index Fix
if (window.location.href.includes('cmteamsite.fg.rbc.com/iw-cc/site/page/edit/pageEdit.sitepub')) {
    const editorNavFix = `
        /* Reduce navigation z-index in TeamSite editor only */
        .topnav {
            z-index: 999 !important;
        }
        
        .navbar-fixed-bottom,
        .navbar-fixed-top {
            z-index: 999 !important;
        }
        
        /* Optional: Add visual indicator that this is editor mode */
        .topnav::after {
            content: "EDITOR MODE - Z-INDEX REDUCED";
            position: absolute;
            top: -20px;
            right: 10px;
            background: #ff6b35;
            color: white;
            padding: 2px 8px;
            font-size: 10px;
            font-weight: bold;
            z-index: 1000;
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'teamsite-editor-nav-fix';
    styleElement.textContent = editorNavFix;
    document.head.appendChild(styleElement);
    
    console.log('TeamSite editor navigation z-index adjusted for better editing experience');
}

// Clear console, then run this:
var vm = ko.contextFor(document.getElementById('load-more')).$root;

console.log('=== DUPLICATE DEBUG ===');
console.log('Current show():', vm.show());
console.log('Items in initial section:', $('.initial .col-xs-12').length);
console.log('Items in knockout section (visible):', $('.insights-stories.ko .col-md-4:visible').length);

// Check which items are visible in knockout section
$('.insights-stories.ko .col-md-4:visible').each(function(index) {
    var title = $(this).find('h2').text().substring(0, 30);
    console.log(`Knockout item ${index}:`, title);
});

// In fetchYear success callback, modify this part:
// Instead of: e.items().push(o)
// Do this:
if (e.items().length >= 9) {
    e.items().push(o); // Only add items after the first 9
}