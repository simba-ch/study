const express = require('express');
const app = express()
// const setCookie = require('../api/cookies/index')
const axios = require('axios')
const https = require('https')
const fs = require('fs')
// app.get('/', (req, res, next) => {
//   // console.log('cookies:',req.cookies)
//   // console.log('handler1');
//   next();
//   // console.log('handler1-1');
// },
//   // (req, res, next) => {

//   //   next()
// //   //   // console.log('handler2')
// //   //   require('../api/cookies/index')
// //   //   // res.send('holle world')
// //   //   // console.log('handler2-2')
// //   // }
// // )

// // // app.use(require('../logger'))

// // app.use((req, res, next) => {
// //   // next(new Error('aaa'))
// //   next()
// //   // console.log('中间件')

// // })
// app.get('/api', async (req, res, next) => {
//   // const data = await axios.get('https://img1.baidu.com/it/u=3182839745,3823732910&fm=26&fmt=auto')
// console.log('---------')
//   res.header({
//     // 'content-type': 'image/jpeg',
//     'Access-Control-Allow-Origin': '*'
//   })
//   // console.log(Buffer.from(data.data))
//   // const imgBase64 = Buffer.from(data.data).toString('base64')
//   // res.send(imgBase64)
//   // console.log(req.body)
//   // let rawData = ''
//   // https.get('https://img1.baidu.com/it/u=3182839745,3823732910&fm=26&fmt=auto', (res) => {
//   //   res.setEncoding('binary');
//   //   res.on('data', (chunk) => {
//   //     rawData += chunk
//   //   })
//   //   res.on('end', () => {
//   //     fs.writeFile('../img/image.jpeg',rawData,'binary',() => {})


//   //   })
//   // })

//   // res.send(data.data)

//   next();

// })

// app.use(require('../middleware/getMiddleware'))

// // app.use('/img',require('../middleware/proxy'),(req,res,next) => {
// //   console.log(1111)
// //   res.header({
// //     'Access-Control-Allow-Origin': '*'
// //   })
// //   next();
// // })


// app.get('/',require('../middleware/addres1'),require('../middleware/addres2'))

// app.use((err, req, res, next) => {
//   console.log(err)
//   console.log('报错了')
// })
app.get('/callback/github', (req, res, next) => {
  try {
    if (req.query.code) {
      axios.post('https://github.com/login/oauth/access_token',
        {
          client_id: '68f51f4418e0895163c7',
          client_secret: '2524ad99766497193f2ceabbf89b3eaed195824f',
          code: req.query.code,
        }, {
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(res => {
          const data = res.data;
          axios.get('https://api.github.com/user', {
            headers: {
              'Authorization': `${data['token_type']} ${data['access_token']}`
            }
          }).then(res => {
            console.log('============'),
              console.log(res.data)
          }).catch(err => {
            console.log(err)
          })
        })
    }
  }
  catch (err) {
    console.log(err)
  }
})


app.listen('3000', () => {
  console.log('正在监听3000端口')
})