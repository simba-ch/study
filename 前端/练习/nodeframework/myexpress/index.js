

const { app, ctx, err, agent } = require('./plugin/logger/index')()


console.log(app)
app.debug('abc')