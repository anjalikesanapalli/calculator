function addToDisplay(value) {
  const display = document.getElementById("display");
  display.innerHTML += value;
}

function clearDisplay() {
  const display = document.getElementById("display");
  display.innerHTML = "";
}

let historyVisible = false;

function showHistory() {
  const history = localStorage.getItem("calculatorHistory");
  const calculations = history ? history.split(",") : [];
  const historyDisplay = document.getElementById("history-display");

  if (historyVisible) {
    document.getElementById("name").classList.add("hidden");
    historyDisplay.style.display = "none";
    historyVisible = false;
  } else {
    document.getElementById("name").classList.remove("hidden");
    historyDisplay.innerHTML = "";

    if (calculations.length > 0) {
      const maxIndex = Math.min(5, calculations.length);
      for (
        let i = calculations.length - 1;
        i >= calculations.length - maxIndex;
        i--
      ) {
        const calculation = calculations[i];
        const historyItem = document.createElement("div");
        historyItem.innerText = calculation;
        historyDisplay.appendChild(historyItem);
      }
    }

    historyDisplay.style.display = "block";
    historyVisible = true;
  }
}

function calculate() {
  const display = document.getElementById("display");
  const expression = display.innerHTML;
  let result = "";

  try {
    result = eval(expression);
  } catch (error) {
    result = "Error";
  }

  display.innerHTML = result;

  const history = localStorage.getItem("calculatorHistory");
  if (history) {
    const calculations = history.split(",");
    if (calculations.length >= 5) {
      calculations.shift();
    }
    calculations.push(`${expression} = ${result}`);
    localStorage.setItem("calculatorHistory", calculations.join(","));
  } else {
    localStorage.setItem("calculatorHistory", `${expression} = ${result}`);
  }
}
