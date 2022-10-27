const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    // this.ctx.body = 'Holle World'
    const token = this.ctx.cookies.get('token')
    if (!token) {
      this.ctx.redirect('/login')
      return
    }
    const res = await this.app.axios.get("https://mock.duyiedu.com/mock/76/api/admin/whoami", {
      headers: {
        'Authorization': token
      }
    })

      .then(res => res.data)
    console.log("🚀 ~ file: home.js ~ line 15 ~ HomeController ~ index ~ res", res)
    if (res.code !== 0) {
      this.ctx.redirect('/login')
      return
    }

    // console.log('============')
    //  console.log(this.ctx.state)
    await this.ctx.render('home.njk', { title: '首页', nickname: res.data.name })
  }
}

module.exports = HomeController