import React from "react";

function ErrorMessage({ cities }) {
  return (
    <div>
      <h2 className="text-4xl font-bold mt-8 mb-4 text-center">Errors:</h2>
      <ul className="list-disc list-inside">
        {cities.map((city, index) => (
          <li key={index} className="p-4 rounded-md shadow-md bg-red-200 hover:scale-105">
            No weather data available for "{city}"
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ErrorMessage;
