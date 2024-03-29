var chartData = [];
generateChartData();

function generateChartData() {
  var firstDate = new Date( 2012, 0, 1 );
  firstDate.setDate( firstDate.getDate() - 500 );
  firstDate.setHours( 0, 0, 0, 0 );

  for ( var i = 0; i < 500; i++ ) {
    var newDate = new Date( firstDate );
    newDate.setDate( newDate.getDate() + i );

    var a = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;
    var b = Math.round( Math.random() * 100000000 );

    chartData.push( {
      "date": newDate,
      "value": a,
      "volume": b
    } );
  }
}

var chart = AmCharts.makeChart( "chartdiv", {
  "type": "stock",
  "theme": "light",  
  // valueAxis: [{
  //   tickLength: 2,
  //   axisAlpha: 2,
  //   showFirstLabel: false,
  //   showLastLabel: false,

  //   guides: [{
  //     value: 500,
  //     toValue: 600,
  //     fillColor: "#00CC00",
  //     inside: true,
  //     fillAlpha: 0.2,
  //     lineAlpha: 0
  //   }]

  // }],

  categoryAxis: {
    parseDates: true,
    minPeriod: "DD",
    gridAlpha: 0.1,
    minorGridAlpha: 0.1,
    axisAlpha: 0,
    minorGridEnabled: true,
    inside: true
  },
  valueAxes: [{
  
    tickLength: 0,
    axisAlpha: 0,
    showFirstLabel: false,
    showLastLabel: false,

    guides: [{
      value: 300,
      toValue: 550,
      fillColor: "#00CC00",
      inside: true,
      fillAlpha: 0.2,
      lineAlpha: 0
    }]

  }],

  "dataSets": [ {
    "color": "#b0de09",
    "fieldMappings": [ {
      "fromField": "value",
      "toField": "value"
    }, {
      "fromField": "volume",
      "toField": "volume"
    } ],
    "dataProvider": chartData,
    "categoryField": "date",


///////////////////
    
    // EVENTS
    "stockEvents": [ {
      "date": new Date( 2010, 8, 19 ),
      "type": "sign",
      "backgroundColor": "#85CDE6",
      "graph": "g1",
      "text": "S",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2010, 10, 19 ),
      "type": "flag",
      "backgroundColor": "#FFFFFF",
      "backgroundAlpha": 0.5,
      "graph": "g1",
      "text": "F",
      "description": "Some longerntext can alson be added"
    }, {
      "date": new Date( 2010, 11, 10 ),
      "showOnAxis": true,
      "backgroundColor": "#85CDE6",
      "type": "pin",
      "text": "X",
      "graph": "g1",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2010, 11, 26 ),
      "showOnAxis": true,
      "backgroundColor": "#85CDE6",
      "type": "pin",
      "text": "Z",
      "graph": "g1",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2011, 0, 3 ),
      "type": "sign",
      "backgroundColor": "#85CDE6",
      "graph": "g1",
      "text": "U",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2011, 1, 6 ),
      "type": "sign",
      "graph": "g1",
      "text": "D",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2011, 3, 5 ),
      "type": "sign",
      "graph": "g1",
      "text": "L",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2011, 3, 5 ),
      "type": "sign",
      "graph": "g1",
      "text": "R",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2011, 5, 15 ),
      "type": "arrowUp",
      "backgroundColor": "#00CC00",
      "graph": "g1",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2011, 6, 25 ),
      "type": "arrowDown",
      "backgroundColor": "#CC0000",
      "graph": "g1",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2011, 8, 1 ),
      "type": "text",
      "graph": "g1",
      "text": "Longer text cannalso be displayed",
      "description": "This is description of an event"
    } ]
  } ],


  "panels": [ {
    "title": "Value",
    "stockGraphs": [ {
      "id": "g1",
      "valueField": "value"
    } ],
    "stockLegend": {
      "valueTextRegular": " ",
      "markerType": "none"
    }
  } ],

  "chartScrollbarSettings": {
    "graph": "g1"
  },

  "chartCursorSettings": {
    "valueBalloonsEnabled": true,
    "graphBulletSize": 1,
    "valueLineBalloonEnabled": true,
    "valueLineEnabled": true,
    "valueLineAlpha": 0.5
  },

  "periodSelector": {
    "periods": [ {
      "period": "DD",
      "count": 10,
      "label": "10 days"
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


  "panelsSettings": {
    "usePrefixes": true
  },
  "export": {
    "enabled": true
  }
} );

function toggleEvents( shown ) {
  if ( shown )
    chart.showStockEvents();
  else
    chart.hideStockEvents();
}


// var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
// valueAxis.logarithmic = true;
// valueAxis.renderer.minGridDistance = 20;

// var range = valueAxis.axisRanges.create();
// range.value = 800;
// range.grid.stroke = am4core.color("#396478");
// range.grid.strokeWidth = 1;
// range.grid.strokeOpacity = 1;
// range.grid.strokeDasharray = "3,3";
// range.label.inside = true;
// range.label.text = "Average";
// range.label.fill = range.grid.stroke;
// range.label.verticalCenter = "bottom";



// var guide = new AmCharts.Guide();
// guide.date = 500;
// guide.lineAlpha = 1;
// guide.lineColor = "#c44";
// guide.label = "guide";
// guide.position = "top";
// guide.inside = true;
// guide.labelRotation = 90;
// chart.categoryAxis.addGuide( guide );
// chart.validateData();

