import './style.css'
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import nubladoImg from '../../../assets/nublado.png';
import ensolaradoImg from '../../../assets/ensolarado.png'; 
import chuvosoImg from '../../../assets/chuvoso.png'; 

const WeatherComponent = () => {
  const [city, setCity] = useState(""); 
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null); 
  const apiKey = 'bb9e49eabff6621dfc4b8ba50c130d06';

   // Lista de cidades para escolher aleatoriamente
   const cities = ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte", "Porto Alegre", 
    "Curitiba"
   ];

  // Função para mapear a descrição do tempo para uma imagem
  const getWeatherImage = (description) => {
    if (description.includes("nublado") || description.includes("nuvens dispersas")  || description.includes("algumas nuvens")) {
      return nubladoImg;
    } else if (description.includes("sol") || description.includes("claro") || description.includes("céu limpo")){
      return ensolaradoImg;
    } else if (description.includes("chuva") || description.includes("trovoadas") ) {
      return chuvosoImg;
    } else {
      return null;
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=metric&lang=pt_br`
      );

      if (!response.ok) {
        throw new Error("Cidade não encontrada");
      }

      const data = await response.json();
      const minTemp = data.main.temp_min;
      const maxTemp = data.main.temp_max;
      const weatherDescription = data.weather[0].description;

      setWeatherData({
        minTemp,
        maxTemp,
        weatherDescription,
        weatherImage: getWeatherImage(weatherDescription), // Mapeia a descrição para a imagem
        city: data.name,
      });

      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    fetchWeatherData(randomCity);
  }, []);

  return (
    <div className="containerWeather">
      {error && <p>{error}</p>}

      {weatherData && (
        <div className='containerDataWeather'>
          <div className="containerImgDescription">
            {weatherData.weatherImage ? (
              <img src={weatherData.weatherImage} alt={weatherData.weatherDescription} />
            ) : (
              <p>{weatherData.weatherDescription}</p>
            )}
          </div>

          <div>
            <h2>{weatherData.city}</h2>
            <div className="containerTemperature">
              <p>{weatherData.minTemp}°C</p>
              <p>{weatherData.maxTemp}°C</p>
            </div>
          </div>
        </div>
      )}

      <div className='containerInputWeather'>
        <input
          type="text"
          placeholder="Cidade"
          value={city}
          onChange={handleCityChange}
        />
        <button onClick={() => fetchWeatherData(city)}>
          <CiSearch />
        </button>
      </div>
    </div>
  );
};

export default WeatherComponent;
