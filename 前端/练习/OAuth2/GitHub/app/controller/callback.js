const { Controller } = require('egg');

class CallBackController extends Controller {
  async index(){
    const {ctx} = this;

    ctx.body = 'hello world'
  }
}

module.exports = CallBackController