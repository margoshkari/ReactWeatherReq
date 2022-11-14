import React from "react";

function Weather() {
  const [data, SetData] = React.useState(null);
  var ref = React.useRef(true);
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
    let url = `https://api.open-meteo.com/v1/forecast?latitude=48.450001&longitude=34.983334&current_weather=true&hourly=temperature_2m,relativehumidity_2m,pressure_msl`;
    await fetch(url, {
      method: "GET",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        SetData(result);
      });
    //${e.value}
  }

  return (
    <div className="App">
      {!data ? (
        ""
      ) : (
        <>
          <div className="block">
            <h2>City: Dnipro</h2>
            <div className="weather">
              <img
                src={require(`../resources/${GetWeatherByCode(
                  data.current_weather.weathercode
                )}.png`)}
                className="weather-icon"
              />

              <span id="temp">{data.current_weather.windspeed}</span>
              <span className="temp cel" id="cel">
                °C
              </span>
              <span id="info">
                {GetWeatherByCode(data.current_weather.weathercode)} <br />
                Wind: {data.current_weather.windspeed} km/h
                <br />
                Humidity:{" "}
                {data.hourly.relativehumidity_2m[new Date().getHours()]}%
              </span>
            </div>
          </div>
          <button onClick={GetWeather}>Get Weather</button>
        </>
      )}
    </div>
  );
}

export default Weather;
