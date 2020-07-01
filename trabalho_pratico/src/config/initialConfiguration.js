const { readFile, writeFile } = require("fs").promises
const path = require("path")

const initialConfigurationChecker = async () => {
  try {
    const gradesData = await readFile(path.resolve(__dirname, '../', 'data', global.fileName), "utf-8")
    if (gradesData) {
      console.log("File already configured")
    }
  }
  catch (err) {
    const initialConfiguration = {
      nextId: 0,
      grades: []
    }
    await writeFile(path.resolve(__dirname, '../', 'data', global.fileName), JSON.stringify(initialConfiguration))
    console.log("Server has been configured :)")
  }
  console.log("Server is running at port 3880")

}


module.exports = initialConfigurationChecker