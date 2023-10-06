import{ useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './OneDay.module.css';
import {  Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";


interface WeatherCurrent {
   current: {
     condition: {
       text: string;
       icon: string;
     };
     temp_c: number;
  };
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

const OneDay = () => {
  const [weatherCurrent, setWeatherCurrent] = useState<WeatherCurrent>();
  const [weatherHours, setWeatherHours] = useState<WeatherHours>();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const currentResponse = await axios.get(
           'https://api.weatherapi.com/v1/current.json?key=c9a0ca46550648b29ce125849232709&q=Danang&aqi=no&lang=vi'
        );
        const hoursResponse = await axios.get(
          'https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=Danang&days=1&aqi=no&alerts=no&lang=vi'
        );

        setWeatherCurrent(currentResponse.data);
        setWeatherHours(hoursResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherData();
  }, []);

  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    arrows: false,
    dots: false,
  };

  return (
    <div className="OneDay">
      <div style={{ width: 287, height: 602, marginTop: -530, marginLeft: 540 }} className="current absolute mx-auto text-center">
        <Link to="/">
          <div className='font-semibold text-2xl absolute' style={{marginTop: -20, marginLeft: 5}}>
            <FaAngleLeft />
          </div>
        </Link>
        <h1 className="font-bold text-xl">Thời tiết hôm nay</h1>
        <div className="text-slate-200 font-medium text-lg">
          <h1 className="font-black text-1xl">Đà Nẵng</h1>
          <h2 style={{ marginTop: -5 }} className="font-black text-4xl">{weatherCurrent?.current.temp_c}°C</h2>
          <div style={{ marginLeft: 105, marginTop: 5 }}>
            <img src={weatherCurrent?.current.condition.icon} alt="weather icon" />
          </div>
          <h1 style={{marginTop: -10 }}>{weatherCurrent?.current.condition.text}</h1>
        </div>
      </div>

      <div className={style.hours}>
        <div className="header flex text-white justify-between border-b-2 font-semibold">
          <p style={{ marginLeft: 10 }} className="">Hôm nay</p>
          <span style={{ marginRight: 10 }}>{weatherHours?.forecast.forecastday[0].date}</span>
        </div>
        <Slider {...sliderSettings}>
          {weatherHours?.forecast.forecastday[0].hour.map((hour) => (
            <div className="text-white text-center" key={hour.time}>
              <p>{hour.temp_c}°C</p>
              <img src={hour.condition.icon}/>
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
    </div>
  );
};

export default OneDay;