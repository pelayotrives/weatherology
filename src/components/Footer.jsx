import React from 'react'

export default function Footer() {
    return (
        <div>
            {/* fixed bottom-0 w-screen p-4 lets stick the footer to the bottom and makes it nice to look at. */}
            <footer className='fixed bottom-0 w-screen p-4 font-onlybody font-regular text-center text-white tracking-wide'> Made with 🤍 by&nbsp;
              <a className='underline' href="https://www.linkedin.com/in/pelayo-trives-pozuelo/">Pelayo Trives </a>
            </footer>
        </div>
      )
}
