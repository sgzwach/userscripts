// ==UserScript==
// @name           RealmHintMagic
// @namespace      http://github.com/sgzwach
// @version        0.5
// @description    Auto fill DSU realm hint
// @author         shawn
// @match          https://adfs.sdbor.edu/adfs/ls*
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/adfs-realmhint.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/adfs-realmhint.user.js
// @require        http://code.jquery.com/jquery-3.4.1.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant          none
// ==/UserScript==

(function() {
    'use strict';
    waitForKeyElements("#emailInput", function(node){
        document.getElementById("emailInput").value = "@dsu.edu";
        document.getElementsByClassName('submit')[0].click();
    });
})();
