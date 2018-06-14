var express = require('express');
var app = express();

app.use(function(req,res,next){
    console.log(new Date() + ' '+req.method + ' '+req.url);
    next();
});

app.get('/',function(req,res,next){
    console.log('这是首页');
    console.log('params:'+req.query.name);
    // res.send('这是首页');
    next();
});

app.get('/',function(req,res,next){
    console.log('这是首页');
    res.send('这是首页');
    // res.end('Hello world!');
});

app.get('/page1',function(req,res,next){
    console.log('这是页面1');
    
    res.send('This is Page1!');
});

app.get('/page2',function(req,res){
    res.end('This is Page2!');
});


app.listen('3000',function(){
    console.log('Example app listening on port 3000!');
});