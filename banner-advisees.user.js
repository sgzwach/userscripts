// ==UserScript==
// @name           Add All Option for Advisees and Fire It
// @namespace      http://github.com/sgzwach
// @version        0.4
// @description    List all advisees option and slight formatting changes; list link hack for the moment
// @author         shawn
// @match          https://student.sdbor.edu/StudentSelfService/adviseeList/adviseeList
// @match          https://student.sdbor.edu/StudentSelfService/ssb/adviseeList/adviseeList
// @match          https://student.sdbor.edu/StudentSelfService/ssb/termSelection*
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant          GM_addStyle
// @run-at         document-end
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/banner-advisees.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/banner-advisees.user.js
// ==/UserScript==

(function() {
    'use strict';

    // fire only on the adviseeList page
    if (window.location.pathname.includes('adviseeList')) {
        // flag to make sure we don't continuously reload
        var done = false;
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
            // this is a hack until they fix the api
            node.append(new Option("All",/*$(".records-info").text().split(" ")[1]*/250));
            if (!done) {
                done = true;
                $('.page-size-select option:contains(' + "All" + ')').prop('selected', 'selected');
                node.trigger('change');
            }
        });
    }
    else if (window.location.pathname.includes('termSelection')) {
        document.getElementsByClassName('view-roster')[0].href = "https://student.sdbor.edu/StudentSelfService/adviseeList/adviseeList";
    }
})();
