const axios = require('axios')
const cheerio = require('cheerio');

module.exports = axios.get("https://book.douban.com/latest").then(res => {
  const $ = cheerio.load(res.data);
  return $('#content .grid-12-12.clearfix div ul li')
    .map((index, item) => {
      jqItem = $(item)
      return {
        name: jqItem.find('.detail-frame h2').text().trim(),
        cover: jqItem.find('a.cover img').attr('src'),
        publishDate: jqItem.find('.detail-frame .color-gray').text().trim().split(' / ')[2],
        author: jqItem.find('.detail-frame .color-gray').text().trim().split(' / ')[0]
      }
    })
    .get();
})