const file = process.argv[2] || 'inputs/puzzle-input';
const fs = require('fs');
const isValidTriangle = function (lengths) {
  var A = parseInt(lengths[0]);
  var B = parseInt(lengths[1]);
  var C = parseInt(lengths[2]);

  console.log('A,B,C', A,B,C);
  return A+B > C && A+C > B && C+B > A;
}

const parseTriangles = function (data) {
  var result = [];
  var lines = data.split('\n');
  lines.pop();
  var triangleLines = lines.splice(0,3);

  while (triangleLines.length > 0) {
    var triangle = [];
    triangleLines.forEach(function (line) {
      var lengths = line.trim().split(/\s+/);
      for (var i=0; i<lengths.length; i++) {
        if (!triangle[i]) { triangle[i] = []; }
        triangle[i].push(lengths[i]);
      }
    });

    result = result.concat(triangle.map(function (tri) {
      return tri.join(' ');
    }));
    triangleLines = lines.splice(0,3);
  }
  
  return result;
}

var validTriangles = 0;

fs.readFile(file, 'utf8', function (err, data) {
  var triangles = parseTriangles(data);
  triangles.forEach(function (triangle) {
    var triangleLengths = triangle.split(/\s+/);
    if (isValidTriangle(triangleLengths)) {
      validTriangles++;
    }
  });
  
  console.log('valid triangles', validTriangles);
});


