import { weatherCodes } from "./data.js";
import * as WeatherIcons from 'react-icons/wi';

export default function weatherCondition({ fetchState, weatherCondition, currentCity }) {

    const iconName = weatherCodes[weatherCondition?.current.weather_code].icon;
    const Icon = WeatherIcons[iconName];

    function getCurrentDate() {

        const date = new Date(weatherCondition?.current.time).toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            timeZone: currentCity.timezone,
            hour: 'numeric',
            minute: 'numeric'
        });

        const formatDate = date.split(" at ");

        return {
            date: formatDate[0],
            time: formatDate[1]
        };
    }

    if (fetchState().type === "loading") return <p>Weather is currently loading!</p>;
    if (fetchState().type === "error") return <p>{fetchState().msg}</p>;

    return (
        <div className="weather__data">
            <h3>{currentCity ? 
                `${currentCity?.name}, ${currentCity?.province} - ${currentCity?.country_short}`
                : null }
            </h3>
            <div className="weather__date">
                <span>{getCurrentDate().date}</span>
                <span>{getCurrentDate().time}</span>
            </div>
            <div className="weather__tempAndIcon">
                <strong className="weather__temperature">{weatherCondition?.current["temperature_2m"]}
                    <span>&deg;C</span>
                </strong>
                <p className="weather__description">
                    {weatherCodes ? weatherCodes[weatherCondition?.current.weather_code].description : null}
                    <span className="weather__icon"><Icon /></span>
                </p>
            </div>
            <div className="weather__info">
                <dl>
                    <dd className="wind">{weatherCondition?.current.wind_speed_10m}km/h</dd>
                    <dt>Wind Speed</dt>
                </dl>
                <dl>
                    <dd className="humidity">{weatherCondition?.current.relative_humidity_2m}%</dd>
                    <dt>Humidity</dt>
                </dl>
            </div>
        </div>
    );
}
