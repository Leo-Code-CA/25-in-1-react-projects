import { useEffect, useState } from "react";
import useFetch from "../../custom-hooks/useFetch";
// import Search from "./search.jsx";
// import WeatherData from "./weatherData.jsx";
// import './style.css';

export default function Weather() {

    const [search, setSearch] = useState("toronto");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [cityList, setCityList] = useState([]);
    const { data: { Object } = "stop", error: citiesFetchError, pending: citiesFetchPending } = useFetch(`https://geocoding-api.open-meteo.com/v1/search?name=${"toronto"}`);

    console.log(Object, citiesFetchError, citiesFetchPending);

    return (
        <div>Weather Component</div>
    );

}

//     async function fetchWeatherData(param) {
//         setLoading(true);
//         try {
//             const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${param}`);
//             const citiesList = await response.json();
//             let citiesData = [];
//             citiesList.results.map((city) => {
//                 citiesData.push({
//                     province: city.admin1,
//                     country: city.country,
//                     lat: city.latitude,
//                     long: city.longitude,
//                     name: city.name
//                 });
//             });

//             // JUST FOR NOW
//             const selectedCity = citiesData[0];

//             const secondResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.long}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);
//             const forecastData = await secondResponse.json();

//             if (forecastData) {

//                 setWeatherData({
//                     cityInfo: selectedCity,
//                     forecast: forecastData
//                 });
//                 setLoading(false);
//             } 

//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchWeatherData('toronto');
//     }, []);

//     return (
//         <div className="weather-app">
//             <Search 
//             search={search}
//             setSearch={setSearch}
//             handleSearch={fetchWeatherData}/>
//             <WeatherData />
//         </div>
//     );
// }