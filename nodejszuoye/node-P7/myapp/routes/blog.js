var express = require('express');
const Blog = require('../models/Blog');
const Util = require('../util/util');
var router = express.Router();

// Blog实体类
const blog = new Blog();

//首页-博客列表
router.get('/', async function (req, res, next) {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  blog.getList(limit, offset).then(resultList=>{
    const result = resultList ?  {
      list: resultList
    } : null;
    Util.resultRender('list',result, res, next);
  }).catch(error=>{
    next(error);
  });
});
//博客详情页
router.get('/blog/:id', function (req, res, next) {
  const id = req.params.id;
  if (id == 100) abc(); // 制造异常
  blog.getInfo(id).then(result => {
    Util.resultRender('blog', result, res, next);
  }).catch((error) => {
    next(error);
  });
});

module.exports = router;