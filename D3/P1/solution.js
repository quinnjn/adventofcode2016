const file = 'inputs/puzzle-input';
const fs = require('fs');

var validTriangles = 0;

fs.readFile(file, 'utf8', function (err, data) {
  var lines = data.split('\n');
  lines.pop();
  lines.forEach(function (line) {
    var lengths = line.trim().split(/\s+/);
    var A = parseInt(lengths[0]);
    var B = parseInt(lengths[1]);
    var C = parseInt(lengths[2]);

    if (A+B > C && A+C > B && C+B > A) {
      validTriangles++;
    }
  });
  
  console.log('valid triangles', validTriangles);
});
