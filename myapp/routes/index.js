var express = require('express');
var router = express.Router();
var count = 0;

/* GET home page. */
router.get('/', function(req, res, next) {



  res.render('index', { title: 'Express111' });
});

module.exports = router;
