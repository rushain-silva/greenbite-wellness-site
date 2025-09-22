document.addEventListener("DOMContentLoaded", () => {
  const breathingText = document.getElementById("breathing-text");
  if (breathingText) {
    const steps = ["Breathe In", "Hold", "Breathe Out", "Hold"];
    let stepIndex = 0;
    
    setInterval(() => {
        breathingText.textContent = steps[stepIndex];
        stepIndex = (stepIndex + 1) % steps.length;
    }, 2000);
  }

  /* POMODORO TIMER */
  const timerDisplay = document.getElementById("pomodoro-timer");
  const startBtn = document.getElementById("start-timer-btn");
  const pauseBtn = document.getElementById("pause-timer-btn");
  const resetBtn = document.getElementById("reset-timer-btn");
  const sessionCountEl = document.getElementById("session-count");

  let totalTime = 25 * 60;
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
    if (timerInterval) return;
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

  
  if (timerDisplay) {
    updateTimerDisplay();
    sessionCountEl.textContent = sessionCount;
    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);
  }

  /* AMBIENT SOUND TOGGLES */
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
     
        soundButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        stopAllSounds();
        const soundToPlay = button.dataset.sound;

        if (audioElements[soundToPlay]) {
            audioElements[soundToPlay].play();
        }
    });
  });
});
