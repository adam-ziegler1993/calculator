document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#calculator button');
    const display = document.getElementById('display');
    let currentOperand = '';
    let previousOperand = '';
    let operation = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            if (value >= '0' && value <= '9') {
                currentOperand += value;
                updateDisplay(currentOperand);
            } else if (value === 'C') {
                clear();
                updateDisplay('');
            } else if (value === '=') {
                if (currentOperand && previousOperand && operation) {
                    currentOperand = compute();
                    previousOperand = '';
                    operation = null;
                    updateDisplay(currentOperand);
                }
            } else {
                if (currentOperand) {
                    if (previousOperand) {
                        currentOperand = compute();
                    }
                    previousOperand = currentOperand;
                    currentOperand = '';
                    operation = value;
                    updateDisplay(operation);
                }
            }
        });
    });

    function updateDisplay(value) {
        display.textContent = value;
    }

    function clear() {
        currentOperand = '';
        previousOperand = '';
        operation = null;
    }

    function compute() {
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return '';
        let result;
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return '';
        }
        return result.toString();
    }
});
