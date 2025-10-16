// ==UserScript==
// @name         D2L Skip Questions Graded Correct in Quizzes
// @namespace    http://github.com/sgzwach
// @version      0.8
// @description  Any question marked correct should be minimized automatically, but can be expanded again
// @author       shawn
// @match        https://d2l.sdbor.edu/d2l/le/activities/iterator/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sdbor.edu
// @updateURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-quiz-hide-correct.user.js
// @downloadURL  https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-quiz-hide-correct.user.js
// @grant        none
// ==/UserScript==

// Much of this code is copied from the Rubric Mark script as the necessary steps to detect SPA view changes are included already
(function() {
    'use strict';

    // Gemini wrote this part lol
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function toggleQuestion(e) {
        var sibling = e.target.nextElementSibling; // this should be the heading of a question
        if (sibling.hidden) {
            sibling.hidden = false;
        } else {
            sibling.hidden = true;
        }
    }

    async function hideQuestions() {
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
        var scores = [];
        var i, score, gradeType, header;
        var n, d;
        // loop until all scores are added; we don't really use this other than to determine that the view is ready to continue
        while (scores.length < questions.length) {
            for (i = 0; i < questions.length; i++) {
                // for each question, find the score
                score = questions[i].shadowRoot.querySelector("d2l-labs-grade-result-presentational");
                if (score && !scores.includes(score) && score.getAttribute("grade-type") == "Numeric" && score.getAttribute("score-denominator") != "")
                    scores.push(score);
            }
            if (scores.length < questions.length) {
                await sleep(250); // added this to avoid locking up the page
            }
        }

        // once we know the scores are all visible, iterate over the questions again to hide those at 100%
        for (i = 0; i < questions.length; i++) {
            score = questions[i].shadowRoot.querySelector("d2l-labs-grade-result-presentational");
            gradeType = score.getAttribute("grade-type");
            // For every question, add an event listener to toggle visibility
            header = questions[i].shadowRoot.querySelector(".d2l-consistent-eval-quiz-question-header");
            header.addEventListener("mouseup", toggleQuestion);
            header.style.cursor = "pointer";
            if (gradeType == "Numeric") { // we have a number! Check the numerator and denominator
                n = parseFloat(score.getAttribute("score-numerator"));
                d = parseFloat(score.getAttribute("score-denominator"));
                if (score.getAttribute("score-numerator") != "" && n >= d)
                {
                    questions[i].shadowRoot.querySelector(".d2l-consistent-eval-quiz-question-wrapper").hidden = true;
                } else {
                    questions[i].shadowRoot.querySelector(".d2l-consistent-eval-quiz-question-wrapper").hidden = false;
                }
            }
        }
    }

    var mo_username = new MutationObserver(function(mutations){
        if (mutations.length >= 1) {
            setTimeout(hideQuestions, 1000);
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
                                setTimeout(hideQuestions, 1000);
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

