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