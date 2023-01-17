// ==UserScript==
// @name         VCD VMRC button add
// @namespace    http://github.com/sgzwach
// @version      0.3
// @description  a hack to clone the elements from the context menu to the table view
// @author       shawn
// @match        https://vcloud.ialab.dsu.edu/*
// @updateURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/vcdsp-vmrc-btn.user.js
// @downloadURL  https://raw.githubusercontent.com/sgzwach/userscripts/master/vcdsp-vmrc-btn.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dsu.edu
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var lock = false;

    new MutationObserver(function(mutations) {
        if (mutations.length >= 1 && window.location.toString().includes("vcd-vapp-vms")) {
            createLinks();
        } else {
            lock = false;
        }
    }).observe(
        document.querySelector('body'),
        { subtree: true, childList: true }
    );

    // this isn't great (but for a first pass that works we'll use it for now)
    function createLinks() {
        if (lock) {
            return;
        }
        var ell = document.querySelectorAll('[shape|=ellipsis-vertical]');
        if (ell.length >= 1 && window.location.toString().includes("vcd-vapp-vms")) { // if there are VMs in the table and we're on the vApp VM list page
            lock = true; // prevent further changes
            console.log("Creating links...");
            // for each VM, edit the web console link and add our own
            for (var i = 0; i < ell.length; i++) {
                var a = document.createElement('a');
                a.classList.add('vmrc_btn');
                a.classList.add('card-btn-link'); // blue color
                a.setAttribute('role', 'button');
                a.innerText = "VMRC";
                var concell = ell[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.vm-console-cell');
                // fix console text, button width, and wrapping
                var vmc = concell.firstChild.children[1];
                vmc.innerText = '';
                concell.firstChild.style.width = "auto";
                concell.firstChild.style.float = "left";
                concell.append(" | ", a);
            }
            // bind event listeners for clicks on our new a tags
            $('.vmrc_btn').click(function(){
                var dropdown = $( this ).parent().parent().find('[shape|=ellipsis-vertical]')[0];
                dropdown.click();
                var mo = new Event('mouseover', {bubbles: true});
                document.querySelector('.qa-action-vm-console').dispatchEvent(mo);
                document.querySelector('.qa-action-launch-vmrc').click();
                setTimeout(function(){dropdown.click();}, 100);
            });
        } else {
            lock = false; // has to be a better solution than this for SPA
        }
    }

})();
