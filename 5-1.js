const cp = require('child_process');
const fs = require('fs');

let out = fs.openSync('./out.log','a');

let ls = cp.spawn('ping',['www.qq.com'],{
    stdio:['pipe',out,'pipe']
});

// ls.stdout.on('data', data => {
//     console.log(`输出：${data}`);
// });

ls.stderr.on('data', data => {
    console.log(`错误：${data}`)
});

ls.on('close', code => {
    console.log('子进程退出码：'+code);
});


console.log('等待子进程执行');