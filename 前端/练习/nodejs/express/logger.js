const log4js = require('log4js')
const path = require('path')
log4js.configure({
  appenders: {
    visit: {
      type: "file",
      filename: path.resolve(__dirname, 'logger/visit/visit.log'),
      keepFileExt:true,
      maxLogSize: 1024 ** 2 * 10,

    },
    defaultout: {
      type: "file",
      filename: path.resolve(__dirname, 'logger/default/default.log'),
      keepFileExt:true,
      maxLogSize: 1024 ** 2 * 10,
    },
  },
  categories: {
    default: { appenders: ["defaultout"], level: "debug" },
    visit: { appenders: ["visit"], level: "debug" }
  }
});


const visitLog = log4js.getLogger('visit')
module.exports = log4js.connectLogger(visitLog, {
  level: 'auto'
})