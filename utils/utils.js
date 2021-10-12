const { createInterface } = require("readline");
const userInput = createInterface({
  input: process.stdin,
  output: process.stdout,
});
const colors = require("colors");
const fileExtensions = {
  JSX: ".jsx",
  JS: ".js",
  CSSModule: ".module.css",
  CSS: ".css",
  VUE: ".vue",
};
let fileTypes = {
  reactFileType: {
    JS: false,
    JSX: false,
  },
  cssFileType: {
    CSS: false,
    CSS_Module: false,
  },
};
let frameworkSelected = {
  React: false,
  Vue: false,
};
const frameworkType = ["Select a Framework: \n", "[1] React", "[2] Vue \n"];
const reactComponentType = [
  "\nSelect React Component type: \n",
  "[1] JS ",
  "[2] JSX \n",
];
const cssType = [
  "\nSelect CSS type: \n",
  "[1] CSS -> (.css)",
  "[2] CSS Modules -> (.module.css)\n",
];
const cwd = process.cwd();
module.exports = {
  userInput,
  fileExtensions,
  cwd,
  fileTypes,
  cssType,
  reactComponentType,
  frameworkSelected,
  frameworkType,
  colors,
};
