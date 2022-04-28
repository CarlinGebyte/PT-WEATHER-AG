import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import React, { useEffect, useState } from "react";
import { getApi } from "../utils/getApi";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAsync } from "../redux/actions/actionLongin";

Moment.globalFormat = "D MMM YYYY";

function Home() {
  const initialStateL = {
    long: "",
    lat: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialStateW = JSON.parse(localStorage.getItem("weather")) || {};

  const apiWeather =
    "https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/";

  const [location, setLocation] = useState(initialStateL);
  const [weather, setWeather] = useState(initialStateW);
  mapboxgl.accessToken =
    "pk.eyJ1IjoiY2FybGluZ2VieXRlIiwiYSI6ImNsMmd2aXp0dTA3dzIza21qdHI1bnc1dXYifQ.TSflnvOtXeHpaz7yvIZl_Q";
  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: "country,region,place,postcode,locality,neighborhood",
    });
    // dispatch(logoutAsync());
    // navigate("/login");
    geocoder.addTo("#geocoder");

    // const results = document.getElementById("result");

    // Add geocoder result to container.
    geocoder.on("result", (e) => {
      // results.innerText = JSON.stringify(
      //   e.result.geometry.coordinates,
      //   null,
      //   2
      // );
      setLocation({
        long: e.result.geometry.coordinates[0],
        lat: e.result.geometry.coordinates[1],
      });
    });

    // Clear results container when search is cleared.
    // geocoder.on("clear", () => {
    //   results.innerText = "";
    // });
  }, []);

  useEffect(() => {
    if (location.long !== "" && location.lat !== "") {
      getApi(apiWeather + location.lat + "," + location.long).then((res) => {
        setWeather(res);
        localStorage.setItem("weather", JSON.stringify(res));
        console.log(res);
      });
    }
  }, [location]);

  return (
    <div>
      <div id="geocoder"></div>
      <div id="result">
        {weather.currently ? (
          <div>
            <p>Wind: {Math.round(weather.currently.windSpeed)} mph</p>
            <p>Humidity: {Math.round(weather.currently.humidity * 100)}%</p>
            <p>Dew Pt: {Math.round(weather.currently.dewPoint)}°</p>
            <p>UV Index: {Math.round(weather.currently.uvIndex)}</p>
            <p>Visibility: {Math.round(weather.currently.visibility)}+ mi</p>
            <p>Pressure: {Math.round(weather.currently.pressure)} mb</p>
          </div>
        ) : (
          ""
        )}
      </div>

      <div id="weather">
        {weather.currently ? (
          <div>
            <div>
              <div>
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
                <h2>
                  {Math.round(weather.currently.temperature)}°{" "}
                  {weather.currently.summary}
                </h2>
                <p>
                  Feels like:{" "}
                  {Math.round(weather.currently.apparentTemperature)} Low:{" "}
                  {Math.round(weather.daily.data[0].temperatureLow)}° High:{" "}
                  {Math.round(weather.daily.data[0].temperatureHigh)}°
                </p>
              </div>
            </div>
            <div>
              <p>{weather.hourly.summary}</p>
            </div>
            <div>
              <p>{weather.daily.summary}</p>
            </div>
            <div>
              <div>
                {weather.daily.data.map((day) => (
                  <div key={day.time}>
                    <div>
                      <img
                        src={
                          "https://darksky.net/images/weather-icons/" +
                          day.icon +
                          ".png"
                        }
                        alt="icon"
                      ></img>
                      <div>
                        <Moment unix>{day.time}</Moment>{" "}
                        {Math.round(day.temperatureLow)}°
                        <div
                          style={{
                            width: "100px",
                            height: "20px",
                            backgroundColor: "black",
                            display: "inline-block",
                            borderRadius: "50px",
                            margin: "0 10px",
                          }}
                        ></div>
                        {Math.round(day.temperatureHigh)}°
                      </div>
                    </div>
                    <div>
                      <p>{day.summary}</p>
                      <div>
                        <img
                          src="https://darksky.net/images/sunrise.png"
                          alt="icon"
                        ></img>
                        <p>
                          {new Date(day.sunriseTime * 1000).getHours()}:
                          {new Date(day.sunriseTime * 1000).getMinutes()}am
                        </p>
                      </div>
                      <div>
                        <img
                          src="https://darksky.net/images/sunset.png"
                          alt="icon"
                        ></img>
                        <p>
                          {new Date(day.sunsetTime * 1000).getHours()}:
                          {new Date(day.sunsetTime * 1000).getMinutes() < 10
                            ? "0" + new Date(day.sunsetTime * 1000).getMinutes()
                            : new Date(day.sunsetTime * 1000).getMinutes()}
                          pm
                        </p>
                      </div>
                      <div>
                        {day.precipProbability > 0 ? (
                          <div>
                            <p>
                              Rain: {Math.round(day.precipProbability * 100)}%
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Home;
