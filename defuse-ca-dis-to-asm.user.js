// ==UserScript==
// @name           defuse.ca copy disassembly to assembly
// @namespace      http://github.com/sgzwach
// @version        0.4
// @description    Copies disassembly (without offsets) to the assemble textArea
// @author         shawn
// @match          https://defuse.ca/online-x86-assembler.htm
// @run-at         document-end
// @updateURL      https://raw.githubusercontent.com/sgzwach/userscripts/master/defuse-ca-dis-to-asm.user.js
// @downloadURL    https://raw.githubusercontent.com/sgzwach/userscripts/master/defuse-ca-dis-to-asm.user.js
// ==/UserScript==

(function() {
    'use strict';

    // check if disassembly was requested by user
    if (!window.location.hash.includes('dis'))
        return;

    // get output text
    var disassemblyText = null;
    var paragraphs = document.getElementsByTagName('p');
    for (var i = 0; i < paragraphs.length; i++)
    {
        if (paragraphs[i].innerText[0] == '0')
        {
            disassemblyText = paragraphs[i].innerText;
            break;
        }
    }

    // extract instructions
    if (disassemblyText)
    {
        // get text area
        var textArea = document.getElementsByName('instructions')[0];
        disassemblyText.split('\n').forEach(function(item, index){textArea.append(item.slice(28) + '\n');});
    }
    else
        console.log("No disassembly found...");

})();
