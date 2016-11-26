angular.module('app', [
  'rzModule'
]).controller('MainCtrl', [
  '$http',
  function($http)
{
  var vm = this;

  /* config */

  var boundsChangeDelay = 600;
  var apiUrl = 'http://192.168.0.101:8888/api/points';

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
  var maps = new Maps(viz, onChangeBounds);

  /* methods */

  var request = {
    lat0: -6.2303955,
    long0: 106.8480445,
    lat1: -6.0303955,
    long1: 107.0480445,
    timeFrom: 10,
    timeTo: 18,
    n_items: 94 * 94,
  };
  vm.refresh = function(lat0, long0, lat1, long1) {
    if (vm.labelSubmit != 'Loading...') {
      vm.labelSubmit = 'Loading...';
      vm.errorMessage = '';

      if (lat0) {
        request.lat0 = lat0;
        request.long0 = long0;
        request.lat1 = lat1;
        request.long1 = long1;
      }
      request.timeFrom = vm.time.from;
      request.timeTo = vm.time.to;

      $http.post(apiUrl, request).then(function(res) {
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
