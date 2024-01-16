import React, { useState } from "react";
import axios from 'axios';

interface IWeatherData {
    city_name: string;
    app_temp: number;
    sunrise: string;
    sunset: string;
    wind_spd: number;
}

const Home: React.FC = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState<IWeatherData | null>(null)
    const [loading, setLoading] = useState(false)

    const fetchWeatherData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`YOUR_WEATHER_API_ENDPOINT?city=${city}`);
            console.log('Weather data: ', response.data);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data: ', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <input type="text" placeholder="Enter City Name" value={city} onChange={(e) => setCity(e.target.value)} />
            <button onClick={fetchWeatherData}>
                {loading ? 'Fetching Weather data...' : 'Get Weather'}
            </button>
            {weatherData ? (
                <div>
                    <div className="item-row">
                        <h2>City:</h2>
                        <span>{weatherData.city_name}</span>
                    </div>
                    <div className="item-row">
                        <h2>Current temperature:</h2>
                        <span>{weatherData.app_temp} C</span>
                    </div>
                    <div className="item-row">
                        <h2>Wind Speed:</h2>
                        <span>{weatherData.wind_spd} m/s</span>
                    </div>
                    <div className="item-row">
                        <h2>Sunrise:</h2>
                        <span>{weatherData.sunrise}</span>
                    </div>
                    <div className="item-row">
                        <h2>Sunset:</h2>
                        <span>{weatherData.sunset}</span>
                    </div>
                </div>
            ) : (
                <div>{loading ? 'Fetching weather data...' : 'Please enter the city name'}</div>
            )}
        </div>
    );
};

export default Home;
