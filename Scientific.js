function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
  }
  
  function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
  }
  
  function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
  }
  
  function calculateResult() {
    const display = document.getElementById('display');
    try {
      let expression = display.value;
  
      // Replace '^' with '**' for exponentiation
      expression = expression.replace(/\^/g, '**');
  
      // Evaluate trigonometric functions in radians
      expression = expression.replace(/sin\(/g, 'Math.sin(');
      expression = expression.replace(/cos\(/g, 'Math.cos(');
      expression = expression.replace(/tan\(/g, 'Math.tan(');
  
      // Evaluate square root and log functions
      expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
      expression = expression.replace(/log\(/g, 'Math.log10(');
  
      // Evaluate the expression
      display.value = eval(expression);
    } catch (error) {
      display.value = 'Error';
    }
  }