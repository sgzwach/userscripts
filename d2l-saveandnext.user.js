// ==UserScript==
// @name           Autosave Grade Updates on D2L
// @namespace      http://github.com/sgzwach
// @version        1.2
// @description    Saves grade changes within D2L automatically when "Next student" is clicked in the dropbox. Also, autoopen the first doc.
// @author         Shawn
// @match          https://d2l.sdbor.edu/d2l/le/activities/iterator/*
// @grant          none
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-saveandnext.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-saveandnext.user.js
// ==/UserScript==

(function() {
    'use strict';

    function inTheShadows() {
        var tokenReceiver = document.querySelector('.d2l-token-receiver');
        var saveButton = tokenReceiver.shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('d2l-template-primary-secondary').querySelector('d2l-consistent-evaluation-footer-presentational').shadowRoot.querySelector('#consistent-evaluation-footer-save-draft').shadowRoot.querySelector('.d2l-label-text');
        var nextButton = tokenReceiver.shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('d2l-template-primary-secondary').querySelector('d2l-consistent-evaluation-footer-presentational').shadowRoot.querySelector('#consistent-evaluation-footer-next-student').shadowRoot.querySelector('[title="Next Student"]');
        var topNextButton = tokenReceiver.shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('d2l-template-primary-secondary').querySelector('d2l-consistent-evaluation-nav-bar').shadowRoot.querySelector('d2l-navigation-iterator').shadowRoot.querySelector('d2l-navigation-iterator-item').shadowRoot.querySelector('d2l-navigation-button').shadowRoot.querySelector('.d2l-focusable');
        var documentButton = tokenReceiver.shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('d2l-template-primary-secondary').querySelector('d2l-consistent-evaluation-left-panel').shadowRoot.querySelector('d2l-consistent-evaluation-evidence-assignment').shadowRoot.querySelector('d2l-consistent-evaluation-submissions-page').shadowRoot.querySelector('d2l-consistent-evaluation-submission-item').shadowRoot.querySelector('.truncate');
        documentButton.click();
        nextButton.addEventListener("click", function(){saveButton.click();});
    }

    function openDocument() {
        var documentButton = document.querySelector('.d2l-token-receiver').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('d2l-template-primary-secondary').querySelector('d2l-consistent-evaluation-left-panel').shadowRoot.querySelector('d2l-consistent-evaluation-evidence-assignment').shadowRoot.querySelector('d2l-consistent-evaluation-submissions-page').shadowRoot.querySelector('d2l-consistent-evaluation-submission-item').shadowRoot.querySelector('.truncate');
        documentButton.click();
    }

    setTimeout(inTheShadows, 3000);

    new MutationObserver(function(mutations) {
        if (mutations.length >= 1)
            setTimeout(openDocument, 1000);
    }).observe(
        document.querySelector('title'),
        { subtree: true, characterData: true, childList: true }
    );

})();
