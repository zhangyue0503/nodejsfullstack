const http = require('http');

const url = require('url');
const Blog = require('./models/Blog');

const port = 3000;
const hostname = 'localhost';

const REQUEST_TIMEOUT = 5000; // 请求超时时间

// Blog实体类
const blog = new Blog();

let server = http.createServer();
server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});

server.on('request', (req, res) => {
    console.info(`process is : ${process.pid}`);
    const method = req.method;

    // 请求超时处理
    let t = setTimeout(() => {
        res.writeHead(503, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end();
    }, REQUEST_TIMEOUT);

    res.once('finish', () => {
        console.info('response finish!');
        clearTimeout(t);
    });

    if (method === 'GET') {
        getRequest(req, res);
    } else if (method == 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            postRequest(req, res, data);
        });
    } else {
        noPageError();
    }


});

let errNum = 0; //限制重启次数
process.on('uncaughtException', err => {
    if (errNum > 0) return;
    errNum++;
    console.log(`error:${err}`);
    process.send({
        act: 'suicide'
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

    if (pathname === '/api/blog') { // 单条
        const id = query.id;
        const result = await blog.getInfo(id);
        if (result) {
            returnJSON(res, new Result(0, '成功', result));
        } else {
            abc(); // 制造异常
            returnJSON(res, new Result(-1, '获取失败'));
        }
    } else if (pathname === '/api/blog_list') { // 列表
        const limit = parseInt(query.limit) || 10;
        const offset = parseInt(query.offset) || 0;
        const resultList = await blog.getList(limit, offset);
        if (resultList) {
            returnJSON(res, new Result(0, '成功', resultList));
        } else {
            returnJSON(res, new Result(-1, '获取失败'));
        }
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
            if (result) {
                returnJSON(res, new Result(0, '成功', result));
            } else {
                returnJSON(res, new Result(-1, '失败'));
            }
        } else {
            returnJSON(res, new Result(-1, '参数错误'));
        }
    } else if (pathname === '/api/blog_delete') { // 删除
        if (data.id) {
            const result = await blog.destory(data.id);
            if (result) {
                returnJSON(res, new Result(0, '成功', result));
            } else {
                returnJSON(res, new Result(-1, '失败'));
            }
        } else {
            returnJSON(res, new Result(-1, '参数错误'));
        }
    } else if (pathname === '/api/blog_update') { // 修改
        if (data.id && data.title && data.content) {
            const result = await blog.update(data);
            if (result) {
                returnJSON(res, new Result(0, '成功', result));
            } else {
                returnJSON(res, new Result(-1, '失败'));
            }
        } else {
            returnJSON(res, new Result(-1, '参数错误'));
        }
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