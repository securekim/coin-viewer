 /**
      * Generate random chart data
      */
     var chartData1 = [];
     var chartData2 = [];
     var chartData3 = [];
     var chartData4 = [];


     function generateChartData() {
     var firstDate = new Date();
     firstDate.setDate( firstDate.getDate() - 500 );
     firstDate.setHours( 0, 0, 0, 0 );
     for ( var i = 0; i < 500; i++ ) {
     var newDate = new Date( firstDate );
     newDate.setDate( newDate.getDate() + i );
     var a1 = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;
     var b1 = Math.round( Math.random() * ( 1000 + i ) ) + 500 + i * 2;
     var a2 = Math.round( Math.random() * ( 100 + i ) ) + 200 + i;
     var b2 = Math.round( Math.random() * ( 1000 + i ) ) + 600 + i * 2;
     var a3 = Math.round( Math.random() * ( 100 + i ) ) + 200;
     var b3 = Math.round( Math.random() * ( 1000 + i ) ) + 600 + i * 2;
     var a4 = Math.round( Math.random() * ( 100 + i ) ) + 200 + i;
     var b4 = Math.round( Math.random() * ( 100 + i ) ) + 600 + i;
     chartData1.push( {
     "date": newDate,
     "value": a1,
     "volume": b1
     } );
     chartData2.push( {
     "date": newDate,
     "value": a2,
     "volume": b2
     } );
     chartData3.push( {
     "date": newDate,
     "value": a3,
     "volume": b3
     } );
     chartData4.push( {
     "date": newDate,
     "value": a4,
     "volume": b4
     } );
     }
     }
     generateChartData();
     /**
     * Create the chart
     */
     var chart = AmCharts.makeChart( "chartdiv", {
     "type": "stock",
     "theme": "light",
     // This will keep the selection at the end across data updates
     "glueToTheEnd": true,
     // Defining data sets
     "dataSets": [ {
     "title": "BTC-USDT",
     "fieldMappings": [ {
     "fromField": "value",
     "toField": "value"
     }, {
     "fromField": "volume",
     "toField": "volume"
     } ],
     "dataProvider": chartData1,
     "categoryField": "date",
     ////////////////////////////////////////////////////
      "stockEvents": [ {
        "date": new Date(),
        "type": "sign",
        "backgroundColor": "#85CDE6",
        "graph": "g1",
        "text": "S",
        "description": "GOGO"
      },
      {
        "date": new Date(),
        "type": "arrowUp",
        "backgroundColor": "#00CC00",
        "graph": "g1",
        "description": "GOGO"
      },
    ],
     }, {
     "title": "FET-USDT",
     "fieldMappings": [ {
     "fromField": "value",
     "toField": "value"
     }, {
     "fromField": "volume",
     "toField": "volume"
     } ],
     "dataProvider": chartData2,
     "categoryField": "date"
     }, {
     "title": "ETH-USDT",
     "fieldMappings": [ {
     "fromField": "value",
     "toField": "value"
     }, {
     "fromField": "volume",
     "toField": "volume"
     } ],
     "dataProvider": chartData3,
     "categoryField": "date"
     }, {
     "title": "BNB-USDT",
     "fieldMappings": [ {
     "fromField": "value",
     "toField": "value"
     }, {
     "fromField": "volume",
     "toField": "volume"
     } ],
     "dataProvider": chartData4,
     "categoryField": "date"
     } ],
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
     "count": 10,
     "label": "10 days"
     }, {
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
     /**
     * Set up interval to update the data periodically
     */
     setInterval( function() {
     // if mouse is down, stop all updates
     if ( chart.mouseDown )
     return;
     // normally you would load new datapoints here,
     // but we will just generate some random values
     // and remove the value from the beginning so that
     // we get nice sliding graph feeling
     // remove datapoint from the beginning
     // chartData1.shift();
     //chartData2.shift();
     //chartData3.shift();
     // chartData4.shift();
     // add new datapoint at the end
     var newDate = new Date( chartData1[ chartData1.length - 1 ].date );
     newDate.setDate( newDate.getDate() + 1 );
     var i = chartData1.length;
     var a1 = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;
     var b1 = Math.round( Math.random() * ( 1000 + i ) ) + 500 + i * 2;
     var a2 = Math.round( Math.random() * ( 100 + i ) ) + 200 + i;
     var b2 = Math.round( Math.random() * ( 1000 + i ) ) + 600 + i * 2;
     var a3 = Math.round( Math.random() * ( 100 + i ) ) + 200;
     var b3 = Math.round( Math.random() * ( 1000 + i ) ) + 600 + i * 2;
     var a4 = Math.round( Math.random() * ( 100 + i ) ) + 200 + i;
     var b4 = Math.round( Math.random() * ( 100 + i ) ) + 600 + i;
     chart.dataSets[ 0 ].dataProvider.push( {
     date: newDate,
     value: a1,
     volume: b1
     } );
     chart.dataSets[ 1 ].dataProvider.push( {
     date: newDate,
     value: a2,
     volume: b2
     } );
     chart.dataSets[ 2 ].dataProvider.push( {
     date: newDate,
     value: a3,
     volume: b3
     } );
     chart.dataSets[ 3 ].dataProvider.push( {
     date: newDate,
     value: a4,
     volume: b4
     } );
     chart.validateData();
     }, 1000 );

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.logarithmic = true;
valueAxis.renderer.minGridDistance = 20;

let range = valueAxis.axisRanges.create();
range.value = 800;
range.grid.stroke = am4core.color("#396478");
range.grid.strokeWidth = 1;
range.grid.strokeOpacity = 1;
range.grid.strokeDasharray = "3,3";
range.label.inside = true;
range.label.text = "Average";
range.label.fill = range.grid.stroke;
range.label.verticalCenter = "bottom";
