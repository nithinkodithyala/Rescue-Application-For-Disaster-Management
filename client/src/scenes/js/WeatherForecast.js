import { useState, useEffect } from "react";
import axios from "axios";

import "../css/WeatherForecast.css";

import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecastData, setForecastData] = useState(null);

  // When coordinates change, set loaded to false to fetch new city data
  useEffect(() => {
    setLoaded(false);
  }, [props.coords]);

  function handleResponse(response) {
    setForecastData(response.data.daily);
    setLoaded(true);
  }

  // Get weather forecast for next days
  function getWeatherForecast() {
    const apiKey = "5a6903eab650be6a07243d3bc71995a1";
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.coords.lat}&lon=${props.coords.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (loaded) {
    return (
      <div className="WeatherForecast row">
        {forecastData.map(function (dailyForecast, idx) {
          if (idx < 5) {
            return (
              <div
                className="col-6 col-md-4 col-lg-2 WeatherForecast-elem"
                key={idx}
              >
                <WeatherForecastDay data={dailyForecast} />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  } else {
    getWeatherForecast();
    return null;
  }
}
