const cp = require('child_process');



process.on('exit', code => {
    console.log(`父进程退出：${process.uptime()}`);
});

function fibonacci(n){
    return n < 2 ? 1 : fibonacci(n-1) + fibonacci(n-2);
}

let child = cp.fork(`${__dirname}/5-child.js`);

child.send('hello my ');

// let time1 = process.hrtime();

// console.info('fibo45:'+fibonacci(45));

// console.info('fibo45耗时',process.hrtime(time1));

// let start = process.hrtime();

// console.info('fibo44:'+fibonacci(44));

// console.info('fibo44耗时',process.hrtime(start));
