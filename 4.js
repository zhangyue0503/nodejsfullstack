var mysql = require('mysql')
const http = require('http')
const url = require('url')
const querystring = require('querystring')

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'nodetest'
// });

// connection.connect(function(err){
//     if(err){
//         console.error('error conectiong: ' + err.stack);
//         return;
//     }
//     connection.query('SELECT * FROM blogs',function(error,results,fields){
//         if(error) throw error;

//         console.log('The results is: ', results);

//         connection.end();
//     });
// });


//连接池
var pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'nodetest',
    pool:{
        max:5,
        min:0,
        acquire:30000, //多久没有释放自动释放
        idle:10000 //多久没用到释放
    }
});

pool.getConnection(function(err,connection){
    connection.query('select * from blogs',function(error,results){
        console.log(results);
        //释放链接
        connection.release();
    })
});


//sequelisze
const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodetest','root','',{
    host:'localhost',
    dialect: 'mysql'
});

//定义模型
const Blog = sequelize.define('Blog',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:Sequelize.STRING
    },
    content:{
        type:Sequelize.STRING
    },
    createdAt:{
        type:Sequelize.DATE
    },
    updatedAt:{
        type:Sequelize.DATE
    }
});

// const server = http.createServer((req,res)=>{
//     let method = req.method;
//     let urlObj = url.parse(req.url,true);
//     let pathname = urlObj.pathname;

//     if(method == 'GET' && pathname === '/api/blog'){
//         let id = urlObj.query.id;
//         if(id){
//             Blog.findById(id).then(function(result){
//                 if(result){
//                     returnJSON(res,{
//                         code:0,
//                         data:{
//                             id:result.id,
//                             title:result.title,
//                             content:result.content,
//                             createdAt:result.createdAt,
//                             updatedAt:result.updatedAt
//                         }
//                     })
//                 }else{
//                     returnJSON(res,{
//                         code:-2,
//                         message:"not found"
//                     })
//                 }
//             })
//         }else{
//             returnJSON(
//                 res,{
//                     code:-1,
//                     msg:"invalid params"
//                 }
//             )
//         }
//     }else if(method == "POST" && pathname === '/api/blog_create'){
//         let body = '';
//         req.on('data',function(chunk){
//             body += chunk;
//         });

//         req.on('end',function(){
//             let data = JSON.parse(body);
//             Blog.create(data).then(function(result){
//                 if(result && result.id){
//                     returnJSON(res,{
//                         code:0,
//                         data:{
//                             id:result.id,
//                         }
//                     })
//                 }else{
//                     returnJSON(res,{
//                         code:-2,
//                         message:"create error"
//                     })
//                 }
//             });
//         });
//     }else{
//         res.statusCode = 404;
//         res.end();
//     }
// });

// server.listen('3000',()=>{
//     console.log('start');
// });


// function returnJSON(res,json){
//     res.statusCode = 200;
//     res.setHeader('Content-Type','application/json');
//     res.end(JSON.stringify(json));
// }


//创建
// Blog.create({
//     title:"测试title",
//     content:"测试content"
// }).then(function(result){
//     console.log(result);
// });

//查询 
// Blog.findById(1).then(function(result){
//     console.log(result);
// });

// Blog.findAndCount({
//     limit:10,
//     offset:0
// }).then(function(result){
//     console.log(result)
// });

//更新
// Blog.update({
//     title:"测试title2",
//     content:"测试content2"
// },{
//     where:{
//         id:2
//     }
// }).then(function(result){
//     console.log(result)
// });

//删除
// Blog.destroy({
//     where:{
//         id:1
//     }
// }).then(function(result){
//     console.log(result)
// });

