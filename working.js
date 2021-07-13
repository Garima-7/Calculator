let buffer = '0';
let previousOperator;
let result = 0;

const screen = document.querySelector('.screen');

function Buttonfunc(value) {
    if (isNaN(value)) {
        isSymbol(value);
    } else {
        isNumber(value);
    }
    screen.innerText = buffer;
}

document.querySelector('.grid').addEventListener('click', (e) => {
    Buttonfunc(e.target.innerText);
});

function isSymbol(value) {
    switch (value) {
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(value);
            break;
        case 'C':
            buffer = '0';
            previousOperator = null;
            result = 0;
            break;
        case '←':
            buffer = buffer.substr(0, buffer.length - 1);
            break;
        case '=':
            if (previousOperator === null) {
                //you need two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = result;
            result = 0;
    }
}

function isNumber(value) {
    if (buffer === '0') buffer = value;
    else {
        buffer += value; //string concatenation
    }
}

function handleMath(value) {
    if (buffer === '0') {
        return;
    }
    const intBuffer = parseInt(buffer);

    if (result === 0) {
        result += intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        result += intBuffer;
    } else if (previousOperator === '−') {
        result -= intBuffer;
    } else if (previousOperator === '×') {
        result *= intBuffer;
    } else if (previousOperator === '÷') {
        result /= intBuffer;
    }
}