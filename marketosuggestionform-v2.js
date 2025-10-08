/* config area - replace with your instance values */
var mktoFormConfig = {
    podId : "//discover.rbccm.com",
    munchkinId : "577-RQV-784",
    formIds : [1376]
};

/* ---- NO NEED TO TOUCH ANYTHING BELOW THIS LINE! ---- */
function mktoFormChain(config) {
    /* util */
    var arrayify = getSelection.call.bind([].slice);
    /* const */
    var MKTOFORM_ID_ATTRNAME = "data-formId";
    
    /* fix inter-form label bug! */
    MktoForms2.whenRendered(function(form) {
        var formEl = form.getFormElem()[0],
            rando = "_" + new Date().getTime() + Math.random();
        
        arrayify(formEl.querySelectorAll("label[for]"))
            .map(function(labelEl){
                return {
                    label : labelEl,
                    for: formEl.querySelector('[id="' + labelEl.htmlFor + '"]')
                }
            })
            .forEach(function(labelDesc) {
                if(labelDesc.for){
                    if(!labelDesc.for.hasAttribute("data-uniquified")){
                        labelDesc.for.id = labelDesc.for.id + rando;
                        labelDesc.for.setAttribute("data-uniquified","true");
                    }
                    labelDesc.label.htmlFor = labelDesc.for.id;
                }
            });
    });
    
    /* chain, ensuring only one #mktoForm_nnn exists at a time */
    arrayify(config.formIds).forEach(function(formId) {
        var loadForm = MktoForms2.loadForm.bind(MktoForms2,config.podId,config.munchkinId,formId),
            formEls = arrayify(document.querySelectorAll("[" + MKTOFORM_ID_ATTRNAME + '="' + formId + '"]'));
        
        // FIX #2: Check if there are any containers for this form
        if (formEls.length === 0) {
            console.log('No container found for form ' + formId + '. Skipping.');
            return;
        }
        
        (function loadFormCb(formEls) {
            var formEl = formEls.shift();
            if (!formEl) return; // Extra safety check
            
            formEl.id = "mktoForm_" + formId;
            loadForm(function(form) {
                formEl.id = "";
                if (formEls.length) {
                    loadFormCb(formEls);
                }
            });
        })(formEls);
    });
}

// FIX #1: Wait for MktoForms2 to be available
(function initMarketoForm() {
    if (typeof MktoForms2 === 'undefined') {
        setTimeout(initMarketoForm, 50);
        return;
    }
    mktoFormChain(mktoFormConfig);
})();

I put a cap on the amount of time I went back, roughly 3.5 months and ~ 10 or so versions, but some pages looked like even further back into March the content was the same. Here's a breakdown:

Global Markets
6/4/25 Version 42 - Currently at version 53 9/24/25
No change

Commodities
6/5/25 Version 35 - Currently at version 45 9/26/25
No change

Debt Origination
6/4/25 Version 33 - Currently at version 42 9/26/25
(Our Approach has been added, but main content is the same.)

Electronic Trading/AI Trading
6/6/25 Version 60 - Currently at version 62 9/22/25
No change

Equities
6/9/25 Version 46 - Currently at version 53 9/26/25
No change

Equity Linked Products
6/4/25 Version 39 - Currently at version 50 9/26/25
No change

Foreign Exchange
6/3/25 Version 39 - Currently at version 50 9/26/25
No change

Fixed Income
6/4/25 Version 29 - Currently at version 38 9/26/25
(Our Approach has been added, but main content is the same.)

Global ETF Services
6/4/25 Version 36 - Currently at version 51 9/26/25
(Our Approach has been added, but main content is the same.)

Prime Brokerage
6/4/25 Version 32 - Currently at version 51 9/26/25
(Our Approach has been added, but main content is the same.)

