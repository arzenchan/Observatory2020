
var jwt = require("jsonwebtoken");

var METABASE_SITE_URL = "http://10.128.2.54:3000";
var METABASE_SECRET_KEY = "3a6f584f7a4e6a2c71ddab42ad6701f8c906f02532b4c41772064d428f84525a";


var payload = {
  resource: { dashboard: 2 },
  params: {},
  exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
};
var token = jwt.sign(payload, METABASE_SECRET_KEY);

var iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";

console.log("Metabase Init Done");

/*nodejs.dev tutorial
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello, World!</h1>');
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
})

fs.readFile('/Users/joe/test.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
})
*/


/*W3 Schools Tutorial for getting HTML files up. CSS doesn't load*/
var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    //res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(data);
    return res.end();
  });
}).listen(8080);


