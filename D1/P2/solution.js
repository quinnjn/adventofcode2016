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

visited = {
  0: {
    0: true
  }
};

var facing = N;

function visit(p) {
  const x = p.x;
  const y = p.y;
  if (!visited[x]) {
    visited[x] = {};
  }

  if (!visited[x][y]) {
    visited[x][y] = true;
    return false;
  }
  console.log('found', x,y);
  return true;
}

fs.readFile(filePath, 'utf8', function (err, data) {
  if (err) { throw err; }

  headings = data.split(', ');

  for (var i=0; i<headings.length; i++) {
    const heading = headings[i];
    facing += parseInt(heading[0] == 'L' ? 1 : -1);
    steps = parseInt(heading.slice(1));

    if (facing < N) { facing = W; }
    else if (facing > W) { facing = N; }
  
    var axis = 'x';
    var value = 1;
  
    switch (facing) {
      case N:
        break;
      case E:
        axis = 'y';
        break;
      case S:
        value = -1;
        break;
      case W:
        axis = 'y';
        value = -1;
        break;
      default:
        throw new Error('Should be one of NESW but was ' + facing);
    }

    for (var j=0; j<steps; j++) {
      position[axis] += value;
      if(visit(position)) {
        console.log(Math.abs(position.x) + Math.abs(position.y));
        return;
      }
    }
  }
  console.log('Never visited any location twice');
});
