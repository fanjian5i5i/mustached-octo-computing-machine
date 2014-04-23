dojo.require("dijit.layout.BorderContainer");

dojo.require("dijit.layout.ContentPane");

dojo.require("dojox.layout.FloatingPane"); 

dojo.require("dojo.parser");

	var pos = 0;
	var pos1 = 1200;
	var horizontal = [];
	var vertical = [];
	var fillPosition = 5;
	var num = 1200;
	
	for(var i = 0; i < 1200; ++i) {
        horizontal[i] = fillPosition;
	vertical[i] = fillPosition;
        fillPosition += 5;
		
	}
	function fishSwim() {
        document.getElementById("fish1").style.left = horizontal[pos] + "px";
	document.getElementById("fish1").style.top = vertical[pos] + "px";
        ++pos;
        if (pos == num) {
			
            pos = 0;
	}
	var tim1 = setTimeout(fishSwim, 40);
	}
	
	function fishSwim1() {
	document.getElementById("fish2").style.top = "400px";
        document.getElementById("fish2").style.left = horizontal[pos1] + "px";
		--pos1;
        if (pos1 == 0) {
			//setTimeout(pos = 200, 50000);
            pos1 = 1200;
	}
	var tim2 = setTimeout(fishSwim1, 20);
	}
	
	function drawChart(marker,inArray) {
		var size = inArray.length;
		
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'year');
        data.addColumn('number', '');
		var rows = new Array();
		for(var i = 2;i<size;i++)
		{
			var year = (i+1986).toString();
			rows.push([year,inArray[i]])
		 };
		 data.addRows(rows);

        // Set chart options
        var options = {'title':'Annual February Precipitation @ '+
                               marker.getPosition().toString(),
                       'width':650,
                       'height':200,
					   'legend': 'none',
					   'vAxis': {title: "Precipitation (mm)"},
					   'hAxis': {title: "Year"},
					   'is3D': true,
					   'displayAnnotations': true,
					   'pointSize': 5,
					   'trendlines': { 0: {} },
					   'hAxis.showTextEvery':2
					   
					  
					   //'hAxis': {maxValue: 1987}
					   };
                       
        var node        = document.createElement('div'),
            infoWindow  = new google.maps.InfoWindow(),
            chart       = new google.visualization.LineChart(node);
            
            chart.draw(data, options);
            infoWindow.setContent(node);
            infoWindow.open(marker.getMap(),marker);
    }		
	//Main function
	google.load('visualization', '1', {'packages':['table']});
	google.load('visualization', '1.0', {'packages':['corechart']});
	var map;
	var infoWindow = new google.maps.InfoWindow();
	var marker = [];
	var mouseLat;
	var mouseLng;

      function initialize() {
	  
	  
	  
		//my style Json
		var styles = [
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#22bcd1" },
      { "lightness": 57 }
    ]
  },{
    "featureType": "landscape.natural.landcover",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#747d75" },
      { "lightness": 76 }
    ]
  },{
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#808080" },
      { "lightness": 32 }
    ]
  },{
  }
];
		//my styled map object
		var styledMap = new google.maps.StyledMapType(styles,
			{name: "My Style"});
		//point object used for locating the map center
		var myLatlng = new google.maps.LatLng(20, 0);
		//costumed my map option
        var mapOptions = {
		  //map center
          center: myLatlng,
		  //map center
          zoom: 3,
		  //costumed map control options
		  mapTypeControlOptions: {
			//three styles including costumed one 
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE,'map_style'],
			//change it to drop down style
			style:google.maps.MapTypeControlStyle.DROPDOWN_MENU 
			},
		  zoomControl:true,
		  zoomControlOptions:{
			//move it to the left
			position: google.maps.ControlPosition.LEFT_CENTER,
			//change size to be large
			style: google.maps.ZoomControlStyle.LARGE
			},
		  panControl:true,
		  panControlOptions:{
			//move pan control to the top right under the style control
			position: google.maps.ControlPosition.RIGHT_TOP
			},
		  //enable scale control and set its position
		  scaleControl:true, 
			scaleControlOptions: { 
			position: google.maps.ControlPosition.BOTTOM_RIGHT
			},
		  //enable mini map and open it up when parsing the canvas
		  overviewMapControl:true,
		  overviewMapControlOptions:{
			opened:true
			}

        };
		
		

		//create map using the map option specified
		var createMarker = function(lat, lng, inArray) {
			if(marker.length!=0)
			{
				//delete marker
				marker.setMap(null);
			}
			if(infoWindow!=null)
			{
				//delete info window
				google.maps.event.clearInstanceListeners(infoWindow);
				infoWindow.close();
				
			}
			marker = new google.maps.Marker({
			icon: 'https://866943e6-a-62cb3a1a-s-sites.googlegroups.com/site/fanjian5i5i/home/cloud3.gif',
			animation:true,
            map: map,
            position: new google.maps.LatLng(lat, lng),
          });
		  //console.log(lat,lng);
          google.maps.event.addListener(marker, 'click', function() {
          drawChart(this,inArray);
          });
        };
		
		
		map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
		google.maps.event.addListener(map, 'mousemove', function (event) {
			mouseLat = event.latLng.lat();
			mouseLng = event.latLng.lng();
			var element = document.getElementById("footer");
			element.innerHTML=mouseLat.toString().substring(0,5)+','+mouseLng.toString().substring(0,6);
		});
		google.maps.event.addListener(map,'click',function(event) {
		mouseLat = event.latLng.lat();
		mouseLng = event.latLng.lng();
		var element=document.getElementById("footer");
		element.innerHTML=mouseLat+','+mouseLng;
		//console.log(mouseLat,mouseLng);
		
		var table = "1vSi3EUO-AfDcnLpICxecb__B1nBLGh2JGYNKlpwB"
		var sqlString = "SELECT * FROM " + table +" WHERE 'Lat' < " + (mouseLat + 1) + " AND 'Lat' > " + (mouseLat - 1) + " AND 'Long' > " + (mouseLng - 1) + " AND 'Long' < " + (mouseLng + 1);
		var sql = encodeURIComponent(sqlString);
		
		var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + sql);
		
		query.send(function(response) {
          var dt = response.getDataTable();
			//console.log(response);
          // For each row in the table, create a marker
		  var categories = new Array();
		  console.log(dt);
          for (var i = 0; i < dt.getNumberOfRows(); i++) {
			console.log(i);
			var infoArray = new Array();
			var highData = new Array();
			for (var j = 0; j < dt.getNumberOfColumns(); j++)
			{
				categories[j] = (j+1988).toString();
				infoArray[j] = dt.getValue(i,j);
				console.log(infoArray);
				if(j>=2)
				{
					highData[j-2] = dt.getValue(i,j); 
				};
				console.log(highData);
				var lat = dt.getValue(i,1);
				var lng = dt.getValue(i,0);

			}
			
			
			
			$(function () {
				$('#borderContainerTwo').highcharts({
            title: {
                text: 'Annual February Precipitation',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: Idrisi Tutorial Data',
                x: -20
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                title: {
                    text: 'Precipitation (mm)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#000000'
                }]
            },
            tooltip: {
                valueSuffix: 'mm'
            },
           
            series: [{
                name: lat.toString()+','+lng.toString(),
                data: highData
            }]
        });
    });
			createMarker(lat,lng,infoArray);
          }
        });
		});
			
		//fire up costumed styled map 
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');	
		
		google.maps.event.addListener(map, 'mousemove', function(event) {


        map.setOptions({ draggableCursor: 'url(https://866943e6-a-62cb3a1a-s-sites.googlegroups.com/site/fanjian5i5i/home/yu.png), move' });
      });
      fishSwim();
      fishSwim1();
	};
	
	
	//call up the initialize function	
	google.maps.event.addDomListener(window, 'load', initialize);
//fire up dojo function when everything is ready
dojo.ready();
