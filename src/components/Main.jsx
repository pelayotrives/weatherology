//* Packages and dependencies.
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import ReactAnimatedWeather from 'react-animated-weather';
import weatherJSON from '../assets/weather.json';

export default function Main() {

  // ********************************** Add-ons **********************************

  //! States: Form and state to set the interpolated variable to the query.
  // State to display pics.
  const [unsplashPic, setUnsplashPic] = useState('');
  // State to display forecast.
  const [weather, setWeather] = useState(null);

  //! Destructured consts.
  const { REACT_APP_ACCESS_KEY, REACT_APP_WEATHER_KEY } = process.env;
  const { log } = console;

  //! Consts.
  // Random number between 0 and 9 to obtain a pic.
  const randomIndex = Math.floor(Math.random() * 10);
  // Get today's date.
  const currentDate = new Date();
  const date = `${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()}`;
  // Get hour.
  const currentTime = new Date();
  // This will makes us have two digits in hours and minutes.
  const hour = ('0'+currentTime.getHours()).slice(-2);
  const minutes = ('0'+currentTime.getMinutes()).slice(-2);
  const time = `${hour}:${minutes}`;
  // For a random photo: const endpoint = `https://api.unsplash.com/photos/random?client_id=${REACT_APP_ACCESS_KEY}`;

  //! useRef() ---> This will let us fill our input field without re-rendering on the onChange setting.
  const myRef = useRef();
  
  // ********************************** Functions **********************************

  //! Call to API and consuming data (UnSplash).
  //* useState is async, so if we try to do something with it in parallel, we won't have it until the next iteration.
  //* We will have to use useRef and asign a preset param to have something to show in the first iteration (param = 'Sky').
  const obtainImage = async (queryParam = 'Black') => {
    try {
      let endpoint = `https://api.unsplash.com/search/photos/?query=${queryParam}&client_id=${REACT_APP_ACCESS_KEY}`;
      let response = await axios.get(endpoint);
      setUnsplashPic(response.data);
      log(response.data);
    } catch (error) {
      console.log("Oopsie! Something happened with UnSplash.", error);
    }
  };

  //! Call to API and consuming data (OpenWeather)
  const obtainForecast = async (queryParam) => {
    try {
      let endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${queryParam}&APPID=${REACT_APP_WEATHER_KEY}`;
      let response = await axios.get(endpoint);
      setWeather(response.data);
      log(response.data)
    } catch (error) {
      console.log("Oopsie! Something happened with OpenWeather.", error);
    }
  }

  //! Control input of form
  // This will render obtainImage(queryParam) every time we press the button Search.
  const handleSearch = () => {
    obtainImage(myRef.current.value);
    obtainForecast(myRef.current.value);
    // We clean the field.
    myRef.current.value = "";
  }

  //! useEffect() ---> Calling API every time that the page renders.
  // We will have to invoke obtainImage() once to initialize it the first time we render our SPA and have a background.
  useEffect(() => {
    obtainImage();
    log("Re-render.")
  }, []);

  //! Loads spinner when content is not fully loaded.
  if (!unsplashPic){
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center content-center">
        <p className="text-white text-center text-xl font-semibold font-onlybody">Loading content...</p>
        <br />
        <MoonLoader color={"rgb(255,255,255)"} size={50}/>
      </div>
    )
  }

  // **********************************  Return. To call the background from API we use React inline styles and we interpolate the response. **********************************

  return (
    <div className="main flex flex-col h-screen bg-black" style={{  
        backgroundImage: `url('${unsplashPic.results[randomIndex].urls.full}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }}>

        <div className="nav flex flex-row justify-between content-center items-center px-10 py-4 bg-white bg-opacity-25 backdrop-blur-md drop-shadow-lg">
            <h1 className="text-black text-center sm:text-lg md:text-xl font-onlytitles font-regular"><span className="font-bold">Weather</span>ology®</h1>
            <div className='search flex flex-row justify-end sm:w-full lg:w-1/2'>
                <input className='p-2 w-fit font-onlybody rounded-l-md' type='text' placeholder='Type your city' autoFocus ref={myRef}/>
                <button onClick={handleSearch} className='font-onlybody bg-black hover:bg-[#2b2b2b] active:bg-[#494949] transition-all text-white py-2 sm:px-4 lg:px-8 rounded-r-md'>Search</button>
            </div>
        </div>

        { weather !== null &&
            <div className="body flex flex-col self-center w-fit bg-white bg-opacity-25 backdrop-blur-md drop-shadow-lg rounded-3xl">
                <h2 className="text-6xl font-onlytitles text-center">{weather.name}, <span>{weather.sys.country}</span></h2>
                <p className="text-xl text-center font-onlytitles">Updated on {date} at {time}</p>
                { weather.weather[0].description === weatherJSON[5].c1 ? 
                    <ReactAnimatedWeather
                        icon={"CLEAR_DAY"}
                        color={"white"}
                        size={256}
                        animate={true}
                    />
                  : (weather.weather[0].description === weatherJSON[6].bc1) || (weather.weather[0].description === weatherJSON[6].bc2) ?
                    <ReactAnimatedWeather
                        icon={"PARTLY_CLOUDY_DAY"}
                        color={"white"}
                        size={256}
                        animate={true}
                    />
                  : (weather.weather[0].description === weatherJSON[7].vc1) || (weather.weather[0].description === weatherJSON[7].vc2) ?
                    <ReactAnimatedWeather
                        icon={"CLOUDY"}
                        color={"white"}
                        size={256}
                        animate={true}
                    />
                  : (weather.weather[0].description === weatherJSON[1].d1) || (weather.weather[0].description === weatherJSON[1].d2) || (weather.weather[0].description === weatherJSON[1].d3) || (weather.weather[0].description === weatherJSON[1].d4) || (weather.weather[0].description === weatherJSON[1].d5) || (weather.weather[0].description === weatherJSON[1].d6) || (weather.weather[0].description === weatherJSON[1].d7) || (weather.weather[0].description === weatherJSON[1].d8) || (weather.weather[0].description === weatherJSON[1].d9) || (weather.weather[0].description === weatherJSON[1].d10) || (weather.weather[0].description === weatherJSON[1].d11)|| (weather.weather[0].description === weatherJSON[1].d12)|| (weather.weather[0].description === weatherJSON[1].d13) ?
                    <ReactAnimatedWeather
                        icon={"SLEET"}
                        color={"white"}
                        size={256}
                        animate={true}
                    />
                  : (weather.weather[0].description === weatherJSON[0].t1) || (weather.weather[0].description === weatherJSON[0].t2) || (weather.weather[0].description === weatherJSON[0].t3) || (weather.weather[0].description === weatherJSON[0].t4) || (weather.weather[0].description === weatherJSON[0].t5) || (weather.weather[0].description === weatherJSON[0].t6) || (weather.weather[0].description === weatherJSON[0].t7) || (weather.weather[0].description === weatherJSON[0].t8) || (weather.weather[0].description === weatherJSON[0].t9) || (weather.weather[0].description === weatherJSON[0].t10) || (weather.weather[0].description === weatherJSON[3].r1) || (weather.weather[0].description === weatherJSON[3].r2) || (weather.weather[0].description === weatherJSON[3].r3) || (weather.weather[0].description === weatherJSON[3].r4) ?
                    <ReactAnimatedWeather
                        icon={"RAIN"}
                        color={"white"}
                        size={256}
                        animate={true}
                    />
                  : (weather.weather[0].description === weatherJSON[2].s1) || (weather.weather[0].description === weatherJSON[2].s2)|| (weather.weather[0].description === weatherJSON[2].s3)|| (weather.weather[0].description === weatherJSON[2].s4)|| (weather.weather[0].description === weatherJSON[2].s5)|| (weather.weather[0].description === weatherJSON[2].s6)|| (weather.weather[0].description === weatherJSON[2].s7)|| (weather.weather[0].description === weatherJSON[2].s8)|| (weather.weather[0].description === weatherJSON[2].s9)|| (weather.weather[0].description === weatherJSON[2].s10)|| (weather.weather[0].description === weatherJSON[2].s11)|| (weather.weather[0].description === weatherJSON[2].s12) ?
                    <ReactAnimatedWeather
                        icon={"SNOW"}
                        color={"white"}
                        size={256}
                        animate={true}
                    />
                  : (weather.weather[0].description === weatherJSON[4].a1) || (weather.weather[0].description === weatherJSON[4].a2) || (weather.weather[0].description === weatherJSON[4].a3) || (weather.weather[0].description === weatherJSON[4].a4) || (weather.weather[0].description === weatherJSON[4].a5) || (weather.weather[0].description === weatherJSON[4].a6) || (weather.weather[0].description === weatherJSON[4].a7) || (weather.weather[0].description === weatherJSON[4].a8) || (weather.weather[0].description === weatherJSON[4].a9) || (weather.weather[0].description === weatherJSON[4].a10) ?
                    <ReactAnimatedWeather
                        icon={"FOG"}
                        color={"white"}
                        size={256}
                        animate={true}
                    />
                  : <p className="text-xl text-center font-onlytitles">Sorry, we can't display the icon right now.</p>
                }
                <p className="text-xl text-center font-onlytitles">{weather.weather[0].description[0].toUpperCase()}{weather.weather[0].description.slice(1)}</p>
                <p className="text-5xl font-onlytitles text-center">{parseInt(weather.main.temp - 273)}<span>°</span></p>
                <p className="text-2xl font-onlytitles text-center">Max {parseInt(weather.main.temp_max - 273)}<span>°</span></p> 
                <p className="text-2xl font-onlytitles text-center">Min {parseInt(weather.main.temp_min - 273)}<span>°</span></p> 
                <p className="text-xl font-onlytitles text-center">
                {
                    parseInt(weather.clouds.all) === 0 ? <span>Cloudiness 0%</span>
                    : parseInt(weather.clouds.all) > 0 && parseInt(weather.clouds.all) <= 25 ? <span>Cloudiness 25%</span>
                    : parseInt(weather.clouds.all) > 25 && parseInt(weather.clouds.all) <= 50 ? <span>Cloudiness 50%</span>
                    : parseInt(weather.clouds.all) > 50 && parseInt(weather.clouds.all) <= 70 ? <span>Cloudiness 75%</span>
                    : <span>Cloudiness 100%</span>
                }
                </p>
                <p className="text-xl font-onlytitles text-center">Humidity {weather.main.humidity}<span>%</span></p>
                <p className="text-xl font-onlytitles text-center">Pressure {weather.main.pressure}<span> mbar</span></p>
                <p className="text-xl font-onlytitles text-center">Wind speed {weather.wind.speed}<span> m/s</span></p>
                
            </div>
        }


    </div>
  );

}
