document.addEventListener("DOMContentLoaded", () => {
  const calculatorForm = document.getElementById("calculator-form");
  const resultsSection = document.getElementById("results");

  calculatorForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const age = parseInt(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const activity = document.getElementById("activity").value;

    // Validate inputs
    if (isNaN(age) || isNaN(weight) || isNaN(height) || !gender || !activity) {
      alert("Please fill out all fields correctly.");
      return;
    }

    // BMR Calculation
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // TDEE Calculation
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      super_active: 1.9
    };
    const tdee = bmr * activityMultipliers[activity];

    // Macronutrient Calculation
    const carbs = Math.round((tdee * 0.50) / 4);
    const protein = Math.round((tdee * 0.20) / 4);
    const fat = Math.round((tdee * 0.30) / 9);

    resultsSection.classList.remove("hidden");

    animateCounter("bmr", Math.round(bmr));
    animateCounter("tdee", Math.round(tdee));

    document.getElementById("carbs").textContent = carbs;
    document.getElementById("protein").textContent = protein;
    document.getElementById("fat").textContent = fat;
    
    updateProgressBar("carbs-progress", 50);
    updateProgressBar("protein-progress", 20);
    updateProgressBar("fat-progress", 30);

    resultsSection.scrollIntoView({ behavior: 'smooth' });
  });

  calculatorForm.addEventListener("reset", function () {
    resultsSection.classList.add("hidden");
  });

  // Function for animated counter
  function animateCounter(id, finalValue) {
    const element = document.getElementById(id);
    let start = 0;
    const duration = 1500; // 1.5 seconds
    const range = finalValue - start;
    let current = start;
    const increment = finalValue > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));

    const timer = setInterval(() => {
      current += increment * Math.ceil(range / (duration / 15));
      if ((increment > 0 && current >= finalValue) || (increment < 0 && current <= finalValue)) {
        current = finalValue;
        clearInterval(timer);
      }
      element.textContent = current.toLocaleString();
    }, 15);
  }

  function updateProgressBar(id, percentage) {
      const element = document.getElementById(id);
      setTimeout(() => {
        element.style.width = percentage + '%';
      }, 100);
  }
});
