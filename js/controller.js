(function() {
  var module = angular.module('app', [
    'rzModule',
    'chart.js',
  ])

  module.config(['ChartJsProvider', configureChart]);

  module.controller('MainCtrl', ['$http', '$timeout', '$scope', function($http, $timeout, $scope) {
    var vm = this;

    /* config */

    var sqrtItemCount = 94;
    var apiUrl = 'http://54.169.56.109:8888/api/points';

    /* view model */

    vm.viewType = 'heatmap';
    vm.status = 'all';

    vm.labelSubmit = 'Submit';
    vm.errorMessage = '';

    vm.legend = {
      min: 100,
      mid: 2000,
      max: 40000,
    }

    vm.time = {
      from: 10,
      to: 18,
      options: {
        floor: 10,
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

    var chartData = makeChartData();
    vm.chart = chartData.chart;
    var data = chartData.data;
    var cities = chartData.cities;
    var hoursKey = chartData.hoursKey;

    /* maps */

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

    vm.goto = function(city) {
      maps.goto(city);
    };

    vm.refresh = function() {
      onEvent('submit');
      onChangeBounds();
    };

    $scope.$watch('vm.status', function(newValue, oldValue) {
      var key;
      switch (newValue) {
        case 'all': key = '-1'; break;
        case 'success': key = '0'; break;
        case 'canceled_by_user': key = '1'; break;
        case 'canceled_by_driver': key = '2'; break;
      }
      vm.chart.bar.order.data = cities.map(city => data[city][key]['orders']['all']);
      vm.chart.bar.amount.data = cities.map(city => data[city][key]['amount']['all']);
      vm.chart.bar.distance.data = cities.map(city => data[city][key]['distance']['all']);
      vm.chart.pie.order.data = cities.map(city => data[city][key]['orders']['all']);
      vm.chart.pie.amount.data = cities.map(city => data[city][key]['amount']['all']);
      vm.chart.pie.distance.data = cities.map(city => data[city][key]['distance']['all']);
      vm.chart.line.order.data = cities.map(city => {
        return hoursKey.map(hour => data[city][key]['orders'][hour]);
      });
      vm.chart.line.amount.data = cities.map(city => {
        return hoursKey.map(hour => data[city][key]['orders'][hour]);
      });
      vm.chart.line.distance.data = cities.map(city => {
        return hoursKey.map(hour => data[city][key]['orders'][hour]);
      });
    });

    /* init */

    document.body.style.visibility = 'visible';
  }]);
})();
