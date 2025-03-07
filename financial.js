// Show/hide calculator sections based on selected category
function updateCalculator() {
    const category = document.getElementById("category").value;
    document.querySelectorAll(".calculator-section").forEach((section) => {
        section.style.display = "none";
    });
    document.getElementById(`${category}Calculator`).style.display = "block";
}

// Loan EMI Calculator
function calculateEMI() {
    const principal = parseFloat(document.getElementById("principal").value);
    const interestRate = parseFloat(document.getElementById("interestRate").value);
    const tenure = parseFloat(document.getElementById("tenure").value);

    if (isNaN(principal) || isNaN(interestRate) || isNaN(tenure)) {
        alert("Please enter valid inputs.");
        return;
    }

    const monthlyInterestRate = interestRate / 1200; // Convert annual rate to monthly and percentage to decimal
    const numberOfPayments = tenure * 12; // Convert years to months

    const emi =
        (principal *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    document.getElementById("emiResult").textContent = `₹${emi.toFixed(2)}`;
}

// Interest Calculator
function calculateInterest() {
    const principal = parseFloat(document.getElementById("principalInterest").value);
    const rate = parseFloat(document.getElementById("rateInterest").value);
    const time = parseFloat(document.getElementById("timeInterest").value);
    const interestType = document.getElementById("interestType").value;

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        alert("Please enter valid inputs.");
        return;
    }

    let interest;
    if (interestType === "simple") {
        interest = (principal * rate * time) / 100;
    } else {
        interest = principal * Math.pow(1 + rate / 100, time) - principal;
    }

    document.getElementById("interestResult").textContent = `₹${interest.toFixed(2)}`;
}

// Tax Calculator
function calculateTax() {
    const income = parseFloat(document.getElementById("income").value);

    if (isNaN(income)) {
        alert("Please enter valid income.");
        return;
    }

    let tax = 0;
    if (income <= 500000) {
        tax = income * 0.1; // 10% tax
    } else if (income <= 1000000) {
        tax = income * 0.2; // 20% tax
    } else {
        tax = income * 0.3; // 30% tax
    }

    document.getElementById("taxResult").textContent = `₹${tax.toFixed(2)}`;
}

// Currency Converter
async function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    const apiKey = "YOUR_API_KEY"; // Replace with your API key
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        document.getElementById("currencyResult").textContent = `${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error("Error fetching currency data:", error);
        alert("Error fetching currency data. Please try again.");
    }
}

// Populate currency dropdowns
async function populateCurrencies() {
    const apiKey = "YOUR_API_KEY"; // Replace with your API key
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        const fromCurrency = document.getElementById("fromCurrency");
        const toCurrency = document.getElementById("toCurrency");

        currencies.forEach((currency) => {
            const option1 = document.createElement("option");
            option1.value = currency;
            option1.textContent = currency;
            fromCurrency.appendChild(option1);

            const option2 = document.createElement("option");
            option2.value = currency;
            option2.textContent = currency;
            toCurrency.appendChild(option2);
        });
    } catch (error) {
        console.error("Error fetching currency data:", error);
    }
}

// Initialize calculator
window.onload = () => {
    updateCalculator();
    populateCurrencies();
}

function navigateToAuto() {
    window.location.href = 'auto.html';
}