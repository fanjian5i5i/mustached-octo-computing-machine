//dojo container reference
dojo.require("dijit.layout.BorderContainer");
//dojo header, footer reference
dojo.require("dijit.layout.ContentPane");

dojo.require("dojox.layout.FloatingPane"); 

dojo.require("dojo.parser");


	var pos = 0;
	var pos1 = 400;
	var horizontal = [];
	var vertical = [];
	var fillPosition = 5;
	var num = 400;
	
	for(var i = 0; i < 400; ++i) {
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
	var tim1 = setTimeout(fishSwim, 50);
	}
	
	
	function fishSwim1() {
        document.getElementById("fish2").style.left = horizontal[pos1] + "px";
		--pos1;
        if (pos1 == 0) {

            pos1 = 400;
	}
	var tim2 = setTimeout(fishSwim1, 20);
	}
	function drawChart(marker,inArray) {
		var size = inArray.length;
		
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'year');
        data.addColumn('number', '');
		var rows = new Array();
		for(var i = 2;i<size;i++)
		{
			rows.push([i+1986,inArray[i]])
		 };
		 data.addRows(rows);

        // Set chart options
        var options = {'title':'Annual February Precipitation@ '+
                               marker.getPosition().toString(),
                       'width':400,
                       'height':200,
					   'legend': 'none',
					   'vAxis': {title: "Precipitation (mm)"},
					   'hAxis': {title: "Year"},
					   'is3D': true,
					   'displayAnnotations': true,
					   'trendlines': { 0: {} }
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
			"stylers": [
				{ "invert_lightness": true },
				{ "weight": 3 },
				{ "hue": "#ff0900" },
				{ "saturation": 28 },
				{ "lightness": 25 },
				{ "gamma": 0.79 }
			]
  
		}
		];
		//my styled map object
		var styledMap = new google.maps.StyledMapType(styles,
			{name: "My Style"});
		//point object used for locating the map center
		var myLatlng = new google.maps.LatLng(42.2510, -71.8232);
		//costumed my map option
        var mapOptions = {
		  //map center
          center: myLatlng,
		  //map center
          zoom: 4,
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
			icon:"https://866943e6-a-62cb3a1a-s-sites.googlegroups.com/site/fanjian5i5i/home/jinfei.gif",
			animation:true,
            map: map,
            position: new google.maps.LatLng(lat, lng),
          });

          google.maps.event.addListener(marker, 'click', function() {
          drawChart(this,inArray);
          });
        };
		
		
		map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
		google.maps.event.addListener(map,'click',function(event) {
		mouseLat = event.latLng.lat();
		mouseLng = event.latLng.lng();
	
		var table = "1vSi3EUO-AfDcnLpICxecb__B1nBLGh2JGYNKlpwB"
		var sqlString = "SELECT * FROM " + table +" WHERE 'Lat' < " + (mouseLat + 1) + " AND 'Lat' > " + (mouseLat - 1) + " AND 'Long' > " + (mouseLng - 1) + " AND 'Long' < " + (mouseLng + 1);
		var sql = encodeURIComponent(sqlString);
		
		var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + sql);
		
		query.send(function(response) {
          var dt = response.getDataTable();

          // For each row in the table, create a marker
		  var categories = new Array();
		  
          for (var i = 0; i < dt.getNumberOfRows(); i++) {
			var infoArray = new Array();
			var highData = new Array();
			for (var j = 0; j < dt.getNumberOfColumns(); j++)
			{
				categories[j] = (j+1988).toString();
				infoArray[j] = dt.getValue(i,j);
				if(j>=2)
				{
					highData[j-2] = dt.getValue(i,j); 
				};
				var lat = dt.getValue(i,1);
				var lng = dt.getValue(i,0);

			}
			
			
			
			$(function () {
        $('#borderContainerTwo').highcharts({
            title: {
                text: 'Annual Average Precipitation',
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
