function Maps(onEvent, onChangeBounds, sqrtItemCount) {
  var self = this;

  var cities = {
    jakarta: {
      lat: -6.2303955,
      long: 106.8480445,
    },
    bandung: {
      lat: -6.9175,
      long: 107.6191,
    },
    surabaya: {
      lat: -7.2575,
      long: 112.7521,
    },
    denpasar: {
      lat: -8.6705,
      long: 115.2126,
    },
    makassar: {
      lat: -5.1477,
      long: 119.4327,
    },
    palembang: {
      lat: -2.9761,
      long: 104.7754,
    },
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: new google.maps.LatLng(-6.2303955, 106.8480445),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'gogogojek'],
    },
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
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
  };

  self.goto = function(city) {
    var loc = cities[city];
    if (loc) {
      var center = new google.maps.LatLng(loc.lat, loc.long);
      map.panTo(center);
    }
  };
}
