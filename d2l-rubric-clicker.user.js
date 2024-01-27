// ==UserScript==
// @name           Default Rubric Settings
// @namespace      http://github.com/sgzwach
// @version        0.5
// @description    Set all rubric criteria to 100% on page load and only remove points
// @author         Shawn
// @match          https://d2l.sdbor.edu/d2l/le/activities/iterator/*
// @grant          none
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-rubric-clicker.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-rubric-clicker.user.js
// ==/UserScript==

(function() {
    'use strict';

    var lock = false;
    var rubriclock = false;
    var retries = 0;
    function clickCriterion() {
        if (lock || retries > 100) {
            return;
        }
        lock = true;
        var md = new Event("mousedown", {bubbles: true});
        var retries = 0;

        // wrap this entire disastor in a try catch loop - will spin up to 100 times
        retries += 1;
        try {
            // iterate over groups, finding left arrows and clicking as required
            //var groups = document.querySelector('d2l-consistent-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('#evaluation-template').querySelector('consistent-evaluation-right-panel').shadowRoot.querySelector('.d2l-consistent-evaluation-right-panel').querySelector('d2l-consistent-evaluation-rubric').shadowRoot.querySelector('d2l-consistent-evaluation-right-panel-block').querySelector('d2l-rubric').shadowRoot.querySelector('d2l-rubric-adapter').querySelector('d2l-rubric-criteria-groups').shadowRoot.querySelectorAll('d2l-rubric-criteria-group-mobile');
            var groups = document.querySelector('d2l-consistent-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('consistent-evaluation-right-panel').shadowRoot.querySelector('consistent-evaluation-right-panel-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-right-panel-rubric').shadowRoot.querySelector('d2l-rubric').shadowRoot.querySelector('d2l-rubric-adapter').querySelector('d2l-rubric-criteria-groups').shadowRoot.querySelectorAll('d2l-rubric-criteria-group-mobile');
            console.log("Groups", groups);
            if (groups.length == 0)
                throw new Error('no groups defined');
            var i, j;
            for (i = 0; i < groups.length; i++) {
                // in each group, look at each criterion
                var criterion = groups[i].shadowRoot.querySelectorAll('d2l-rubric-criterion-mobile');
                console.log("Criterion", criterion);
                if (criterion.length == 0)
                    throw new Error('no criterion defined');
                for (j = 0; j < criterion.length; j++) {
                    // check if a level is NOT selected
                    console.log(criterion[j].shadowRoot.querySelector('d2l-rubric-levels-mobile'));
                    console.log(criterion[j].shadowRoot.querySelector('d2l-rubric-levels-mobile').shadowRoot.querySelectorAll('div [aria-checked="true"]'))
                    // if there are no aria attributes, defer again
                    if (criterion[j].shadowRoot.querySelector('d2l-rubric-levels-mobile').shadowRoot.querySelectorAll('div [aria-checked]').length == 0)
                        throw new Error('no radio buttons defined');
                    if (criterion[j].shadowRoot.querySelector('d2l-rubric-levels-mobile').shadowRoot.querySelectorAll('div [aria-checked="true"]').length == 0) {
                        // click the left arrow to select the high level
                        criterion[j].shadowRoot.querySelector('d2l-rubric-levels-mobile').shadowRoot.querySelector('#left-iterator').dispatchEvent(md);
                    }
                }
            }
        } catch (err) {
            console.log("retrying...", err);
            setTimeout(clickCriterion, 1000);
        }
        lock = false;
        rubriclock = false;
        retries = 0;
    }


    function rubricMark() {
        var panel = document.querySelector('d2l-consistent-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('consistent-evaluation-right-panel').shadowRoot.querySelector('consistent-evaluation-right-panel-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-right-panel-rubric').shadowRoot.querySelector('d2l-rubric').shadowRoot.querySelector('d2l-rubric-adapter').shadowRoot.querySelector('d2l-collapsible-panel').shadowRoot.querySelector('d2l-icon-custom');
        if (panel == null) {
            console.log("panel still loading...");
            setTimeout(function(){rubricMark();}, 200);
            return;
        }
        console.log("Panel", panel);
        if (!rubriclock) {
            rubriclock = true;
            var cl = new Event("click", {bubbles: true});
            panel.dispatchEvent(cl);
            setTimeout(function(){clickCriterion()}, 1000);
        }
    }

    var mo_title = new MutationObserver(function(mutations){
        console.log("TITLE MUTATION!!!!");
        console.log(mutations);
        if (mutations.length >= 1) {
            setTimeout(rubricMark, 1000);
        }
    });

    // monitor body mutations until title is added, then use that to trigger rubric fill on new student
    var mo_body = new MutationObserver(function(mutations) {
        if (mutations.length >= 1) {
            //console.log(mutations);
            for (var i in mutations) {
                if (mutations[i].type == "childList" && mutations[i].addedNodes.length >= 1) {
                    //console.log(mutations[i].addedNodes);
                    // once title is created, mutate on that and kill this one
                    for (var j = 0; j < mutations[i].addedNodes.length; j++) {
                        console.log("Checking ", mutations[i].addedNodes[j]);
                        if (mutations[i].addedNodes[j].localName == "title") {
                            mo_title.observe(document.querySelector("title"), {characterData: true, subtree: true, childList: true});
                            rubricMark();
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
