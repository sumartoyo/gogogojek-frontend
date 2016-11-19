function Viz() {
  var self = this;
  var svg, projection;

  self.draw = function(that, overlay, map) {
    if (!svg || !projection) {
      svg = d3.select(that.getPanes().overlayLayer).append('svg');
      projection = that.getProjection();
    }

    var heatmap = self._createRandomHeatmap(map.getBounds(), 0.008);
    var isDrawn = false;

    overlay.draw = function() {
      if (isDrawn) return;

      var p0 = projection.fromLatLngToDivPixel(new google.maps.LatLng(0, 0));
      var p1 = projection.fromLatLngToDivPixel(new google.maps.LatLng(heatmap.cellsize, 0));
      var radius = p0.y - p1.y;

      setTimeout(function() {
        svg.selectAll('rect').remove();
        var i, j, heat, pos;
        for (i = 0; i < heatmap.nrows; i++) {
          for (j = 0; j < heatmap.ncols; j++) {
            heat = heatmap.data[i][j];
            if (heat > 0) {
              pos = new google.maps.LatLng(heatmap.lat0 + (j * heatmap.cellsize), heatmap.long0 + (i * heatmap.cellsize));
              pos = projection.fromLatLngToDivPixel(pos);
              svg.append('rect')
                .attr('x', pos.x)
                .attr('y', pos.y)
                .attr('width', radius)
                .attr('height', radius)
                .style('fill', 'hsla('+self.heatToHue(heat)+', 100%, 50%, 0.3)');
            }
          }
        }
        isDrawn = false;
      }, 100);

      isDrawn = true;
    };
  };

  self.heatToHue = function(percent) {
    return 240 - (percent * 240);
  };

  self._createRandomHeatmap = function(bounds, cellsize) {
    var lat0 = bounds.f.f;
    var lat1 = bounds.f.b;
    var long0 = bounds.b.b;
    var long1 = bounds.b.f;

    var nrows = (long1 - long0) / cellsize;
    var ncols = (lat1 - lat0) / cellsize;

    ncols -= 2;
    nrows -= 2;

    var heatmap = {
      nrows: nrows,
      ncols: ncols,
      cellsize: cellsize,
      lat0: lat0 + cellsize,
      lat1: lat1 - cellsize,
      long0: long0 + cellsize,
      long1: long1 - cellsize,
      data: [],
    }

    var i, j, row, rand;
    for (i = 0; i < nrows; i++) {
      row = [];
      for (j = 0; j < ncols; j++) {
        rand = (Math.random() - 0.5) / 0.5
        row.push(rand < 0 ? 0 : rand);
      }
      heatmap.data.push(row);
    }

    return heatmap;
  };
}
