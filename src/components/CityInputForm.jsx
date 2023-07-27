import React, { useState } from "react";

function CityInputForm({ onFetchWeather }) {
  const [inputPlace, setInputPlace] = useState("");
  const [cityType, setCityType] = useState("smallCity");

  const handleFetchWeather = async () => {
    onFetchWeather(inputPlace, cityType);
    setInputPlace(""); 
  };

  return (
    <div className="mb-4 text-center">
      <input
        type="text"
        value={inputPlace}
        onChange={(e) => setInputPlace(e.target.value)}
        placeholder="Enter City"
        className="border rounded-md p-2"
      />

      <select
        value={cityType}
        onChange={(e) => setCityType(e.target.value)}
        className="ml-2 border rounded-md p-2"
      >
        <option value="smallCity">Small City</option>
        <option value="skyCity">Sky City</option>
      </select>

      <button
        onClick={handleFetchWeather}
        className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2"
      >
        Get Weather
      </button>
    </div>
  );
}

export default CityInputForm;
