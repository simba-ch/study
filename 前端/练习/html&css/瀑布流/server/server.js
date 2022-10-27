let http = require("http");
http.createServer(function (reqeuest, response) {
  let data = require("./data.json");
  response.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });
  response.write(JSON.stringify(data));
  response.end();
}).listen(8888);
