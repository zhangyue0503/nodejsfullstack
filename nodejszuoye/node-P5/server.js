const cluster = require('cluster');
const cpuNum = require('os').cpus().length;

if (cluster.isMaster) {
    let workers = [];
    for (let i = 0; i < cpuNum; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code) => {
        console.info(`worker[${worker.process.pid}] exited;`);
        delete workers[worker.process.pid];
    });
    cluster.on('fork', worker => {
        workers[worker.process.id] = worker;
        worker.on('message', info => {
            if (info.act === 'suicide') {
                console.info(`worker[${worker.process.pid}] suicide`);
                cluster.fork();
            }
        });
        console.info(`worker[${worker.process.pid}] fork success`);
    });
} else {
    require('./worker.js');
}