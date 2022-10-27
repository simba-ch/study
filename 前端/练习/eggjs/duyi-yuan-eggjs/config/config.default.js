exports.keys = 'abc'

exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};

exports.security = {
  csrf:{
    enable:false
  }
}

exports.baseUrl = 'https://mock.duyiedu.com/mock/76'


// exports.middleware = ['mid']

// exports.mid = {
//   match:(path) => {
//   console.log("🚀 ~ file: config.default.js ~ line 23 ~ path", path)
   
//     return true
//   }
// }