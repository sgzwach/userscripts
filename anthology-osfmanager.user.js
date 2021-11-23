// ==UserScript==
// @name           OSF Manager Fix
// @namespace      https://github.com/sgzwach
// @version        0.1
// @description    Add buttons to Anthology OSF Manager to select options from above
// @author         Shawn
// @match          https://sdbor.campuslabs.com/faculty/*
// @icon           https://www.google.com/s2/favicons?domain=campuslabs.com
// @grant          none
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/anthology-osfmanager.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/anthology-osfmanager.user.js
// ==/UserScript==

(function() {
    'use strict';

    // add buttons to UI
    function addUI() {
        var sourceSectionCell = $('.panel-selection-group .section-course-title:not(.ng-hide)')[0];
        var sourceSectionTitle = sourceSectionCell.innerText;
        if (sourceSectionTitle[0] == "D") // this is a dreadful hack that shows we have selected a section
        {
            // Add button
            $('.panel-table-group tbody .course-info-cell').each(function(index){
                this.innerHTML += "<input type='button' class='applyButtons' id='btnApply" + index + "' value='Apply Selected'></input>";
            });

            // Add button event listener
            $('.applyButtons').click(function(){
                // Get index
                var index = this.id.slice(8);

                // discover row to modify
                var target = $('.panel-table-group tbody tr:eq('+index+')'); // Identify selected row by button id
                var src = $('.panel-selection-group tr:eq(1)').children('.idea-number-cell'); // cells from selected course

                // for each child input
                $(target).find('.osf-toggle-btn-container').each(function(index){
                    var inputs = $(this).find('.osf-choice-input-group>input');
                    $(inputs).each(function() {
                        if (this.id.toUpperCase()[0] == src[index].innerText[0])
                        {
                            console.log("HIT: setting " + index + " to " + src[index].innerText);
                            this.click();
                        }
                    });
                });
            });
        }
    }

    // wait for page load to find active course
    waitForKeyElements(".panel-selection-group", function(node) {
        // add event listener for clearing buttons
        $('.clear-selection-btn').click(function(){
            $('.applyButtons').remove();
        });
        new MutationObserver(function(mutations) {
            if (mutations.length >= 1)
                addUI();
        }).observe(
            document.querySelector('.panel-selection-group'),
            { subtree: true, characterData: true, childList: true }
        );
    });
})();
