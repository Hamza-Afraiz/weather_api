import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { Days } from "../../constants/constants";
var tempUnit = "metric";
interface WeatherData {
  data?: (string | number)[];
  weatherType?: string;
  day?: string;
  cityName?: string;
  tempMin?: number;
  tempMax?: number;
  pressure?: number;
  windSpeed?: number;
  humidity?: number;
}
interface weatherDataList {
  weatherData: WeatherData[];
  error: string;
}

// Define the initial state using that type
const initialState: weatherDataList = {
  weatherData: [],
  error: "",
};
export const fetchWeatherByName = createAsyncThunk(
  "weather/fetchByName",
  // if you type your function argument here
  async (cityName: string | null | number) => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${tempUnit}&appid=c73aa228bfba692462f96e89080aa39a`
    );
    return await response.json();
  }
);
export const fetchWeatherByZipcode = createAsyncThunk(
  "weather/fetchByZipcode",
  // if you type your function argument here
  async (zipcode: string | null | number) => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?id=${zipcode}&units=${tempUnit}&appid=c73aa228bfba692462f96e89080aa39a`
    );
    return await response.json();
  }
);
// Define a type for the slice state

export const WeatherDataSlice = createSlice({
  name: "weather",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    ChangeTemperatureUnit(state, action) {
      tempUnit = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchWeatherByZipcode.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.weatherData = [];
        // Add user to the state array

        if (action.payload.cod !== "200") {
          state.error = action.payload.message;
          return;
        }
        let temp = setDataInObject(action);
        state.weatherData = temp;
      }
    );
    builder.addCase(
      fetchWeatherByName.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Add user to the state array
        state.weatherData = [];

        if (action.payload.cod !== "200") {
          state.error = action.payload.message;
          return;
        }
        let temp = setDataInObject(action);
        state.weatherData = temp;
      }
    );
  },
});
const setDataInObject = (action: any) => {
  let tempArray: WeatherData[] = [];
  let temp: WeatherData = {};
  let j = 0;
  for (let i = 0; i < 40; i += 8, j++) {
    temp.day = Days[j];
    const { pressure, humidity, temp_min, temp_max } =
      action.payload.list[i].main;
    temp.pressure = pressure;
    temp.humidity = humidity;
    temp.tempMin = temp_min;
    temp.tempMax = temp_max;
    temp.windSpeed = action.payload.list[i].wind.speed;
    temp.weatherType = action.payload.list[i].weather[0].main;

    temp.cityName = action.payload.city.name;
    tempArray.push(temp);

    temp = {};
  }
  return tempArray;
};

// Other code such as selectors can use the imported `RootState` type
export const { ChangeTemperatureUnit } = WeatherDataSlice.actions;
export default WeatherDataSlice.reducer;
