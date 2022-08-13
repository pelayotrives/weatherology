//* Packages and dependencies.
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";

export default function Main() {

  // ********************************** Add-ons **********************************

  //! States: Form and state to set the interpolated variable to the query.
  // API state.
  const [cityQuery, setCityQuery] = useState('Gradient');
  // Input state.
  const [cityForm, setCityForm] = useState('');
  // State to display pics.
  const [unsplashPic, setUnsplashPic] = useState("");

  //! Destructured consts.
  const { REACT_APP_ACCESS_KEY, REACT_APP_SECRET_KEY } = process.env;
  const { log } = console;

  //! Consts.
  // Random number between 0 and 9 to obtain a pic.
  const randomIndex = Math.floor(Math.random() * 10);
  // Query.
  const endpoint = `https://api.unsplash.com/search/photos/?query=${cityQuery}&client_id=${REACT_APP_ACCESS_KEY}`;
  // For a random photo:
  //* const endpoint = `https://api.unsplash.com/photos/random?client_id=${REACT_APP_ACCESS_KEY}`;

  //! useRef() ---> for input.
  const myRef = useRef();
  
  //! useEffect() ---> Calling API every time that the page renders.
  useEffect(() => {
    obtainImage();
  }, []);

  // ********************************** Functions **********************************

  //! Call to API and consuming data.
  const obtainImage = async () => {
    try {
      const response = await axios.get(endpoint);
      setUnsplashPic(response.data);
      log(response.data);
    } catch (error) {
      console.log("Oopsie! Something happened.", error);
    }
  };

  //! Control input of form
  const logInput = (event) => {
    log(event.target.value);
  }

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
    <div className="main h-screen bg-black" style={{  
        backgroundImage: `url('${unsplashPic.results[randomIndex].urls.full}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="nav flex flex-row justify-between content-center items-center px-10 py-4 bg-white bg-opacity-25 backdrop-blur-md drop-shadow-lg">
            <h1 className="text-black text-center sm:text-lg md:text-xl font-onlytitles font-regular"><span className="font-bold">Weather</span>ology®</h1>
            <div className='search flex flex-row justify-end sm:w-full lg:w-1/2'>
                <input className='p-2 w-fit font-onlybody rounded-l-md' type='text' placeholder='Type your city' ref={myRef} onChange={logInput}/>
                <button className='font-onlybody bg-black text-white py-2 sm:px-4 lg:px-8 rounded-r-md'>Search</button>
            </div>
        </div>
    </div>
  );

}
