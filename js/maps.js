function Maps(onEvent, onChangeBounds, sqrtItemCount) {
  var self = this;

  var map = new google.maps.Map(d3.select('#map').node(), {
    zoom: 11,
    center: new google.maps.LatLng(-6.2303955, 106.8480445),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'gogogojek'],
    },
  });
  self.map = map;

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

  var lastHeatmap;
  var clearHeatmap = function() {
    if (lastHeatmap) {
      lastHeatmap.setMap(null);
      lastHeatmap = null;
    }
  };
  map.addListener('idle', function() {
    onEvent('idle');
    onChangeBounds();
  });
  map.addListener('dragstart', function() {
    onEvent('dragstart');
  });
  map.addListener('zoom_changed', function() {
    onEvent('zoom_changed');
    clearHeatmap();
  });

  self.draw = function(data, sqrtItemCount) {
    console.log('drawing...');

    var points = [];
    var points = data.map(item => {
      return {
        location: new google.maps.LatLng(item[0], item[1]),
        weight: item[2],
      };
    });

    if (lastHeatmap) {
      lastHeatmap.setMap(null);
      lastHeatmap = null;
    }

    var currentHeatmap = new google.maps.visualization.HeatmapLayer({
      data: points,
      map: map,
      opacity: 0.5,
      maxIntensity: 1,
      radius: Math.round(Math.max($('#map').width(), $('#map').height()) / (sqrtItemCount / 1.4)),
    });
    lastHeatmap = currentHeatmap;
  }
}
