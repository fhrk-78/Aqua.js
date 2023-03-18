// A javascript engine for running Aqua on the web

function runAll() {
    let aquaCode = document.getElementsByTagName('aqua');
    let ielem;
    for(let i = 0;i < aquaCode.length;++i) {
        ielem = aquaCode[i];
        runSection(ielem.innerText);
        ielem.style.display = 'none';
    }
}

function runSection(sectionText) {
    let sectionCode = sectionText.split('\n');
    for(let j = 0;j < sectionCode.length;++j) {
        runLine(sectionCode[j]);
    }
}

function runLine(lineText) {
    let lineCode = lineText.split(' ');
    switch(lineCode[0]) {
        case 'outf':
            if(lineCode[1].charAt(0) == '\"' && lineCode[1].charAt(lineCode[1].length - 1) == '\"') {
                document.body.insertAdjacentHTML('beforeend', lineCode[1].substring(1, lineCode[1].length - 1));
            } else {
                console.error('A type literal is not explicitly specified.\n' + lineCode[0] + ' function wants string.\n' + (lineCode[1].charAt(0)) + ' ' + lineCode[1].charAt(lineCode[1].length - 1));
            }
            break;
        default:
            console.error(lineCode[0] + ' does not exist');
            break;
    }
}

if(document.getElementsByName('aquascript')[0].getAttribute('content') === 'true') {
    runAll();
} else {
    console.warn('Interpreter is disabled. \nInsert \"<meta name=\"aquascript\" content=\"true\">\" in <head> of HTML');
}
