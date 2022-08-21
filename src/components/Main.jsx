//* Packages and dependencies.
// React
import React, { useState, useEffect, useRef } from "react";
// NPM packages
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import ReactAnimatedWeather from 'react-animated-weather';
// JSON and components
import weatherJSON from '../assets/weather.json';
import './details.css'
import Placeholder from '../assets/placeholder.jpg'
import Nav from "./Nav";
import Footer from "./Footer";

export default function Main() {

  // ********************************** Add-ons **********************************

  //! States: Form and state to set the interpolated variable to the query.
  // State to display pics.
  const [unsplashPic, setUnsplashPic] = useState('');
  // State to display forecast.
  const [weather, setWeather] = useState(null);
  // State to display the random index (random number between 0 and 9 to obtain a pic [will be assigned into the UnSplash API call].)
  const [randIndex, setRandIndex] = useState(0);

  //! Destructured consts.
  const { REACT_APP_ACCESS_KEY, REACT_APP_WEATHER_KEY } = process.env;
  const { log } = console;

  //! Consts.
  // Get today's date.
  const currentDate = new Date();
  const currentDay = new Date();
  const currentMonth = new Date();
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const monthday = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayDate = `${weekday[currentDay.getDay()]}`;
  const date = `${monthday[currentMonth.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
  // Get hour.
  const currentTime = new Date();
  // This will makes us have two digits in hours and minutes.
  const hour = ('0'+currentTime.getHours()).slice(-2);
  const minutes = ('0'+currentTime.getMinutes()).slice(-2);
  const time = `${hour}:${minutes}`;

  //! useRef() ---> This will let us fill our input field without re-rendering on the onChange setting.
  const myRef = useRef();
  const selectorRef = useRef();
  
  // ********************************** Functions **********************************

  //! Call to API and consuming data (UnSplash).
  //* useState is async, so if we try to do something with it in parallel, we won't have it until the next iteration.
  //* We will have to use useRef and asign a preset param to have something to show in the first iteration (param = 'Sky').
  const obtainImage = async (queryParam = 'ThisQueryIsJustToTriggerThePlaceholder') => {
    try {
      let endpoint = `https://api.unsplash.com/search/photos/?query=${queryParam}&client_id=${REACT_APP_ACCESS_KEY}`;
      // For a random photo: const endpoint = `https://api.unsplash.com/photos/random?client_id=${REACT_APP_ACCESS_KEY}`;
      let response = await axios.get(endpoint);
      setUnsplashPic(response.data);
      log(response.data);
      // We set the randIndex with a number between 0 and the maximum of elements that the API call gets per page. We do this in case the response doesn't have the same number of elements than other query (Example: Tudela (3) vs Madrid (10)).
      setRandIndex(Math.floor(Math.random() * response.data.results.length))
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
        <p className="text-white text-center text-2xl font-semibold font-onlybody">Loading forecast...</p>
        <br />
        <MoonLoader color={"rgb(255,255,255)"} size={50}/>
      </div>
    )
  }

  // **********************************  Return. To call the background from API we use React inline styles and we interpolate the response. **********************************

  return (

    <div className="main fade-in flex flex-col h-full bg-black" style={{  
        //! We do not add a pair of extra curly braces on the ternary comparation because inside of "style" it is already JSX.
        // '?' inside the interpolated variable doesn't do anything in case the call equals null, undefined or can't be done. This is just in case there is some bug in the call or in the API.
        // In case there are no photos to match the query, a placeholder will always be loaded. This will also be the landing image to display.
        backgroundImage: unsplashPic.results.length !== 0 ? `url('${unsplashPic?.results[randIndex]?.urls?.regular}')` : `url(${Placeholder})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }}>

        <Nav handleSearchProps={handleSearch} myRefProps={myRef}/>

        { weather !== null ?

            <div className="body flex flex-col justify-between justify-items-center items-center content-center self-center bg-black bg-opacity-20 backdrop-blur-md drop-shadow-lg w-full h-full" ref={selectorRef}>
              <div className="content flex flex-col justify-between justify-items-center items-center content-center self-center mt-10 w-3/6 h-4/5">

                  <div className="weather-icons flex flex-row justify-center justify-items-center items-center content-center self-center">
                    { weather.weather[0].description === weatherJSON[5].c1 ? 
                          <ReactAnimatedWeather
                          icon={"CLEAR_DAY"}
                          color={"white"}
                          size={96}
                          animate={true}
                          />
                      : (weather.weather[0].description === weatherJSON[6].bc1) || (weather.weather[0].description === weatherJSON[6].bc2) ?
                          <ReactAnimatedWeather
                          icon={"PARTLY_CLOUDY_DAY"}
                          color={"white"}
                          size={96}
                          animate={true}
                          />
                      : (weather.weather[0].description === weatherJSON[7].vc1) || (weather.weather[0].description === weatherJSON[7].vc2) ?
                          <ReactAnimatedWeather
                          icon={"CLOUDY"}
                          color={"white"}
                          size={96}
                          animate={true}
                          />
                      : (weather.weather[0].description === weatherJSON[1].d1) || (weather.weather[0].description === weatherJSON[1].d2) || (weather.weather[0].description === weatherJSON[1].d3) || (weather.weather[0].description === weatherJSON[1].d4) || (weather.weather[0].description === weatherJSON[1].d5) || (weather.weather[0].description === weatherJSON[1].d6) || (weather.weather[0].description === weatherJSON[1].d7) || (weather.weather[0].description === weatherJSON[1].d8) || (weather.weather[0].description === weatherJSON[1].d9) || (weather.weather[0].description === weatherJSON[1].d10) || (weather.weather[0].description === weatherJSON[1].d11)|| (weather.weather[0].description === weatherJSON[1].d12)|| (weather.weather[0].description === weatherJSON[1].d13) ?
                          <ReactAnimatedWeather
                          icon={"SLEET"}
                          color={"white"}
                          size={96}
                          animate={true}
                          />
                      : (weather.weather[0].description === weatherJSON[0].t1) || (weather.weather[0].description === weatherJSON[0].t2) || (weather.weather[0].description === weatherJSON[0].t3) || (weather.weather[0].description === weatherJSON[0].t4) || (weather.weather[0].description === weatherJSON[0].t5) || (weather.weather[0].description === weatherJSON[0].t6) || (weather.weather[0].description === weatherJSON[0].t7) || (weather.weather[0].description === weatherJSON[0].t8) || (weather.weather[0].description === weatherJSON[0].t9) || (weather.weather[0].description === weatherJSON[0].t10) || (weather.weather[0].description === weatherJSON[3].r1) || (weather.weather[0].description === weatherJSON[3].r2) || (weather.weather[0].description === weatherJSON[3].r3) || (weather.weather[0].description === weatherJSON[3].r4) ?
                          <ReactAnimatedWeather
                          icon={"RAIN"}
                          color={"white"}
                          size={96}
                          animate={true}
                          />
                      : (weather.weather[0].description === weatherJSON[2].s1) || (weather.weather[0].description === weatherJSON[2].s2)|| (weather.weather[0].description === weatherJSON[2].s3)|| (weather.weather[0].description === weatherJSON[2].s4)|| (weather.weather[0].description === weatherJSON[2].s5)|| (weather.weather[0].description === weatherJSON[2].s6)|| (weather.weather[0].description === weatherJSON[2].s7)|| (weather.weather[0].description === weatherJSON[2].s8)|| (weather.weather[0].description === weatherJSON[2].s9)|| (weather.weather[0].description === weatherJSON[2].s10)|| (weather.weather[0].description === weatherJSON[2].s11)|| (weather.weather[0].description === weatherJSON[2].s12) ?
                          <ReactAnimatedWeather
                          icon={"SNOW"}
                          color={"white"}
                          size={96}
                          animate={true}
                          />
                      : (weather.weather[0].description === weatherJSON[4].a1) || (weather.weather[0].description === weatherJSON[4].a2) || (weather.weather[0].description === weatherJSON[4].a3) || (weather.weather[0].description === weatherJSON[4].a4) || (weather.weather[0].description === weatherJSON[4].a5) || (weather.weather[0].description === weatherJSON[4].a6) || (weather.weather[0].description === weatherJSON[4].a7) || (weather.weather[0].description === weatherJSON[4].a8) || (weather.weather[0].description === weatherJSON[4].a9) || (weather.weather[0].description === weatherJSON[4].a10) ?
                          <ReactAnimatedWeather
                          icon={"FOG"}
                          color={"white"}
                          size={96}
                          animate={true}
                          />
                      : <p className="text-xl text-center font-onlytitles">Sorry, we can't display the icon right now.</p>
                    }
                  </div>

                  <div className="city-data text-white flex flex-col justify-center justify-items-center items-center content-center self-center">
                    {/* <MdLocationPin size={50}/> */}
                    <h2 className="text-5xl font-onlytitles font-bold"> <span>{weather.name}, {weather.sys.country}</span></h2>
                    <p className="text-xl font-onlytitles font-regular mt-6">{date} &nbsp;|&nbsp; {dayDate} {time}</p>        
                  </div>

                  <div className="temperature-data text-white flex flex-col justify-center justify-items-center items-center content-center self-center">
                    <p className="text-9xl font-onlytitles font-bold">{parseInt(weather.main.temp - 273)}<span>°C</span></p>
                    <div className="temperature-data-max-min flex flex-row mt-9">
                      <p className="text-3xl font-onlytitles font-regular font-medium mr-12">Max {parseInt(weather.main.temp_max - 273)}°C</p>
                      <p className="text-3xl font-onlytitles font-regular font-medium ml-12">Min {parseInt(weather.main.temp_min - 273)}°C</p>
                    </div>         
                  </div>

                  <div className="weather-data text-white flex flex-col justify-center justify-items-center items-center content-center self-center">
                    <p className="text-5xl font-onlytitles font-medium">{weather.weather[0].main}</p>
                    <p className="text-xl font-onlytitles font-regular">({weather.weather[0].description[0].toUpperCase()}{weather.weather[0].description.slice(1)})</p>
                  </div>

                  <div className="extra-data text-white flex flex-row justify-between justify-items-center items-center content-center w-full">
                      {/* ******************************************** */}
                      <div className="cloudiness text-xl font-onlytitles text-center">
                        <p>Cloudiness</p>
                        <hr className="border-1 border-white my-2" />
                        <p className="text-xl font-onlytitles">
                        { parseInt(weather.clouds.all) === 0 ? <span className="font-semibold">0%</span>
                            : parseInt(weather.clouds.all) > 0 && parseInt(weather.clouds.all) <= 25 ? <span className="font-semibold">25%</span>
                            : parseInt(weather.clouds.all) > 25 && parseInt(weather.clouds.all) <= 50 ? <span className="font-semibold">50%</span>
                            : parseInt(weather.clouds.all) > 50 && parseInt(weather.clouds.all) <= 70 ? <span className="font-semibold">75%</span>
                            : <span className="font-semibold">100%</span>
                        }
                        </p>
                      </div>
                      {/* ******************************************** */}
                      <div className="humidity text-center">
                        <p className="text-xl font-onlytitles">Humidity</p>
                        <hr className="border-1 border-white my-2" />
                        <p className="text-xl font-onlytitles font-semibold">{weather.main.humidity}<span>%</span></p>
                      </div>
                      {/* ******************************************** */}
                      <div className="pressure text-center">
                        <p className="text-xl font-onlytitles">Pressure</p>
                        <hr className="border-1 border-white my-2" />
                        <p className="text-xl font-onlytitles font-semibold">{weather.main.pressure}<span> mbar</span></p>
                      </div>
                      {/* ******************************************** */}
                      <div className="wind-speed text-center">
                        <p className="text-xl font-onlytitles">Wind speed</p>
                        <hr className="border-1 border-white my-2" />
                        <p className="text-xl font-onlytitles font-semibold">{weather.wind.speed}<span> m/s</span></p>
                      </div>
                  </div>

               </div>          

            </div>

        : <div className="initial-message flex flex-col justify-center justify-items-center items-center content-center self-center w-full h-full">
            <div className="initial-message-content flex flex-col justify-center justify-items-center items-center content-center self-center bg-opacity-20 w-1/2 h-1/2">
              <p className="text-white text-7xl text-center font-onlytitles font-regular"><span className="font-bold">Weather</span>ology®</p>
              <p className="text-4xl text-white font-extralight font-onlybody p-10">Search a city. <span className="underline decoration-1 underline-offset-4 font-medium">Look the weather</span>. Easy, right?</p>
              <div className="buttons flex flex-row justify-between justify-items-center items-center content-center self-center w-1/2">
                <a href="https://github.com/pelayotrives"><button className='font-onlybody text-lg bg-black hover:bg-[#2b2b2b] active:bg-[#494949] transition-all text-white py-4 px-12 rounded-md'>More projects</button></a>
                <a href="https://www.linkedin.com/in/pelayo-trives-pozuelo/"><button className='font-onlybody text-lg bg-black hover:bg-[#2b2b2b] active:bg-[#494949] transition-all text-white py-4 px-12 rounded-md'>About me</button></a>
              </div>
            </div>            
          </div>
        }
        <Footer/>
    </div>

  );

}
