import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './Next5Days.module.css';
import {  Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

interface WeatherDays {
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

const Next5Days = () => {
  const [weatherDays, setWeatherDays] = useState<WeatherDays>();

  useEffect(() => {
    const fetchWeatherDataDay = async () => {
      try {
        const dayResponse = await axios.get(
          'https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=Danang&days=5&aqi=no&alerts=no&lang=vi'
        );
        setWeatherDays(dayResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherDataDay();
  }, []);

  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    arrows: false,
    dots: false,
  };

  return (
    <div style={{height: 600}} className="absolute">
      <Link to="/">
        <div className='font-semibold text-xl absolute' style={{marginTop: -580, marginLeft: 540}}>
          <FaAngleLeft />
        </div>
      </Link>
      <div style={{width: 280, height: 100 ,marginTop: 30,marginLeft: 100}}>
        {weatherDays?.forecast.forecastday.map((day) => (
          <div className={style.Next5Days} key={day.date}>
            <div style={{paddingLeft: 5, paddingRight: 10}} className="flex justify-between font-semibold text-black">
              <h1>Đà Nẵng</h1>
              <h1>{day.date}</h1>
            </div>
            <Slider {...sliderSettings}>
              {day.hour.map((hour) => (
                <div key={hour.time}>
                  <p>{hour.temp_c}°C</p>
                  <img style={{width: 40, height: 40, marginTop: -7}} src={hour.condition.icon} />
                  <p style={{ marginTop: -7}}>
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
          ))}
      </div>
    </div>
  );
};

export default Next5Days;