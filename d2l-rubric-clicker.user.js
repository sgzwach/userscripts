// ==UserScript==
// @name           Default Rubric Settings
// @namespace      http://github.com/sgzwach
// @version        0.7
// @description    Set all rubric criteria to 100% on page load and only remove points
// @author         Shawn
// @match          https://d2l.sdbor.edu/d2l/le/activities/iterator/*
// @grant          none
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-rubric-clicker.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-rubric-clicker.user.js
// ==/UserScript==

(function() {
    'use strict';

    function rubricMark() {
        // Thanks to Kyle K for identifying the new elipsis menu that allows "Set All" options!
        // As of 10/2025 tab index 0 is the default left orrientation
        // Tyler orrientation, or right most, is the FIRST tab index -1 in the list.
        // Find, click, bubble!
        var btn = document.querySelector('d2l-consistent-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('consistent-evaluation-right-panel').shadowRoot.querySelector('consistent-evaluation-right-panel-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-right-panel-rubric').shadowRoot.querySelector('d2l-rubric').shadowRoot.querySelector('d2l-rubric-adapter').shadowRoot.querySelector('d2l-rubric-select-all-dropdown').shadowRoot.querySelector('d2l-menu').querySelector('[tabindex="0"]');


        // Tyler orrientation below
        // var btn = document.querySelector('d2l-consistent-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('consistent-evaluation-right-panel').shadowRoot.querySelector('consistent-evaluation-right-panel-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-right-panel-rubric').shadowRoot.querySelector('d2l-rubric').shadowRoot.querySelector('d2l-rubric-adapter').shadowRoot.querySelector('d2l-rubric-select-all-dropdown').shadowRoot.querySelector('d2l-menu').querySelector('[tabindex="-1"]');
        btn.click();

        // enable or disable opening rubric here. Default is to open; comment to disable.
        var rubricdrop = document.querySelector('d2l-consistent-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('consistent-evaluation-right-panel').shadowRoot.querySelector('consistent-evaluation-right-panel-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-right-panel-rubric').shadowRoot.querySelector('d2l-rubric').shadowRoot.querySelector('d2l-rubric-adapter').shadowRoot.querySelector('d2l-collapsible-panel').shadowRoot.querySelector('d2l-icon-custom.d2l-skeletize');
        rubricdrop.click()
    }

    var mo_username = new MutationObserver(function(mutations){
        if (mutations.length >= 1) {
            setTimeout(rubricMark, 1000);
        }
    });

    // monitor body mutations until title is added, then use that to trigger rubric fill on new student
    var mo_body = new MutationObserver(function(mutations) {
        if (mutations.length >= 1) {
            for (var i in mutations) {
                if (mutations[i].type == "childList" && mutations[i].addedNodes.length >= 1) {
                    // once title is created, mutate on username changes and disable this observer
                    for (var j = 0; j < mutations[i].addedNodes.length; j++) {
                        if (mutations[i].addedNodes[j].localName == "title") {
                            mo_username.observe(document.querySelector('d2l-consistent-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('d2l-consistent-evaluation-learner-context-bar').shadowRoot.querySelector('d2l-consistent-evaluation-lcb-user-context').shadowRoot.querySelector('.d2l-consistent-evaluation-lcb-user-name'), {characterData: true, subtree: true, childList: true});
                            setTimeout(rubricMark, 1000);
                            this.disconnect();
                        }
                    }
                }
            }
        }
    }).observe(
        document,
        { subtree: true, characterData: true, childList: true }
    );

})();
