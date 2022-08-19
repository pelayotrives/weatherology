import React from 'react'

export default function Nav(props) {

  // console.log(props)
  const {handleSearchProps, myRefProps} = props

  return (
    <div className="nav flex flex-row justify-between content-center items-center px-10 py-4 bg-white bg-opacity-25 backdrop-blur-md drop-shadow-lg">
        <a href="/"><h1 className="text-black text-center sm:text-lg md:text-xl font-onlytitles font-regular"><span className="font-bold">Weather</span>ology®</h1></a>
        <div className='search flex flex-row justify-end sm:w-full lg:w-1/2'>
            <input className='p-2 w-fit font-onlybody rounded-l-md' type='text' placeholder='Type your city' autoFocus ref={myRefProps}/>
            <button onClick={handleSearchProps} className='font-onlybody bg-black hover:bg-[#2b2b2b] active:bg-[#494949] transition-all text-white py-2 sm:px-4 lg:px-8 rounded-r-md'>Search</button>
        </div>
    </div>
  )
}
