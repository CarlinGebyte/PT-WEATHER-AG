import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import React, { useEffect, useState } from "react";
import { getApi } from "../utils/getApi";
import Moment from "react-moment";
import "../styles/home.css";
import { getAuth } from "firebase/auth";

Moment.globalFormat = "D MMM YYYY";

export const apiWeather =
  "https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/";
function Home() {
  const initialStateW = JSON.parse(localStorage.getItem("weather")) || {};
  const initialStateL = {
    long: initialStateW.longitude || "",
    lat: initialStateW.latitude || "",
  };

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
  const auth = getAuth();
  useEffect(() => {
    if (auth.currentUser) {
      if (location.long !== "" && location.lat !== "") {
        getApi(apiWeather + location.lat + "," + location.long).then((res) => {
          setWeather(res);
          localStorage.setItem("weather", JSON.stringify(res));
        });
      }
    }
    if (location.lat === "" && location.long === "") {
      document.getElementById("home").classList.add("h-[57.3vh]");
    } else {
      document.getElementById("home").classList.remove("h-[57.3vh]");
    }
  }, [location, auth]);

  const handleGeolocalization = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          long: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div id="home" className="w-full">
      <div
        id="geocoder"
        className="bg-[#eee] py-2 px-6 flex items-center justify-center"
      >
        {" "}
        <span className="w-[20px]">
          <img
            className="w-5 m-auto"
            src="https://darksky.net/images/current-location.png"
            alt="location"
            onClick={() => handleGeolocalization()}
          ></img>
        </span>
      </div>
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
                  className="w-16 h-16"
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
              <div className="flex w-full text-center overflow-auto">
                {weather.hourly.data.map((hour) => (
                  <div className="w-16 m-1" key={hour.time}>
                    <p>{new Date(hour.time * 1000).getHours()}</p>
                    <img
                      className="w-16"
                      src={
                        "https://darksky.net/images/weather-icons/" +
                        hour.icon +
                        ".png"
                      }
                      alt="icon"
                    ></img>
                    <p className="font-light">
                      {Math.round(hour.temperature)}°
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-light text-xl text-center">
                {weather.daily.summary}
              </p>
            </div>
            <div>
              <div>
                {weather.daily.data.map((day) => (
                  <div className="flex flex-col items-center" key={day.time}>
                    <div className="flex items-center w-full justify-center">
                      <img
                        className="w-16"
                        src={
                          "https://darksky.net/images/weather-icons/" +
                          day.icon +
                          ".png"
                        }
                        alt="icon"
                      ></img>
                      <div className="w-2/4 text-center md:w-3/4">
                        <Moment unix>{day.time}</Moment>{" "}
                        {Math.round(day.temperatureLow)}°
                        <div
                          style={{
                            height: "20px",
                            backgroundColor: "#333",
                            display: "inline-block",
                            borderRadius: "50px",
                            margin: "0 10px",
                          }}
                          className="w-2/4"
                        ></div>
                        {Math.round(day.temperatureHigh)}°
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-center">{day.summary}</p>
                      <div className="flex w-full justify-around items-center">
                        <div>
                          <img
                            className="w-8 m-auto"
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
                            className="w-8 m-auto"
                            src="https://darksky.net/images/sunset.png"
                            alt="icon"
                          ></img>
                          <p>
                            {new Date(day.sunsetTime * 1000).getHours()}:
                            {new Date(day.sunsetTime * 1000).getMinutes() < 10
                              ? "0" +
                                new Date(day.sunsetTime * 1000).getMinutes()
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
