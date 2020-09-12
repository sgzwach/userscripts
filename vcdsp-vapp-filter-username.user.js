// ==UserScript==
// @name         Skip VM Page VDCHS
// @namespace    https://github.com/sgzwach/
// @version      0.1
// @description  On first load of SPA if we land on VMs instead of vApps brute our way to vApps and filter by username
// @author       shawn
// @match        https://vcloud.ialab.dsu.edu/tenant/learn/vdcs/*
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      http://code.jquery.com/jquery-3.5.1.min.js
// @updateURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/vcdsp-vapp-filter-username.user.js
// @downloadURL  https://raw.githubusercontent.com/sgzwach/userscripts/master/vcdsp-vapp-filter-username.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // nav to vApps
    waitForKeyElements('.nav-link.ng-star-inserted', function(node) {
        if (!node.hasClass('active') && node.children().length != 0 && node.children()[0].innerText == 'vApps')
        {
            console.log("vApps page found and inactive - clicking...");
            node.children()[0].click();
        }
    });

    // get username
    waitForKeyElements('.username', function(node) {
        var username = node.text();
        console.log("username found:" + username);
        console.log("searching for owner filter...");
        waitForKeyElements('.datagrid-column-title.ng-star-inserted', function(node){
            if (node.text() == ' Owner ')
            {
                console.log("Owner found! Adding filter...");
                console.log("Clicking filter link...");
                node.parent().children()[0].children[0].click();
                waitForKeyElements('vcd-string-filter', function(node) {
                    node.children()[0].value = username;
                    var CE = null;
                    CE = document.createEvent("HTMLEvents");
                    CE.initEvent("input", true, true);
                    var el = node.children()[0];
                    el.dispatchEvent(CE);
                    $("button.close").click();
                });

            }
        });
    });
})();
