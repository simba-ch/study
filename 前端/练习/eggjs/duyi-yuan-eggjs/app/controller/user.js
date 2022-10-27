const Controller = require('egg').Controller;
class UserController extends Controller {
  async login(user = {}) {
    // this.ctx.body = 'Holle World'
    user.captcha = await this.app.axios.get(this.config.baseUrl + '/res/captcha').then(res => res.data)
    // user.loginId = user.loginId || ''
    // user.err = user.err || ''
    await this.ctx.render('login.njk', user)
  
  }

  async handleLogin() {
    const user = this.ctx.request.body
    const url = 'http://localhost:7001/api/admin/login'
    // const url = this.config.baseUrl + '/api/admin/login'

    const res = await this.app.axios.post(url, { ...user, remember: 7 }).then(res => res)
    console.log("🚀 ~ file: user.js ~ line 18 ~ UserController ~ handleLogin ~ res", this.ctx.cookies.get('captcha'))
    console.log("🚀 ~ file: user.js ~ line 18 ~ UserController ~ handleLogin ~ this.ctx.session", this.ctx.session)
    
    if (res.code !== 0) {
      await this.login({ loginId: user.loginId, err: res.msg })
      return
    }

    this.ctx.cookies.set('token', 'Bearer')
    this.ctx.redirect('/')
  }
}

module.exports = UserController