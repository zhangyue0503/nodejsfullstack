const http = require('http');

let server = http.createServer();

process.on('message',(m,socket)=>{
    if(m === 'server' && socket){
        // handler.on('connection',socket=>{
            server.emit('connection',socket);
        // });
    }
});

server.on('request', (req,res)=>{
    console.info(`worker[${process.pid}] handle request`);
    let time = Date.now(),
        delta = Math.random()*1000;
    while(Date.now() < time + delta);
    res.end(`worker[${process.pid}] handle request`);
});