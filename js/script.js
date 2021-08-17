const DEFAULT_DISPLAY = 0;
let currentOperand = null;
let nextOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;
let answer;
let decimal = false;

const display = document.querySelector("#display-p");
const numberBtns = document.querySelectorAll(".number-btn");
const btns = document.querySelectorAll(".btn");
const operatorBtns = document.querySelectorAll(".op-btn");
const equalsBtn = document.querySelector(".equals-btn");
const clearBtn = document.querySelector("#clear-btn");
const deleteBtn = document.querySelector("#delete-btn");
const decimalBtn = document.querySelector("#decimal-btn");

//Event listeners
operatorBtns.forEach((btn) => {
  btn.addEventListener("click", updateOperator);
});
numberBtns.forEach((btn) => {
  btn.addEventListener("click", addNumberToScreen);
});
equalsBtn.addEventListener("click", updateOperator);
clearBtn.addEventListener("click", clearAll);
deleteBtn.addEventListener("click", deleteLast);
decimalBtn.addEventListener("click", decimalPoint);
window.addEventListener('keydown', keyboardInputHandler);

//Functions
function addNumberToScreen(e) {
  if (shouldResetDisplay) {
    resetDisplay();
  }
  let number = e.target.textContent;
  let numDec = retr_dec(display.textContent);
  if (numDec === 0 || numDec === 1) {
    display.textContent += number;
  } else if (numDec === 2) {
    alert("This calculator only works to 2 decimal place");
  }
}

function retr_dec(num) {
  return (num.split(".")[1] || []).length;
}

function updateOperator(e) {
  if (e.target.textContent === "=") {
    nextOperand = display.textContent;
    evaluateSum();
  }
  if (display.textContent === "") return;
  if (currentOperator && nextOperand) {
    evaluateSum();
    currentOperator = e.target.textContent;
  }
  if (!currentOperand) {
    currentOperand = display.textContent;
  } else {
    if (!answer) {
      nextOperand = display.textContent;
    } else {
      currentOperand = answer;
      nextOperand = null;
    }
  }
  currentOperator = e.target.textContent;
  shouldResetDisplay = true;
  decimal = false;
}

function evaluateSum() {
  if (nextOperand === "0" && currentOperator === "÷") {
    alert("You cannot divide by 0.");
    nextOperand = null;
    return;
  } else {
    answer = operate(currentOperand, currentOperator, nextOperand);
    if (answer === undefined || answer === NaN) {
      display.textContent = "ERROR";
      currentOperand = null;
      nextOperand = null;
      currentOperator = null;
      decimal = false;
      answer = null;
      return;
    }
    let answerCheck;
    console.log(typeof answer);
    if (typeof answer !== "string") {
      answerCheck = answer.toString();
    }
    if (retr_dec(answerCheck) > 1) {
      answerCheck = Math.round(answerCheck * 100) / 100;
      answer = answerCheck;
    }
  }
  display.textContent = answer;
}

function resetDisplay() {
  display.textContent = "";
  shouldResetDisplay = false;
}

function clearAll() {
  resetDisplay();
  currentOperand = null;
  nextOperand = null;
  currentOperator = null;
  decimal = false;
  answer = null;
  console.log("Cleared");
}

function deleteLast() {
  toBeDeleted = display.textContent;
  let string = toBeDeleted.toString();
  let stringArr = [...string];
  let deletedString = stringArr.slice(0, -1).join("");
  let newNum = Number(deletedString);
  display.textContent = newNum;
}

function decimalPoint() {
  if (decimal) {
    return;
  } else {
    let decPoint = ".";
    display.textContent += decPoint;
    decimal = true;
  }
}



//Mathmatical functions
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function divide(a, b) {
  return a / b;
}
function multiply(a, b) {
  return a * b;
}
function squareroot(a) {
  return Math.sqrt(a);
}
function power(a, b) {
  return a ** b;
}
function posNeg(a) {
  return 0 - a;
}

function operate(a, op, b) {
  a = Number(a);
  b = Number(b);
  switch (op) {
    case "+/-":
      return posNeg(a);

    case "+":
      return add(a, b);

    case "-":
      return subtract(a, b);

    case "x2":
      return power(a, b);

    case "÷":
      return divide(a, b);

    case "x":
      return multiply(a, b);

    case "√":
      return squareroot(a);
  }
}
