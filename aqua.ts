// A javascript engine for running Aqua on the web

let var_valuebox = [
    {
        name: '$version',
        content: '1.5',
        type: 'string'
    },
    {
        name: '$aqua',
        content: 'true',
        type: 'string'
    },
    {
        name: '%function_skip',
        content: 'true',
        type: 'bool'
    },
    {
        name: '%reset_style',
        content: 'false',
        type: 'bool'
    },
    {
        name: '%html_canvas',
        content: 'false',
        type: 'bool'
    }
];

let sectionCode;

let nowIfStatus: string | null = null;
let aquajsMathEngineDo: string | null = null;

let aquaCanvas_canvas;
let aquaCanvas_ctx;

function runAll() {
    const aquaCode = document.getElementsByTagName('aqua');
    let ielem;
    for(let i = 0;i < aquaCode.length;++i) {
        ielem = aquaCode[i];
        runSection(ielem.innerText);
        ielem.style.display = 'none';
    }
}

function runSection(sectionText) {
    if(getVar('$aqua') === 'vsc') {
        sectionCode = sectionText.split(';');
    } else {
        sectionCode = sectionText.split('\n')
    }
    for(let j = 0;j < sectionCode.length;++j) {
        runLine(sectionCode[j]);
    }
}

function runLine(lineText) {
    const lineCode = lineText.split(' ');
    if(lineCode[0].charAt(0) == '#') {
        //Comment out
    } else if(aquajsMathEngineDo === null) {
        switch(lineCode[0]) {
            case 'option':
                changeVar('%' + lineCode[1], lineCode[2]);
                if(lineCode[1] === 'html_canvas') {
                    if(lineCode[2] === 'true') {
                        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend','<canvas id="aqjs_c" width="100%" height="100%"></canvas>');
                        aquaCanvas_canvas = document.getElementById('aqjs_c');
                        let aquaCanvas_cc = aquaCanvas_canvas as HTMLCanvasElement;
                        aquaCanvas_ctx = aquaCanvas_cc.getContext('2d');
                    } else if(lineCode[2] === 'false') {
                        aquaCanvas_ctx = null;
                        console.warn('Canvas is turned off, but CanvasElement is not removed. Also, it cannot be turned on again.');
                    }
                }
                break;
            case 'outf':
                if(lineCode[1] === ':') {
                    aquajsMathEngineDo = 'outf';
                } else {
                    let echoWords = '';
                    for(let m = 1;m < lineCode.length;++m) {
                        echoWords += lineCode[m];
                    }
    
                    console.log(echoWords);
    
                    if(echoWords.charAt(0) == '"' && echoWords.charAt(echoWords.length - 1) == '"') {
                        document.body.insertAdjacentHTML('beforeend', '<span class="aqua_outf">' + echoWords.substring(1, echoWords.length - 1) + '</span>');
                    } else if(getVar(echoWords) === '') {
                        console.error('A type literal is not explicitly specified.\n' + lineCode[0] + ' function wants string.\n' + (echoWords.charAt(0)) + ' ' + echoWords.charAt(lineCode[1].length - 1));
                    } else {
                        document.body.insertAdjacentHTML('beforeend', '<span class="aqua_outf">' + getVar(echoWords).charAt(0) == '"' && getVar(echoWords).charAt(getVar(echoWords).length - 1) == '"' ? getVar(echoWords).substring(1, echoWords.length - 1) : getVar(echoWords) + '</span>');
                    }
                }
                break;
            case 'var':
                if(letVar(lineCode[2], lineCode[1])) {
                    console.error('duplicate variable name.');
                }
                break;
            case 'set':
                changeVar(lineCode[1], lineCode[2])
                break;
            case 'if':
                if(lineCode[1] === ':') {
                    nowIfStatus = 'waitIf';
                    aquajsMathEngineDo = 'if';
                } else {
                    if(lineCode[1] === 'true') {
                        nowIfStatus = 'do';
                    } else if(lineCode[1] === 'false') {
                        nowIfStatus = 'waitElse';
                    }
                }
                break;
            default:
                console.error(lineCode[0] + ' does not exist');
                break;
        }
    } else {
        aquajsMathEngine(aquajsMathEngineDo, lineCode);
    }
}

