var fs = require('fs')

//同步读文件
var fileStream = fs.readFileSync('README.md');
console.log(1, fileStream.toString());
console.log(2);


var fileStream = fs.readFileSync('README.md');
console.log(3, fileStream.toString());
console.log(4);

//异步读文件
var fileStream = fs.readFile('README.md',function(err, data){
    console.log(5, data.toString());
});
console.log(6);

var fileStream = fs.readFile('README.md',function(err, data){
    console.log(7, data.toString());
});
console.log(8);

//异步异常捕获
function distance(point1, point2, callback){
    setTimeout(() => {
        if(!point1 == null || point2 == null){
            callback(new Error('参数错误'))
            return;
        }
        let xsd = Math.pow(point2.x -point1.x,2),
        ysd = Math.pow(point2.y -point1.y,2),
        result = Math.sqrt(xsd+ysd);
        callback(null, result);
    }, 1000);
}

var p1 = {x:100,y:100};
var p2 = {x:200,y:250};
distance(p1,p2,function(err,res){
    console.log(err);
    console.log(res);
})

distance(null,null,function(err,res){
    console.log(err);
    console.log(res);
})
//发布订阅模式
const EventEmitter = require('events')

class MyEmitter extends EventEmitter{}

const myEmitter = new MyEmitter();
//发布者
myEmitter.on('event',()=>{
    console.log('触发了一个事件');
});
//订阅者
myEmitter.emit('event');

//promise
function distance1(point1, point2){
    return new Promise(function(resolve,reject){
        setTimeout(() => {
            if(!point1 == null || point2 == null){
                reject(new Error('参数错误'))
                return;
            }
            let xsd = Math.pow(point2.x -point1.x,2),
            ysd = Math.pow(point2.y -point1.y,2),
            result = Math.sqrt(xsd+ysd);
            resolve(result);
        }, 1000);
    });
}

var p1 = {x:10,y:100};
var p2 = {x:200,y:250};
distance1(p1,p2).then((dist)=>{
    console.log(dist);
}).catch((e)=>{
    console.log(e);
});

const util = require('util')
const readFile = util.promisify(fs.readFile);
// readFile('README.md').then(data => {
//     return readFile('README.md').then(data=>{
//         return readFile('README.md').then(data => {

//         });
//     });
// });
readFile('README.md').then(data => {
    return readFile('README.md')
}).then(data => {
    return readFile('README.md')
}).then(data => {
    console.log(9,data);
}).catch(e => {
    console.log(e);
})

//并行promise
Promise.all([
    readFile('README.md'),
    readFile('README.md'),
    readFile('README.md')
]).then(([data1,data2,data3]) => {
    console.log(10,data1,data2,data3);
}).catch(e => {
    console.log(e);
});


//async/wait
 const getReadme = function(file){
    return new Promise((resolve) => {
        setTimeout(resolve,1000);
    }).then(()=>{
        return util.promisify(fs.readFile)(file);
    });
 }

 let rm1 = 'README.md',
 rm2 = 'README.md',
 rm3 = 'README.md';

 async function main(){
    let [data1,data2] =  await Promise.all([
         getReadme(rm1),
         getReadme(rm2)
     ]); 
    console.log(data1.toString());
    console.log(data2.toString());
    let data3 = await getReadme(rm3);
    console.log(data3.toString());

    return data1.toString() + data2.toString()+data3.toString();
 }
 function start(){
     main().then(data => {
         console.log(data);
     });
 }
 start();


