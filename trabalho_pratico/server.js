const app = require('./src/app')
const initialConfigurationChecker = require('./src/config/initialConfiguration')


app.listen(3880, initialConfigurationChecker)