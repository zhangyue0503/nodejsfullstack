const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Mail = require('./util/mail');
var bodyParser = require('body-parser');

// var indexRouter = require('./routes/index');
const blogRouter = require('./routes/blog');
const adminRouter = require('./routes/admin');

const app = express();

//移除X-Powered-By
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let sendTime = new Date().getTime() - (1000 * 60 * 11);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//更换为ejs模板
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', blogRouter);

app.use('/admin', adminRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //p6邮件提醒      404不发   十分钟发一次
  if (err.status!= 404 && sendTime < new Date().getTime() - (1000 * 60 * 10)) {
    Mail.send('[服务异常]' + err.message, err.stack);
    sendTime = new Date().getTime();
  }


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;