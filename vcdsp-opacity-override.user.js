// ==UserScript==
// @name           H5 WMKS Revert Opacity
// @namespace      https://github.com/sgzwach
// @version        0.2
// @description    If opacity is set to 50% and the wmks console is connected, reset to 100%
// @author         You
// @match          https://vcloud.ialab.dsu.edu/tenant/*/wmks-console/index.html*
// @grant          none
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/vcdsp-opacity-override.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/vcdsp-opacity-override.user.js
// ==/UserScript==

(function() {
    'use strict';

    // track style changes with MutationObserver RE: https://stackoverflow.com/a/20683311
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            // if the canvas changed - check its opacity
            var canvas = document.getElementById('mainCanvas');
            var retry = document.getElementById('retryConnect');
            console.log("Mutation hit. Current opacity: ", canvas.style.opacity);
            if (canvas.style.opacity == .5) {
                // if the opacity is .5 AND the status is Connected, clear the opacity; else if retry is visible - click it
                var status = document.getElementById('status');
                if (status.innerText == "Connected.") {
                    console.log("Status appears connected; resetting opacity");
                    canvas.style.opacity = 1;
                } else if (retry.offsetParent != null) { // only null if hidden
                    console.log("Disconnection detected - retry available; clicking...");
                    retry.click();
                }
            }
        });
    });
    var target = document.getElementById('mainCanvas');
    observer.observe(target, {attributes: true, attributeFilter: ['style']});
})();
