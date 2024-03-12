import { useState } from "react";
import useFetch from "../../custom-hooks/useFetch";
import SearchBar from "../search-bar";
import WeatherData from "./weatherData";
import './style.css';

export default function Weather() {

    const [weatherSearchParams, setWeatherSearchParams] = useState("Vancouver");
    const [selectedCity, setSelectedCity] = useState(null);
    const { data: citiesFetchData, error: citiesFetchError, pending: citiesFetchPending } = useFetch(`https://geocoding-api.open-meteo.com/v1/search?name=${`${weatherSearchParams}`}`);
    const { data: weatherFetchData, error: weatherFetchError, pending: weatherFetchPending } = useFetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCity ? selectedCity.lat : 0}&longitude=${selectedCity ? selectedCity.long : 0}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day`);

    const { results: citiesDataResults } = citiesFetchData ?? {};
    let citiesList = [];

    if (citiesDataResults) {
        citiesDataResults.map((city) => {
            citiesList.push({
                 province: city.admin1,
                 country: city.country,
                 country_short: city.country_code,
                 lat: city.latitude,
                 long: city.longitude,
                 name: city.name,
                 id: city.id,
                 string: `${city.name}, ${city.admin1} - ${city.country_code}`,
                 timezone: city.timezone
            });
        });
    }

    console.log(citiesFetchData);

    function handleFetchWeather(e, id) {

        !id && e.preventDefault();
        const city = id ? citiesList.find(city => city.id === id) : citiesList[0];

        setSelectedCity(city);
        setWeatherSearchParams("");

    }

    function handleFetchStates() {
        if (citiesFetchPending || weatherFetchPending) {
            return {
                msg: "Loading... Please Wait!",
                type: "loading"
            };
        } else if (citiesFetchError || weatherFetchError) {
            return {
                msg: citiesFetchError ? citiesFetchError : weatherFetchError,
                type: 'error'
            };
        } else {
            return {
                msg: "All good!",
                type: "success"
            };
        }
    }



    return (
        <div className="weather">
            <SearchBar 
            searchBarInfo={{
                id: "weatherSearchBar",
                placeholder: "Vancouver",
                label: "Enter your dream city's name:"
            }} 
            handleSearch={handleFetchWeather} 
            dataList={citiesList}
            searchParams={weatherSearchParams}
            setSearchParams={setWeatherSearchParams}/>
            {
                selectedCity ? 
                <WeatherData 
                fetchState={handleFetchStates} 
                weatherCondition={weatherFetchData} 
                currentCity={selectedCity}/>
                : null
            }
        </div>
    );

}

