(function() {
  var module = angular.module('app', [
    'rzModule',
    'chart.js',
  ])

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
      min: '?',
      mid: '?',
      max: '?',
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

    var chartOptions = makeChart();
    vm.chart = chartOptions.chart;
    vm.chart.data = {
      selectedCities: [],
      selectedColors: [],
    };
    ['order', 'amount', 'distance'].forEach(jenisData => {
      vm.chart.data[jenisData] = {
        bar: [],
        line: [],
      };
    });

    vm.cities = {
      all: false,
      Jakarta: true,
      Bandung: true,
      Surabaya: true,
      Denpasar: true,
      Makassar: true,
      checkAll: function() {
        chartOptions.cities.forEach(city => {
          vm.cities[city] = true;
        });
        vm.cities.all = false;
      },
    };

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
            vm.legend.min = res.data.data.min;
            vm.legend.max = res.data.data.max;
            vm.legend.mid = Math.round((res.data.data.max - res.data.data.min) / 2);
          }
        }
      }, function(res) {
        console.log(res);
        vm.errorMessage = 'Error fetching data: '+res.status+' '+res.statusText;
        vm.labelSubmit = 'Submit';
      });
    };

    vm.goto = function(city) {
      maps.goto(city);
    };

    vm.refresh = function() {
      onEvent('submit');
      onChangeBounds();
    };

    var maps = new Maps(onEvent, onChangeBounds, sqrtItemCount);

    /* charts */

    var isUpdatingChart = false;
    var updateChart = function(newValue, oldValue) {
      if (newValue != oldValue && !isUpdatingChart) {
        isUpdatingChart = true;

        setTimeout(function() {
          var selectedCities = vm.chart.data.selectedCities;
          var selectedColors = vm.chart.data.selectedColors;
          selectedCities.splice(0, selectedCities.length);
          selectedColors.splice(0, selectedColors.length);
          chartOptions.cities.forEach(city => {
            if (vm.cities[city]) {
              selectedCities.push(city);
              selectedColors.push(chartOptions.colors[city]);
            }
          });

          var key;
          switch (vm.status) {
            case 'all': key = '-1'; break;
            case 'success': key = '0'; break;
            case 'canceled_by_user': key = '1'; break;
            case 'canceled_by_driver': key = '2'; break;
          }

          ['order', 'amount', 'distance'].forEach(jenisData => {
            var me = vm.chart.data[jenisData];

            me.bar.splice(0, me.bar.length);
            selectedCities.forEach(city => {
              me.bar.push(chartOptions.data[city][key][jenisData]['all']);
            });

            me.line.splice(0, me.line.length);
            selectedCities.forEach(city => {
              me.line.push(chartOptions.hoursKey.map(hour => chartOptions.data[city][key][jenisData][hour]));
            });
          });

          setTimeout(function() {
            $scope.$digest();

            setTimeout(function() {
              isUpdatingChart = false;
            }, 1);
          }, 1);
        }, 1);
      }
    };

    $scope.$watch('vm.status', updateChart);
    chartOptions.cities.forEach(city => $scope.$watch('vm.cities.'+city, updateChart));

    /* init */

    updateChart(true, false);
    document.body.style.visibility = 'visible';
  }]);
})();
