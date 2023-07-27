import React, { useEffect, useState } from "react";
import './index.css';
import CityItem from "./components/CityItem";
import CityInputForm from "./components/CityInputForm";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [placesAndTemperatures, setPlacesAndTemperatures] = useState([]);
  const [errorCities, setErrorCities] = useState([]);

  const skyCities = ["Prague", "London", "Lisbon", "New York"];
  const smallCities = ["Neznámé Město", "Znojmo"];

  async function fetchWeatherData(place) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${place}&aqi=no`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data for ${place}`);
    }
    return response.json();
  }

  useEffect(() => {
    async function fetchWeatherForExistingCities() {
      try {
        const allCities = [...skyCities, ...smallCities];
        const successfulCityData = [];
        const errors = [];

        for (const city of allCities) {
          try {
            const weatherData = await fetchWeatherData(city);
            successfulCityData.push(weatherData);
          } catch (error) {
            errors.push(city);
            console.error(error.message);
          }
        }

        const placesAndTemperaturesData = successfulCityData.map((weatherData, index) => {
          const place = weatherData.location.name;
          const temperature = weatherData.current.temp_c;
          const time = weatherData.location.localtime;
          const condition = weatherData.current.condition.text;
          const conditionIcon = weatherData.current.condition.icon;
          const pressure = weatherData.current.pressure_mb;
          const country = weatherData.location.country;
          const isSkyCity = skyCities.includes(place);
          const isSmallCity = smallCities.includes(place);

          return { place, temperature, time, condition, conditionIcon, pressure, country, isSkyCity, isSmallCity };
        });

        setPlacesAndTemperatures(placesAndTemperaturesData);
        setErrorCities(errors);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchWeatherForExistingCities();
  }, []);

  const handleFetchWeather = async (city, cityType) => {
    try {
      const weatherData = await fetchWeatherData(city);
      const place = weatherData.location.name;
      const temperature = weatherData.current.temp_c;
      const time = weatherData.location.localtime;
      const condition = weatherData.current.condition.text;
      const conditionIcon = weatherData.current.condition.icon;
      const pressure = weatherData.current.pressure_mb;
      const country = weatherData.location.country;
      const isSkyCity = cityType === "skyCity";
      const isSmallCity = cityType === "smallCity";

      const newPlaceData = {
        place,
        temperature,
        time,
        condition,
        conditionIcon,
        pressure,
        country,
        isSkyCity,
        isSmallCity,
      };

      setPlacesAndTemperatures([...placesAndTemperatures, newPlaceData]);
    } catch (error) {
      setErrorCities([...errorCities, city]);
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-200">
      <h2 className="text-4xl font-bold mb-8 mt-8 text-center">Weather Now:</h2>
      <CityInputForm onFetchWeather={handleFetchWeather} />
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Cities:</h3>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {placesAndTemperatures.map((item, index) => (
            <CityItem
              key={index}
              place={item.place}
              country={item.country}
              temperature={item.temperature}
              condition={item.condition}
              conditionIcon={item.conditionIcon}
              pressure={item.pressure}
              time={item.time}
              isSkyCity={item.isSkyCity}
              isSmallCity={item.isSmallCity}
            />
          ))}
        </div>
      </div>

      {placesAndTemperatures.length === 0 && (
        <p>No weather data available for the specified cities.</p>
      )}

      {errorCities.length > 0 && <ErrorMessage cities={errorCities} />}
    </div>
  );
}

export default App;

