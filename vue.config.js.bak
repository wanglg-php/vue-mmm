
const express = require('express')
const app = express()

var movieOnInfoList = require('./public/data/movieOnInfoList')  //本地json文件数据
var cinemaList = require('./public/data/cinemaList')  //本地json文件数据
var comming = require('./public/data/comming')  //本地json文件数据
var citylist = require('./public/data/citylist') 

var apiRoutes = express.Router();
app.use('/api', apiRoutes)
module.exports = {
 devServer: {
        before(app) {
            app.get('/api/movieOnInfoList', (req, res) => {
                res.json({
                    errno: 0,   // 这里是你的json内容
                    data: movieOnInfoList
                })
            });
            app.get('/api/cinemaList', (req, res) => {
                res.json({
                    errno: 0,   // 这里是你的json内容
                    data: cinemaList
                })
            }),
            app.get('/api/comming', (req, res) => {
                res.json({
                    errno: 0,   // 这里是你的json内容
                    data: comming
                })
            }),
            app.get('/api/citylist', (req, res) => {
                res.json({
                    errno: 0,   // 这里是你的json内容
                    data: citylist
                })
            })
        },
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null      //设置跨域，即将本文件内任何没有匹配到的静态文件，都指向跨域地址
    },
}