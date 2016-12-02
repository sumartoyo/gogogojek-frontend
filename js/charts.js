function makeChart() {
  var cities = ['Jakarta', 'Bandung', 'Surabaya', 'Denpasar', 'Makassar'];
  var colors = { // http://www.mulinblog.com/a-color-palette-optimized-for-data-visualization/
    Jakarta: '#FAA43A',
    Bandung: '#5DA5DA',
    Surabaya: '#60BD68',
    Denpasar: '#4D4D4D',
    Makassar: '#F17CB0',
  };
  var hours = ['10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00'];
  var hoursKey = ['10', '11', '12', '13', '14', '15', '16', '17'];
  var data = {"Bandung":{"-1":{"distance":{"all":148217.7499999999,"10":16914.31,"11":17515.83,"12":16200.01,"13":18193.7,"14":13575.04,"15":21221.61,"16":22941.57,"17":21655.6799999999},"amount":{"all":313923000.0,"10":35486000.0,"11":36648000.0,"12":35367000.0,"13":38398000.0,"14":29984000.0,"15":43456000.0,"16":50022000.0,"17":44562000.0},"order":{"all":18217.0,"10":2054.0,"11":2107.0,"12":2042.0,"13":2232.0,"14":1747.0,"15":2565.0,"16":2859.0,"17":2611.0}},"0":{"distance":{"all":72527.06,"10":8054.22,"11":8728.1,"12":7350.93,"13":9228.93,"14":6771.98,"15":11385.04,"16":10908.92,"17":10098.94},"amount":{"all":162198000.0,"10":18093000.0,"11":19843000.0,"12":16898000.0,"13":20513000.0,"14":15155000.0,"15":24380000.0,"16":24866000.0,"17":22450000.0},"order":{"all":9472.0,"10":1044.0,"11":1146.0,"12":988.0,"13":1197.0,"14":886.0,"15":1432.0,"16":1458.0,"17":1321.0}},"1":{"distance":{"all":74415.52,"10":8787.43,"11":8722.25,"12":8558.36,"13":8825.36,"14":6613.42,"15":9656.84,"16":11913.73,"17":11338.13},"amount":{"all":148758000.0,"10":17204000.0,"11":16603000.0,"12":17932000.0,"13":17521000.0,"14":14291000.0,"15":18728000.0,"16":24905000.0,"17":21574000.0},"order":{"all":8576.0,"10":1002.0,"11":948.0,"12":1027.0,"13":1014.0,"14":830.0,"15":1113.0,"16":1386.0,"17":1256.0}},"2":{"distance":{"all":1275.17,"10":72.66,"11":65.48,"12":290.72,"13":139.41,"14":189.64,"15":179.73,"16":118.92,"17":218.61},"amount":{"all":2967000.0,"10":189000.0,"11":202000.0,"12":537000.0,"13":364000.0,"14":538000.0,"15":348000.0,"16":251000.0,"17":538000.0},"order":{"all":169.0,"10":8.0,"11":13.0,"12":27.0,"13":21.0,"14":31.0,"15":20.0,"16":15.0,"17":34.0}}},"Denpasar":{"-1":{"distance":{"all":56800.9399999999,"10":7514.85,"11":8188.93,"12":6498.14,"13":7375.17,"14":5840.56,"15":8269.33,"16":7061.18,"17":6052.78},"amount":{"all":140887000.0,"10":19359000.0,"11":21428000.0,"12":16266000.0,"13":19437000.0,"14":15454000.0,"15":19872000.0,"16":17359000.0,"17":11712000.0},"order":{"all":8677.0,"10":1209.0,"11":1350.0,"12":1018.0,"13":1189.0,"14":945.0,"15":1206.0,"16":1045.0,"17":715.0}},"0":{"distance":{"all":42814.1999999999,"10":5514.67,"11":6352.48,"12":5068.82,"13":5424.03,"14":4506.27,"15":6398.79,"16":5231.59,"17":4317.55},"amount":{"all":113631000.0,"10":15823000.0,"11":17656000.0,"12":13420000.0,"13":15601000.0,"14":12478000.0,"15":16234000.0,"16":13565000.0,"17":8854000.0},"order":{"all":7115.0,"10":995.0,"11":1117.0,"12":854.0,"13":980.0,"14":786.0,"15":996.0,"16":840.0,"17":547.0}},"1":{"distance":{"all":13263.84,"10":1904.9,"11":1731.3,"12":1324.05,"13":1860.95,"14":1324.12,"15":1820.83,"16":1731.11,"17":1566.58},"amount":{"all":25861000.0,"10":3308000.0,"11":3535000.0,"12":2646000.0,"13":3676000.0,"14":2931000.0,"15":3537000.0,"16":3568000.0,"17":2660000.0},"order":{"all":1483.0,"10":204.0,"11":221.0,"12":152.0,"13":200.0,"14":156.0,"15":205.0,"16":190.0,"17":155.0}},"2":{"distance":{"all":722.9,"10":95.28,"11":105.15,"12":105.27,"13":90.19,"14":10.17,"15":49.71,"16":98.48,"17":168.65},"amount":{"all":1395000.0,"10":228000.0,"11":237000.0,"12":200000.0,"13":160000.0,"14":45000.0,"15":101000.0,"16":226000.0,"17":198000.0},"order":{"all":79.0,"10":10.0,"11":12.0,"12":12.0,"13":9.0,"14":3.0,"15":5.0,"16":15.0,"17":13.0}}},"Jakarta":{"-1":{"distance":{"all":1406604.8499999996,"10":144288.9100000004,"11":147477.0699999999,"12":139528.3900000005,"13":161803.1400000005,"14":114028.4500000001,"15":219460.4899999982,"16":230387.5000000007,"17":249630.8999999994},"amount":{"all":2115204000.0,"10":222269000.0,"11":228317000.0,"12":212197000.0,"13":252338000.0,"14":178529000.0,"15":320520000.0,"16":337602000.0,"17":363432000.0},"order":{"all":132421.0,"10":13432.0,"11":14052.0,"12":13104.0,"13":15250.0,"14":10815.0,"15":20052.0,"16":21658.0,"17":24058.0}},"0":{"distance":{"all":1146360.2100000009,"10":119583.2900000002,"11":121601.8300000004,"12":111101.3400000008,"13":126982.1300000001,"14":90489.2200000003,"15":182916.0599999992,"16":190403.4800000007,"17":203282.8599999992},"amount":{"all":1785695000.0,"10":191179000.0,"11":195837000.0,"12":177002000.0,"13":206989000.0,"14":147822000.0,"15":273443000.0,"16":288546000.0,"17":304877000.0},"order":{"all":111394.0,"10":11472.0,"11":11977.0,"12":10881.0,"13":12397.0,"14":8903.0,"15":17070.0,"16":18531.0,"17":20163.0}},"1":{"distance":{"all":250622.1299999998,"10":24204.42,"11":25103.09,"12":27521.86,"13":33270.9899999999,"14":22548.38,"15":35324.0599999999,"16":38476.4299999999,"17":44172.9},"amount":{"all":316666000.0,"10":30442000.0,"11":31379000.0,"12":34031000.0,"13":43208000.0,"14":29234000.0,"15":45429000.0,"16":47019000.0,"17":55924000.0},"order":{"all":20218.0,"10":1917.0,"11":2006.0,"12":2149.0,"13":2714.0,"14":1823.0,"15":2880.0,"16":3009.0,"17":3720.0}},"2":{"distance":{"all":9622.51,"10":501.2,"11":772.15,"12":905.19,"13":1550.02,"14":990.85,"15":1220.37,"16":1507.59,"17":2175.14},"amount":{"all":12843000.0,"10":648000.0,"11":1101000.0,"12":1164000.0,"13":2141000.0,"14":1473000.0,"15":1648000.0,"16":2037000.0,"17":2631000.0},"order":{"all":809.0,"10":43.0,"11":69.0,"12":74.0,"13":139.0,"14":89.0,"15":102.0,"16":118.0,"17":175.0}}},"Makassar":{"-1":{"distance":{"all":35607.09,"10":4001.16,"11":3828.09,"12":4103.15,"13":4828.21,"14":3573.56,"15":5783.73,"16":5193.47,"17":4295.72},"amount":{"all":107428000.0,"10":13124000.0,"11":13329000.0,"12":13619000.0,"13":13249000.0,"14":10236000.0,"15":15548000.0,"16":14765000.0,"17":13558000.0},"order":{"all":6510.0,"10":748.0,"11":824.0,"12":819.0,"13":804.0,"14":627.0,"15":948.0,"16":901.0,"17":839.0}},"0":{"distance":{"all":17723.06,"10":2008.12,"11":2306.27,"12":1733.81,"13":2296.2,"14":1716.72,"15":2642.84,"16":2733.43,"17":2285.67},"amount":{"all":55995000.0,"10":6592000.0,"11":7053000.0,"12":6169000.0,"13":7282000.0,"14":5011000.0,"15":8076000.0,"16":8598000.0,"17":7214000.0},"order":{"all":3481.0,"10":390.0,"11":440.0,"12":391.0,"13":455.0,"14":318.0,"15":501.0,"16":532.0,"17":454.0}},"1":{"distance":{"all":17769.82,"10":1992.14,"11":1520.4,"12":2367.26,"13":2493.04,"14":1828.58,"15":3116.52,"16":2451.5,"17":2000.38},"amount":{"all":51043000.0,"10":6517000.0,"11":6261000.0,"12":7435000.0,"13":5862000.0,"14":5195000.0,"15":7397000.0,"16":6122000.0,"17":6254000.0},"order":{"all":3003.0,"10":357.0,"11":383.0,"12":427.0,"13":342.0,"14":307.0,"15":442.0,"16":366.0,"17":379.0}},"2":{"distance":{"all":114.21,"10":0.9,"11":1.42,"12":2.08,"13":38.97,"14":28.26,"15":24.37,"16":8.54,"17":9.67},"amount":{"all":390000.0,"10":15000.0,"11":15000.0,"12":15000.0,"13":105000.0,"14":30000.0,"15":75000.0,"16":45000.0,"17":90000.0},"order":{"all":26.0,"10":1.0,"11":1.0,"12":1.0,"13":7.0,"14":2.0,"15":5.0,"16":3.0,"17":6.0}}},"Palembang":{"-1":{"distance":{"all":2641.17,"10":306.79,"11":365.0,"12":421.64,"13":275.34,"14":125.55,"15":348.23,"16":383.51,"17":415.11},"amount":{"all":7085000.0,"10":809000.0,"11":975000.0,"12":1183000.0,"13":751000.0,"14":408000.0,"15":947000.0,"16":888000.0,"17":1124000.0},"order":{"all":502.0,"10":58.0,"11":66.0,"12":85.0,"13":53.0,"14":31.0,"15":65.0,"16":61.0,"17":83.0}},"0":{"distance":{"all":1837.86,"10":205.16,"11":240.2,"12":270.72,"13":140.85,"14":110.69,"15":235.91,"16":268.98,"17":365.35},"amount":{"all":5184000.0,"10":595000.0,"11":697000.0,"12":833000.0,"13":411000.0,"14":323000.0,"15":671000.0,"16":666000.0,"17":988000.0},"order":{"all":378.0,"10":46.0,"11":49.0,"12":61.0,"13":29.0,"14":24.0,"15":48.0,"16":48.0,"17":73.0}},"1":{"distance":{"all":795.95,"10":101.63,"11":124.8,"12":146.42,"13":134.49,"14":12.0,"15":112.32,"16":114.53,"17":49.76},"amount":{"all":1871000.0,"10":214000.0,"11":278000.0,"12":340000.0,"13":340000.0,"14":65000.0,"15":276000.0,"16":222000.0,"17":136000.0},"order":{"all":121.0,"10":12.0,"11":17.0,"12":23.0,"13":24.0,"14":5.0,"15":17.0,"16":13.0,"17":10.0}},"2":{"distance":{"all":7.36,"12":4.5,"14":2.86},"amount":{"all":30000.0,"12":10000.0,"14":20000.0},"order":{"all":3.0,"12":1.0,"14":2.0}}},"Surabaya":{"-1":{"distance":{"all":108213.1,"10":11106.09,"11":11605.23,"12":11160.18,"13":14089.33,"14":9932.1,"15":17025.11,"16":18144.66,"17":15150.4},"amount":{"all":200130000.0,"10":21019000.0,"11":24060000.0,"12":21272000.0,"13":25895000.0,"14":18819000.0,"15":31164000.0,"16":29922000.0,"17":27979000.0},"order":{"all":11318.0,"10":1208.0,"11":1394.0,"12":1248.0,"13":1450.0,"14":1055.0,"15":1720.0,"16":1719.0,"17":1524.0}},"0":{"distance":{"all":55892.82,"10":6105.41,"11":7517.15,"12":6284.71,"13":5934.33,"14":4463.34,"15":8182.29,"16":8709.07,"17":8696.52},"amount":{"all":120467000.0,"10":13328000.0,"11":16403000.0,"12":13419000.0,"13":13128000.0,"14":9902000.0,"15":17852000.0,"16":17928000.0,"17":18507000.0},"order":{"all":6708.0,"10":761.0,"11":933.0,"12":770.0,"13":738.0,"14":543.0,"15":975.0,"16":1004.0,"17":984.0}},"1":{"distance":{"all":51689.5,"10":4994.74,"11":4022.13,"12":4764.46,"13":7963.44,"14":5433.18,"15":8807.22,"16":9314.76,"17":6389.57},"amount":{"all":78529000.0,"10":7661000.0,"11":7537000.0,"12":7607000.0,"13":12550000.0,"14":8846000.0,"15":13220000.0,"16":11806000.0,"17":9302000.0},"order":{"all":4546.0,"10":445.0,"11":454.0,"12":464.0,"13":699.0,"14":508.0,"15":741.0,"16":704.0,"17":531.0}},"2":{"distance":{"all":630.78,"10":5.94,"11":65.95,"12":111.01,"13":191.56,"14":35.58,"15":35.6,"16":120.83,"17":64.31},"amount":{"all":1134000.0,"10":30000.0,"11":120000.0,"12":246000.0,"13":217000.0,"14":71000.0,"15":92000.0,"16":188000.0,"17":170000.0},"order":{"all":64.0,"10":2.0,"11":7.0,"12":14.0,"13":13.0,"14":4.0,"15":4.0,"16":11.0,"17":9.0}}}};

  Chart.defaults.global.title.display = true;

  var scales = {
    yAxes: [
      {
        ticks: {
          callback: function(label, index, labels) {
            return Number(label).toLocaleString();
          },
        },
      },
    ],
  };
  var tooltips = {
    callbacks: {
      label: function(tooltipItem, data) {
        var value = data.datasets[0].data[tooltipItem.index];
        var label = data.labels[tooltipItem.index];
        return label+' '+Number(value).toLocaleString();
      },
    },
  };

  var chart = {
    bar: {
      order: {
        options: {
          title: {
            text: 'Banyaknya pesanan',
          },
        },
      },
      amount: {
        options: {
          title: {
            text: 'Total pembayaran (Rp)',
          },
        },
      },
      distance: {
        options: {
          title: {
            text: 'Total jarak (km)',
          },
        },
      },
    },
    pie: {
      order: {
        options: {
          title: {
            text: 'Proporsi banyaknya pesanan',
          },
        },
      },
      amount: {
        options: {
          title: {
            text: 'Proporsi total pembayaran (Rp)',
          },
        },
      },
      distance: {
        options: {
          title: {
            text: 'Proporsi total jarak (km)',
          },
        },
      },
    },
    line: {
      datasetOverride: cities.map(_ => { return { fill: false } }),
      labels: hours,
      order: {
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
        options: {
          title: {
            text: 'Total pembayaran (Rp)',
          },
        },
      },
      distance: {
        options: {
          title: {
            text: 'Total jarak (km)',
          },
        },
      },
    },
  };

  ['order', 'amount', 'distance'].forEach(jenisData => {
    chart.bar[jenisData].options.scales = scales;
    chart.bar[jenisData].options.tooltips = tooltips;
    chart.pie[jenisData].options.tooltips = tooltips;
    chart.line[jenisData].options.scales = scales;
  });

  return {
    cities: cities,
    colors: colors,
    hours: hours,
    hoursKey: hoursKey,
    chart: chart,
    data: data,
  };
}
