const http = require('http'),
    cp = require('child_process');

let workers = [];
for (let i = 0;i<4;i++){
    workers.push(cp.fork(`${__dirname}/5-5-worker.js`));
}

let server = http.createServer();

server.listen(3000,()=>{
    workers.forEach(worker => {
        worker.send('server',server);
    });
    // server.close();
});

server.on('request',(req,res)=>{
    console.info('master handle request');
    res.end('master heandle request');
});