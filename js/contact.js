document.addEventListener("DOMContentLoaded", () => {
  // --- Contact Form Logic ---
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Get existing feedback or initialize an empty array
      const feedback = JSON.parse(localStorage.getItem("greenbite_feedback") || "[]");
      
      // Add new feedback
      feedback.push({ name, email, message, date: new Date().toISOString() });
      
      // Save back to localStorage
      localStorage.setItem("greenbite_feedback", JSON.stringify(feedback));

      // Show confirmation and reset the form
      alert("Thank you for your message! We have received your feedback.");
      form.reset();
    });
  }

  // --- FAQ Accordion Logic ---
  const accordionBtns = document.querySelectorAll(".acc-btn");
  if (accordionBtns) {
    accordionBtns.forEach((btn) => {
      btn.addEventListener("click", function() {
        // Toggle active class on the button
        this.classList.toggle("active");
        
        // Get the panel
        const panel = this.nextElementSibling;
        
        // Toggle the panel's max-height
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    });
  }
});