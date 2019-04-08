var express = require('express');
var router = express.Router();
// - > /coins/

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
