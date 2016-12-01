const filePath = process.argv[2];
const fs = require('fs');
const N = 0;
const E = 1;
const S = 2;
const W = 3;
const position = {
  x: 0,
  y: 0
};
var facing = N;


fs.readFile(filePath, 'utf8', function (err, data) {
  if (err) { throw err; }

  headings = data.split(', ');

  headings.forEach(function (heading) {
    facing += parseInt(heading[0] == 'L' ? 1 : -1);
    steps = parseInt(heading.slice(1));

    if (facing < N) { facing = W; }
    else if (facing > W) { facing = N; }
  
    switch (facing) {
      case N:
        position.x += steps;
        break;
      case E:
        position.y += steps;
        break;
      case S:
        position.x -= steps;
        break;
      case W:
        position.y -= steps;
        break;
      default:
        throw new Error('Should be one of NESW but was ' + facing);
    }
  });
  
  console.log(Math.abs(position.x) + Math.abs(position.y));
});
