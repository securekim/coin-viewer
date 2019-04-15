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
  console.log("onConfiguration");
});
socket.on('onBalanceInit', function(msg){
  console.log("onBalanceInit");
});
socket.on('onBalance', function(msg){
    //let obj = JSON.parse(msg);
    console.log("onBalance");
});

var myDate = new Date();
socket.on('onTradeMeet', function(msg){
    let obj = JSON.parse(msg);

    tmp = myDate.setSeconds( myDate.getSeconds() + 1 );
    //console.log(new Date(obj.time).getMilliseconds());
    //tmp = new Date(obj.time);
    chart.dataSets[reverseTitles[obj.coin]].dataProvider.push({
        //date: new Date(tmp).toUTCString(),
        date: new Date(tmp).toUTCString(),
        value : obj.price,
        volume : 10
    })
    console.log(chart.dataSets[reverseTitles[obj.coin]].dataProvider)
    //console.log("coin : " + obj.coin +" Date : "  + myDate + " Price : "+obj.price);
    // coinDataArrays[obj.coin].push({
    //     date: obj.time,
    //     value : obj.price
    // });

   chart.validateData();
});

socket.on('onProp', function(msg){
  console.log("onProp");
});
socket.on('onBetBid', function(msg){
  console.log("onBetBid");
});
socket.on('onBetAsk', function(msg){
  console.log("onBetAsk");
});
socket.on('onBetCancelBid', function(msg){
  console.log("onBetCancelBid");
});
socket.on('onBetCancelAsk', function(msg){
  console.log("onBetCancelAsk");
});

setInterval(()=>{
  // if (chart.mouseDown)
  //       return;
  //chart.validateData();
},1000)