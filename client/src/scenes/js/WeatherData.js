import WeatherIcon from "./WeatherIcon";

import Temperature from "./Temperature";
import FormatDate from "./FormatDate";

import "../css/WeatherData.css";

export default function WeatherData(props) {
  return (
    <div className="WeatherData row">
      <div className="col-12 col-lg-7">
        <div className="row">
          <div className="col-6 col-lg-4 weather-icon-elem">
            <WeatherIcon code={props.data.icon} size={80} />
          </div>
          <div className="col-6 col-lg-4 weather-info">
            <Temperature celsius={props.data.temperature} />
            <div className="weather-description">{props.data.description}</div>
          </div>
          <div className="col-12 col-lg-4 more-info-weather">
            <span>Humidity: {props.data.humidity}% </span>
            <span>Wind: {props.data.wind} km/h </span>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-5 location">
        <div className="city">{props.data.city}</div>
        <div className="last-updated">
          Last updated: <FormatDate date={props.data.date} />
        </div>
      </div>
    </div>
  );
}
