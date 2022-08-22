import React from 'react'

export default function Nav(props) {

  // console.log(props)
  const {handleSearchProps, myRefProps} = props

  return (
    <div className="nav flex flex-row justify-between content-center items-center px-10 py-4 bg-white bg-opacity-25 backdrop-blur-md drop-shadow-lg">
        <a href="/"><p className="xsm:hidden xmd:flex text-xl text-black text-center font-onlytitles font-regular"><span className="font-bold">Weather</span>ology®</p></a>
        <div className='xsm:justify-center xmd:justify-end xsm:w-full lg:w-1/2 search flex flex-row'>
            <input className='p-2 w-fit font-onlybody rounded-l-md' type='text' placeholder='Type your city' autoFocus ref={myRefProps}/>
            <button onClick={handleSearchProps} className='xsm:px-4 lg:px-8 font-onlybody bg-black hover:bg-[#2b2b2b] active:bg-[#494949] transition-all text-white py-2 rounded-r-md'>Search</button>
        </div>
    </div>
  )
}
