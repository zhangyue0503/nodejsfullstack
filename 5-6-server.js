const http = require('http'),
    cluster = require('cluster');

const cpuNum = 4;

if(cluster.isMaster){
    cluster.schedulingPolicy = cluster.SCHED_RR; //linx不需要配置
    for(let i=0;i<cpuNum;i++){
        cluster.fork();
    }
    cluster.on('exit',(worker,code)=>{
        console.log(`worker[${worker.process.pid}] exited,退出码：${code}`);
    })
}else{
    let server  = http.createServer();
    server.listen(3000);
    server.on('request',(req,res)=>{
        console.info(`worker[${process.pid}] handle request`);
        res.end(`worker[${process.pid}] handle request`);
    });
}

