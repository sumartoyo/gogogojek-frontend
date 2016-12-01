(function() {
  var module = angular.module('app', [
    'rzModule',
    'chart.js',
  ])

  module.config(['ChartJsProvider', function (ChartJsProvider) {
    ChartJsProvider.setOptions({
      chartColors: ['#5DA5DA', '#FAA43A', '#60BD68', '#F17CB0', '#B2912F', '#B276B2', '#DECF3F', '#F15854', '#4D4D4D'],
    });
    ChartJsProvider.setOptions('pie', {
      title: {
        display: true,
      },
    });
    ChartJsProvider.setOptions('bar', {
      title: {
        display: true,
      },
    });
    ChartJsProvider.setOptions('line', {
      title: {
        display: true,
      },
    });
  }]);

  module.controller('MainCtrl', ['$http', '$timeout', '$scope', function($http, $timeout, $scope) {
    var vm = this;

    /* config */

    var sqrtItemCount = 94;
    var apiUrl = 'http://54.169.56.109:8888/api/points';

    /* view model */

    vm.viewType = 'charts';
    vm.status = 'all';
    vm.city = 'all';

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

    vm.chart = {
      bar: {
        order: {
          labels: ['Red', 'Blue', 'Yellow'],
          data: [300, 50, 100],
          options: {
            title: {
              text: 'Banyaknya pesanan',
            },
          },
        },
        amount: {
          labels: ['Red', 'Blue', 'Yellow'],
          data: [300, 50, 100],
          options: {
            title: {
              text: 'Total tarif',
            },
          },
        },
        distance: {
          labels: ['Red', 'Blue', 'Yellow'],
          data: [300, 50, 100],
          options: {
            title: {
              text: 'Total jarak',
            },
          },
        },
      },
      pie: {
        order: {
          labels: ['Red', 'Blue', 'Yellow'],
          data: [300, 50, 100],
          options: {
            title: {
              text: 'Proporsi banyaknya pesanan',
            },
          },
        },
        amount: {
          labels: ['Red', 'Blue', 'Yellow'],
          data: [300, 50, 100],
          options: {
            title: {
              text: 'Proporsi total tarif',
            },
          },
        },
        distance: {
          labels: ['Red', 'Blue', 'Yellow'],
          data: [300, 50, 100],
          options: {
            title: {
              text: 'Proporsi total jarak',
            },
          },
        },
      },
      line: {
        order: {
          labels: ['10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00'],
          series: ['Jakarta', 'Bandung', 'Surabaya'],
          data: [
            [65, 59, 80, 81, 56, 55, 40, 14, 14],
            [28, 48, 40, 19, 86, 27, 90, 80, 80],
            [18, 38, 30, 29, 76, 37, 80, 70, 80],
          ],
          datasetOverride: [{
            fill: false,
          },{
            fill: false,
          },{
            fill: false,
          }],
          options: {
            legend: {
              display: true,
            },
            title: {
              text: 'Banyaknya pesanan',
            },
          },
        },
        amount: {
          labels: ['10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00'],
          series: ['Jakarta', 'Bandung', 'Surabaya'],
          data: [
            [65, 59, 80, 81, 56, 55, 40, 14, 14],
            [28, 48, 40, 19, 86, 27, 90, 80, 80],
            [18, 38, 30, 29, 76, 37, 80, 70, 80],
          ],
          datasetOverride: [{
            fill: false,
          },{
            fill: false,
          },{
            fill: false,
          }],
          options: {
            title: {
              text: 'Total tarif',
            },
          },
        },
        distance: {
          labels: ['10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00'],
          series: ['Jakarta', 'Bandung', 'Surabaya'],
          data: [
            [65, 59, 80, 81, 56, 55, 40, 14, 14],
            [28, 48, 40, 19, 86, 27, 90, 80, 80],
            [18, 38, 30, 29, 76, 37, 80, 70, 80],
          ],
          datasetOverride: [{
            fill: false,
          },{
            fill: false,
          },{
            fill: false,
          }],
          options: {
            title: {
              text: 'Total jarak',
            },
          },
        },
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

    function updateChartData(newValue, oldValue) {
      if (newValue != oldValue) {
        console.log('change chart data', newValue, oldValue);
      }
    }

    $scope.$watch('vm.status', updateChartData);
    $scope.$watch('vm.city', updateChartData);
    updateChartData(true, false);

    /* init */

    document.body.style.visibility = 'visible';
  }]);
})();
