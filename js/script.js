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
  btn.addEventListener("click", () => {
    updateOperator(btn.textContent);
  });
});
numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    addNumberToScreen(btn.textContent);
  });
});
btns.forEach((btn) => btn.addEventListener("transitionend", removeTransition));
equalsBtn.addEventListener("click", () => {
  updateOperator(equalsBtn.textContent);
});
clearBtn.addEventListener("click", clearAll);
deleteBtn.addEventListener("click", deleteLast);
decimalBtn.addEventListener("click", decimalPoint);
window.addEventListener("keydown", keyboardInputHandler);

//Functions
function addNumberToScreen(number) {
  if (shouldResetDisplay) {
    resetDisplay();
  }
  if (number === "0" && display.textContent === "0") return;
  let numDec = retr_dec(display.textContent);
  if (numDec === 0 || numDec === 1) {
    if (display.textContent !== "0") {
      display.textContent += number;
    } else {
      display.textContent = number;
    }
  } else if (numDec === 2) {
    alert("This calculator only works to 2 decimal place");
  }
}

function retr_dec(num) {
  return (num.split(".")[1] || []).length;
}

function updateOperator(op) {
  if (op === "=") {
    nextOperand = display.textContent;
    evaluateSum();
  }
  if (display.textContent === "") return;
  if (currentOperator && nextOperand) {
    evaluateSum();
    currentOperator = op;
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
  currentOperator = op;
  shouldResetDisplay = true;
  decimal = false;
}

function evaluateSum() {
  console.log(`a = ${currentOperand} op = ${currentOperator} b = ${nextOperand}`);
  if (nextOperand === "0" && currentOperator === "÷") {
    alert("You cannot divide by 0.");
    nextOperand = null;
    return;
  } else if (!currentOperand && !currentOperator) {
    return;
  } else if (currentOperator === "=") {
    display.textContent = currentOperand;
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

function keyboardInputHandler(e) {
  if (e.key >= 0 || e.key <= 9) addNumberToScreen(e.key);
  if (e.key === "=" || e.key === "Enter") updateOperator("=");
  if (e.key === "§") updateOperator("+/-");
  if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "x" ||
    e.key === "/" ||
    e.key === "*" ||
    e.key === "÷"
  )
    updateOperator(e.key);
  if (e.key === "Backspace") deleteLast();
  if (e.key === "Clear" || e.key === "Escape") clearAll();
  if (e.key === ".") decimalPoint();
  btns.forEach((btn) => {
    if (e.key === btn.textContent) btn.classList.add("active");
    if (e.key === "Enter" && btn.textContent === "=") btn.classList.add("active");
    if (e.key === "*" && btn.textContent === "x") btn.classList.add("active");
    if (e.key === "Backspace" && btn.textContent === "Delete") btn.classList.add("active");
  });
}

function removeTransition(e) {
  let el = e.target;
  if (!el.classList.contains("active")) return;
  this.classList.remove("active");
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

    case "/":
      return divide(a, b);

    case "x":
      return multiply(a, b);

    case "*":
      return multiply(a, b);

    case "√":
      return squareroot(a);
  }
}
