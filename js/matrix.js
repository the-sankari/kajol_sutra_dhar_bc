const createDigit = () => {
    const digit = document.createElement("div");
    digit.innerHTML = Math.random() > 0.5 ? "1" : "0";
    digit.classList.add("digit");

    // Set random initial position
    digit.style.left = `${Math.random() * 100}vw`;
    digit.style.animationDuration = `${Math.random() * 2 + 2}s`; // Random falling speed

    document.body.appendChild(digit);

    // Remove element once animation is complete
    digit.addEventListener('animationend', () => {
        digit.remove();
    });
};

// Create multiple falling digits at intervals
setInterval(createDigit, 450); // Adjust timing for more/less digits