import React from "react";

function Weather() {
  const [data, SetData] = React.useState([]);
  var ref = React.useRef(true);
  const cities = [
    { name: "Dnipro", latitude: "48.450001", longitude: "34.983334" },
    { name: "Kyiv", latitude: "50.450001", longitude: "30.523333" },
    { name: "Kharkiv", latitude: "49.9935", longitude: "36.232845" },
    { name: "Odesa", latitude: "46.482952", longitude: "30.712481" },
    { name: "Zhytomyr", latitude: "50.2649", longitude: "28.6767" },
    { name: "Lviv", latitude: "49.842957", longitude: "24.031111" },
    { name: "Kherson", latitude: "46.6558", longitude: "32.6178" },
    { name: "Lutsk", latitude: "50.7593", longitude: "25.3424" },
    { name: "Rivne", latitude: "50.619900", longitude: "26.251617" },
    { name: "Ivano-Frankivs'k", latitude: "48.922633", longitude: "24.711117" },
  ];
  React.useEffect(() => {
    if (ref.current) {
      GetWeather();
      ref.current = !ref.current;
    }
  }, []);
  function GetWeatherByCode(code) {
    let codes = {
      0: "Clear sky",
      1: "Partly cloudy",
      2: "Partly cloudy",
      3: "Partly cloudy",
      45: "Fog",
      48: "Fog",
      51: "Drizzle",
      53: "Drizzle",
      55: "Drizzle",
      56: "Freezing Drizzle",
      57: "Freezing Drizzle",
      61: "Rain",
      63: "Rain",
      65: "Rain",
      66: "Freezing Drizzle",
      67: "Freezing Drizzle",
      71: "Snow fall",
      73: "Snow fall",
      75: "Snow fall",
      77: "Snow fall",
      80: "Rain",
      81: "Rain",
      82: "Rain",
      85: "Snow fall",
      86: "Snow fall",
      95: "Thunderstorm",
      96: "Thunderstorm",
      99: "Thunderstorm",
    };
    return codes[code];
  }
  async function GetWeather() {
    let url = "";
    await Array.from(cities).forEach(async (element) => {
      url = `https://api.open-meteo.com/v1/forecast?latitude=${element.latitude}&longitude=${element.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,pressure_msl`;
      await fetch(url, {
        method: "GET",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          result.cityName = element.name;
          SetData((oldArray) => [...oldArray, result]);
        });
    });
  }

  return (
    <div className="main">
      {data.length <= 0 ? (
        ""
      ) : (
        <>
          {data.map((item) => (
            <div className="block" key={item}>
              <h2>City: {item.cityName}</h2>
              <div className="weather">
                <img
                  src={require(`../resources/${GetWeatherByCode(
                    item.current_weather.weathercode
                  )}.png`)}
                  className="weather-icon"
                />

                <span id="temp">{item.current_weather.windspeed}</span>
                <span className="temp cel" id="cel">
                  °C
                </span>
                <span id="info">
                  {GetWeatherByCode(item.current_weather.weathercode)} <br />
                  Wind: {item.current_weather.windspeed} km/h
                  <br />
                  Humidity:{" "}
                  {item.hourly.relativehumidity_2m[new Date().getHours()]}%
                </span>
              </div>
            </div>
          ))}
          {/* <button onClick={GetWeather}>Get Weather</button> */}
        </>
      )}
    </div>
  );
}

export default Weather;
