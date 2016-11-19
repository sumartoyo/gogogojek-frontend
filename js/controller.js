angular.module('app', []).controller('MainCtrl', function() {
  var vm = this;

  vm.aggregation = 'sum';

  vm.dateFrom = '2015-01-01';
  vm.dateTo = '2016-12-31';

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

  vm.timeFrom = 0;
  vm.timeTo = 24;

  vm.refresh = function() {
    console.log('get data...');
    console.log('process...');
    console.log('show viz...');
  };

  /* init */

  vm.location.onChange();
  vm.day.onChange();

  var viz = new Viz();
  var maps = new Maps(viz);
});
