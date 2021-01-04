// ==UserScript==
// @name           Add All Option for Advisees
// @namespace      http://github.com/sgzwach
// @version        0.2
// @description    List all advisees option and slight formatting changes
// @author         shawn
// @match          https://student.sdbor.edu/StudentSelfService/adviseeList/adviseeList
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant          GM_addStyle
// @run-at         document-end
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/banner-advisees.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/banner-advisees.user.js
// ==/UserScript==

(function() {
    'use strict';

    // remove excess info
    waitForKeyElements('.view-profile-button-list', function(node) {
        node.html(node.html().split("<br>")[0]);
    });

    // fix height issues
    waitForKeyElements('tr', function(node) {
        node.css("height", "auto");
    });

    // add all button
    waitForKeyElements('.page-size-select', function(node) {
        node.append(new Option("All",$(".records-info").text().split(" ")[1]));
    });
})();
