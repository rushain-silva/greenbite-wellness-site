document.addEventListener("DOMContentLoaded", () => {
  /* ---------- BREATHING ANIMATION TEXT ---------- */
  const breathingText = document.getElementById("breathing-text");
  if (breathingText) {
    const steps = ["Breathe In", "Hold", "Breathe Out", "Hold"];
    let stepIndex = 0;

    // The animation is 8s long, so each step is 2s.
    // We change text halfway through the inhale/exhale animations.
    setInterval(() => {
        breathingText.textContent = steps[stepIndex];
        stepIndex = (stepIndex + 1) % steps.length;
    }, 2000); // Change text every 2 seconds
  }

  /* ---------- POMODORO TIMER ---------- */
  const timerDisplay = document.getElementById("pomodoro-timer");
  const startBtn = document.getElementById("start-timer-btn");
  const pauseBtn = document.getElementById("pause-timer-btn");
  const resetBtn = document.getElementById("reset-timer-btn");
  const sessionCountEl = document.getElementById("session-count");

  let totalTime = 25 * 60; // 25 minutes
  let timeLeft = totalTime;
  let timerInterval = null;
  let sessionCount = parseInt(localStorage.getItem("greenbite_sessions") || "0");

  function updateTimerDisplay() {
    if (!timerDisplay) return;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function startTimer() {
    if (timerInterval) return; // Already running
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        sessionCount++;
        localStorage.setItem("greenbite_sessions", sessionCount);
        sessionCountEl.textContent = sessionCount;
        alert("🎉 Session complete! Take a well-deserved break.");
        resetTimer();
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function resetTimer() {
    pauseTimer();
    timeLeft = totalTime;
    updateTimerDisplay();
  }
  
  // Initial setup for timer elements if they exist
  if (timerDisplay) {
    updateTimerDisplay();
    sessionCountEl.textContent = sessionCount;
    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);
  }

  /* ---------- AMBIENT SOUND TOGGLES ---------- */
  const soundButtons = document.querySelectorAll(".sound-btn");
  const rainAudio = document.getElementById("rain-audio");
  const wavesAudio = document.getElementById("waves-audio");
  const audioElements = { rain: rainAudio, waves: wavesAudio };

  function stopAllSounds() {
      for (const key in audioElements) {
          if (audioElements[key]) {
            audioElements[key].pause();
            audioElements[key].currentTime = 0;
          }
      }
  }

  soundButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        soundButtons.forEach(btn => btn.classList.remove("active"));
        // Add active class to the clicked button
        button.classList.add("active");

        stopAllSounds();
        const soundToPlay = button.dataset.sound;

        if (audioElements[soundToPlay]) {
            audioElements[soundToPlay].play();
        }
    });
  });
});