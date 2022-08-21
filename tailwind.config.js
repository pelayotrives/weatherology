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
          }
        },
        animation: {
          'fade-in': 'fade-in 2s ease-in',
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
      'xs': '350px',
      'sm': '375px',
      'md': '551px',
      'lg': '720px',
      'xl': '1024px',
      '2xl': '1280px',
      '3xl': '1536px',
    }
  },
  plugins: [],
}
