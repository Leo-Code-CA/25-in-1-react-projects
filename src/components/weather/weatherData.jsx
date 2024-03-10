import { weatherCodes } from "./data.js";

export default function WeatherData() {

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    if (loading) return <p>Weather is currently loading!</p>;

    return (
        <div>
            <h3 className="city-name">{weatherData ? 
                `${weatherData?.cityInfo.name}, ${weatherData?.cityInfo.country}`
                : null }
            </h3>
            <span className="weather-date">{getCurrentDate()}</span>
            <p className="temperature">
                {
                    weatherData?.forecast.current["temperature_2m"]
                }
                <span>&deg;C</span>
            </p>
            <p className="weather-description">
                {
                    weatherCodes ? weatherCodes[weatherData?.forecast.current.weather_code] : null
                }
            </p>
            <div className="weather-info">
                <div className="weather-columns">
                    <p className="wind">
                        {
                            weatherData?.forecast.current.wind_speed_10m
                        }
                        km/h
                    </p>
                    <p>Wind Speed</p>
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
        </div>);
}
