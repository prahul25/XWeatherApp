import axios from "axios";
import "./app.css";
import { useEffect, useState } from "react";

const SearchBar = ({ onSerach }) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    onSerach(searchValue);

    setSearchValue("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const WeatherCard = ({ title, value }) => {
  return (
    <div className="weather-cards">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

const WeatherDisplay = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (city) {
      setLoading(true);
      axios
        .get(`https://api.weatherapi.com/v1/current.json`, {
          params: {
            key: "ca1084d4e3e04a8d937143514242801",
            q: city,
          },
        })
        .then((res) => {
          setWeather(res.data);
        })
        .catch((err) => {
          console.error("Error in fetching data");
          alert("Failed to fetch waether data");
        })
        .finally(() => setLoading(false));
    }
  }, [city]);

  return (
    <div >
      {loading && <p>Loading data...</p>}
      {!loading && weather && (
        <div className="weather-display">
          
          <WeatherCard title="Temperature" value={`${weather.current.temp_c}°C`}/>
          <WeatherCard title="Humidity" value={`${weather.current.humidity}%`}/>
          <WeatherCard title="Condition" value={`${weather.current.condition.text}`}/>
          <WeatherCard title="Wind Speed" value={`${weather.current.wind_kph} kph`}/>
        </div>
      )}
    </div>
  );
};
function App() {
  const [city, setCity] = useState("");

  function handleSearch(searchCity) {
    setCity(searchCity);
  }
  return (
    <div className="App">
      <SearchBar onSerach={handleSearch} />
      <WeatherDisplay city={city} />
    </div>
  );
}

export default App;
