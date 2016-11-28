angular.module('app', [
  'rzModule'
]).controller('MainCtrl', [
  '$http',
  function($http)
{
  var vm = this;

  /* config */

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

  var onEvent = function(trigger) {
    vm.labelSubmit = 'Loading...';
    console.log(trigger+' fired');
  }

  var lastRequest = 0;
  var payload = {
    lat_from: -6.2303955,
    long_from: 106.8480445,
    lat_to: -6.0303955,
    long_to: 107.0480445,
    time_from: 10,
    time_to: 18,
    n_items: sqrtItemCount * sqrtItemCount,
  };
  var onChangeBounds = function() {
    vm.errorMessage = '';

    var bounds = maps.map.getBounds();
    payload.lat_from = bounds.f.f;
    payload.long_from = bounds.b.b;
    payload.lat_to = bounds.f.b;
    payload.long_to = bounds.b.f;
    payload.time_from = vm.time.from;
    payload.time_to = vm.time.to;

    var myRequest = (new Date).getTime();
    lastRequest = myRequest;
    console.log('requesting...', myRequest);

    $http.post(apiUrl, payload).then(function(res) {
      if (res.status == 200) {
        if (myRequest == lastRequest) {
          maps.draw(res.data.data.points, sqrtItemCount);
          vm.labelSubmit = 'Submit';
        }
      }
    }, function(res) {
      console.log(res);
      vm.errorMessage = 'Error fetching data: '+res.status+' '+res.statusText;
      vm.labelSubmit = 'Submit';
    });
  };

  var maps = new Maps(onEvent, onChangeBounds, sqrtItemCount);

  /* methods */

  vm.refresh = function() {
    onEvent('submit');
    onChangeBounds();
  };

  /* init */

  vm.location.onChange();
  vm.day.onChange();
  document.body.style.visibility = 'visible';
}]);
