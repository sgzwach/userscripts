// ==UserScript==
// @name           Banner Styling
// @namespace      http://github.com/sgzwach
// @version        0.4
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
    //GM_addStyle('.tooltip-row { display: block; }'); // Old method of pretty printing Meeting Times

    // Hide last column as it's useless
    GM_addStyle('[data-property="add"] { display: none !important; }');

    // Hide GenEd Honors Details as it's useless (usually) too
    GM_addStyle('[data-property="attribute"] { display: none !important; }');

    // reduce breaks in (now hidden) GenEd/Honors Details
    /*waitForKeyElements('td', function (node) {
        if (node.attr("data-property") && node.data("property") == "attribute") {
            node.html(node.html().replace(/<br><br>/g, "<br>"));
        }
    });*/

    // add select all option
    waitForKeyElements('.page-size-select', function(node) {
        node.append(new Option("All",$(".results-out-of").text().split(" ")[0]));
    });

    // fixup meeting info
    waitForKeyElements('.meeting', function(node) {
        // online flag
        var online = false;
        // iterate over child nodes
        node.children().each(function(){
            // Extract innerText
            var txt = $(this).text();

            // Hide blank times
            if (!$(this).attr('class') && txt.trim() == "-")
                $(this).text("No meeting times listed");

            // Hide online attributes
            if (txt.includes("Internet") || txt.includes("INTERNET") || (txt.includes("None") && $(this).attr('class') != 'ui-pillbox')) {
                $(this).hide();
                online = true;
            }

            // Hide type as it doesn't seem relevant ever
            if (txt.includes("Type"))
                $(this).hide();

            // Building/Start on next line
            if (txt.includes("Building") || txt.includes("Start"))
                $(this).html("<br>" + $(this).html());

            // Standardize building deets for online/remote
            if (txt.includes("Building") && online) {
                $(this).html("<br><span>Building: </span>Remote / Online");
                $(this).show();
            }
        });
    });
})();
