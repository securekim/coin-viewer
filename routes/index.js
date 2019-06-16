var express = require('express');
var config = require("config");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Coin-Viewer' });
});

router.get('/test', function(req, res, next) {
  res.render('test');
});

router.get('/test2', function(req, res, next) {
  res.render('test2');
});

router.get('/test_guideLine', function(req, res, next) {
  res.render('test_guideLine');
});

router.get('/coin', (req, res, next)=>{
  res.render('coin', {
    coins : config.coins
  });
});

module.exports = router;
