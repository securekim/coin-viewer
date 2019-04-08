var socket = io();

//let coins = "BTC-USDT|FET-USDT|ETH-USDT|BNB-USDT|BTT-USDT|EOS-USDT|LTC-USDT|ONT-USDT|XRP-USDT|NEO-USDT|BCHABC-USDT|TRX-USDT|ADA-USDT|XLM-USDT|FET-BTC|ETH-BTC|BNB-BTC|ONT-BTC|EOS-BTC|XRP-BTC|TUSD-BTC|LTC-BTC|MDA-BTC|LUN-BTC|NEO-BTC|TRX-BTC|ADA-BTC|BCHABC-BTC|WAVES-BTC|ICX-BTC|XLM-BTC"

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
    "glueToTheEnd": true,
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
    "usePeriod": "WW"
  },

  // Period Selector
  "periodSelector": {
    "position": "left",
    "periods": [ {
      "period": "DD",
      "selected":true,
      "count": 1,
      "label": "1 Days"
    }, {
      "period": "MM",
      "count": 1,
      "label": "1 month"
    }, {
      "period": "YYYY",
      "count": 1,
      "label": "1 year"
    }, {
      "period": "YTD",
      "label": "YTD"
    }, {
      "period": "MAX",
      "label": "MAX"
    } ]
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

//socket.emit('index', 'Emit from html.');
socket.on('onConfiguration', function(msg){
});
socket.on('onBalanceInit', function(msg){
});
socket.on('onBalance', function(msg){
    //let obj = JSON.parse(msg);
});

var myDate = new Date();

socket.on('onTradeMeet', function(msg){
    let obj = JSON.parse(msg);

    myDate.setDate( myDate.getDate() + 1 );

    chart.dataSets[reverseTitles[obj.coin]].dataProvider.push({
        date: myDate,
        value : obj.price,
        volume : 10
    })
    console.log("coin : " + obj.coin +" Date : "  + myDate + " Price : "+obj.price);
    // coinDataArrays[obj.coin].push({
    //     date: obj.time,
    //     value : obj.price
    // });
    chart.validateData();
});

socket.on('onProp', function(msg){
});
socket.on('onBetBid', function(msg){
});
socket.on('onBetAsk', function(msg){
});
socket.on('onBetCancelBid', function(msg){
});
socket.on('onBetCancelAsk', function(msg){
});
