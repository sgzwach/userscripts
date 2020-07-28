// ==UserScript==
// @name           Banner Styling
// @namespace      http://tampermonkey.net/
// @version        0.2
// @description    List all classes and format a touch better
// @author         shawn 
// @match          https://registration.sdbor.edu/StudentRegistrationSsb/ssb/classSearch/classSearch
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant          GM_addStyle
// @run-at         document-end
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/banner-browseclasses.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/banner-browseclasses.user.js
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle('.tooltip-row { display: block; }');
    waitForKeyElements('td', function (node) {
        if (node.attr("data-property") && node.data("property") == "attribute") {
            node.html(node.html().replace(/<br><br>/g, "<br>"));
        }
    });
    waitForKeyElements('.page-size-select', function(node) {
        node.append(new Option("All",$(".results-out-of").text().split(" ")[0]));
    });
})();
