import React from 'react'
import axios from 'axios'

export default function Main() {
  return (
    <div>
        <h1 className='text-white text-center text-5xl pt-6 pb-4 w-full font-onlytitles font-medium'><span className='font-bold text-[#77b1ce]'>Weather</span>ology</h1>
        <p className='text-white text-center text-md w-full font-onlybody font-regular tracking-wider'>Select a city to check the weather forecast.</p>
    </div>
  )
}
