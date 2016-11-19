function Maps(viz) {
  var self = this;
  self.viz = viz;

  self.init = function() {
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

    /* ngegambar heatmap versi d3js: berat pisan */

    // var overlay = new google.maps.OverlayView();
    // overlay.onAdd = function() {
    //   self.viz.draw(this, overlay, map);
    // };
    // overlay.setMap(map);

    /* ngegambar heatmap versi google maps */

    var data = generatePoints().map(pos => {
      return {
        location: new google.maps.LatLng(pos.lat, pos.long),
        weight: Math.random() * 10,
      };
    });
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: data,
      map: map,
    });

    function generatePoints() {
      var lat0 = -6.123737;
      var lat1 = -6.359908;
      var long0 = 106.728401;
      var long1 = 106.969414;
      var rangelat = lat1 - lat0;
      var rangelong = long1 - long0;

      var points = []
      for (var i = 0; i < 500; i++) {
        points.push({
          lat: (Math.random() * rangelat) + lat0,
          long: (Math.random() * rangelong) + long0,
        });
      }
      return points;
    }
  };

  self.init();
}
