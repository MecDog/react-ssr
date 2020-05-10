let fs = require('fs')
let path = require('path')
let yaml = require('js-yaml')

const configPath = path.join(__dirname, '../../config/app.yaml')
const config = yaml.safeLoad(fs.readFileSync(configPath))

module.exports = config
