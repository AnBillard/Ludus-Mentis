module.exports = {
  content: ["./**/*.html", "./assets/js/**/*.js", "./components/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter","system-ui","-apple-system","sans-serif"],
        display: ["Space Grotesk","system-ui","sans-serif"]
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      light: {
        "primary":"#ea580c",
        "secondary":"#f59e0b",
        "accent":"#ef4444",
        "base-100":"#ffffff"
      }
    }]
  }
}