function letVar(varName, varType) {
    let l;
    for(l = 0;l < var_valuebox.length;++l) {
        if(var_valuebox[l].name === varName) {
            return true;
        }
    }

    const varInit = {
        name: varName,
        content: '',
        type: varType
    };

    var_valuebox.push(varInit);
    return false;
}

function changeVar(varName, varContent) {
    let l;
    for(l = 0;l < var_valuebox.length;++l) {
        if(var_valuebox[l].name === varName) {
            break;
        }
    }

    var_valuebox[l].content = varContent;
}

function getVar(varName) {
    let l;
    let returns = '';
    for(l = 0;l < var_valuebox.length;++l) {
        if(var_valuebox[l].name === varName) {
            returns = var_valuebox[l].content;
            break;
        }
    }

    return returns;
}

function aquajsMathEngine(commandTarget: string, engineLineCode: string[]) {
    if(commandTarget === engineLineCode[0]) {
        switch(engineLineCode[0]) {
            case '!':
                if(engineLineCode[1] === 'true') {
                    return false;
                } else if(engineLineCode[1] === 'false') {
                    return true;
                } else {
                    let c_push_array: string[] = [];
                    for(let i = 1;i < engineLineCode.length;++i) {
                        c_push_array.push(engineLineCode[i]);
                    }
                    return aquajsSubMathEngine(c_push_array);
                }
            case '+':
                return parseFloat(engineLineCode[1]) + parseFloat(engineLineCode[2]);
            case '-':
                return parseFloat(engineLineCode[1]) - parseFloat(engineLineCode[2]);
            case '*':
                return parseFloat(engineLineCode[1]) * parseFloat(engineLineCode[2]);
            case '/':
                return parseFloat(engineLineCode[1]) / parseFloat(engineLineCode[2]);
            case '%':
                return parseFloat(engineLineCode[1]) % parseFloat(engineLineCode[2]);
            case '^':
                return parseFloat(engineLineCode[1]) ** parseFloat(engineLineCode[2]);
            default:
                console.error('Unexpected operator in Aqua.js Framework Mathengine detected.');
                return null;
        }
    } else {
        return 1;
    }
}

function aquajsSubMathEngine(engineLineCode: string[]) {
    switch(engineLineCode[0]) {
        case '!':
            if(engineLineCode[1] === 'true') {
                return false;
            } else if(engineLineCode[1] === 'false') {
                return true;
            } else {
                let c_push_array: string[] = [];
                for(let i = 1;i < engineLineCode.length;++i) {
                    c_push_array.push(engineLineCode[i]);
                }
                return aquajsSubMathEngine(c_push_array);
            }
        case '+':
            return parseFloat(engineLineCode[1]) + parseFloat(engineLineCode[2]);
        case '-':
            return parseFloat(engineLineCode[1]) - parseFloat(engineLineCode[2]);
        case '*':
            return parseFloat(engineLineCode[1]) * parseFloat(engineLineCode[2]);
        case '/':
            return parseFloat(engineLineCode[1]) / parseFloat(engineLineCode[2]);
        case '%':
            return parseFloat(engineLineCode[1]) % parseFloat(engineLineCode[2]);
        case '^':
            return parseFloat(engineLineCode[1]) ** parseFloat(engineLineCode[2]);
        default:
            console.error('Unexpected operator in Aqua.js Framework Mathengine detected.');
            return null;
    }
}

changeVar('$aqua',document.getElementsByName('aquascript')[0].getAttribute('content'));

if(getVar('$aqua') === 'true' || getVar('$aqua') === 'vsc') {
    runAll();
}  else {
    console.warn('Interpreter is disabled. \nInsert "<meta name="aquascript" content="true">" in <head> of HTML');
}
