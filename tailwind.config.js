/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        height: {
          'small': '25vh',
          'medium': '50vh',
          'big': '75vh',
          'enormous': '85vh',
          'giga': '95vh'
        },
        keyframes: {
          'fade-in': {
            '0%': {
              opacity: '0'
            },
            '100%': {
              opacity: '1'
            },
          },
          'fade-in-2': {
            '0%': {
              opacity: '0'
            },
            '100%': {
              opacity: '1'
            },
          },
        },
        animation: {
          'fade-in': 'fade-in 2s ease-in',
          'fade-in-2': 'fade-in-2 2s ease-in',
        },
        
    },
    fontFamily: {
      'mono': ['SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['Open Sans'],
      'onlybody': ['Roboto'],
      'onlytitles': ['Manrope'],
      'onlydetails': ['Teko']
    },
    screens: {
      'xsm': '350px',
      'sm': '376px',
      'xmd': '500px',
      'md': '550px',
      'lg': '720px',
      'xl': '1024px',
      '2xl': '1280px',
      '3xl': '1536px',
    }
  },
  plugins: [],
}
