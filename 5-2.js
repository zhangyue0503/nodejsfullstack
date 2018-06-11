const cp = require('child_process')

cp.exec('ping www.qq.com', function(err,stdout,stderr){
    if(err){
        console.log(err)
    }
    console.log(`输出：${stdout}`);
    console.log(`错误：${stderr}`);

})


console.log('等待子进程执行');