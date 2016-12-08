const file = process.argv[2] || 'inputs/puzzle-input';
const fs = require('fs');

var dictionary = [];

fs.readFile(file, 'utf8', function (err, data) {
  const lines = data.split('\n');
  lines.pop();

  lines.forEach(function (line) {
    for (var i=0; i<line.length; i++) {
      const c = line[i];
      if (!dictionary[i]) {
        dictionary[i] = {};
      }
      if (c in dictionary[i]) {
        dictionary[i][c]++;
      } else {
        dictionary[i][c] = 0;
      }
    }
  });

  console.log(dictionary[0]);

  var mostCommonCharacter = dictionary.map(function (d) {
    var highestVal = 0;
    var highestChar = '';

    Object.keys(d).forEach(function (k) {
      var v = d[k];
      if (v > highestVal) {
        highestVal = v;
        highestChar = k;
      }
    });

    return highestChar
  });

  console.log(mostCommonCharacter.join(''));
});
