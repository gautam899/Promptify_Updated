/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
];

// export const darkMode = "class";
export const theme = {
  extend: {
    fontFamily: {
      satoshi: ["Satoshi", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    colors: {
      "primary-orange": "#FF5722",
      dark: "#232A3C",
      medium: "#293245",
    },
  },
};
export const plugins = [];
