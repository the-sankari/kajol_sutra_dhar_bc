const weatherDiv = document.querySelector(".weather");
const refreshButton = document.querySelector(".refresh-button");

const api_key = "c9b259d6c3d44cbe660299284992867f";

async function getWeatherData(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    );

    const data = await response.json();

    if (data.cod === 200 && data.main) {
      displayWeaher(data); // Now inside the then block
    } else {
      throw new Error("Data not found");
    }
  } catch (error) {
    console.error(error);
  }
}

const displayWeaher = (weatherData) => {
  const temp = Math.round(weatherData.main.temp);
  weatherDiv.innerHTML = `
  <p>${weatherData.name}</p> 
  <span>${temp}°C, </span>
  <span>${weatherData.weather[0].description}</span>
  <button class="refresh-button">
  <i class="fa-solid fa-arrows-rotate"></i>
</button>`;
};

function getCurrentLocation() {
  const erroMsg = document.createElement("p");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        await getWeatherData(latitude, longitude); // Wait for data before continuing
      },
      (error) => {
        if (error.code === 1) {
          console.error("User denied location access");
          getWeatherData(60.1699, 24.9384); // Default location
        } else {
          console.error(`Error getting loction, ${error}`);
          erroMsg.textContent = "Error accessing your location";
        }
        weatherDiv.appendChild(erroMsg);
      }
    );
  } else {
    erroMsg.textContent = "Geolocation is not supported by this browser";

    weatherDiv.appendChild(erroMsg);
  }
}

const refreshWeather = (event) => {
  // Add `refresh-spin` class for animation
  refreshButton.classList.add("refresh-spin");

  // Start animation immediately
  refreshButton.style.animation = "spin 1s linear infinite"; // Animation definition

  // Fetch weather data after a slight delay for visual feedback
  setTimeout(() => {
    getCurrentLocation();
  }, 1000); // Delay of 1 second for visual effect

  // Remove `refresh-spin` class and animation after data retrieval
  refreshButton.addEventListener("transitionend", () => {
    refreshButton.classList.remove("refresh-spin");
    refreshButton.style.animation = ""; // Clear animation styles
  });
};

getWeatherData(60.1699, 24.9384); // Initial weather data fetch

// Debouncing to prevent multiple requests being triggered in quick succession
function debounce(func, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const debouncedRefreshWeather = debounce(refreshWeather, 500); // Debounce with 500ms delay

refreshButton.addEventListener("click", debouncedRefreshWeather);

