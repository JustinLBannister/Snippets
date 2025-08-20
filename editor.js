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

// Check what's happening with the data
var vm = ko.contextFor(document.getElementById('load-more')).$root;

console.log('=== DEBUGGING DUPLICATE ===');
console.log('show():', vm.show());
console.log('Total items:', vm.filteredItems().length);

// Check the first few items in knockout section
console.log('First 3 knockout items:');
for(let i = 0; i < 3; i++) {
    console.log(`Index ${i}:`, vm.filteredItems()[i]?.title);
}

// Check items around index 9
console.log('Items around index 9:');
for(let i = 8; i < 12; i++) {
    console.log(`Index ${i}:`, vm.filteredItems()[i]?.title);
}