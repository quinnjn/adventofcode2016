const file = process.argv[2] || 'inputs/puzzle-input';
const fs = require('fs');
const helper = require('./helpers');
const getId = helper.getId;
const filterInvalidChars = helper.filterInvalidChars;
const mostCommonCharacter = helper.mostCommonCharacter;

const filterRealRooms = function (line) {
  const split = line.split('[');
  const room = split[0];
  const checksum = split[1].split(']')[0];
  const filteredRoom = room
    .split('')
    .filter(filterInvalidChars)
    .join('');

  const commonChars = mostCommonCharacter(filteredRoom)
    .join('');

  const check = commonChars.indexOf(checksum) === 0;
  return check;
}

fs.readFile(file, 'utf8', function (err, data) {
  var lines = data.split('\n');
  lines.pop();
  
  var rooms = lines.filter(filterRealRooms);
  var ids = rooms.map(getId);

  console.log(ids.reduce(function (a,b) { 
    return a+b;
  }));
});
