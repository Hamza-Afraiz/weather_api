import { Autocomplete } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import "./searchBar.css";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";

import {
  fetchWeatherByName,
  fetchWeatherByZipcode,
} from "../../store/slices/weatherDataslice";
import { useAppDispatch } from "../../store/hooks";
const top3Cities = ["Islamabad", "Lahore", "Multan"];
const filters = ["CityName", "City ID", "Zip Code"];
const SearchBar = () => {
  const [value, setValue] = React.useState<string | null>(top3Cities[0]); //handling input value
  const [filterType, setFilterType] = React.useState<string | null>(filters[0]); //handling filter type e.g., zipcode

  const dispatch = useAppDispatch();

  //handling filter and calling method according to filterType
  const handlingFilter = () => {
    if (filterType === "CityName") {
      dispatch(fetchWeatherByName(value));
    } else if (filterType === "City ID") {
      dispatch(fetchWeatherByZipcode(value));
    } else {
      dispatch(fetchWeatherByZipcode(value));
    }
  };

  return (
    <div className="searchBar">
      {/*this is for selecting filter type */}
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        freeSolo
        options={filters}
        onChange={(event: any, newValue: string | null) => {
          setFilterType(newValue);
        }}
        sx={{ width: "20%" }}
        renderInput={(params) => <TextField {...params} label={filterType} />}
      />

      {/*end************ */}

      {/*this is for getting input value */}

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top3Cities}
        freeSolo
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        sx={{
          width: "60%",
        }}
        onInputChange={(event, newInputValue) => {
          setValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label={value} />}
      />

      {/*end************ */}

      {/*this is search icon */}
      <div className="searchIcon" onClick={handlingFilter}>
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SearchBar;
