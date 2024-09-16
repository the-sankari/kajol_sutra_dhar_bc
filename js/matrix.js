const createDigit = () => {
    const digit = document.createElement("div");
    digit.innerHTML = Math.random() > 0.5 ? "1" : "0";
    digit.classList.add("digit");
  
    // Set random initial position within the visible area
    digit.style.left = `${Math.random() * 80 + 10}vw`; // Adjusted to avoid overlap and ensure visibility
  
    // Define the animation
    digit.style.animation = "fallingAnimation 2s linear"; // Adjust duration and easing to your liking
    digit.style.animationDuration = `${Math.random() * 2 + 2}s`; // Random falling speed
  
    document.body.appendChild(digit);
  
    // Remove element once animation is complete
    digit.addEventListener("animationend", () => {
      digit.remove();
    });
  };
  
  // Create multiple falling digits at intervals
  setInterval(createDigit, 100); 