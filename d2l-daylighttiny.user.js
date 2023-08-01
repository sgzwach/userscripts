// ==UserScript==
// @name           D2L Daylight Tiny
// @namespace      http://github.com/sgzwach
// @version        0.3
// @description    Shrink the daylight theme where appropriate.
// @author         Shawn
// @match          https://d2l.sdbor.edu/d2l*
// @exclude        https://d2l.sdbor.edu/d2l/lms/dropbox/admin/mark/folder_user_mark.d2l*
// @grant          none
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-daylighttiny.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-daylighttiny.user.js
// @run-at         document-end
// ==/UserScript==

(function() {
    'use strict';

    // Shrink table cells
    $('td').css("padding", "0rem 0.5rem");
    $('th').css("padding", "0rem 0.5rem");

    // find and move dates in dropbox (bleh)

    // hack to wait a bit
    function moveThemDates() {
        if (window.location.pathname.includes("folders_manage")) {
            console.log("Let's move those dates");
            // get all dates
            var dates = document.querySelectorAll(".d2l-dates-text");
            for (var i = 0; i < dates.length; i++) {
                console.log(dates[i]);

                // move date to end-ish of cell
                var clr = dates[i].parentElement.parentElement.parentElement.children[0].querySelector(".clear");
                clr.parentNode.insertBefore(dates[i], clr);

                console.log(clr);

                // if there's a end date, snag that too
                var end = clr.parentElement.parentElement.parentElement.querySelector(".d2l-folderdate-wrapper-row");
                if (end) {
                    // add a dash to the due date
                    //var clone = dates[i].cloneNode();
                    //clr.parentNode.insertBefore(clone, clr);
                    var ele = document.createElement("strong");
                    ele.innerText = " / "
                    clr.parentNode.insertBefore(ele, clr);
                    clr.parentNode.insertBefore(end, clr);
                }
            }

        }

        // float dates right
        $('.d2l-dates-text').css("margin-left", "auto");

        // mop up unused cells
        var wrappers = document.querySelectorAll(".d2l-folderdates-wrapper");
        for (var i = 0; i < wrappers.length; i++) {
            wrappers[i].remove();
        }
    }
    moveThemDates();

})();
