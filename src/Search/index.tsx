import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './Search.module.css';
import {  Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

interface weatherDataSearch {
    location: {name: string},
    current: {
        temp_c: number,
        condition: {
            text: string,
            icon: string
        }
    }
}

interface WeatherHours {
    forecast: {
      forecastday: [
        {
          date: string;
          hour: [
            {
              time: string;
              temp_c: number;
              time_epoch: number;
              condition: {
                icon: string;
              };
            }
          ];
        }
      ];
    };
  }

const Search = () => {
  const [cityName, setCityName] = useState<string>('');
  const [weatherDataSearch, setWeatherDataSearch] = useState<weatherDataSearch>();
  const [weatherHours, setWeatherHours] = useState<WeatherHours>();

  useEffect(() => {
    const fetchWeatherDataSearch = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=${cityName}&days=5&aqi=no&alerts=no&lang=vi`
        );
        setWeatherDataSearch(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchWeatherDataHours = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=${cityName}&days=5&aqi=no&alerts=no&lang=vi`
        );

        setWeatherHours(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherDataSearch();
    fetchWeatherDataHours();
  }, [cityName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    arrows: false,
    dots: false,
  };

  return (
    <div style={{ marginLeft: 537, marginTop: -550 }} className="absolute">
        <Link to="/">
          <div className='font-semibold text-2xl absolute' style={{marginTop: -20, marginLeft: 5}}>
            <FaAngleLeft />
          </div>
        </Link>
      <div>
        <div>
            <input className={style.input} type="text" placeholder='Tên Thành Phố' value={cityName} onChange={handleInputChange} />
        </div>
        {weatherDataSearch && (
            <div style={{ marginLeft: 50, marginTop: 30 }} className="text-white text-center font-bold	">
                <h1>Thành phố: {weatherDataSearch.location.name}</h1>
                <p>Nhiệt độ: {weatherDataSearch.current.temp_c}°C</p>
                <img style={{ marginLeft: 55}} src={weatherDataSearch.current.condition.icon} />
                <p style={{marginTop: -10 }}>{weatherDataSearch.current.condition.text}</p>
            </div>
        )}
        </div>
      <div>
        {weatherHours && (
            <div className={style.hours}>
                <div className="flex justify-between border-b-2 font-semibold scroll-my-px	">
                    <h1 style={{ marginLeft: 10 }} >Hôm nay</h1>
                    <span style={{ marginRight: 10 }} >{weatherHours?.forecast.forecastday[0].date}</span>
                </div>
            <Slider {...sliderSettings}>
                {weatherHours.forecast.forecastday[0].hour.map((hour) => (
                <div className="text-white text-center" key={hour.time}>
                    <p>{hour.temp_c}°C</p>
                    <img src={hour.condition.icon} />
                    <p>
                    {new Date(hour.time_epoch * 1000).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    })}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      )}
      </div>
    </div>
  );
};

export default Search;