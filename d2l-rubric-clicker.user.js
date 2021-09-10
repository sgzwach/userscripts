// ==UserScript==
// @name           Default Rubric Settings
// @namespace      http://github.com/sgzwach
// @version        0.1
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
        var tokenReceiver = document.querySelector('.d2l-token-receiver');
        var rubricGroups = tokenReceiver.shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('d2l-template-primary-secondary').querySelector('consistent-evaluation-right-panel').shadowRoot.querySelector('d2l-consistent-evaluation-rubric').shadowRoot.querySelector('d2l-consistent-evaluation-right-panel-block').querySelector('d2l-rubric').shadowRoot.querySelector('d2l-rubric-adapter').querySelector('d2l-rubric-criteria-groups').shadowRoot.querySelectorAll('d2l-rubric-criteria-group-mobile');
        console.log(rubricGroups);

        for (var i = 0; i < rubricGroups.length; i++) {
            var criteria = rubricGroups[i].shadowRoot.querySelector('d2l-rubric-criteria-mobile');
            var mobileAdapters = criteria.shadowRoot.querySelectorAll('d2l-rubric-criterion-mobile-adapter');
            console.log(mobileAdapters);
            for (var j = 0; j < mobileAdapters.length; j++) {
                // this is leftmost button
                var rad = mobileAdapters[j].shadowRoot.querySelector('d2l-rubric-criterion-mobile').shadowRoot.querySelector('d2l-rubric-levels-mobile').shadowRoot.querySelector('#level0');

                // validate that button should be activated, before mousedown
                var checked = mobileAdapters[j].shadowRoot.querySelector('d2l-rubric-criterion-mobile').shadowRoot.querySelector('d2l-rubric-levels-mobile').shadowRoot.querySelectorAll('div [aria-checked="true"]');
                if (checked.length == 0) {
                    rad.dispatchEvent(new Event('mousedown'));
                    rad.dispatchEvent(new Event('mouseup'));
                }
            }
        }

        /*console.log(saveButton);
        console.log(nextButton);
        console.log(topNextButton);
        nextButton.addEventListener("click", function(){saveButton.click();});*/
    }

    //setTimeout(rubricMark, 4000);
    new MutationObserver(function(mutations) {
        if (mutations.length >= 1)
            setTimeout(rubricMark, 1000);
    }).observe(
        document.querySelector('title'),
        { subtree: true, characterData: true, childList: true }
    );

})();
