var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Coin-Viewer' });
});

router.get('/test', function(req, res, next) {
  res.render('test');
});

router.get('/coin', (req, res, next)=>{
  res.render('coin', {
    coins : 'BTC-USDT|FET-USDT|ETH-USDT|BNB-USDT|BTT-USDT|EOS-USDT|LTC-USDT|ONT-USDT|XRP-USDT|NEO-USDT|BCHABC-USDT|TRX-USDT|ADA-USDT|XLM-USDT|FET-BTC|ETH-BTC|BNB-BTC|ONT-BTC|EOS-BTC|XRP-BTC|TUSD-BTC|LTC-BTC|MDA-BTC|LUN-BTC|NEO-BTC|TRX-BTC|ADA-BTC|BCHABC-BTC|WAVES-BTC|ICX-BTC|XLM-BTC'
  });
});

module.exports = router;
