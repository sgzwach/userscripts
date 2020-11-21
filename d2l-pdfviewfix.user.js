// ==UserScript==
// @name           D2L Default PDF View Fix
// @namespace      http://github.com/sgzwach
// @version        0.1
// @description    Fill the parent div with the pdf viewer (doesn't break for docx for some reason)
// @author         Shawn
// @match          https://d2l.sdbor.edu/d2l/le/dropbox/documents/*
// @grant          none
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-pdfviewfix.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-pdfviewfix.user.js
// @run-at         document-end
// ==/UserScript==

(function() {
    'use strict';

    // Set max to 100 on all the things
    $('html').css("height", "100%");
    $('body').css("height", "100%");
    $('.d2l-fileviewer').css("height", "100%");
    $('#ContentView').css("height", "100%");

})();
