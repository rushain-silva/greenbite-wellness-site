document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }

  // Logic specific to the HOME page 
  if (document.querySelector("#hero")) {
    
    const slogans = [
      "Fuel Your Body, Mind, and Soul",
      "Nourish Your Way to Wellness",
      "Transform Your Health Journey",
      "Embrace Natural Living",
      "Discover Your Best Self"
    ];
    const sloganElement = document.getElementById("slogan");
    if (sloganElement) {
      let sloganIndex = 0;
      setInterval(() => {
        sloganIndex = (sloganIndex + 1) % slogans.length;
        sloganElement.textContent = slogans[sloganIndex];
      }, 4000);
    }

    // Health tips of the day based on the day of the year
    const healthTips = [
      { icon: "💧", title: "Stay Hydrated", desc: "Drink at least 8 glasses of water daily." },
      { icon: "🍎", title: "Eat the Rainbow", desc: "Include colorful fruits and vegetables in your diet." },
      { icon: "🏋️", title: "Move Your Body", desc: "Aim for 30 minutes of physical activity daily." },
      { icon: "💖", title: "Practice Gratitude", desc: "Reflect on three things you’re grateful for each day." },
      { icon: "☀️", title: "Get Morning Sunlight", desc: "Expose yourself to sunlight early in the day to regulate sleep." },
      { icon: "🌙", title: "Prioritize Sleep", desc: "Aim for 7–9 hours of quality sleep per night." }
    ];
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const todayTip = healthTips[dayOfYear % healthTips.length];
    
    const mainTipIcon = document.querySelector("#main-tip .icon");
    const tipTitle = document.getElementById("tip-title");
    const tipDescription = document.getElementById("tip-description");

    if (mainTipIcon && tipTitle && tipDescription) {
        mainTipIcon.textContent = todayTip.icon;
        tipTitle.textContent = todayTip.title;
        tipDescription.textContent = todayTip.desc;
    }
  }

  // Logic for the Newsletter Form
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", e => {
      e.preventDefault();
      const emailInput = document.getElementById("email-input");
      const email = emailInput.value;

      if (email && email.includes('@')) {
        const storedEmails = JSON.parse(localStorage.getItem("newsletter_emails") || "[]");
        if (!storedEmails.includes(email)) {
          storedEmails.push(email);
          localStorage.setItem("newsletter_emails", JSON.stringify(storedEmails));
          alert("Thank you for subscribing!");
        } else {
          alert("You are already subscribed!");
        }
        e.target.reset();
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }
});
