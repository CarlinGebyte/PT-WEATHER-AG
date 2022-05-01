import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApi } from "../utils/getApi";
import { apiWeather } from "./Home";

function Details() {
  const initialState = {};
  const [weather, setWeather] = useState(initialState);
  const params = useParams();
  const { lat, long } = params;

  useEffect(() => {
    if (long !== "" && lat !== "") {
      getApi(apiWeather + lat + "," + long).then((res) => {
        setWeather(res);
      });
    }
  }, [long, lat]);
  return (
    <div className="h-3/5">
      <div id="result" className="bg-[#eeeeee59] py-2">
        {weather.currently ? (
          <div className="flex justify-evenly text-sm sm:flex-col sm:items-center">
            <p className="sm:py-1">
              Wind:{" "}
              <span className="font-light">
                {Math.round(weather.currently.windSpeed)} mph
              </span>
            </p>
            <p className="sm:py-1">
              Humidity:{" "}
              <span className="font-light">
                {Math.round(weather.currently.humidity * 100)}%
              </span>
            </p>
            <p className="sm:py-1">
              Dew Pt:{" "}
              <span className="font-light">
                {Math.round(weather.currently.dewPoint)}°
              </span>
            </p>
            <p className="sm:py-1">
              UV Index:{" "}
              <span className="font-light bg-[#40bf4099] px-[5px] rounded-[4px]">
                {Math.round(weather.currently.uvIndex)}
              </span>
            </p>
            <p className="sm:py-1">
              Visibility:{" "}
              <span className="font-light">
                {Math.round(weather.currently.visibility)}+ mi
              </span>
            </p>
            <p className="sm:py-1">
              Pressure:{" "}
              <span className="font-light">
                {Math.round(weather.currently.pressure)} mb
              </span>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>

      <div id="weather" className="mt-3">
        {weather.currently ? (
          <div>
            <div className="flex justify-center items-center">
              <div className="w-16">
                <img
                  src={
                    "https://darksky.net/images/weather-icons/" +
                    weather.currently.icon +
                    ".png"
                  }
                  alt="icon"
                ></img>
              </div>
              <div>
                <h2 className="font-semibold text-4xl">
                  {Math.round(weather.currently.temperature)}°{" "}
                  {weather.currently.summary}
                </h2>
                <p>
                  Feels like:{" "}
                  <span className="font-light">
                    {Math.round(weather.currently.apparentTemperature)}°
                  </span>{" "}
                  Low:{" "}
                  <span className="font-light">
                    {Math.round(weather.daily.data[0].temperatureLow)}°
                  </span>{" "}
                  High:{" "}
                  <span className="font-light">
                    {Math.round(weather.daily.data[0].temperatureHigh)}°
                  </span>
                </p>
              </div>
            </div>
            <div>
              <p className="font-light text-3xl text-center">
                {weather.hourly.summary}
              </p>
            </div>
            <div>
              <p className="font-light text-xl text-center">
                {weather.daily.summary}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Details;
