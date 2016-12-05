const file = process.argv[2] || 'inputs/puzzle-input';
const fs = require('fs');

fs.readFile(file, 'utf8', function (err, data) {
  const lines = data.split('\n');
  lines.pop();
});
