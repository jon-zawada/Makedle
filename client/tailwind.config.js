import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        flip: {
          '0%': {
            transform: 'rotateX(0deg)',
            backgroundColor: 'var(--start-color)',
            '--text-opacity': '0', // Text is invisible
          },
          '50%': {
            transform: 'rotateX(90deg)',
            backgroundColor: 'var(--mid-color)',
            '--text-opacity': '0',
          },
          '100%': {
            transform: 'rotateX(0deg)',
            backgroundColor: 'var(--end-color)',
            '--text-opacity': '1', // Text becomes visible
          },
        },
      },
      animation: {
        flip: 'flip 0.8s ease-in-out forwards',
      },
      colors: {
        secondary: {
          DEFAULT: colors.neutral[200],
          hover: colors.neutral[300],
          border: colors.neutral[400],
          text: colors.neutral[500],
          dark: colors.neutral[800],
          ["dark-hover"]: colors.neutral[900],
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      });
    },
  ],
};
