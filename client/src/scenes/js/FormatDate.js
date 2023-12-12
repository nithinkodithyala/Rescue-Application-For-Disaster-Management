export default function FormatDate(props) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = days[props.date.getDay()];
  let hours = props.date.getHours();
  hours = hours < 10 ? `0${hours}` : hours;
  let minutes = props.date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return (
    <span>
      {day} {hours}:{minutes}
    </span>
  );
}
