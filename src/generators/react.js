const {
  input,
  fileExtensions,
  cwd,
  inputData,
  cssType,
  reactComponentType,
  framework,
  frameworkType,
  colors,
} = require("../../utils/utils");
const { existsSync, writeFile, mkdirSync } = require("fs");
const { VueGenerator } = require("./vue");
let { JS, JSX, CSS, CSS_Module } = inputData;
const {
  JS: jsExt,
  JSX: jsxExt,
  CSS: cssExt,
  CSSModule: cssModuleExt,
} = fileExtensions;
const exit = process.exit;
let count = 0;
let { React, Vue } = framework;
const generatedComponents = [];

console.log(colors.white(`\n<- REVUE COMPONENT GENERATOR ->\n`).bold);

frameworkType.forEach((item) => {
  console.log(item);
});

input.question("Enter your choice: ", (ans) => {
  switch (ans) {
    case "1":
      React = true;
      break;
    case "2":
      Vue = true;
      break;
    default:
      console.log(
        colors.red(
          "Please select one of the available options before you continue!"
        ).bold
      );
      exit();
  }

  if (React) {
    reactComponentType.forEach((type) => {
      console.log(type);
    });

    input.question("Enter your choice: ", (choice) => {
      switch (choice) {
        case "1":
          JS = true;
          break;
        case "2":
          JSX = true;
          break;
        default:
          console.log(
            colors.red(
              "Please select one of the available options before you continue!"
            ).bold
          );
          exit();
      }
      cssType.forEach((type) => {
        console.log(type);
      });

      input.question("Enter your choice: ", (cssChoice) => {
        switch (cssChoice) {
          case "1":
            CSS = true;
            break;
          case "2":
            CSS_Module = true;
            break;
          default:
            console.log(
              colors.red(
                "Please select one of the available options before you continue!"
              ).bold
            );
            exit();
        }
        console.log(
          colors.yellow(
            "\n>> Note: After entering one component name, press enter to write another component name and so on. Once finished, end the process using [ Ctrl+C or Ctrl+D ]. "
          )
        );
        console.log("\nEnter component name: ");
        input.on("line", (name) => {
          if (name === "") {
            console.log(colors.yellow("Please enter a component name!").bold);
            exit();
          } else {
            ReactComponentGenerator(name);
            generatedComponents.push(name);
            count++;
          }
        });
      });
    });
  }

  if (Vue) {
    VueGenerator();
  }
});

function ReactComponentGenerator(componentName) {
  if (!existsSync(`${cwd}/${componentName}`)) {
    mkdirSync(`${cwd}/${componentName}`);
  } else {
    console.log(colors.yellow(`Component "${componentName}" already exists!`));
    exit();
  }
  // Validating input and sending appropriate data to the generator
  JS && CSS && generator(JS, CSS);
  JS && CSS_Module && generator(JS, CSS_Module);
  JSX && CSS && generator(JSX, CSS);
  JSX && CSS_Module && generator(JSX, CSS_Module);

  function generator(c1, c2) {
    // C1 & C2: Conditions upon which the generator makes decisions.
    if (c1 && c2) {
      if (
        !existsSync(
          `${cwd}/${componentName}${JS ? jsExt : JSX ? jsxExt : ""}`
        ) &&
        !existsSync(
          `${cwd}/${componentName}${
            CSS ? cssExt : CSS_Module ? cssModuleExt : ""
          }`
        )
      ) {
        writeFile(
          `${componentName}/${componentName}${JS ? jsExt : JSX ? jsxExt : ""}`,
          "",
          (err) => {
            err &&
              console.log(
                colors.red("Something went wrong. Please try again!").bold
              );
          }
        );
        writeFile(
          `${componentName}/${componentName}${
            CSS ? cssExt : CSS_Module ? cssModuleExt : ""
          }`,
          "",
          (err) => {
            err &&
              console.log(
                colors.red("Something went wrong. Please try again!").bold
              );
          }
        );
      } else {
        console.log(colors.yellow(`File already exists!`).bold);
      }
    }
  }
}

input.on("close", () => {
  if (count > 0 && generatedComponents !== 0) {
    console.log(
      `${colors.green(`\nOperation successful.`).bold} ${
        colors.white(
          `Created ${count} ${
            count > 1 ? "components" || count <= 1 : "component"
          }: \n`
        ).bold
      }`
    );
    generatedComponents.forEach((item) => {
      console.log(">>", colors.yellow(`${item}`).bold);
    });
  } else {
    return;
  }
});
