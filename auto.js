const conversionFactors = {
    length: {
        meters: 1,
        feet: 3.28084,
        inches: 39.3701,
        centimeters: 100,
        kilometers: 0.001,
        miles: 0.000621371,
    },
    weight: {
        kilograms: 1,
        pounds: 2.20462,
        grams: 1000,
        ounces: 35.274,
        tons: 0.00110231,
    },
    temperature: {
        celsius: 1,
        fahrenheit: 1,
        kelvin: 1,
    },
    speed: {
        kmh: 1,
        mph: 0.621371,
        ms: 0.277778,
    },
    volume: {
        liters: 1,
        gallons: 0.264172,
        milliliters: 1000,
        cubicMeters: 0.001,
        cubicFeet: 0.0353147,
    },
};

// Unit options for each category
const unitOptions = {
    length: ["meters", "feet", "inches", "centimeters", "kilometers", "miles"],
    weight: ["kilograms", "pounds", "grams", "ounces", "tons"],
    temperature: ["celsius", "fahrenheit", "kelvin"],
    speed: ["kmh", "mph", "ms"],
    volume: ["liters", "gallons", "milliliters", "cubicMeters", "cubicFeet"],
};

// Update dropdowns based on selected category
function updateUnits() {
    const category = document.getElementById("category").value;
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");

    // Clear existing options
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    // Add new options
    unitOptions[category].forEach((unit) => {
        const option1 = document.createElement("option");
        option1.value = unit;
        option1.textContent = unit;
        fromUnit.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = unit;
        option2.textContent = unit;
        toUnit.appendChild(option2);
    });

    // Trigger conversion
    convert();
}

// Perform conversion
function convert() {
    const category = document.getElementById("category").value;
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;
    const fromValue = parseFloat(document.getElementById("fromValue").value);
    const toValue = document.getElementById("toValue");

    if (isNaN(fromValue)) {
        toValue.value = "";
        return;
    }

    let result;
    if (category === "temperature") {
        result = convertTemperature(fromValue, fromUnit, toUnit);
    } else {
        result = fromValue * (conversionFactors[category][toUnit] / conversionFactors[category][fromUnit]);
    }

    toValue.value = result.toFixed(4);
}

// Special handling for temperature conversions
function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === "celsius") {
        if (toUnit === "fahrenheit") return (value * 9/5) + 32;
        if (toUnit === "kelvin") return value + 273.15;
    }
    if (fromUnit === "fahrenheit") {
        if (toUnit === "celsius") return (value - 32) * 5/9;
        if (toUnit === "kelvin") return (value - 32) * 5/9 + 273.15;
    }
    if (fromUnit === "kelvin") {
        if (toUnit === "celsius") return value - 273.15;
        if (toUnit === "fahrenheit") return (value - 273.15) * 9/5 + 32;
    }
    return value;
}

// Initialize units on page load
window.onload = updateUnits;
// Navigation Functions
function navigateToScientific() {
    window.location.href = 'Scientific.html';
}

function navigateToAuto() {
    window.location.href = 'auto.html';
}

function navigateToFinancial() {
    window.location.href = 'financial.html';
}

function navigateToBasic() {
    window.location.href = 'Basic.html';
}