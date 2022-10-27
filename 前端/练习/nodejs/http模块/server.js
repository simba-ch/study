const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs')
const baseurl = path.resolve(__dirname, "public");

const server = http.createServer((req, res) => {
  const urlObj = url.parse(req.url);
  const pathname = path.resolve(baseurl, urlObj.pathname.substring(1))
  fs.access(pathname, (err) => {

    if (err) {
      res.writeHead(404)
        .end()
    } else {
      fs.stat(pathname, (err, stats) => {
        if (stats.isDirectory()) {
          res.writeHead(404)
            .end()
          return
        } else {
          const readableFile = fs.createReadStream(pathname);
          readableFile.pipe(res)
          readableFile.on('end', () => {
            res.end();
          })
        }
      })

    }
  })

})

server.listen(8080);