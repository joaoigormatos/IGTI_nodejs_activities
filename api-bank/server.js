const app = require('./src/app')
const { hasAccountFile } = require('./src/helpers/function')


app.listen(3880, hasAccountFile)