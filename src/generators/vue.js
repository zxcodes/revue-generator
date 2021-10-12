const { fileExtensions, userInput, cwd, colors } = require("../../utils/utils");
const { writeFile, existsSync } = require("fs");
const { VUE: vueExt } = fileExtensions;
let createdComponentCount = 0;
const generatedComponents = [];

function VueGenerator() {
  console.log(
    colors.yellow(
      "\n>> Note: After entering one component name, press enter to write another component name and so on. Once finished, end the process using [ Ctrl+C or Ctrl+D ]. "
    )
  );
  console.log("\nEnter Vue Component Name: ");
  userInput.on("line", (vueFile) => {
    if (vueFile === "") {
      console.log(colors.yellow("Please enter a component name!").bold);
      process.exit();
    } else {
      if (!existsSync(`${cwd}/${vueFile}${vueExt}`)) {
        createdComponentCount++;
        generatedComponents.push(vueFile);
        writeFile(`${cwd}/${vueFile}${vueExt}`, "", (err) => {
          if (err) {
            console.log(
              colors.red("Something went wrong. Please try again!").bold
            );
          } else {
            return;
          }
        });
      } else {
        console.log(
          colors.yellow(`Component [ ${vueFile}${vueExt} ] already exists!`)
            .bold
        );
        process.exit();
      }
    }
  });
}
userInput.on("close", () => {
  if (createdComponentCount > 0 && generatedComponents !== 0) {
    console.log(
      `${colors.green(`\nOperation successful.`).bold} ${
        colors.white(
          `Created ${createdComponentCount} ${
            createdComponentCount > 1
              ? "components" || createdComponentCount <= 1
              : "component"
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

module.exports = { VueGenerator };
