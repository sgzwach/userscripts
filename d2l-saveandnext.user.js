// ==UserScript==
// @name           Autosave Grade Updates on D2L
// @namespace      http://github.com/sgzwach
// @version        1.30
// @description    Saves grade changes within D2L automatically when "Next student" is clicked in the dropbox. Also, autoopen the first doc.
// @author         Shawn
// @match          https://d2l.sdbor.edu/d2l/le/activities/iterator/*
// @grant          none
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-saveandnext.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-saveandnext.user.js
// ==/UserScript==

(function() {
    'use strict';

    function findModalSaveButton() {
        var modalSaveButton = document.querySelector('.d2l-token-receiver').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('d2l-consistent-evaluation-dialogs').shadowRoot.querySelector('[data-dialog-action="save"]');
        try {
            modalSaveButton.click();
        }
        catch {}
    }

    function openDocument() {
        var documentButton = document.querySelector('.d2l-token-receiver').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('d2l-template-primary-secondary').querySelector('d2l-consistent-evaluation-left-panel').shadowRoot.querySelector('d2l-consistent-evaluation-evidence-assignment').shadowRoot.querySelector('d2l-consistent-evaluation-assignments-submissions-page').shadowRoot.querySelector('d2l-consistent-evaluation-assignments-submission-item').shadowRoot.querySelector('.truncate');
        documentButton.click();
    }

    new MutationObserver(function(mutations) {
        if (mutations.length >= 1)
            setTimeout(openDocument, 1000);
    }).observe(
        document.querySelector('title'),
        { subtree: true, characterData: true, childList: true }
    );

    new MutationObserver(function(mutations) {
        if (mutations.length >= 1)
            setTimeout(function(){findModalSaveButton();}, 300);
    }).observe(
        document.querySelector('body'),
        { attributes: true }
    );

})();
