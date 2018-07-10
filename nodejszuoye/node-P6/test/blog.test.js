const request = require('request');
const assert = require('assert');

describe('验证web服务是否正常', function () {
    it('博客列表页面', function (done) {
        request.get('http://localhost:3000/api/blog_list', function (err, res, body) {
            if (err) {
                assert(false, '请求失败');
            } else {
                assert.equal(200, res.statusCode);
                assert.notEqual(-1, body.indexOf('{"code"'));
            }
            done();
        });
    });
    it('博客列表页面带参数', function (done) {
        request.get('http://localhost:3000/api/blog_list?limit=100&offset=100', function (err, res, body) {
            if (err) {
                assert(false, '请求失败');
            } else {
                assert.equal(200, res.statusCode);
                assert.notEqual(-1, body.indexOf('{"code"'));
            }
            done();
        });
    });

    it('博客详情页面', function (done) {
        request.get('http://localhost:3000/api/blog?id=3', function (err, res, body) {
            if (err) {
                assert(false, '请求失败');
            } else {
                assert.equal(200, res.statusCode);
                assert.notEqual(-1, body.indexOf('{"code"'));
            }
            done();
        });
    });
    it('博客详情页面不带参数', function (done) {
        request.get('http://localhost:3000/api/blog', function (err, res, body) {
            if (err) {
                assert(false, '请求失败');
            } else {
                assert.equal(200, res.statusCode);
                assert.notEqual(-1, body.indexOf('{"code"'));
            }
            done();
        });
    });
    it('博客详情页面引发异常参数', function (done) {
        request.get('http://localhost:3000/api/blog?id=100', function (err, res, body) {
            if (err) {
                assert(false, '请求失败');
            } else {
                assert.equal(200, res.statusCode);
                assert.notEqual(-1, body.indexOf('{"code"'));
            }
            done();
        });
    });

    it('博客增加', function (done) {
        let reqHttps = request.post({
            url: 'http://localhost:3000/api/blog_create',
        }, function (err, res, body) {
            if (err) {
                assert(false, '请求失败');
            } else {
                assert.equal(200, res.statusCode);
                assert.notEqual(-1, body.indexOf('{"code"'));
            }
            done();
        });

        reqHttps.write(JSON.stringify({
            title: "单元测试来的",
            content: "单元测试来的"
        }));
        reqHttps.end();
        reqHttps.on('error',function(e){
            assert(false, '请求失败');
            done();
        });
    });

    it('博客修改', function (done) {
        let reqHttps = request.post({
            url: 'http://localhost:3000/api/blog_update',
        }, function (err, res, body) {
            if (err) {
                assert(false, '请求失败');
            } else {
                assert.equal(200, res.statusCode);
                assert.notEqual(-1, body.indexOf('{"code"'));
            }
            done();
        });

        reqHttps.write(JSON.stringify({
            id: 12,
            title: "单元测试来的111",
            content: "单元测试来的111"
        }));
        reqHttps.end();
        reqHttps.on('error',function(e){
            assert(false, '请求失败');
            done();
        });
    });

    it('博客删除', function (done) {
        let reqHttps = request.post({
            url: 'http://localhost:3000/api/blog_delete',
        }, function (err, res, body) {
            if (err) {
                assert(false, '请求失败');
            } else {
                assert.equal(200, res.statusCode);
                assert.notEqual(-1, body.indexOf('{"code"'));
            }
            done();
        });

        reqHttps.write(JSON.stringify({
            id: 12
        }));
        reqHttps.end();
        reqHttps.on('error',function(e){
            assert(false, '请求失败');
            done();
        });
    });

});