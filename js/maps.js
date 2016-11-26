function Maps(viz, onChangeBounds, sqrtItemCount) {
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
  var refreshHeatmap = function() {
    if (lastHeatmap) {
      lastHeatmap.setMap(null);
      lastHeatmap = null;
    }
    onChangeBounds();
  };
  // map.addListener('bounds_changed', refreshHeatmap);
  map.addListener('projection_changed', refreshHeatmap);
  map.addListener('dragend', refreshHeatmap);
  map.addListener('zoom_changed', refreshHeatmap);

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
      opacity: 0.5,
      maxIntensity: 1,
    });
    lastHeatmap = currentHeatmap;
  }
}
