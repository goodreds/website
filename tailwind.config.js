// Import Tailwind default palette colors
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{njk,md,html,js}",
    "./src/_assets/_icons/*.svg",
    "./src/_includes/_components/*.{njk,md,html,js}"],
  darkMode: "class", // 'media' or 'class'
  theme: {
    // Specify which of the Tailwind default palette colors to import for use - Add new colors here if required
    colors: {
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      white: colors.white,
      black: colors.black,
      current: "currentColor",
      transparent: "transparent",
    },
    fontFamily: {
      sans: [
        "Inter",
        "NexaText",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      serif: [
        "ui-serif",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
      ],
      caption: ["OpticianSans"],
    },
    extend: {
      spacing: {
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
      },
      space: ["last"],
      backgroundColor: ["odd"],
      brightness: ["odd"],
      backgroundImage: {
        // arrow background images
        "arrows-blue":
          "url('../_assets/_arrows/arrows-blue.svg')",
        "arrows-rose":
          "url('../_assets/_arrows/arrows-rose.svg')",
        "arrows-fuchsia":
          "url('../_assets/_arrows/arrows-fuchsia.svg')",
        "arrows-blue-op25":
          "url('../_assets/_arrows/arrows-blue-op25.svg')",
        "arrows-blue-op50":
          "url('../_assets/_arrows/arrows-blue-op50.svg')",
      },
      animation: {
        "blob": "blob 7s infinite",
        "tilt": "tilt 7s infinite linear",
        "ping": "ping 1.5s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      },
      transitionDuration: {
        '0': '0ms',
        '2000': '2000ms',
        '3000': '3000ms',
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -30px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        tilt: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(2deg)",
          },
          "75%": {
            transform: "rotate(-2deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
      },
      fontSize: {
        "small-print": "0.5rem",
        "tiny": ".65rem",
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "dark", "focus", "active", "hover"],
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
