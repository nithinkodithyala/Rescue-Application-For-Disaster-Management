import WeatherIcon from "./WeatherIcon";

import "../css/WeatherForecastDay.css";

export default function WeatherForecastDay(props) {
  function maxTemp() {
    let maxTemp = Math.round(props.data.temp.max);
    return `${maxTemp}°`;
  }

  function minTemp() {
    let minTemp = Math.round(props.data.temp.min);
    return `${minTemp}°`;
  }

  function day() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();

    return days[day];
  }

  return (
    <div>
      <div className="WeatherForecast-day">{day()}</div>
      <div className="WeatherForecast-icon">
        <WeatherIcon code={props.data.weather[0].icon} size={40} />
      </div>
      <div className="WeatherForecast-temperature">
        <span>{maxTemp()} </span>
        <span>{minTemp()}</span>
      </div>
    </div>
  );
}
