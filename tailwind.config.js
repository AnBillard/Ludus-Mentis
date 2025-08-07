/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./components/**/*.{html,js}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["retro", "dark"],
    darkTheme: "dark",
    logs: false
  }
};
