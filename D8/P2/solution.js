const file = process.argv[2] || 'inputs/puzzle-input';
const fs = require('fs');
const Screen = require('./screen');

const screen = new Screen(6, 50);

const applyInstruction = function (screen, instruction) {
  const parts = instruction.split(' ');
  const func = parts.shift();
  switch (func) {
    case 'rect':
      var args = parts[0].split('x');
      screen.rect(parseInt(args[0]), parseInt(args[1]));
      break;
      
    case 'rotate':
      var axis = parts.shift();
      const pos = parseInt(parts.shift().split('=')[1]);
      parts.shift();
      const by = parts.shift();

      if (axis === 'row') {
        screen.rotateRow(pos, by);
      } else {
        screen.rotateColumn(pos, by);
      }
      break;
  }
};

fs.readFile(file, 'utf8', function (err, data) {
  const lines = data.split('\n');
  lines.pop();

  lines.forEach(function (line) {
    applyInstruction(screen, line);
    screen.print();
  });

  console.log('lit', screen.countLit());
});
