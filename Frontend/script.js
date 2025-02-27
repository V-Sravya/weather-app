document.addEventListener("DOMContentLoaded", () => {
  const fetchWeatherData = async () => {
    const cityInput = document.getElementById("city-input").value.trim();

    if (!cityInput) {
      alert("Please enter a city name!");
      return;
    }

    try {
      const response = await fetch(`https://my-weather-app-xumm.onrender.com/weather?city=${cityInput}`);
      const data = await response.json();

      if (data && data.city) 
      {
        document.getElementById("city").textContent = data.city;
        document.getElementById("country").textContent = data.country;

        const tempCelsius = parseFloat(data.temperature);
        const tempFahrenheit = (tempCelsius * 9) / 5 + 32;

        document.getElementById("temperature").textContent = 
          `${tempCelsius} °C / ${tempFahrenheit.toFixed(2)} °F`;

        document.getElementById("description").textContent = data.description;
        document.getElementById("humidity").textContent = data.humidity + "%";
        document.getElementById("windspeed").textContent = (data.windspeed * 2.23694).toFixed(2) + " mph";

      } 
      else 
      {
        alert("Could not find weather data for that city.");
      }
    } catch (error) {
      console.error("Error fetching weather data", error);
      document.getElementById("app").textContent = "Error loading weather data!";
    }
  };

  document.getElementById("fetch-weather").addEventListener("click", fetchWeatherData);
});
