const fs = require('fs');
const clone = function (d) { return JSON.parse(JSON.stringify(d)); };
const translateKeypad = function (pos) { return keypad[pos.row+1][pos.col+1]; };
const normalize = function (obj) {
  const limit = {
    min:-1, 
    max:1
  };
  if (obj.row < limit.min) { obj.row = limit.min; }
  if (obj.col < limit.min) { obj.col = limit.min; }
  if (obj.row > limit.max) { obj.row = limit.max; }
  if (obj.col > limit.max) { obj.col = limit.max; }
};

keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const position = {
  row: 0,
  col: 0
};

const filePath = process.argv[2];


var bathroomCode = '';

fs.readFile(filePath, 'utf8', function (err, data) {
  if (err) { throw err; }

  const keyPadInstructions = data.split('\n');
  keyPadInstructions.pop();
  
  keyPadInstructions.forEach(function (keyPadInstruction) {
    var pos = clone(position);
    var moves = keyPadInstruction.split('');
    moves.forEach(function (move) {
      switch (move) {
        case 'U':
          pos.row--;
          break;
        case 'L':
          pos.col--;
          break;
        case 'R':
          pos.col++;
          break;
        case 'D':
          pos.row++;
          break;
        default:
          throw new Error('Unknown move: '+move);
      }
      normalize(pos);
    });

    console.log(pos);
    bathroomCode += translateKeypad(pos);
  });
  
  console.log(bathroomCode);
});
