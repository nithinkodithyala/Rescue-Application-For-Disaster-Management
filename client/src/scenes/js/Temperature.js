import { useState } from "react";

import "../css/Temperature.css";

export default function Temperature(props) {
  const [unit, setUnit] = useState("celsius");

  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function showCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  function convertToFahrenheit() {
    return Math.round((props.celsius * 9) / 5 + 32);
  }

  if (unit === "celsius") {
    return (
      <div className="Temperature">
        {props.celsius}{" "}
        <span className="units">
          <span className="active">°C</span> |{" "}
          <a href="/" onClick={showFahrenheit}>
            °F
          </a>
        </span>
      </div>
    );
  } else {
    return (
      <div className="Temperature">
        {convertToFahrenheit()}{" "}
        <span className="units">
          <a href="/" onClick={showCelsius}>
            °C
          </a>{" "}
          | <span className="active">°F</span>
        </span>
      </div>
    );
  }
}
