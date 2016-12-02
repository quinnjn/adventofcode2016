const fs = require('fs');
const clone = function (d) { return JSON.parse(JSON.stringify(d)); };

const translateKeypad = function (pos) { 
  return keypad[pos.row+2][pos.col+2]; 
};

const attemptMove = function (obj, move) {
  var pos = clone(obj);
  pos.row += move.row;
  pos.col += move.col;

  if (pos.row < -2) { return obj; }
  if (pos.col < -2) { return obj; }
  if (pos.row > 2) { return obj; }
  if (pos.col > 2) { return obj; }

  console.log(pos);
  var result = translateKeypad(pos);

  if ([undefined, 0].indexOf(result) !== -1) {
    // abort move
    return obj;
  }

  console.log('translation', result);
  return pos;
};

const A = 'A';
const B = 'B';
const C = 'C';
const D = 'D';

keypad = [
  [0,0,1,0,0],
  [0,2,3,4,0],
  [5,6,7,8,9],
  [0,A,B,C,0],
  [0,0,D,0,0]
];

const position = {
  row: 0,
  col: -2
};

const filePath = process.argv[2];


var bathroomCode = '';

fs.readFile(filePath, 'utf8', function (err, data) {
  if (err) { throw err; }

  var keyPadInstructions = data.split('\n');
  keyPadInstructions.pop();

  keyPadInstructions.forEach(function (keyPadInstruction) {
    var pos = clone(position);
    var moves = keyPadInstruction.split('');
    moves.forEach(function (move) {
      var moveInstruction = {
        row:0,
        col:0
      };
      switch (move) {
        case 'U':
          moveInstruction.row = -1;
          break;
        case 'L':
          moveInstruction.col = -1;
          break;
        case 'R':
          moveInstruction.col = 1;
          break;
        case 'D':
          moveInstruction.row = 1;
          break;
        default:
          throw new Error('Unknown move: '+move);
      }
      console.log('move', moveInstruction);
      pos = attemptMove(pos, moveInstruction);
    });

    bathroomCode += translateKeypad(pos);
  });
  
  console.log(bathroomCode);
});
