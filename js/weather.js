const weatherDiv = document.querySelector(".weather");

const api_key = "c9b259d6c3d44cbe660299284992867f";

async function getWeatherData(lat, lon) {
  try {
    // Fetch the data using openweather api key according to the lat and lon
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    );

    // Convert string response to an aray data
    const data = await response.json();

    console.log(data);
    // Check if the data is fetched correctly, code 200 repose is positive
    if (data.cod === 200 && data.main) {
      displayWeaher(data); // Display the weather data
      console.log(data.main);
    } else {
      throw new Error("Data not found");
    }
  } catch (error) {
    console.error(error);
  }
}

const displayWeaher = (weatherData) => {
  weatherDiv.innerHTML = `
  <!-- Get the name of the location -->
  <p>${weatherData.name}</p> 
  <!-- Get the current temperatue of current location -->
  <span>${weatherData.main.temp}, </span>
  <!-- Get the weather description -->
  <span>${weatherData.weather[0].description}</span>
    `;
};
// getWeatherData(60.2091607, 24.7422292);

function getCurrentLocation() {
  const erroMsg = document.createElement("p");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getCurrentLocation(latitude, longitude);
      },
      (error) => {
        if (error.code === 1) {
          console.error("User denied location access");
          erroMsg.textContent =
            "Please allow location access to display weather";
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

getCurrentLocation();
