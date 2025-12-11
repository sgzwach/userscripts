// ==UserScript==
// @name         D2L Max Results
// @namespace    http://github.com/sgzwach
// @version      0.3
// @description  Finds elements of d2l-select class that have the title "Results Per Page" and selects the max default item.
// @author       shawn
// @match        https://d2l.sdbor.edu/d2l/lms/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-maxresults.user.js
// @downloadURL  https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-maxresults.user.js
// ==/UserScript==

(function() {
    'use strict';
    var allSelects = document.getElementsByClassName('d2l-select');

    // This is clunky but works
    var i;
    var resultsSel = null;
    var label = null;
    for (i=0; i < allSelects.length; i++) {
        label = document.querySelector('.d2l-offscreen[for="' + allSelects[i].id + '"]');
        if (label) {
            label = label.innerText;
        }
        if (label == "Results Per Page") {
            resultsSel = allSelects[i];
            break;
        }
    }
    if (resultsSel) {
        // get max index
        var maxi = resultsSel.length - 1;

        // check selection
        if (resultsSel.selectedIndex != maxi) {
            // set index if not max
            resultsSel.selectedIndex = maxi;
            // fire change event
            resultsSel.dispatchEvent(new Event("change"));
        }
    }

})();
