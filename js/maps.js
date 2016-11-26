function Maps(viz, onChangeBounds, sqrtItemCount) {
  var self = this;

  var map = new google.maps.Map(d3.select('#map').node(), {
    zoom: 11,
    center: new google.maps.LatLng(-6.2303955, 106.8480445),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'gogogojek'],
    },
  });

  var mapType = new google.maps.StyledMapType([
    {
      featureType: 'all',
      elementType: 'all',
      stylers: [
        { saturation: -75 }
      ],
    },
  ], { name: 'Custom' });
  map.mapTypes.set('gogogojek', mapType);
  map.setMapTypeId('gogogojek');
  map.addListener('bounds_changed', onChangeBounds);
  self.map = map;

  var lastHeatmap;
  self.draw = function() {
    var data = DUMMY_generatePoints(94*94).map(pos => {
      var rand = Math.random();
      rand = rand < 0.75 ? 0.75 : rand;
      return {
        location: new google.maps.LatLng(pos.lat, pos.long),
        weight: (rand - 0.75) * 200,
      };
    });
    var currentHeatmap = new google.maps.visualization.HeatmapLayer({
      data: data,
      map: map,
      opacity: 0.5,
      maxIntensity: 100,
    });

    if (lastHeatmap) {
      lastHeatmap.setMap(null);
      lastHeatmap = null;
    }
    lastHeatmap = currentHeatmap;
  };

  self.draw = function(data) {
    var points = [];
    var points = data.map(item => {
      return {
        location: new google.maps.LatLng(item[0], item[1]),
        weight: item[2],
      };
    });
    var currentHeatmap = new google.maps.visualization.HeatmapLayer({
      data: points,
      map: map,
      // opacity: 0.5,
      // radius: max($('#map').width(), $('#map').height()) / sqrtItemCount,
      maxIntensity: 1,
    });

    if (lastHeatmap) {
      lastHeatmap.setMap(null);
      lastHeatmap = null;
    }
    lastHeatmap = currentHeatmap;
  }

  function DUMMY_generatePoints(nPoints) {
    var lat0 = -6.123737;
    var lat1 = -6.359908;
    var long0 = 106.728401;
    var long1 = 106.969414;
    var rangelat = lat1 - lat0;
    var rangelong = long1 - long0;

    var points = []
    for (var i = 0; i < nPoints; i++) {
      points.push({
        lat: (Math.random() * rangelat) + lat0,
        long: (Math.random() * rangelong) + long0,
      });
    }
    return points;
  }
}
