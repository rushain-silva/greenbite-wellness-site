document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const workoutForm = document.getElementById('workout-form');
  const workoutDisplay = document.getElementById('workout-display');
  const workoutList = document.getElementById('workout-list');
  const timerDisplay = document.getElementById('timer');
  const startTimerBtn = document.getElementById('start-timer-btn');
  
  // --- Workout Data ---
  const workouts = {
    'full-body': {
      'none': [
        { name: 'Jumping Jacks', details: '3 sets of 30 seconds' },
        { name: 'Bodyweight Squats', details: '3 sets of 15 reps' },
        { name: 'Push-ups', details: '3 sets of 10 reps (or on knees)' },
        { name: 'Plank', details: '3 sets of 30 seconds hold' },
        { name: 'Lunges', details: '3 sets of 12 reps per leg' }
      ],
      'dumbbells': [
        { name: 'Goblet Squats', details: '3 sets of 12 reps' },
        { name: 'Dumbbell Rows', details: '3 sets of 10 reps per arm' },
        { name: 'Overhead Press', details: '3 sets of 10 reps' },
        { name: 'Dumbbell Lunges', details: '3 sets of 10 reps per leg' },
        { name: 'Russian Twists', details: '3 sets of 20 reps' }
      ]
    },
    'arms': {
      'none': [
        { name: 'Tricep Dips (on chair)', details: '3 sets of 12 reps' },
        { name: 'Diamond Push-ups', details: '3 sets of 8 reps' },
        { name: 'Inchworms', details: '3 sets of 10 reps' },
        { name: 'Plank-ups', details: '3 sets of 10 reps per side' }
      ],
      'dumbbells': [
        { name: 'Bicep Curls', details: '3 sets of 12 reps per arm' },
        { name: 'Tricep Kickbacks', details: '3 sets of 12 reps per arm' },
        { name: 'Hammer Curls', details: '3 sets of 10 reps per arm' },
        { name: 'Lateral Raises', details: '3 sets of 15 reps' }
      ]
    },
    'legs': {
      'none': [
        { name: 'Glute Bridges', details: '3 sets of 20 reps' },
        { name: 'Jumping Squats', details: '3 sets of 15 reps' },
        { name: 'Calf Raises', details: '3 sets of 25 reps' },
        { name: 'Side Lunges', details: '3 sets of 12 reps per side' }
      ],
      'dumbbells': [
        { name: 'Dumbbell Romanian Deadlifts', details: '3 sets of 12 reps' },
        { name: 'Weighted Glute Bridges', details: '3 sets of 15 reps' },
        { name: 'Bulgarian Split Squats', details: '3 sets of 10 reps per leg' },
        { name: 'Dumbbell Calf Raises', details: '3 sets of 20 reps' }
      ]
    },
    'core': {
      'none': [
        { name: 'Crunches', details: '3 sets of 20 reps' },
        { name: 'Leg Raises', details: '3 sets of 15 reps' },
        { name: 'Bicycle Crunches', details: '3 sets of 20 reps per side' },
        { name: 'Superman', details: '3 sets of 15 reps' }
      ],
      'dumbbells': [
        { name: 'Weighted Crunches', details: '3 sets of 15 reps' },
        { name: 'Dumbbell Side Bends', details: '3 sets of 12 reps per side' },
        { name: 'Plank with Dumbbell Drag', details: '3 sets of 10 reps per side' }
      ]
    }
  };

  // --- Event Listener for Form Submission ---
  workoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const bodyPart = document.getElementById('body-part').value;
    const equipment = document.getElementById('equipment').value;
    
    const selectedWorkout = workouts[bodyPart]?.[equipment];
    
    if (selectedWorkout) {
      workoutList.innerHTML = ''; // Clear previous workout
      selectedWorkout.forEach(exercise => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${exercise.name}</strong> - ${exercise.details}`;
        workoutList.appendChild(li);
      });
      workoutDisplay.classList.remove('hidden');
    } else {
      alert('No workout found for your selection. Please try a different combination.');
    }
  });

  // --- Timer Functionality ---
  let timerInterval;
  let timeInSeconds = 30;
  const timerAudio = new Audio('assets/sounds/timer-complete.mp3'); // Add a sound file to this path

  startTimerBtn.addEventListener('click', () => {
    if (startTimerBtn.disabled) return; // Prevent multiple clicks

    clearInterval(timerInterval); // Clear any existing timer
    timeInSeconds = 30; // Reset time
    updateTimerDisplay();

    startTimerBtn.disabled = true; // Disable button while timer is running
    
    timerInterval = setInterval(() => {
      timeInSeconds--;
      updateTimerDisplay();
      
      if (timeInSeconds <= 0) {
        clearInterval(timerInterval);
        timerDisplay.classList.add('finished');
        timerAudio.play().catch(e => console.error("Audio play failed:", e)); // Play sound
        alert("Time's up! Great job.");
        startTimerBtn.disabled = false; // Re-enable button
        
        // Reset timer display after a short delay
        setTimeout(() => {
            timeInSeconds = 30;
            updateTimerDisplay();
            timerDisplay.classList.remove('finished');
        }, 2000);
      }
    }, 1000);
  });

  function updateTimerDisplay() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
});