window.addEventListener("load", () => {
  const numbers = document.querySelectorAll(".number");
  const operators = document.querySelectorAll(".operator");
  const erase = document.getElementById("erase");
  const equal = document.getElementById("equal");
  const content = document.getElementById("content");
  const history = [];

  const operands = ["", ""];
  let eraseOnInput = true;
  let targetOperand = 0;
  let operatorSign = "+";

  //* Historique des calculs effectuer
  const historyList = document.getElementById("history-list");

  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      write(number.id);
    });
  });

  operators.forEach((operator) => {
    operator.addEventListener("click", () => {
      switch (operator.id) {
        case "plus":
          operatorSign = "+";
          break;
        case "minus":
          operatorSign = "-";
          break;
        case "times":
          operatorSign = "x";
          break;
        case "divide":
          operatorSign = "/";
          break;
      }
      write(operatorSign);
    });
  });

  erase.addEventListener("click", () => {
    eraseOnInput = false;
    content.textContent = "";
    operands[0] = "";
    operands[1] = "";
  });

  equal.addEventListener("click", () => {
    console.log(operands);

    switch (operatorSign) {
      case "+":
        calculate("addition");
        break;
      case "-":
        calculate("substraction");
        break;
      case "x":
        calculate("multiplication");
        break;
      case "/":
        calculate("division");
        break;
    }

    content.textContent = parseInt(operands[0]) + parseInt(operands[1]);
    eraseOnInput = true;
    targetOperand = 0;
  });

  function write(data) {
    if (eraseOnInput) {
      content.textContent = "";
      operands[0] = "";
      operands[1] = "";
      eraseOnInput = false;
    }

    if (!isNaN(data)) {
      operands[targetOperand] += data;
    } else {
      targetOperand = 1;
    }

    content.textContent += data;
  }

  function calculate(operationName) {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "./backend/" + operationName + ".php", true);

    xhr.onload = () => {
      let result = JSON.parse(xhr.responseText).result.toFixed(2);
      content.textContent = result;

      const newHistoryElem = document.createElement("li");
      newHistoryElem.textContent =
        operands[0] + " " + operatorSign + " " + operands[1] + " = " + result;

      historyList.appendChild(newHistoryElem);

      history.push(operands[0] + operatorSign + operands[1] + " = " + result);
      console.log(history);
    };

    let data = new FormData();
    data.append("first", operands[0]);
    data.append("second", operands[1]);

    xhr.send(data);
  }
});
