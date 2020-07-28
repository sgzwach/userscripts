// ==UserScript==
// @name           RealmHintMagic
// @namespace      http://github.com/sgzwach
// @version        0.2
// @description    Auto fill DSU realm hint
// @author         shawn
// @match          https://adfs.sdbor.edu/adfs/ls*
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/adfs-realmhint.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/adfs-realmhint.user.js

// @grant          none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function() {
        document.getElementById("emailInput").value = "@dsu.edu";
        document.getElementsByClassName('submit')[0].click();
    }, false);
})();
