const http = require('http'),
    url = require('url'),
    cp = require('child_process');

let worker = cp.fork(`${__dirname}/5-4-worker.js`);

let server = http.createServer((req,res)=>{
    var obj = url.parse(req.url);
    let n = parseInt(obj.query);
    if(!n){
        res.end('hello world');
    }else{
        console.info(`process ${worker.pid} calc ${n}`);
        worker.on('message',function cb(data){
            console.info(data);
            if(data.n === n){
                res.end(`fibonacii(${n}): ${data.result.toString()}`);
                worker.removeAllListeners('message',cb);
            }
        });
        worker.send(n);
    }
});
server.listen(3000);