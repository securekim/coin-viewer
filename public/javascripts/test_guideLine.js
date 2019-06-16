var chartData = [];

generateChartData();

function generateChartData() {
  var firstDate = new Date();
  firstDate.setDate( firstDate.getDate() - 500 );
  firstDate.setHours( 0, 0, 0, 0 );

  for ( var i = 0; i < 500; i++ ) {
    var newDate = new Date( firstDate );
    newDate.setDate( newDate.getDate() + i );

    var a1 = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;
    var b1 = Math.round( Math.random() * ( 1000 + i ) ) + 500 + i * 2;

    chartData.push( {
      "date": newDate,
      "value": a1,
      "volume": b1
    } );
  }
}

var chart = AmCharts.makeChart( "chartdiv", {
  "type": "stock",
  "theme": "light",

  "dataSets": [ {
    "title": "first data set",
    "fieldMappings": [ {
      "fromField": "value",
      "toField": "value"
    }, {
      "fromField": "volume",
      "toField": "volume"
    } ],
    "dataProvider": chartData,
    "categoryField": "date"
  } ],

  "panels": [ {

    "showCategoryAxis": false,
    "title": "Value",
    "percentHeight": 70,

    "stockGraphs": [ {
      "id": "g1",

      "valueField": "value",
      "comparable": true,
      "compareField": "value",
      "balloonText": "[[title]]:<b>[[value]]</b>",
      "compareGraphBalloonText": "[[title]]:<b>[[value]]</b>"
    } ],

    "stockLegend": {
      "periodValueTextComparing": "[[percents.value.close]]%",
      "periodValueTextRegular": "[[value.close]]"
    },

    "valueAxes": [ {
      "guides": [ {
        "value": 850,
        "lineAlpha": 0.8,
        "lineColor": "#c00",
        "label": "Guide #1",
        "position": "right"
      }, {
        "value": 650,
        "lineAlpha": 0.8,
        "lineColor": "#0c0",
        "label": "Guide #2",
        "position": "right"
      } ]
    } ]
  } ],

  "chartScrollbarSettings": {
    "graph": "g1"
  },

  "chartCursorSettings": {
    "valueBalloonsEnabled": true,
    "fullWidth": true,
    "cursorAlpha": 0.1
  },

  "periodSelector": {
    "position": "bottom",
    "periods": [ {
      "period": "MM",
      "selected": true,
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
  }
} );