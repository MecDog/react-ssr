let fs = require('fs')
const path = require('path')

const swFile = fs.readFileSync(path.join(__dirname, '../bundles/sw.js'), { encoding: 'utf-8' })
module.exports = async (ctx) => {
  ctx.body = swFile
  ctx.set('Content-Type', 'text/javascript')
}
