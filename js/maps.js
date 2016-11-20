function Maps(viz) {
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

  var heatmap = [];
  var heatmapLayer = new google.maps.visualization.HeatmapLayer({
    data: heatmap,
    map: map,
    maxIntensity: 100,
  });

  self.draw = function() {
    heatmap.splice(0, heatmap.length);
    DUMMY_generatePoints(2000).forEach(pos => {
      var rand = Math.random();
      rand = rand < 0.5 ? 0.5 : rand;
      heatmap.push({
        location: new google.maps.LatLng(pos.lat, pos.long),
        weight: (rand - 0.5) * 200,
      });
    });
  };

  self.draw = function(data) {
    var lat0 = -6.123737;
    var lat1 = -6.359908;
    var long0 = 106.728401;
    var long1 = 106.969414;
    var rangelat = lat1 - lat0;
    var rangelong = long1 - long0;
    var maxRow = 0, maxCol = 0, minWeight = 9999999, maxWeight = 0;
    data.forEach(item => {
      maxRow = Math.max(maxRow, item[0]);
      maxCol = Math.max(maxCol, item[1]);
      minWeight = Math.min(minWeight, item[2]);
      maxWeight = Math.max(maxWeight, item[2]);
    });
    var sizelat = rangelat / maxCol;
    var sizelong = rangelong / maxRow;
    var rangeweight = maxWeight - minWeight;

    var points = [];
    data.forEach(item => {
      points.push({
        location: new google.maps.LatLng((item[0] * sizelat) + lat0, (item[1] * sizelong) + long0),
        weight: ((item[2] - minWeight) * 100) / rangeweight,
      });
    });
    heatmap.splice(0, heatmap.length);
    heatmap.push.apply(heatmap, points);
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
