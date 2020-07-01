const { readFile, writeFile } = require('fs').promises
const path = require('path')
const hasAccountFile = () => {

  readFile(path.resolve(__dirname, '../', 'data', global.fileName), "utf-8")
    .then(data => {
      console.log("******* Server has been configured **********")
    })
    .catch(async err => {
      //If file doesnot exits, then create the file
      const initialJson = {
        nextId: 0,
        accounts: []
      }

      await writeFile(path.resolve(__dirname, '../', 'data', global.fileName), JSON.stringify(initialJson))

    })

  console.log('Server is running at ' + 3880)

}

exports.hasAccountFile = hasAccountFile