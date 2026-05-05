// ==UserScript==
// @name         Load Quiz Attached Files
// @namespace    http://github.com/sgzwach/userscripts/
// @version      2026-05-05
// @description  If there are files included in D2L quiz responses, render them in the same table.
// @author       You
// @match        https://d2l.sdbor.edu/d2l/le/activities/iterator/*
// @grant        none
// ==/UserScript==
// Much of this code is copied from the Rubric Mark script as the necessary steps to detect SPA view changes are included already
(function() {
    'use strict';

    // Gemini wrote this part lol
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function loadImages() {
        console.log("Awaiting student name match...");
        // make sure the attempt name matches the captured name change
        var pageUser = document.querySelector('d2l-consistent-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('d2l-consistent-evaluation-learner-context-bar').shadowRoot.querySelector('d2l-consistent-evaluation-lcb-user-context').shadowRoot.querySelector('.d2l-consistent-evaluation-lcb-user-name').title;
        var attemptUser = document.querySelector('d2l-consistent-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector("d2l-consistent-evaluation-left-panel").shadowRoot.querySelector("d2l-consistent-evaluation-evidence-quizzing").shadowRoot.querySelector("d2l-consistent-evaluation-quizzing-attempt").shadowRoot.querySelector("d2l-consistent-evaluation-quizzing-attempt-summary").getAttribute("user-display-name");
        while (pageUser != attemptUser) {
            await sleep(500);
            pageUser = document.querySelector('d2l-consistent-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('d2l-consistent-evaluation-learner-context-bar').shadowRoot.querySelector('d2l-consistent-evaluation-lcb-user-context').shadowRoot.querySelector('.d2l-consistent-evaluation-lcb-user-name').title;
            attemptUser = document.querySelector('d2l-consistent-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector("d2l-consistent-evaluation-left-panel").shadowRoot.querySelector("d2l-consistent-evaluation-evidence-quizzing").shadowRoot.querySelector("d2l-consistent-evaluation-quizzing-attempt").shadowRoot.querySelector("d2l-consistent-evaluation-quizzing-attempt-summary").getAttribute("user-display-name");
        }
        var questions = document.querySelector("d2l-consistent-evaluation").shadowRoot.querySelector("d2l-consistent-evaluation-page").shadowRoot.querySelector("d2l-consistent-evaluation-left-panel").shadowRoot.querySelector("d2l-consistent-evaluation-evidence-quizzing").shadowRoot.querySelector("d2l-consistent-evaluation-quizzing-attempt").shadowRoot.querySelectorAll("d2l-consistent-evaluation-quizzing-attempt-result");
        var i, j, question, images;
        var allowed = ['jpg', 'png', 'jpeg', 'gif'];

        // iterate over the questions and render images in attachement list
        for (i = 0; i < questions.length; i++) {
            question = questions[i].shadowRoot.querySelector("d2l-questions-question").shadowRoot.querySelector("d2l-questions-written-response");
            if (!question) {
                continue;
            }
            images = question.shadowRoot.querySelector("d2l-questions-written-response-presentational").shadowRoot.querySelector("d2l-questions-attachment-list").shadowRoot.querySelectorAll("d2l-list-item");
            console.log(question);
            console.log(images);

            // for each image, add it to the view if it has a useful extension
            for (j = 0; j < images.length; j++) {
                var link = images[j].getAttribute("key");
                var re = /\/.*\.(.*)\?/;
                if (re.test(link)) {
                    if (allowed.includes(link.match(re)[1].toLowerCase())) {
                        var img = document.createElement('img');
                        img.style["max-width"] = "100%";
                        img.src = link;
                        images[j].appendChild(img);
                    }
                }
            }
        }
    }

    var mo_username = new MutationObserver(function(mutations){
        if (mutations.length >= 1) {
            setTimeout(loadImages, 1000);
        }
    });

    // monitor body mutations until title is added, then use that to trigger rubric fill on new student
    var mo_body = new MutationObserver(function(mutations) {
        if (mutations.length >= 1) {
            for (var i in mutations) {
                if (mutations[i].type == "childList" && mutations[i].addedNodes.length >= 1) {
                    // once title is created, mutate on username changes and disable this observer
                    for (var j = 0; j < mutations[i].addedNodes.length; j++) {
                        if (mutations[i].addedNodes[j].localName == "title") {
                            if (mutations[i].addedNodes[j].innerText.substring(0,4) == "Quiz") { // make sure title includes Quiz, else exit
                                mo_username.observe(document.querySelector('d2l-consistent-evaluation').shadowRoot.querySelector('d2l-consistent-evaluation-page').shadowRoot.querySelector('d2l-consistent-evaluation-learner-context-bar').shadowRoot.querySelector('d2l-consistent-evaluation-lcb-user-context').shadowRoot.querySelector('.d2l-consistent-evaluation-lcb-user-name'), {characterData: true, subtree: true, childList: true});
                                setTimeout(loadImages, 1000);
                            }
                            this.disconnect();
                        }
                    }
                }
            }
        }
    }).observe(
        document,
        { subtree: true, characterData: true, childList: true }
    );

})();
