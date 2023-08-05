// JavaScript
let voteCounts = {
  profile1: 0,
  profile2: 0,
  profile3: 0,
  profile4: 0,
  profile5: 0,
  profile6: 0,
  profile7: 0,
  profile8: 0,
};

let profileLocked = {
  profile1: false,
  profile2: false,
  profile3: false,
  profile4: false,
  profile5: false,
  profile6: false,
  profile7: false,
  profile8: false,
};

function updateTimerDisplay(profileId, timeRemaining) {
  const timerElement = document.getElementById(`timer_${profileId}`);
  if (timerElement) {
    timerElement.textContent = timeRemaining > 0 ? `Next vote in ${timeRemaining} seconds` : '';
  }
}

function startTimer(profileId) {
  let timeRemaining = 60;
  const interval = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay(profileId, timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(interval);
      const profileElement = document.getElementById(profileId);
      profileElement.style.backgroundColor = '#fff';
      profileLocked[profileId] = false;
      updateTimerDisplay(profileId, 0);
    }
  }, 1000);
}

function reorderProfiles() {
  // Combine all profiles from both columns into a single array
  const profilesContainers = document.querySelectorAll('.profiles');
  const allProfiles = Array.from(profilesContainers).flatMap(container =>
    Array.from(container.children)
  );

  // Compare votes and apply background colors based on ranking
  allProfiles.sort((a, b) => voteCounts[b.id] - voteCounts[a.id]);

  // Start the animation
  allProfiles.forEach((profile, index) => {
    const offset = index * 120; // Adjust this value to change the gap between profiles
    profile.style.top = `${offset}px`;
    profile.style.order = index + 1;

    // Reset animation after updating the positions
    profile.classList.remove('animate-swap');
  });

  // Animate the swap
  const topProfile = allProfiles[0];
  const secondProfile = allProfiles[1];
  if (topProfile && secondProfile) {
    topProfile.classList.add('animate-swap');
    secondProfile.classList.add('animate-swap');
  }
}

function vote(profileNumber) {
  const profileId = `profile${profileNumber}`;
  if (!profileLocked[profileId]) {
    voteCounts[profileId]++;
    const voteCountElement = document.getElementById(profileId).querySelector('.vote-count');
    voteCountElement.textContent = voteCounts[profileId];

    // Lock the profile after voting
    profileLocked[profileId] = true;
    const profileElement = document.getElementById(profileId);
    profileElement.style.backgroundColor = '#FFF7C8'; // Change the background color when locked

    // Reorder and compare all profiles based on vote counts with animation
    reorderProfiles();

    // Start the timer
    startTimer(profileId);
  }
}


