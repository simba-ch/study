const express =require('express');
const app = express();


app.get('/',(req,res) => {
  console.log(111)
  res.cookie('name','tobi',{
    path:'/'
  })
  res.end()
})


module.exports = (app) => {
  app.get('/',(req,res,next) => {
    console.log(1111);
    res.cookie('name','tobi',{
      path:'/',
      maxAge:3600
    })
    next()
  })
}