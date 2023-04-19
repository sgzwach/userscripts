// ==UserScript==
// @name         D2L Skip Questions Graded Correct in Quizzes
// @namespace    http://github.com/sgzwach
// @version      0.5
// @description  Any question marked correct should be minimized automatically, but can be expanded again
// @author       shawn
// @match        https://d2l.sdbor.edu/d2l/lms/quizzing/admin/mark/quiz_mark_attempt.d2l*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sdbor.edu
// @updateURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-quiz-hide-correct.user.js
// @downloadURL  https://raw.githubusercontent.com/sgzwach/userscripts/master/d2l-quiz-hide-correct.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function toggleQuestion(e) {
        // check the text content of the caller (lazy, but probably effective enough)
        var t = e.target;
        var nt = t;

        // handle modified questions
        if (t.closest('div').nextElementSibling.innerText.includes("This question is an old version")) {
            nt = t.closest('div').nextElementSibling.nextElementSibling;
        }
        else {
            nt = t.closest('div').nextElementSibling;
        }
        if (t.innerText == '+') {
            // expand!
            nt.hidden = false;
            t.innerText = '-';
        } else {
            // contract!
            nt.hidden = true;
            t.innerText = '+';
        }
    }

    function hideCorrect() {
        var i, divToHide, questionInfo, middleColumn;

        // Add handler for toggling question to any div that has one
        var middleColumns = document.getElementsByClassName('dlay_m');
        for (i = 0; i < middleColumns.length; i++) {
            middleColumns[i].addEventListener("mouseup", toggleQuestion);
            middleColumns[i].style.cursor = 'pointer';
            middleColumns[i].innerText = '-';
        }

        // Find any "Correct response" alt text
        //var correct = document.querySelectorAll('d2l-icon[alt="Correct Response"]');
        var correct = document.querySelectorAll('[label="Score"]');
        if (correct.length > 0 && typeof correct[0].value == "undefined")
            setTimeout(hideCorrect, 1000);
        else
        {

            // hide any question that is correct
            for (i = 0; i < correct.length; i++) {
                if (correct[i].value >= 1) {
                    divToHide = correct[i].closest('div');
                    questionInfo = divToHide.previousElementSibling;
                    // handle case where question has been modified
                    if (questionInfo.innerText.includes("This question is an old version")) {
                        questionInfo = questionInfo.previousElementSibling;
                    }
                    divToHide.hidden = true;
                    questionInfo.querySelector('.dlay_m').innerText = '+';
                }
            }
        }
    }

    hideCorrect();


})();
