var express = require('express');
const Blog = require('../models/Blog');
const Util = require('../util/util');
var router = express.Router();

//Blog实体类
const blog = new Blog();

// 创建博客
router.get('/blog_create', async function (req, res, next) {
  res.render('admin/create');
});
router.post('/blog_create_post', function (req, res, next) {
  if (req.body.title && req.body.content) {
    blog.create(req.body).then((result) => {
      Util.resultRedirect(result, `/admin/blog_list?limit=100`, `/admin/blog_create`, res, next);
    }).catch((error) => {
      next(error);
    });

  } else {
    returnres.redirect(`/admin/blog_list`);
  }
});

//更新博客
router.get('/blog_update/:id', function (req, res, next) {
  const id = req.params.id;
  if (id == 100) abc(); // 制造异常
  blog.getInfo(id).then(result => {
    Util.resultRender('admin/update', result, res, next);
  }).catch((error) => {
    next(error);
  });

});
router.post('/blog_update_post', function (req, res, next) {
  if (req.body.id && req.body.title && req.body.content) {
    blog.update(req.body).then((result) => {
      Util.resultRedirect(result, `/admin/blog_list?limit=100`, `/admin/blog_update/${req.body.id}`, res, next);
    }).catch((error) => {
      next(error);
    });

  } else {
    returnres.redirect(`/admin/blog_list`);
  }
});

//博客列表
router.get('/blog_list', async function (req, res, next) {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  blog.getList(limit, offset).then(resultList => {
    const result = resultList ? {
      list: resultList
    } : null;
    Util.resultRender('admin/list', result, res, next);
  }).catch(error => {
    next(error)
  });
});
//首页跳转
router.get('/', function (req, res) {
  res.redirect('/admin/blog_list');
});

router.get('/blog_delete/:id', function (req, res, next) {
  const id = req.params.id;
  if (id == 100) abc(); // 制造异常
  blog.destory(id).then(result => {
    if (result) {
      res.redirect('/admin/blog_list?limit=100');
    } else {
      createError(404);
    }
    Util.resultRedirect(result, `/admin/blog_list?limit=100`, `404`, res, next);
  }).catch((error) => {
    next(error);
  });
});

module.exports = router;