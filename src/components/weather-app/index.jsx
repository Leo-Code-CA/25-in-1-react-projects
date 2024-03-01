import { useEffect, useState } from "react";
import Search from "./search.jsx";
import { weatherCodes } from './data.js';
import './style.css';

export default function Weather() {

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    async function featchWeatherData(param) {

        setLoading(true);

        try {

            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${param}`);
            const citiesList = await response.json();

            let citiesData = [];
            
            citiesList.results.map((city) => {
                citiesData.push({
                    province: city.admin1,
                    country: city.country,
                    lat: city.latitude,
                    long: city.longitude,
                    name: city.name
                });
            });

            // JUST FOR NOW
            const selectedCity = citiesData[0];

            const secondResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.long}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);
            const forecastData = await secondResponse.json();

            console.log(forecastData);
            console.log(weatherCodes[weatherData?.forecast.current.weather_code]);

            if (forecastData) {

                setWeatherData({
                    cityInfo: selectedCity,
                    forecast: forecastData
                });
                setLoading(false);
            } 

        } catch (error) {
            // console.log(error);
            setLoading(false);
        }
    }

    function handleSearch() {
        featchWeatherData(search);
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    useEffect(() => {
        featchWeatherData('toronto');
    }, []);

    return (
        <div className="weather-app">
            <Search 
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}/>
            {
                loading ? <div className="weather-loading">Loading in progress...</div>
                : <div>
                    <div className="city-name">
                        <h3>{weatherData ? 
                        `${weatherData?.cityInfo.name}, ${weatherData?.cityInfo.country}`
                        : null }</h3>
                    </div>
                    <div className="weather-date">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div className="temperature">
                        {
                        weatherData?.forecast.current["temperature_2m"]
                        }
                        <span>&deg;C</span>
                    </div>
                    <p className="weather-description">
                        {
                            weatherCodes ? weatherCodes[weatherData?.forecast.current.weather_code] : null
                        }
                    </p>
                    <div className="weather-info">
                        <div className="weather-columns">
                            <div>
                                <p className="wind">
                                    {
                                        weatherData?.forecast.current.wind_speed_10m
                                    }
                                    km/h
                                </p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                        <div className="weather-columns">
                            <div>
                                <p className="humidity">
                                    {
                                        weatherData?.forecast.current.relative_humidity_2m
                                    }
                                    %
                                </p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}