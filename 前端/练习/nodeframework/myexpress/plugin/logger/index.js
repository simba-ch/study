const log4js = require('log4js');
const path = require('path');
module.exports = (configPath) => {

  const config = {
    appenders: {
      app: {

        type: "file",
        filename:path.resolve(__dirname,'../../', 'logs', "app.log"),
        maxLogSize: 64 * 1024 * 1024,
        backups: 5,
        compress: false,
        encoding: 'utf-8',
        layout: {
          type: 'basic'
        },
        keepFileExt: true

      },
      ctx: {

        type: "file",
        filename: configPath || path.resolve(__dirname,'../../', 'logs', "ctx.log"),
        maxLogSize: 64 * 1024 * 1024,
        backups: 5,
        compress: false,
        encoding: 'utf-8',
        layout: {
          type: 'basic'
        },
        keepFileExt: true

      },
      agent: {

        type: "file",
        filename: configPath || path.resolve(__dirname,'../../', 'logs', "agent.log"),
        maxLogSize: 64 * 1024 * 1024,
        backups: 5,
        compress: false,
        encoding: 'utf-8',
        layout: {
          type: 'basic'
        },
        keepFileExt: true

      },
      err: {

        type: "file",
        filename: configPath || path.resolve(__dirname,'../../', 'logs', "err.log"),
        maxLogSize: 64 * 1024 * 1024,
        backups: 5,
        compress: false,
        encoding: 'utf-8',
        layout: {
          type: 'basic'
        },
        keepFileExt: true

      }
    },
    categories: {
      default: {
        appenders: ["ctx"],
        level: "debug",
      },
      app: {
        appenders: ["app"],
        level: "debug",
      },
      err: {
        appenders: ["err"],
        level: "debug",
      },
      ctx: {
        appenders: ["ctx"],
        level: "debug",
      },
      agent: {
        appenders: ["agent"],
        level: "debug",
      }
    }
  }

  const logger = log4js.configure(config)


  return {
    app: logger.getLogger('app'),
    ctx: logger.getLogger('ctx'),
    agent: logger.getLogger('agent'),
    err: logger.getLogger('err')
  }
}