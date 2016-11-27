angular.module('app', [
  'rzModule'
]).controller('MainCtrl', [
  '$http',
  function($http)
{
  var vm = this;

  /* config */

  var boundsChangeDelay = 600;
  var sqrtItemCount = 94;
  var apiUrl = 'http://54.169.56.109:8888/api/points';

  /* view model */

  vm.aggregation = 'sum';

  vm.date = {
    from: '2015-01-01',
    to: '2015-12-31',
  };

  vm.location = {
    all: true,
    timur: false,
    barat: false,
    utara: false,
    pusat: false,
    selatan: false,
    onChange: function() {
      ['timur', 'barat', 'utara', 'pusat', 'selatan'].forEach(prov => vm.location[prov] = vm.location.all);
      vm.location.all = false;
    },
  };

  vm.day = {
    all: true,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    onChange: function() {
      ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].forEach(day => vm.day[day] = vm.day.all);
      vm.day.all = false;
    },
  };

  vm.time = {
    from: 6,
    to: 18,
    options: {
      floor: 6,
      ceil: 18,
      step: 1,
      translate: function(value, _, label) {
        switch (label) {
          case 'model':
            return '<b>From</b> '+(value < 10 ? '0'+value : value)+'.00';
          case 'high':
            return '<b>To</b> '+(value < 10 ? '0'+value : value)+'.00';
          default:
            return '';
        }
      },
    },
  };

  vm.labelSubmit = 'Submit';
  vm.errorMessage = '';

  /* vars */

  var lastChanged = 0;
  var onChangeBounds = function() {
    lastChanged = (new Date).getTime();
    setTimeout(function() {
      if ((new Date).getTime() - lastChanged > boundsChangeDelay) {
        var bounds = maps.map.getBounds();
        vm.refresh(bounds.f.f, bounds.b.b, bounds.f.b, bounds.b.f);
      }
    }, boundsChangeDelay);
  };

  var viz = new Viz();
  var maps = new Maps(viz, onChangeBounds, sqrtItemCount);

  /* methods */

  var payload = {
    lat_from: -6.2303955,
    long_from: 106.8480445,
    lat_to: -6.0303955,
    long_to: 107.0480445,
    time_from: 10,
    time_to: 18,
    n_items: sqrtItemCount * sqrtItemCount,
  };
  vm.refresh = function(lat_from, long_from, lat_to, long_to) {
    console.log('request data '+(new Date).getTime());
    if (vm.labelSubmit != 'Loading...') {
      vm.labelSubmit = 'Loading...';
      vm.errorMessage = '';

      if (lat_from) {
        payload.lat_from = lat_from;
        payload.long_from = long_from;
        payload.lat_to = lat_to;
        payload.long_to = long_to;
      }
      payload.time_from = vm.time.from;
      payload.time_to = vm.time.to;

      $http.post(apiUrl, payload).then(function(res) {
        if (res.status == 200) {
          maps.draw(res.data.data.points);
          vm.labelSubmit = 'Submit';
        }
      }, function(res) {
        console.log(res);
        vm.errorMessage = 'Error fetching data: '+res.status+' '+res.statusText;
        vm.labelSubmit = 'Submit';
      });
    }
  };

  /* init */

  vm.location.onChange();
  vm.day.onChange();
  document.body.style.visibility = 'visible';
}]);
