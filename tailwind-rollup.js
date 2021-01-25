const { fork } = require("child_process");
const postcss = require.resolve("postcss-cli");

function writeBundle() {
  fork(postcss, [
    "./src/tailwindcss/index.css",
    "-o",
    "./dist/styles/tailwind.css",
    "--map",
    "--verbose",
  ]);
}

export default () => ({ writeBundle });
