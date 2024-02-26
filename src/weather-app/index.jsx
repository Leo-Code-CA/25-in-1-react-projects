import { useEffect, useState } from "react";
import Search from "./search";
import './style.css';

export default function Weather() {

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    async function featchWeatherData(param) {

        setLoading(true);

        try {

            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${param}`);

            const cityData = await response.json();
            const { latitude } = cityData.results[0];
            const { longitude } = cityData.results[0];

            const secondResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`);

            const forecastData = await secondResponse.json();

            console.log(forecastData);

            if (forecastData) {
                setWeatherData(forecastData);
                setLoading(false);
            }
            

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    function handleSearch() {
        featchWeatherData(search);
    }

    useEffect(() => {
        featchWeatherData('toronto');
    }, []);

    return (
        <div>
            <Search 
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}/>
            {
                loading ? <div>Loading in progress...</div>
                : <div>
                    <div className="city-name">
                        <h3>{weatherData ? 
                        `${search}, `
                        : null }</h3>
                    </div>
                </div>
            }
        </div>
    );
}

// DO SOMETHING A BIT DIFFERENT TAKE SOME INFOS OF THE FIRST API CALL (CITY AND COUNTRY AND THE WEATHER FROM THE SECOND)