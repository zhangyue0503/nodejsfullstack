const http = require('http');
var url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');

    var params = url.parse(req.url, true).query;
    res.end(JSON.stringify(params));
});

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`)
});