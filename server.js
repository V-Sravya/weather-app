const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "frontend")));

const PORT = 3000;

app.get("/weather", async (req, res) => {
  const city = req.query.city || "London"; // Get city from query param
  console.log(`Fetching weather for city: ${city}`); // Log the city to the console

  const apikey = "1a88c7be480db625792c1a3412c91fe6";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  try {
    const response = await axios.get(url);
    console.log("API response:", response.data); // Log the entire API response for debugging

    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: (response.data.main.temp - 273.15).toFixed(2), // Convert temperature to Celsius
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windspeed: response.data.wind.speed,
    };
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error); // Log the error for debugging
    res.status(500).send("Error in fetching weather data");
  }
});


app.listen(PORT, ()=> {
  console.log(`Server is running on http://localhost:${PORT}`);
});