import React, { useState } from "react";
import "./currentDay.css";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import OneInFiveDay from "../oneInFiveDay/OneInFiveDay";
import {
  ChangeTemperatureUnit,
  fetchWeatherByName,
} from "../../store/slices/weatherDataslice";
const clear = require("../../assets/images/clear.PNG");
const rain = require("../../assets/images/rain.PNG");
const clearAndRain = require("../../assets/images/heavyRain.PNG");

const CurrentDay = () => {

  //daySelected is used to keep the track of selected day to display in the main section  


  const [daySelected, setSelectedDay] = useState<number>(0);

  const dispatch = useAppDispatch();


  //getting data from redux state 
  const Days5Forecast = useAppSelector((state) => state.weather.weatherData);


  //getting error state in case of wrong request 


  const error = useAppSelector((state) => state.weather.error);


  //what if we want to see temperature in celcius and farenheit

  const handleChangeTemperatureUnit = async (tempUnit: string) => {
    dispatch(ChangeTemperatureUnit(tempUnit));

    let cityName: any = Days5Forecast[daySelected].cityName;
    dispatch(fetchWeatherByName(cityName));
  };




  //********************this is the main section (the selected day) */
  const currentDayDetails=()=>{
    return(
      <div>

     
      <div className="dayDescription">
          <p className="highlighted">{Days5Forecast[daySelected]?.cityName}</p>
          <p>{Days5Forecast[daySelected]?.day}</p>
          <p>{Days5Forecast[daySelected]?.weatherType}</p>
        </div>
      <div className="dayDetails">
          <div>
            <img
              className="img"
              src={
                Days5Forecast[daySelected]?.weatherType === "Clouds"
                  ? clearAndRain
                  : Days5Forecast[daySelected]?.weatherType === "Rain"
                  ? rain
                  : clear
              }
              alt="Logo"
            />
          </div>
          <div className="tempMain">
            {Days5Forecast[daySelected]?.tempMax}
            <div
              onClick={() => handleChangeTemperatureUnit("metric")}
              className="tempType"
            >
              C |
            </div>
            <div
              onClick={() => handleChangeTemperatureUnit("imperial")}
              className="tempType"
            >
              F
            </div>
          </div>
          <div className="pressure">
            <p>Pressure :{Days5Forecast[daySelected]?.pressure}hPa</p>
            <p>Humidity :{Days5Forecast[daySelected]?.humidity}%</p>
            <p>Wind Speed :{Days5Forecast[daySelected]?.windSpeed} m/s</p>
          </div>
        </div>
        </div>

    )
  }



  /// ************************end of jsx element of main section*************88888

  //handling the condition when we dont have any data
  if (Days5Forecast.length > 0) {
    return (
      <div className="container">




        {/* this is the main section which is selected */}
        

        {currentDayDetails()}




        {/* end of main region */}


        {/*  this is the horizontal row of 5 days  */}


        <div className="listCardContainer">
          {Days5Forecast.map((item, index) => (
            <div
              className={
                daySelected === index ? "selectedListCardContainer" : ""
              }
              key={index}
              onClick={() => {
                setSelectedDay(index);
              }}
            >
              <OneInFiveDay
                day={item.day}
                tempMin={item.tempMin}
                tempMax={item.tempMax}
                weatherType={item.weatherType}
              />
            </div>
          ))}
        </div>


        {/* end of list   */}


      </div>
    );
  } else {
    return <div>{error}</div>;
  }
};

export default CurrentDay;
