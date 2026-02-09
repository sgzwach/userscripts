// ==UserScript==
// @name           Slate Fixes - Committee
// @namespace      http://github.com/sgzwach
// @version        2026-02-09
// @description    try to take over the world!
// @author         shawn
// @match          https://apply.dsu.edu/manage/reader/*
// @icon           https://www.google.com/s2/favicons?sz=64&domain=dsu.edu
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/slate-reader-fixes.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/slate-reader-fixes.user.js
// @grant          none
// @run-at         document-start
// ==/UserScript==

(function() {
    'use strict';

    const mo = new MutationObserver(() => {
        const el = document.querySelector("tr.locked");
        if (el) {
            console.log("Changed...");
            // remove the locked css class and make the whole works clickable
            var rows = document.querySelectorAll("tr.locked");
            rows.forEach((e) => {
                e.classList.remove("locked");
                var disp = e.querySelector(".display");
                e.querySelectorAll("td").forEach((t) => {
                    t.addEventListener("click", function() {
                        disp.click();
                    });
                });
            });
        }
    });
    mo.observe(document.documentElement, {childList: true, subtree: true});
})();
