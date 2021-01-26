const { fork } = require("child_process");
const postcss = require.resolve("postcss-cli");

let bundled = false;

function writeBundle() {
  if (bundled) return;
  bundled = true;
  fork(postcss, [
    "./src/tailwindcss/index.css",
    "-o",
    "./dist/styles/tailwind.css",
    "--map",
    "--verbose",
  ]);
}

export default () => ({ writeBundle });
