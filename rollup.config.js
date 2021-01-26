// yarn add -D svelte rollup rollup-plugin-serve rollup-plugin-livereload @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-terser rollup-plugin-cleaner rollup-plugin-svelte @rollup/plugin-alias rollup-plugin-css-only @rollup/plugin-json

import livereload from "rollup-plugin-livereload";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import cleaner from "rollup-plugin-cleaner";
import svelte from "rollup-plugin-svelte";
import alias from "@rollup/plugin-alias";
import css from "rollup-plugin-css-only";
import tailwind from "./tailwind-rollup";
import json from "@rollup/plugin-json";
import serve from "rollup-plugin-serve";
import path from "path";

const watch = process.env.ROLLUP_WATCH;

const inputPath = path.join(__dirname, "src");
const outputPath = path.join(__dirname, "dist");
const outputStyles = path.join(outputPath, "styles");
const outputScripts = path.join(outputPath, "scripts");

export default {
  input: path.join(inputPath, "index.js"),
  output: {
    dir: outputScripts,
    sourcemap: true,
    format: "es",
  },
  plugins: [
    json(),
    alias({
      entries: [{ find: "@", replacement: inputPath }],
    }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs(),
    svelte({ compilerOptions: { dev: watch } }),
    css({ output: path.join(outputStyles, "index.css") }),
    cleaner({ targets: [outputScripts] }),
    watch && livereload(outputPath),
    watch && serve(outputPath),
    !watch && terser(),
    tailwind(),
  ],
};
