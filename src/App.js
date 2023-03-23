import './App.css';
import axios from "axios";
import React, { useState, useEffect } from "react";


function App() {

  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const apiKey = "9f9a5fb02fbf0d5e202b37631a2a9b98";

  function getData(cityName) {
    if (!cityName) return;
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiUrl)
      .then((res) => {
        console.log("resp", res);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
        setError({ message: "Not Found", query: query });
      });
  }

  function handelSearch() {
    getData(city);
  }

  function handelInputChange(e) {
    console.log(e.target.value);
    setCity(e.target.value);
  }

  useEffect(() => {
    getData("mumbai");
  }, []);

   useEffect(() => {
    var d = new Date();
    var AMOrPM = d.getHours() < 12 ? "AM" : "PM";
    var hour = d.getHours() < 12 ? d.getHours() : d.getHours() - 12;
    setTime(hour + ":" + d.getMinutes() + ":" + d.getSeconds() + " " + AMOrPM);
  }, [data]);


  return (
    <>
      <div className="outer">
        <div className="inner">
          <div className="inner1">
            <span className="">Weather App</span>
          </div>
          <div className="topdiv">
            <div className="firstdiv ">
              <input
                placeholder="Mumbai"
                onChange={handelInputChange}
                value={city}
                className="dashed-border"
              />
            </div>
            <div className="firstdiv">
              <input placeholder="India" className="dashed-border" />
            </div>
            <div>
              <button
                onClick={handelSearch}
                className="dashed-border"
                style={{
                  borderTop: "hidden",
                  borderLeft: "hidden",
                  borderRight: "hidden",
                  top: "3px",
                  position: "relative",
                  width: "60px",
                }}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="divpart2">
            <div className="divpart3">
              <span className="spanp3">
                {data.name},{data?.sys?.country},Weather
              </span>

              <span className="spanp4">As of {time}</span>
              <span> </span>
            </div>

            <div className="divpart4">
              {typeof data.main != "undefined" ? (
                <span>
                  {" "}
                  {(data?.main?.temp - 273.15).toFixed(2)}°{" "}
                  <span>
                    <img
                      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    />
                  </span>
                  <span className="spanp5">{data.weather[0].main}</span>
                  <span className="spanp6">
                    {" "}
                    {data.weather[0].description}{" "}
                  </span>
                </span>
              ) : (
                <span>
                  {error.query} {error.message}
                </span>
              )}
            </div>
          </div>
          <div className="divpart5">
            <div>
              <div>
                <div className="b1div divpart6">
                  <div className="bolddiv">High/Low</div>
                  <div>
                    {(data?.main?.temp_max - 273.15).toFixed(2)} /{" "}
                    {(data?.main?.temp_min - 273.15).toFixed(2)}
                  </div>
                </div>
                <div className="dashed-border"></div>
                <div className="b1div">
                  <div className="bolddiv">Humidiity</div>
                  <div>{Math.round(data?.main?.humidity)}%</div>
                </div>
                <div className="dashed-border"></div>
                <div>
                  <div className="b1div">
                    <div className="bolddiv">Pressure</div>
                    <div>{data?.main?.pressure}hPa</div>
                  </div>
                </div>
                <div className="dashed-border"></div>
                <div>
                  <div className="b1div">
                    <div className="bolddiv">Visibility</div>
                    <div>{data.visibility / 1000}km</div>
                  </div>
                </div>
                <div className="dashed-border"></div>
              </div>
            </div>
            <div>
              <div>
                <div className="b1div divpart6">
                  <div className="bolddiv">Wind</div>
                  <div>{data?.wind?.speed}km/hr</div>
                </div>
                <div className="dashed-border"></div>
                <div className="b1div">
                  <div className="bolddiv">Wind Direction</div>
                  <div>{data?.wind?.deg}°deg</div>
                </div>
                <div className="dashed-border"></div>
                <div>
                  <div className="b1div">
                    <div className="bolddiv">Sunrise</div>
                    <div> {data.sys?.sunrise}AM</div>
                  </div>
                </div>
                <div className="dashed-border"></div>
                <div>
                  <div className="b1div">
                    <div className="bolddiv">Sunset</div>
                    <div>{data.sys?.sunset}PM</div>
                  </div>
                </div>
                <div className="dashed-border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

