var socket = io();

//let coins = "BTC-USDT|FET-USDT|ETH-USDT|BNB-USDT|BTT-USDT|EOS-USDT|LTC-USDT|ONT-USDT|XRP-USDT|NEO-USDT|BCHABC-USDT|TRX-USDT|ADA-USDT|XLM-USDT|FET-BTC|ETH-BTC|BNB-BTC|ONT-BTC|EOS-BTC|XRP-BTC|TUSD-BTC|LTC-BTC|MDA-BTC|LUN-BTC|NEO-BTC|TRX-BTC|ADA-BTC|BCHABC-BTC|WAVES-BTC|ICX-BTC|XLM-BTC"

//coins = from server.
let coinTitles = []; //= coins.split("|");
let coinsArr = coins.split("|");
let reverseTitles = [];
let coinDataArrays = [];
let dataSets = [];
let chart;

function init(){

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
        "dataProvider": [
        //   {
        //   date : new Date(),
        //   value : 0,
        //   volume : 0
        // }
      ],
        "categoryField": "date",
        /////////////////////////////////////////EVENT///////////////////////////////////////////////
        "stockEvents": []
      }
    dataSets.push(dataSet);
}

chart = AmCharts.makeChart( "chartdiv", {
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
    "stockLegend": {},

    //chart.panels[0].valueAxes[0].guides[0].value = 1000
    "valueAxes": [ {
      "guides": [ {
        "value": 8.73,
        "lineAlpha": 0.8,
        "lineColor": "#e00",
        "label": "MIN",
        "position": "right"
      }, {
        "value": 8.77,
        "lineAlpha": 0.8,
        "lineColor": "#000",
        "label": "NOW",
        "position": "right"
      }, {
        "value": 8.80,
        "lineAlpha": 0.8,
        "lineColor": "#0e0",
        "label": "MAX",
        "position": "right"
      } ]
    } ]

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


}
//socket.emit('index', 'Emit from html.');
socket.on('onConfiguration', function(msg){
  console.log("-----------onConfiguration------------");
  console.log(msg);
  console.log("--------------------------------------");
});
socket.on('onBalanceInit', function(msg){
  console.log("onBalanceInit");
  console.log(msg);
  let obj = JSON.parse(msg);
  obj = obj.balance;
    for(var i in obj){
        var coin = i + "";
        if(!coinsArr.includes(coin)) continue;
        var myJson = {
          date: new Date().toUTCString(),
          value : 0,
          volume : obj[i].amount
      };
      console.log("onBalanceInit : ", coin, obj[i].amount);
      //chart.dataSets[reverseTitles[coin]].dataProvider.push(myJson);
      coinTitles.push(coin);
    
    }
    init();
  console.log("--------------------------------------");
});

socket.on('onBalance', function(msg){
    let obj = JSON.parse(msg);
    for(var i in obj){
        var coin = i;
        if(typeof chart.dataSets[reverseTitles[coin]] == "undefined") continue;

        var provider = chart.dataSets[reverseTitles[coin]].dataProvider;
        var lastData = provider[provider.length - 1];
        if(typeof lastData == "undefined" || typeof lastData.value == "undefined") lastValue = 0;
        else lastValue = lastData.value;

        var myJson = {
          date: new Date().toUTCString(),
          value : lastValue,
          volume : obj[i].amount
      };
      //console.log("onBalance : ", coin, obj[i].amount);
      chart.dataSets[reverseTitles[coin]].dataProvider.push(myJson);
    
    }
});

//잘되던것
socket.on('onTradeMeet', function(msg){
  let obj = JSON.parse(msg);
  tmp = new Date().toUTCString();
  var provider = chart.dataSets[reverseTitles[obj.coin]].dataProvider;
  var lastData = provider[provider.length - 1];
  if(typeof lastData == "undefined" || typeof lastData.volume == "undefined") lastVolume = 0;
  else lastVolume = lastData.volume;
    chart.dataSets[reverseTitles[obj.coin]].dataProvider.push({
        date: tmp,
        value : obj.price,
        volume : lastVolume
    })
   //chart.validateData();
  });


socket.on('onProp', function(msg){
  // console.log("onProp");
  // console.log(msg);
  // console.log("--------------------------------------");
  // Key 'onProp' Message '{"coin":"ETH-USDT","time":"2019-02-14T19:13:38.160Z","ask":{"prop":[[121.54,18.14953],[121.55,28.15558],[121.57,29.21923],[121.59,15.08159],[121.6,3.94695],[121.62,8.9026],[121.63,40.79746],[121.64,22.97567],[121.65,2.11],[121.66,0.12329]],"sum":169.36},"bid":{"prop":[[121.5,13.14046],[121.49,0.16379],[121.46,4],[121.45,1],[121.44,16],[121.43,0.16496],[121.41,3.51386],[121.36,46.13749],[121.35,4.2768],[121.34,8.86467]],"sum":97.16},"exchange":"BINANCE"}
});
socket.on('onBetBid', function(msg){ // 오를거에 건다
  console.log("onBetBid");
  console.log(msg);
  let obj = JSON.parse(JSON.stringify(msg));
  console.log(obj.coin);
  if(typeof obj.coin == "undefined") obj.coin = "BNB-USDT"
  console.log("--------------------------------------");
  chart.dataSets[1].stockEvents.push({
      date: new Date(),
      type: "arrowUp",
      backgroundColor: "#00CC00",
      graph: "g1",
      description: "BetBid"
  })
});
socket.on('onBetAsk', function(msg){ // 판매
  console.log("onBetAsk");
  console.log(msg);
  let obj = JSON.parse(JSON.stringify(msg));
  console.log(msg.coin);
  if(typeof obj.coin == "undefined") obj.coin = "BNB-USDT"
  console.log("--------------------------------------");
  chart.dataSets[1].stockEvents.push({
      date: new Date(),
      type: "arrowDown",
      backgroundColor: "#CC0000",
      graph: "g1",
      description: "BetAsk"
  })
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
   if (chart.mouseDown)
         return;
  chart.validateData();
},1000)