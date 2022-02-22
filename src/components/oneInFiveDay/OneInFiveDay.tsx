import React from "react";
import "./oneInFiveDay.css";
const clear = require("../../assets/images/clear.PNG");

const rain = require("../../assets/images/rain.PNG");
const clearAndRain = require("../../assets/images/heavyRain.PNG");
interface oneInFiveDayProps {
  tempMin: number | undefined;
  tempMax: number | undefined;
  weatherType: string | undefined;
  day: string | undefined;
}
const OneInFiveDay = ({
  weatherType,
  tempMax,
  tempMin,
  day,
}: oneInFiveDayProps) => {
  return (
    <div className="listCard">
      <div>{day}</div>
      <div className="img">
        <img
          src={
            weatherType === "Clouds"
              ? clearAndRain
              : weatherType === "Rain"
              ? rain
              : clear
          }
          alt="Logo"
        />
      </div>
      <div>
        {tempMin} ` {tempMax} `
      </div>
    </div>
  );
};

export default OneInFiveDay;
