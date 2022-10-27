const { Controller } = require('egg');
const axios = require('axios');



class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const code = ctx.query.code;
    console.log("🚀 ~ file: home.js ~ line 10 ~ HomeController ~ index ~ code", code)
    const oToken = await axios.post('https://github.com/login/oauth/access_token', {
      'client_id': '68f51f4418e0895163c7',
      'client_secret': '2524ad99766497193f2ceabbf89b3eaed195824f',
      code,
    }, {
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => {
      console.log('====')
      return res.data
    }).catch(err => {
      console.log('++++++++++++++')
      
      return unll;

    })
    console.log("🚀 ~ file: home.js ~ line 20 ~ HomeController ~ index ~ oToken", oToken)
    const userInfo = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `${oToken['token_type']} ${oToken['access_token']}`
      }
    }).then(res => res.data)
    ctx.body = userInfo;
    console.log("🚀 ~ file: home.js ~ line 26 ~ HomeController ~ index ~ userInfo", userInfo)
  }
}

module.exports = HomeController;