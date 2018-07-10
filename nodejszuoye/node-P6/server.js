const cluster = require('cluster');
const cpuNum = require('os').cpus().length;
const Mail = require('./util/mail');
const Log = require('./util/log');

if (cluster.isMaster) {
    let workers = [];
    for (let i = 0; i < cpuNum; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code) => {
        // console.info(`worker[${worker.process.pid}] exited;`);
        Log.log(`worker[${worker.process.pid}] exited;`);
        delete workers[worker.process.pid];
    });
    cluster.on('fork', worker => {
        workers[worker.process.id] = worker;
        worker.on('message', info => {            
            if (info.act === 'suicide') {
                if(info.errInfo && info.errStack){
                    //P6发送邮件异常逻辑
                    Mail.send('[服务异常]' + info.errInfo, info.errStack);
                }
                Log.log(`worker[${worker.process.pid}] suicide`);
                // console.info();
                cluster.fork();
            }
        });
        Log.log(`worker[${worker.process.pid}] fork success`);
        // console.info(`worker[${worker.process.pid}] fork success`);
    });
} else {
    require('./worker.js');
}