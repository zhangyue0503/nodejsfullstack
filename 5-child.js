console.log('子进程执行');

process.on('exit', code => {
    console.log(`子进程退出：${process.uptime()}`);
});

process.on('message', m => {
    console.info('子进程接收到消息'+m);
});

// function fibonacci(n){
//     return n < 2 ? 1 : fibonacci(n-1) + fibonacci(n-2);
// }

// let start = process.hrtime();

// console.info('fibo44:'+fibonacci(44));

// console.info('fibo44耗时',process.hrtime(start));