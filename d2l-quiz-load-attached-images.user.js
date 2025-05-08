// ==UserScript==
// @name         Load Quiz Attached Files
// @namespace    http://github.com/sgzwach/userscripts/
// @version      2025-05-06
// @description  If there are files included in D2L quiz responses, render them in the same table.
// @author       You
// @match        https://d2l.sdbor.edu/d2l/lms/quizzing/admin/mark/quiz_mark_attempt.d2l*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function loadFiles() {
        // Get all dfl class elements
        var dfls = document.querySelectorAll('.dfl');
        console.log(dfls);

        // for each of those, inject an image tag, if possible
        var allowed = ['jpg', 'png', 'jpeg', 'gif'];

        for (var i = 0; i < dfls.length; i++) {
            var link = dfls[i].firstChild.href;
            var re = /\/.*\.(.*)\?/;
            if (re.test(link)) {
                if (allowed.includes(link.match(re)[1].toLowerCase())) {
                    var img = document.createElement('img');
                    img.src = link;
                    dfls[i].appendChild(img);
                }
            }
        }
    }

    setTimeout(loadFiles, 1000);

})();
