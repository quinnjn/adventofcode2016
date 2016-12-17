const file = process.argv[2] || 'inputs/puzzle-input';
const fs = require('fs');

const createMarker = function (markString) {
  var match = markString.match(/\((\d+)x(\d+)\)/);
  
  return {
    chars: match[1],
    times: match[2] 
  };
};

const decompressMarker = function (marker, dataArray) {
  var result = [];
  var str = '';
  var addition = '';
  for (var i=0; i<marker.chars; i++) {
    str += dataArray.shift();
  }
  for (var i=0; i<marker.times; i++) {
    addition += str;
  }
  return addition;
}

const decompress = function (data) {
  var dataArray = data.split('');
  const markers = [];
  var decompressBuffer = '';
  var markerBuffer = '';

  while (dataArray.length > 0) {
    var c = dataArray.shift();

    if (markerBuffer === '' && c === '(') {
      markerBuffer += c;
    } else if (c === ')') {
      markerBuffer += c;
      markers.push(createMarker(markerBuffer));
      markerBuffer = '';
      while(markers.length > 0) {
        const marker = markers.shift();
        decompressBuffer += decompressMarker(marker, dataArray);
      } 
    } else if (markerBuffer !== '') {
      markerBuffer += c;
    } else {
      decompressBuffer += c;
    }
  }

  return decompressBuffer.trim();
};


fs.readFile(file, 'utf8', function (err, data) {
  var decompressedData = decompress(data);
  console.log('result', decompressedData);
  console.log('length', decompressedData.length);
});
