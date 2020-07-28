// ==UserScript==
// @name         RealmHintMagic
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto fill DSU realm hint
// @author       shawn
// @match        https://adfs.sdbor.edu/adfs/ls*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function() {
        var x = document.getElementById("emailInput");
        x.value = "@dsu.edu";
        var y = document.getElementsByClassName('submit')[0];
        y.click();
    }, false);
})();
