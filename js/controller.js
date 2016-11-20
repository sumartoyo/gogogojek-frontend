angular.module('app', [
  'rzModule'
]).controller('MainCtrl', [
  '$http',
  function($http)
{
  var vm = this;

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
    from: 0,
    to: 24,
    options: {
      floor: 0,
      ceil: 24,
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

  var viz = new Viz();
  var maps = new Maps(viz);

  /* methods */

  vm.refresh = function() {
    if (vm.labelSubmit != 'Loading...') {
      vm.labelSubmit = 'Loading...';
      $http.get('data.json').then(function(res) {
        vm.labelSubmit = 'Submit';
        maps.draw(res.data.heatmap);
      }, function(res) {
        vm.labelSubmit = 'Submit';
        vm.errorMessage = 'Error fetching data: '+res.status+' '+res.statusText;
      });
    }
  };

  /* init */

  vm.location.onChange();
  vm.day.onChange();
  vm.refresh();
  document.body.style.visibility = 'visible';
}]);
