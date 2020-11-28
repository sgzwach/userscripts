// ==UserScript==
// @name           Banner - Student Profile Term Select
// @namespace      http://github.com/sgzwach
// @version        0.2
// @description    Add a dropdown for active terms within student profile view
// @author         shawn
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/banner-profile-term-select.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/banner-profile-term-select.user.js
// @match          https://student.sdbor.edu/StudentSelfService/ssb/studentProfile*
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant          none
// ==/UserScript==

(function() {
    'use strict';

    function fetchTerms(curTerm) {
        $.getJSON("https://student.sdbor.edu/StudentSelfService/ssb/termSelection/termsList", function(data){
            var termList = [];
            $.each(data, function(k,v) {
                if (v.termDesc == curTerm)
                    termList.push("<option value='" + v.termCode + "' selected>" + v.termDesc + "</option>");
                else
                    termList.push("<option value='" + v.termCode + "'>" + v.termDesc + "</option>");
            });
            $('#sterm').html(termList.join(""));
        });
    }

    // wait for student terms span to be created
    waitForKeyElements("#studentterms-a", function (node) {
        // trim down current term
        var curTerm = node.text().trim();

        // add select option for term change
        node.html("<select name='sterm' id='sterm' style='color: black !important'></select>");

        // register event handler
        $('#sterm').change(function(node){
            // get selection on change
            var newTerm = $('#sterm option:selected').val();
            var params = new URLSearchParams(window.location.search);
            var curTerm = null;
            if (params.has('term'))
                curTerm = params.get('term');
            if (curTerm) {
                var url = window.location.href;
                url = url.replace("term=" + curTerm, "term=" + newTerm);
                window.location.replace(url);
            }
        });

        // async populate term data
        fetchTerms(curTerm);
    });
})();
