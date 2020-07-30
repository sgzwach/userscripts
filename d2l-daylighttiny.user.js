// ==UserScript==
// @name           D2L Daylight Tiny
// @namespace      http://github.com/sgzwach
// @version        0.2
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

})();
