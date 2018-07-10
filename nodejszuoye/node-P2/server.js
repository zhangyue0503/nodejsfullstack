const http = require('http');
var url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req,res)=>{
    res.statusCode = 200;

    var path = url.parse(req.url, true).path;
    var result = path;
    if(path.indexOf('/moduleA/') != -1){
        var moduleA = require('./moduleA');
        result = moduleA.text;
    } else if(path.indexOf('/moduleB/') != -1){
        var moduleB = require('./moduleB');
        result = moduleB.text;
    }
    res.end(result);
    
});

server.listen(port,()=>{
    console.log(`Server running at http://${hostname}:${port}/`)
});