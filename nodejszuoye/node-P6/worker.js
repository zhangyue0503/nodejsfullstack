const http = require('http');

const url = require('url');
const Blog = require('./models/Blog');
const Util = require('./util/util');
const Log = require('./util/log');

const REQUEST_TIMEOUT = 1500; // 请求超时时间

const port = 3000;

// Blog实体类
const blog = new Blog();

let server = http.createServer();
server.listen(port);

server.on('request', (req, res) => {
    const method = req.method;

    // 请求超时处理
    let t = setTimeout(() => {
        // process.emit('uncaughtException'); // 触发异常
        res.writeHead(503, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end();
    }, REQUEST_TIMEOUT);

    //P6记录日志逻辑
    const date = Util.dateFmt('yyyy-MM-dd hh:mm:ss', new Date());
    const ip = Util.getIp(req);
    Log.log(`${date} ${method} ${req.url} ${ip}`);
    // console.log(`${date} ${method} ${req.url} ${ip}`);

    res.once('finish', () => {
        Log.log('response finish!');

        clearTimeout(t);
    });

    if (method === 'GET') {
        getRequest(req, res).catch((err) => {
            process.emit('uncaughtException', err);
        });
    } else if (method == 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            postRequest(req, res, data).catch((err) => {
                process.emit('uncaughtException', err);
            });
        });
    } else {
        noPageError();
    }
});

let errNum = 0; //限制重启次数
process.on('uncaughtException', err => {
    if (errNum > 0) return;
    errNum++;

    Log.log(`error: ${err}`);

    process.send({
        act: 'suicide',
        errInfo: err.toString(),
        errStack: err.stack
    });
    server.close(() => {
        process.exit(1);
    });
    setTimeout(() => {
        process.exit(1);
    }, 100000);
});

//处理Get请求
async function getRequest(req, res) {
    const blogUrl = url.parse(req.url, true);
    const pathname = blogUrl.pathname;
    const query = blogUrl.query;

    if (pathname === '/blog') { // 单条
        const id = query.id;
        if (id == 100) abc(); // 制造异常
        const result = await blog.getInfo(id);
        getView(result, 'blog', res);
    } else if (pathname === '/') { // 列表
        const limit = parseInt(query.limit) || 10;
        const offset = parseInt(query.offset) || 0;
        const resultList = await blog.getList(limit, offset);
        getView({
            'list': resultList
        }, 'list', res);
    } else {
        noPageError(res);
    }
}

//post请求处理
async function postRequest(req, res, data) {
    const pathname = url.parse(req.url, true).pathname;
    if (pathname === '/api/blog_create') { //添加
        if (data.title && data.content) {
            const result = await blog.create(data);
            getReturnJSON(result);
        } else {
            returnJSON(res, new Result(-1, '参数错误'));
        }
    } else if (pathname === '/api/blog_delete') { // 删除
        if (data.id) {
            const result = await blog.destory(data.id);
            getReturnJSON(result);
        } else {
            returnJSON(res, new Result(-1, '参数错误'));
        }
    } else if (pathname === '/api/blog_update') { // 修改
        if (data.id && data.title && data.content) {
            const result = await blog.update(data);
            getReturnJSON(result);
        } else {
            returnJSON(res, new Result(-1, '参数错误'));
        }
    } else {
        noPageError(res);
    }
}

function getView(result, view = 'list', res) {
    if (result) {
        const data = Util.template(view, result);
        data.then((view) => {
            res.statusCode = 200;
            res.end(view);
        });
    } else {
        noPageError(res);
    }
}

//链接错误返回
function noPageError(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end("页面未找到");
}

// 返回数据方法
function returnJSON(res, result) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.end(JSON.stringify(result));
}

/**
 * 返回格式化数据对象
 */
class Result {
    constructor(code, message, data) {
        this.code = code || 0;
        this.data = data || {};
        this.message = message || '';
    }
}