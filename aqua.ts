/*

    Aqua.js - 2.0

    < Information >
    Aqua License: MIT
    Aquajs License: Apache-2.0

    < Description >
    A javascript engine for running Aqua on the web

    < Copyright >
    [ AquaScript ] Copyright (C) 2023 e6nlaq.
    [ Aqua.js ] Copyright (C) 2023 FhRuby All right reserved.

*/

let runCode: string[];
let baseItem: number;
let afterJSCode: string;
let outputStyle: string = '';

// VisualStudioCode has auto shaping.
let isVSCode: boolean = true;

class aqua_compiler {
    static main() {
        const aquaCode = document.getElementsByTagName('aqua');
        document.body.insertAdjacentHTML('beforeend','<iframe id="HTMLAquaScriptSandBox" srcdoc="compiling..." frameborder="0" sandbox="allow-scripts allow-modals allow-popups-to-escape-sandbox"></iframe>');
        let ielem;

        for (let i = 0; i < aquaCode.length; ++i) {
            ielem = aquaCode[i];
            ielem.style.display = 'none';
            ielem.style.opacity = '0';
            ielem.style.overflow = 'hidden';
            ielem.style.width = '0';
            ielem.style.height = '0';
        }

        for (let i = 0; i < aquaCode.length; ++i) {
            aqua_compiler.sectionMethodFlow(ielem.innerText);
        }
    }

    static sectionMethodFlow(sourceCode: string) {
        runCode = sourceCode.split(isVSCode === true ? ';' : '\n');
        baseItem = 0;
        while(baseItem >= runCode.length) {
            let rcs = spr(baseItem);
            doFunction(rcs);
        }
        //参考 (https://note.affi-sapo-sv.com/js-least-common-multiple.php)
        document.getElementById('HTMLAquaScriptSandBox')!.setAttribute('srcdoc', "<script>class aquaJS {\nstatic fizzBuzz(target: number) {\nif (target % 3 === 0 && target % 5 === 0) {\n    return 'FizzBuzz';\n} else if (target % 3 === 0) {\n    return 'Fizz';\n} else if (target % 5 == 0) {\n    return 'Buzz';\n} else {\n    return target;\n}\n}\nstatic is_prime(target: number) {\nif (target <= 1) {\n    return false;\n}\n    if (2 === target) {\n    return true;\n}\n    if (0 === target % 2) {\n    return false;\n}\n    var square_root = Math.floor(Math.sqrt(target));\nfor (var i = 3; i <= square_root; i += 2) {\n    if (0 === target % i) {\n        return false;\n    }\n}\nreturn true;\n}\n}\nconst aqua_gcd = function () {\n    const f = (x, y) => y ? f(y, x % y) : x;\n    let ans = arguments[0];\n    for (let i = 1; i < arguments.length; i++) {\n        ans = f(ans, arguments[i]);\n    }\n    return ans;\n}\nconst greatestCommonDivisor = (value1, value2) => value2 === 0 ? value1\n    : greatestCommonDivisor(value2, value1 % value2);\nconst leastCommonMultiple = (value1, value2) =>\n    value1 * value2 / greatestCommonDivisor(value1, value2);\nconst leastCommonMultiple2 = (valueArray) =>\n    valueArray.reduce((a, b) => leastCommonMultiple(a, b));\nconst aqua_lcm = function() {\nleastCommonMultiple2(arguments);\n}\n" + afterJSCode + "</script>");
    }
}

function saj(code) {
    afterJSCode += `${code}`;
    return;
}

function spr(itemNumber:number) {
    return runCode[itemNumber].split(' ');
}

