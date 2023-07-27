import React from "react";

function CityItem({ place, country, temperature, condition, conditionIcon, pressure, time, isSkyCity, isSmallCity }) {
  return (
    <div className="p-4 rounded-md shadow-xl bg-blue-50 hover:scale-105">
      {isSkyCity && (
        <p className="p-4 mb-4 text-center bg-gray-600 rounded-xl text-gray-200">Sky City</p>
      )}
      {isSmallCity && (
        <p className="p-4 mb-4 text-center bg-gray-600 rounded-xl text-gray-200">Small City</p>
      )}
      <div className="flex justify-between">
        <div className="">
        <p className="text-2xl font-bold text-center">{place}</p>
        <p className="text-xs text-gray-500">{country}</p>
        </div>
        <img src={conditionIcon} alt="Icon" className="w-12" />
      </div>
      <p className="font-semibold text-center mt-4">{temperature}°C - {condition}</p>
      <p className="font-semibold text-center mt-2">Pressure {pressure} hPa</p>
      <p className="text-center text-gray-500 mt-2">{time}</p>
    </div>
  );
}

export default CityItem;
