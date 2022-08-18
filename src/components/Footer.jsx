import React from 'react'

// We assign to an empty span a class and we target it.
const copyrightYear = document.querySelectorAll(".current-copyright-year")
// We create a modification of the span with the current year.
copyrightYear.innerText = new Date().getFullYear();

export default function Footer() {
    return (
        <div>
            {/* fixed bottom-0 w-screen p-4 lets stick the footer to the bottom and makes it nice to look at. */}
            <footer className='fixed bottom-0 w-screen p-4 font-onlybody font-regular text-center text-white tracking-wide'> Made with 🤍 by&nbsp;
              <a className='underline' href="https://www.linkedin.com/in/pelayo-trives-pozuelo/">Pelayo Trives</a> - 
              <span className="current-copyright-year">&nbsp;{copyrightYear.innerText}</span>&nbsp;©
            </footer>
        </div>
      )
}
