const watch = process.env.ROLLUP_WATCH;

module.exports = {
  purge: {
    enabled: !watch,
    content: ["./dist/**/*.html", "./src/**/*.svelte"],
  },
  darkMode: "class",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
