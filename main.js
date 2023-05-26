const aargument = document.querySelector(".arguments");
const aargumentSelects = document.querySelectorAll(".argument-select");
aargumentSelects.forEach(select => {
  const option = document.createElement("option");
  option.value = aargument.querySelector("select[name='argumentValue']").value;
  option.textContent = aargument.querySelector("input[name='argumentName']").value;
  select.appendChild(option);
});

aargument.querySelector("input[name='argumentName']").addEventListener("input", updateArgumentSelect);
aargument.querySelector("select[name='argumentValue']").addEventListener("change", updateArgumentSelect);


function addArgument() {
  const argumentsContainer = document.getElementById("arguments-container");
  const argument = document.querySelector(".arguments");

  // Clone the first argument form element
  const newArgument = argument.cloneNode(true);

  // Clear the value and name for the new argument
  const argumentName = newArgument.querySelector("input[name='argumentName']");
  argumentName.value = "newarg";

  // Get the true/false value from the argument form
  const argumentValue = newArgument.querySelector("select[name='argumentValue']").value;

  // Append the new argument to the container
  argumentsContainer.appendChild(newArgument);

  const argumentSelects = document.querySelectorAll(".argument-select");
  argumentSelects.forEach(select => {
    const option = document.createElement("option");
    option.value = argumentValue;
    option.textContent = argumentName.value;
    select.appendChild(option);
  });

  argumentName.addEventListener("input", updateArgumentSelect);
  const argumentValueSelect = newArgument.querySelector("select[name='argumentValue']");
  argumentValueSelect.addEventListener("change", updateArgumentSelect);

}


// Update argument select options
function updateArgumentSelect(event) {
  const argumentName = event.target.value;
  const argumentValue = event.target.parentNode.querySelector("select[name='argumentValue']").value;

  const argumentSelects = document.querySelectorAll(".argument-select");
  argumentSelects.forEach(select => {
    select.innerHTML = ""; // Clear existing options

    const argumentOptions = document.querySelectorAll(".arguments");
    argumentOptions.forEach(option => {
      const optionName = option.querySelector("input[name='argumentName']").value;
      const optionValue = option.querySelector("select[name='argumentValue']").value;

      const newOption = document.createElement("option");
      newOption.value = optionValue;
      newOption.textContent = optionName;
      select.appendChild(newOption);
    });
  });
}


// Attach event listeners
const addArgumentButton = document.getElementById("add-argument");
addArgumentButton.addEventListener("click", addArgument);


function removeOperation(event) {
  const operation = event.target.parentElement;
  const operationSelect = operation.querySelector("select[name='operation']");
  const valueSelect = operation.querySelector("select[name='value']");
  const argumentSelect = operation.querySelector("select[name='argument']");

  operationSelect.style.display = "block";
  operationSelect.selectedIndex = 0;
  valueSelect.disabled = true;
  valueSelect.style.display = "none";
  argumentSelect.disabled = true;
  argumentSelect.style.display = "none";
  const resultText = document.getElementById("result");
  resultText.textContent = "result: undefined"
  
}

function handleOperationChange(event) {
    const operationSelect = event.target;
    const operationContainer = operationSelect.parentElement;
    const valueSelect = operationContainer.querySelector("select[name='value']");
    const argumentSelect = operationContainer.querySelector("select[name='argument']");
    const addOperationButton = operationContainer.querySelector(".add-operation");
    const childOperationsContainer = operationContainer.querySelector(".child-operations");

    valueSelect.selectedIndex = 0;
    argumentSelect.selectedIndex = 0;
    valueSelect.style.display = "none";
    argumentSelect.style.display = "none";
  
    if (operationSelect.value === "constant") {
      valueSelect.disabled = false;
      valueSelect.style.display = "block";
      operationSelect.style.display = "none";
    } else if (operationSelect.value === "argument") {
      argumentSelect.disabled = false;
      argumentSelect.style.display = "block";
      operationSelect.style.display = "none";
    }

    if (operationSelect.value === "or" || operationSelect.value === "and") {
      const childOperation = createChildOperation();
      childOperationsContainer.appendChild(childOperation);
      addOperationButton.style.display = "block";
    } else {
      addOperationButton.style.display = "none";
    }
}


function createChildOperation() {
  const parentOperationDiv = document.createElement("div");
  parentOperationDiv.classList.add("parent-operation");

  // Clone parent operation select
  const parentOperationSelect = document.querySelector(".operation");
  const operationSelect1 = parentOperationSelect.cloneNode(true);
  const operationSelect2 = parentOperationSelect.cloneNode(true);

  // Add event listeners to child operation selects
  operationSelect1.querySelector("select[name='operation']").addEventListener("change", handleOperationChange);
  operationSelect2.querySelector("select[name='operation']").addEventListener("change", handleOperationChange);

  const valueSelects1 = operationSelect1.querySelectorAll("select[name='value']");
  const valueSelects2 = operationSelect2.querySelectorAll("select[name='value']");
  valueSelects1.forEach(select => {
    select.addEventListener("change", updateResultText);
  });
  valueSelects2.forEach(select => {
    select.addEventListener("change", updateResultText);
  });

  const removeButtons1 = operationSelect1.querySelectorAll(".remove-operation");
  const removeButtons2 = operationSelect2.querySelectorAll(".remove-operation");
  removeButtons1.forEach(removeButton => {
    removeButton.addEventListener("click", removeOperation);
  });
  removeButtons2.forEach(removeButton => {
    removeButton.addEventListener("click", removeOperation);
  });

  // Create child operation div and add indentation class
  const childOperationDiv = document.createElement("div");
  childOperationDiv.classList.add("child-operation");

  // Reset child operation selects to default state
  operationSelect1.querySelector("select[name='operation']").selectedIndex = 0;
  operationSelect2.querySelector("select[name='operation']").selectedIndex = 0;

  // Append child operation selects to child operation div
  childOperationDiv.appendChild(operationSelect1);
  childOperationDiv.appendChild(operationSelect2);

  // Append child operation div to parent operation div
  parentOperationDiv.appendChild(childOperationDiv);

  return parentOperationDiv;
}


function updateResultText() {
    const resultText = document.getElementById("result");
    const selectedValues = Array.from(document.querySelectorAll("select[name='value']"))
      .map(select => select.value);

    resultText.textContent = "result: " + selectedValues.join(" ");
}

function handleArgumentChange(event) {
  const argumentSelect = event.target;
  const argumentValue = argumentSelect.value;
  const resultText = document.getElementById("result");

  resultText.textContent = "result: " + argumentValue;
}

const argumentSelects = document.querySelectorAll(".argument-select");
argumentSelects.forEach(select => {
  select.addEventListener("change", handleArgumentChange);
});


const operationSelects = document.querySelectorAll("select[name='operation']");
operationSelects.forEach(select => {
  select.addEventListener("change", handleOperationChange);
});

const valueSelects = document.querySelectorAll("select[name='value']");
valueSelects.forEach(select => {
  select.addEventListener("change", updateResultText);
});

const removeButtons = document.querySelectorAll(".remove-operation");
removeButtons.forEach(removeButton => {
  removeButton.addEventListener("click", removeOperation);
});