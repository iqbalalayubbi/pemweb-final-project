/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  theme: {
    extend: {
      colors: {
        primary: "#7469B6",
        "dark-normal": "#464646",
        "white-gray": "#EEEEEE",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography")({
      // className: "remove-default",
    }),
  ],
  // corePlugins: {
  //   preflight: false,
  // },
};
