const previousDisplay = document.querySelector(".previous-display");
const currentDisplay = document.querySelector(".current-display");
const acBtn = document.querySelector(".ac");
const delBtn = document.querySelector(".del");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equalsBtn = document.querySelector(".equals");

let previousDisplayNumber = "";
let currentDisplayNumber = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbers.forEach(number => {
    number.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) {
            return;
        }
        currentDisplayNumber += e.target.innerText;
        currentDisplay.innerText = currentDisplayNumber;
    })
});

operations.forEach(operation => {
    operation.addEventListener("click", (e) => {
        if (!currentDisplayNumber) {
            return;
        }
        haveDot = false;
        const operationName = e.target.innerText;
        if(previousDisplayNumber && currentDisplayNumber && lastOperation) {
            operate();
        } else {
            result = parseFloat(currentDisplayNumber);
        }
        clearVar(operationName);
        lastOperation = operationName;
    });
});

equalsBtn.addEventListener("click", (e) => {
    if(!currentDisplayNumber || !previousDisplayNumber) {
        return;
    }
    haveDot = false;
    operate();
    clearVar();
    currentDisplay.innerText = result;
    currentDisplayNumber = result;
    previousDisplayNumber = "";
});

acBtn.addEventListener("click", (e) => {
    previousDisplay.innerText = "0";
    previousDisplayNumber = "";
    currentDisplay.innerText = "0";
    currentDisplayNumber = "";
    result = "";
});

delBtn.addEventListener("click", (e) => {
    currentDisplayNumber = currentDisplayNumber.substr(0, currentDisplayNumber.length -1);
     currentDisplay.innerText = currentDisplayNumber;
});

function clearVar(name = "") {
    previousDisplayNumber += `${currentDisplayNumber}${name}`;
    previousDisplay.innerText = previousDisplayNumber;
    currentDisplay.innerText = "";
    currentDisplayNumber = "";
}

function operate() {
    if(lastOperation === "+") {
        result = parseFloat(result) + parseFloat(currentDisplayNumber);
    } else if(lastOperation === "-") {
        result = parseFloat(result) - parseFloat(currentDisplayNumber);
    } else if(lastOperation === "x") {
        result = parseFloat(result) * parseFloat(currentDisplayNumber);
    } else if(lastOperation === "÷") {
        if(parseFloat(currentDisplayNumber) != 0) {
            result = parseFloat(result) / parseFloat(currentDisplayNumber);
        } else {
            result = "undefined";
        }
    }
}