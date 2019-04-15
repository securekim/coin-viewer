var socket = io();

//let coins = "BTC-USDT|FET-USDT|ETH-USDT|BNB-USDT|BTT-USDT|EOS-USDT|LTC-USDT|ONT-USDT|XRP-USDT|NEO-USDT|BCHABC-USDT|TRX-USDT|ADA-USDT|XLM-USDT|FET-BTC|ETH-BTC|BNB-BTC|ONT-BTC|EOS-BTC|XRP-BTC|TUSD-BTC|LTC-BTC|MDA-BTC|LUN-BTC|NEO-BTC|TRX-BTC|ADA-BTC|BCHABC-BTC|WAVES-BTC|ICX-BTC|XLM-BTC"

//coins = from server.
let coinTitles = coins.split("|");
let reverseTitles = [];

var coinDataArrays = [];
var dataSets = [];
for (var i in coinTitles){
    reverseTitles[coinTitles[i]] = i;
    coinDataArrays[coinTitles[i]] = [];
    dataSet = {
        "title": coinTitles[i],
        "fieldMappings": [ {
          "fromField": "value",
          "toField": "value"
        }, {
          "fromField": "volume",
          "toField": "volume"
        } ],
        "dataProvider": [],
        "categoryField": "date"
      }
    dataSets.push(dataSet);
}

var chart = AmCharts.makeChart( "chartdiv", {
    "type": "stock",
    "theme": "light",
    "glueToTheEnd": true,
    period : "fff",
    
// Defining data sets
"dataSets": dataSets,

  // Panels
  "panels": [ {
    "showCategoryAxis": false,
    "title": "Value",
    "percentHeight": 60,
    "stockGraphs": [ {
      "id": "g1",
      "valueField": "value",
      "comparable": true,
      "compareField": "value"
    } ],
    "stockLegend": {}
  }, {
    "title": "Volume",
    "percentHeight": 40,
    "stockGraphs": [ {
      "valueField": "volume",
      "type": "column",
      "showBalloon": false,
      "fillAlphas": 1
    } ],
    "stockLegend": {}
  } ],

  // Scrollbar settings
  "chartScrollbarSettings": {
    "graph": "g1",
    "usePeriod": "fff"
  },

  // Period Selector
  "periodSelector": {
    "position": "left",
    "periods": [{
        "period": "fff",
        "count": 10,
        "label": "10 ms",
        "format": "NN:SS:QQQ"
    }, {
        "period": "ss",
        "selected": true,
        "count": 1,
        "label": "1 sec",
        "format": "NN:SS:QQQ"
    }, {
        "period": "mm",
        "count": 1,
        "label": "1 minute",
        "format": "JJ:NN"
      }, {
        "period": "hh",
        "count": 1,
        "label": "1 hour",
        "format": "JJ:NN"
      }, {
        "period": "DD",
        "count": 1,
        "label": "1 date",
        "format": "MMM DD"
      }, {
        "period": "WW",
        "count": 1,
        "label": "1 week",
        "format": "MMM DD"
      }, {
        "period": "MM",
        "count": 1,
        "label": "1 month",
        "format": "MMM"
      }, {
        "period": "YYYY",
        "count": 1,
        "label": "1 year",
        "format": "YYYY"
      }, {
        "period": "YTD",
        "label": "YTD"
    }, {
        "period": "MAX",
        "label": "MAX"
    }]
},

  // Data Set Selector
  "dataSetSelector": {
    "position": "left"
  },

  // Event listeners
  "listeners": [ {
    "event": "rendered",
    "method": function( event ) {
      chart.mouseDown = false;
      chart.containerDiv.onmousedown = function() {
        chart.mouseDown = true;
      }
      chart.containerDiv.onmouseup = function() {
        chart.mouseDown = false;
      }
    }
  } ]
} );

//chart.categoryAxesSettings.groupToPeriods = ["fff", "ss", "10ss", "30ss", "mm", "10mm", "30mm", "hh", "DD", "WW", "MM", "YYYY"];
chart.categoryAxesSettings.minPeriod = "fff"
//chart.periodSelector.dateFormat = "YYYY-MM-DD"

//socket.emit('index', 'Emit from html.');
socket.on('onConfiguration', function(msg){
  console.log("-----------onConfiguration------------");
  console.log(msg);
  console.log("--------------------------------------");
});
socket.on('onBalanceInit', function(msg){
  console.log("onBalanceInit");
  console.log(msg);
  console.log("--------------------------------------");
});
socket.on('onBalance', function(msg){
    //let obj = JSON.parse(msg);
    console.log("onBalance");
    console.log(msg);
    console.log("--------------------------------------");
});

var myDate = new Date();
socket.on('onTradeMeet', function(msg){
    let obj = JSON.parse(msg);
    //tmp = new Date(obj.time).toUTCString();
    tmp = new Date().toUTCString();
    chart.dataSets[reverseTitles[obj.coin]].dataProvider.push({
        //date: new Date(tmp).toUTCString(),
        date: tmp,
        value : obj.price,
        volume : 10
    })
    //console.log(chart.dataSets[reverseTitles[obj.coin]].dataProvider)
    //console.log("coin : " + obj.coin +" Date : "  + myDate + " Price : "+obj.price);
    // coinDataArrays[obj.coin].push({
    //     date: obj.time,
    //     value : obj.price
    // });

   chart.validateData();
});

socket.on('onProp', function(msg){
  // console.log("onProp");
  // console.log(msg);
  // console.log("--------------------------------------");
  // Key 'onProp' Message '{"coin":"ETH-USDT","time":"2019-02-14T19:13:38.160Z","ask":{"prop":[[121.54,18.14953],[121.55,28.15558],[121.57,29.21923],[121.59,15.08159],[121.6,3.94695],[121.62,8.9026],[121.63,40.79746],[121.64,22.97567],[121.65,2.11],[121.66,0.12329]],"sum":169.36},"bid":{"prop":[[121.5,13.14046],[121.49,0.16379],[121.46,4],[121.45,1],[121.44,16],[121.43,0.16496],[121.41,3.51386],[121.36,46.13749],[121.35,4.2768],[121.34,8.86467]],"sum":97.16},"exchange":"BINANCE"}
});
socket.on('onBetBid', function(msg){
  console.log("onBetBid");
  console.log(msg);
  console.log("--------------------------------------");
});
socket.on('onBetAsk', function(msg){
  console.log("onBetAsk");
  console.log(msg);
  console.log("--------------------------------------");
});
socket.on('onBetCancelBid', function(msg){
  console.log("onBetCancelBid");
  console.log(msg);
  console.log("--------------------------------------");
});
socket.on('onBetCancelAsk', function(msg){
  console.log("onBetCancelAsk");
  console.log(msg);
  console.log("--------------------------------------");
});

setInterval(()=>{
  // if (chart.mouseDown)
  //       return;
  //chart.validateData();
},1000)