<section id="subscription" style="margin-top: 0;">
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

          <!-- Marketo form will be injected here -->
          <div id="mkto_wrap"></div>
        </div>
      </div>
    </div>
  </div>
</section>

/* -----------------------------------------------------------
   Marketo Imagine Subscribe Form Loader (Form 1232)
   - Simple markup hook: #mkto_wrap
   - Everything else is loaded via JS
----------------------------------------------------------- */
(function () {
  var MARKETO = {
    baseUrl: '//discover.rbccm.com',
    munchkinId: '577-RQV-784',
    formId: 1232,
    containerSelector: '#mkto_wrap'
  };

  function loadScript(src, id) {
    return new Promise(function (resolve, reject) {
      // Already present?
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
    // Create container once, if needed
    var subContent = document.getElementById('sub-content');
    if (!subContent) return;

    var autofillDiv = document.getElementById('autofill');
    if (!autofillDiv) {
      autofillDiv = document.createElement('div');
      autofillDiv.id = 'autofill';
      subContent.appendChild(autofillDiv);
    }

    // LinkedIn autofill script
    loadScript('https://www.linkedin.com/autofill/js/autofill.js', 'linkedin-autofill-js')
      .then(function () {
        // Data-init script (this is how LinkedIn knows which form/fields to wire)
        var initScript = document.getElementById('linkedin-autofill-init');
        if (!initScript) {
          initScript = document.createElement('script');
          initScript.id = 'linkedin-autofill-init';
          initScript.type = 'text/javascript';
          initScript.setAttribute('data-form', 'mktoForm_' + MARKETO.formId);
          initScript.setAttribute('data-field-firstname', 'FirstName');
          initScript.setAttribute('data-field-lastname', 'LastName');
          initScript.setAttribute('data-field-email', 'Email');
          initScript.setAttribute('data-field-company', 'Company');
          initScript.setAttribute('data-field-title', 'Title');
          autofillDiv.appendChild(initScript);
        }

        // Safari quirk: hide autofill UI if needed (copied from original logic)
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
        MktoForms2.loadForm(
          MARKETO.baseUrl,
          MARKETO.munchkinId,
          MARKETO.formId,
          function (form) {
            // Make width flexible
            try {
              if (form.getFormElem && form.getFormElem().css) {
                form.getFormElem().css('width', 'auto');
              }
            } catch (e) {
              // non-fatal
            }

            // Business-email-only validation
            var invalidDomains = ['@gmail.', '@hotmail.', '@live.', '@aol.', '@outlook.'];

            function isBusinessEmail(email) {
              for (var i = 0; i < invalidDomains.length; i++) {
                if (email.indexOf(invalidDomains[i]) !== -1) {
                  return false;
                }
              }
              return true;
            }

            form.onValidate(function () {
              var vals = form.vals();
              var email = vals.Email;

              if (email && !isBusinessEmail(email)) {
                form.submitable(false);
                var emailElem = form.getFormElem().find('#Email');
                form.showErrorMessage('Must be Business email.', emailElem);
              } else {
                form.submitable(true);
              }
            });

            // On success: change copy and stay on page
            form.onSuccess(function (vals, thankYouURL) {
              var subPre = document.getElementById('sub-pre');
              if (subPre) {
                subPre.innerHTML =
                  '<h2 style="margin-top: 0;">Thank you!</h2>' +
                  '<p style="color: #002144;">We&#39;ll send you an email with a link to download your ' +
                  'RBC Imagine&trade; <strong>Preparing for Hyperdrive</strong> report.</p>';
              }

              // Optional: clear the form area
              // container.innerHTML = '';

              // Prevent redirect to Marketo thank-you page
              return false;
            });

            // After form exists, wire up LinkedIn Autofill
            injectLinkedInAutofill();
          }
        );
      })
      .catch(function (err) {
        console.error('Marketo init error:', err);
      });
  }

  // Run on DOM ready, without touching your other listeners
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMarketoForm);
  } else {
    initMarketoForm();
  }
})();