const http = require('http');
const url = require('url');
const Blog = require('./models/Blog');

const port = 3000;
const hostname = 'localhost';

// Blog实体类
const blog = new Blog();

//服务器
const server = http.createServer((req, res) => {
    const method = req.method;
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

//监听
server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
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

function noPageError(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'charset=utf-8');
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