/* -----------------------------------------------------------
   Marketo Imagine Subscribe Form Loader
   Step 1: Form 1232  -> basic info + business email validation
   Step 2: Form 1182  -> follow-up preferences
----------------------------------------------------------- */
(function () {
  var MARKETO = {
    baseUrl: '//discover.rbccm.com',
    munchkinId: '577-RQV-784',
    stepOneFormId: 1232,
    stepTwoFormId: 1182,
    containerSelector: '#mkto_wrap'
  };

  function loadScript(src, id) {
    return new Promise(function (resolve, reject) {
      if (id && document.getElementById(id)) {
        resolve();
        return;
      }
      var s = document.createElement('script');
      if (id) s.id = id;
      s.src = src;
      s.async = true;
      s.onload = function () { resolve(); };
      s.onerror = function () {
        console.error('Failed to load script:', src);
        reject(new Error('Failed to load ' + src));
      };
      (document.head || document.body).appendChild(s);
    });
  }

  function ensureMktoForms2() {
    return new Promise(function (resolve, reject) {
      if (window.MktoForms2) return resolve(window.MktoForms2);

      loadScript(MARKETO.baseUrl + '/js/forms2/js/forms2.min.js', 'mkto-forms2-script')
        .then(function () {
          var start = Date.now();
          (function waitForMkto() {
            if (window.MktoForms2) return resolve(window.MktoForms2);
            if (Date.now() - start > 8000) {
              return reject(new Error('Timed out waiting for MktoForms2'));
            }
            requestAnimationFrame(waitForMkto);
          })();
        })
        .catch(reject);
    });
  }

  function injectLinkedInAutofill() {
    var subContent = document.getElementById('sub-content');
    if (!subContent) return;

    var autofillDiv = document.getElementById('autofill');
    if (!autofillDiv) {
      autofillDiv = document.createElement('div');
      autofillDiv.id = 'autofill';
      subContent.appendChild(autofillDiv);
    }

    loadScript('https://www.linkedin.com/autofill/js/autofill.js', 'linkedin-autofill-js')
      .then(function () {
        var initScript = document.getElementById('linkedin-autofill-init');
        if (!initScript) {
          initScript = document.createElement('script');
          initScript.id = 'linkedin-autofill-init';
          initScript.type = 'text/javascript';
          initScript.setAttribute('data-form', 'mktoForm_' + MARKETO.stepOneFormId);
          initScript.setAttribute('data-field-firstname', 'FirstName');
          initScript.setAttribute('data-field-lastname', 'LastName');
          initScript.setAttribute('data-field-email', 'Email');
          initScript.setAttribute('data-field-company', 'Company');
          initScript.setAttribute('data-field-title', 'Title');
          autofillDiv.appendChild(initScript);
        }

        var isSafari =
          navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
          navigator.userAgent &&
          navigator.userAgent.indexOf('CriOS') === -1 &&
          navigator.userAgent.indexOf('FxiOS') === -1;

        if (isSafari) {
          autofillDiv.style.display = 'none';
        }
      })
      .catch(function (err) {
        console.error('LinkedIn Autofill load error:', err);
      });
  }

  function initMarketoForm() {
    var container = document.querySelector(MARKETO.containerSelector);
    if (!container) return; // not on this page

    ensureMktoForms2()
      .then(function (MktoForms2) {
        // STEP 1: Load form 1232
        MktoForms2.loadForm(
          MARKETO.baseUrl,
          MARKETO.munchkinId,
          MARKETO.stepOneFormId,
          function (form1) {
            // Move the generated form into #mkto_wrap (in case Marketo puts it elsewhere)
            var formEl1 = form1.getFormElem()[0];
            container.innerHTML = '';
            container.appendChild(formEl1);

            // Make width flexible
            try {
              form1.getFormElem().css('width', 'auto');
            } catch (e) {}

            // Business-email-only validation for step 1
            var invalidDomains = ['@gmail.', '@hotmail.', '@live.', '@aol.', '@outlook.'];

            function isBusinessEmail(email) {
              for (var i = 0; i < invalidDomains.length; i++) {
                if (email.indexOf(invalidDomains[i]) !== -1) {
                  return false;
                }
              }
              return true;
            }

            form1.onValidate(function () {
              var vals = form1.vals();
              var email = vals.Email;

              if (email && !isBusinessEmail(email)) {
                form1.submitable(false);
                var emailElem = form1.getFormElem().find('#Email');
                form1.showErrorMessage('Must be Business email.', emailElem);
              } else {
                form1.submitable(true);
              }
            });

            // On success of step 1:
            //  - update heading to "Thank you!"
            //  - load form 1182 into #mkto_wrap
            form1.onSuccess(function (vals, thankYouURL) {
              var email = vals.Email;

              // Update copy
              var subPre = document.getElementById('sub-pre');
              if (subPre) {
                subPre.innerHTML =
                  '<h2 style="margin-top: 0;">Thank you!</h2>' +
                  '<p style="color: #002144;">We\'ll send you an email with a link to download your ' +
                  'RBC Imagine&trade; <strong>Preparing for Hyperdrive</strong> report.</p>';
              }

              // Clear first form and load step 2 (1182)
              container.innerHTML = '';

              MktoForms2.loadForm(
                MARKETO.baseUrl,
                MARKETO.munchkinId,
                MARKETO.stepTwoFormId,
                function (form2) {
                  var formEl2 = form2.getFormElem()[0];
                  container.appendChild(formEl2);

                  try {
                    form2.getFormElem().css('width', 'auto');
                  } catch (e) {}

                  // Pass email from step 1 into hidden field on step 2
                  if (email) {
                    form2.addHiddenFields({
                      Email: email
                    });
                  }

                  // Final success for step 2: stay on page, do nothing fancy
                  form2.onSuccess(function (vals2, thankYou2) {
                    // ORIGINAL onFinalSuccess cleared mkto_wrap; if you want that:
                    // container.innerHTML = '';
                    return false;
                  });
                }
              );

              // Do NOT go to Marketo thank-you URL
              return false;
            });

            // Wire LinkedIn autofill to step 1
            injectLinkedInAutofill();
          }
        );
      })
      .catch(function (err) {
        console.error('Marketo init error:', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMarketoForm);
  } else {
    initMarketoForm();
  }
})();

<section id="subscription" style="margin-top: 0px;">
  <div style="background-color: #e8eef1;">
    <div id="subscribe-form" style="padding: 50px 0;">
      <div class="container">
        <div id="sub-content">
          <div id="sub-pre">
            <h2 style="margin-top: 0;">Stay in front of a rapidly evolving future</h2>
            <p style="color: #002144;">
              Get the latest RBC Imagine&trade; insights and reports delivered to your inbox.
            </p>
          </div>

          <!-- JS will inject <form id="mktoForm_1232"> here -->
          <div id="mkto_wrap">&nbsp;</div>
        </div>
      </div>
    </div>
  </div>
</section>