function doFunction(firstcode: string[]) {
    switch (firstcode[0]) {
        case 'abs':
            saj(`Math.abs(${firstcode[1]})`);
            break;
        case 'and':
            saj(`${firstcode[1]} & ${firstcode[2]}`);
            break;
        case 'chr':
            saj(`String.fromCharCode(${firstcode[1]})`);
            break;
        case 'cos':
            saj(`Math.cos(${firstcode[1]})`);
            break;
        case '#':
        case 'comment':
            saj(`//${firstcode[1]}\n`);
            break;
        case 'end':
            saj(`}\n`);
        case 'exit':
            saj(`location.reload();\n`);
            break;
        case 'fibz':
            saj(`aquaJS.fizzBuzz(${firstcode[1]})`);
            break;
        case 'flush':
            saj(`location.reload();\n`);
            break;
        case 'gcd':
            saj(`aqua_gcd(`);
            for (let i = 1; i < firstcode.length; ++i) {
                saj(`${firstcode[i]}, `);
            }
            saj(`)`);
            break;
        case 'getline':
            saj(`(window.prompt('getline:',''))?.split('')`);
            break;
        case 'goto':
            saj(``);
            break;
        case 'in':
            saj(`window.prompt('in','')`);
            break;
        case 'is_prime':
            saj(`aquaJS.is_prime(${firstcode[1]})`);
            break;
        case 'label':
            saj(``);
            break;
        case 'lcm':
            saj(`aqua_lcm(`);
            for (let i = 1; i < firstcode.length; ++i) {
                saj(`${firstcode[i]}, `);
            }
            saj(`)`);
            break;
        case 'len':
            saj(`${firstcode[1]}.length`);
            break;
        case 'ln':
            if (firstcode.length === 1) {
                saj(`document.body.insertAdjacentHTML("beforeend","<br>");\n`);
            } else {
                saj(`document.body.insertAdjacentHTML("beforeend","`);
                for (let i = 0; i < parseInt(firstcode[1]); ++i) {
                    saj(`<br>`);
                }
                saj(`");\n`);
            }
        case 'lsh':
            saj(`${firstcode[1]} << ${firstcode[2]}`);
            break;
        case '!':
        case 'not':
            saj(`~`);
            break;
        case 'option':
            // Wait Update
            break;
        case 'or':
            saj(`${firstcode[1]} | ${firstcode[2]}`);
            break;
        case 'ord':
            saj(`${firstcode[1]}.charCodeAt()`);
            break;
        case 'out':
            saj(`document.body.insertAdjacentHTML("beforeend", '<div class="aqua_output" style="${outputStyle}">' + ${firstcode[1]} + "</div>");\n`);
            break;
        case 'outf':
            saj(`document.body.insertAdjacentHTML("beforeend", '<div class="aqua_output" style="${outputStyle}">' + ${firstcode[1]} + "</div><br>");\n`);
            break;
        case 'rand':
            saj(`Math.random()`);
            break;
        case 'rsh':
            saj(`${firstcode[1]} >> ${firstcode[2]}`);
            break;
        case 'set':
            saj(`${firstcode[1]} = ${firstcode[2]};\n`);
            break;
        case 'set_rand':
            saj(`Math.random() * (${firstcode[2]} - ${firstcode[1]}) + ${firstcode[2]}`);
            break;
        case 'sh':
            saj(firstcode[1] + '\n');
            break;
        case 'sin':
            saj(`Math.sin(${firstcode[1]})`);
            break;
        case 'sqrt':
            saj(`Math.sqrt(${firstcode[1]})`);
            break;
        case 'style':
            if(firstcode[1] === 'text') {
                outputStyle += `color: ${firstcode[2]};`;
            } else if(firstcode[1] === 'reset') {
                outputStyle = '';
            } else if(firstcode[1] === 'background') {
                outputStyle += `background-color: ${firstcode[2]};`;
            }
        case 'sum':
            for (let i = 1; i < (firstcode.length - 1); ++i) {
                saj(`${firstcode[i]} + `);
            }
            saj(`${firstcode[firstcode.length]}`);
            break;
        case 'tan':
            saj(`Math.tan(${firstcode[1]})`);
            break;
        case 'throw':
            saj(`console.error('${firstcode[1]}');\n`);
            break;
        case 'var':
            saj(`var ${firstcode[2]} = ${firstcode[1] === 'string' ? '""' : firstcode[1] === 'int' || firstcode[1] === 'double' || firstcode[1] === 'int64_t' || firstcode[1] === 'll' ? '0' : firstcode[1] === 'bool' ? 'false' : 'null'};\n`);
            break;
        case 'xor':
            saj(`${firstcode[1]} & !${firstcode[2]}) | (!${firstcode[1]} & ${firstcode[2]}`);
            break;
        case '+':
            saj(`${firstcode[1]} + ${firstcode[2]}`);
            break;
        case '-':
            saj(`${firstcode[1]} - ${firstcode[2]}`);
            break;
        case '*':
            saj(`${firstcode[1]} * ${firstcode[2]}`);
            break;
        case '/':
            saj(`${firstcode[1]} / ${firstcode[2]}`);
            break;
        case '%':
            saj(`${firstcode[1]} % ${firstcode[2]}`);
            break;
        case '^':
            saj(`${firstcode[1]} ** ${firstcode[2]}`);
            break;
        case '<':
            saj(`${firstcode[1]} < ${firstcode[2]}`);
            break;
        case '>':
            saj(`${firstcode[1]} > ${firstcode[2]}`);
            break;
        case '<=':
            saj(`${firstcode[1]} <= ${firstcode[2]}`);
            break;
        case '>=':
            saj(`${firstcode[1]} >= ${firstcode[2]}`);
            break;
        case '&':
            saj(`${firstcode[1]} + ${firstcode[2]}`);
            break;
        default:
            saj(``);
            break;
    }
}

aqua_compiler.main();
