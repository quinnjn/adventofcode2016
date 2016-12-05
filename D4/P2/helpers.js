const getId = function (room) {
  return parseInt(room.split('-').pop().split('[')[0]);
};

const filterInvalidChars = function (c) {
  return !/[0-9-]/.test(c);
};

const orderCharsByOccur = function (string) {
  var chars = {};
  var orderedChars = [];

  for (var index in string) {
    var c = string[index];
    if (c in chars) { 
      chars[c]++ 
    } else { 
      chars[c] = 1; 
    }
  }

  var step2 = {};
  for (var k in chars) {
    var v = chars[k];
    if (v in step2) {
      step2[v].push(k);
    } else {
      step2[v] = [k];
    }
  }

  var result = [];
  var sortedCount = Object.keys(step2).sort().reverse();
  for (var i = 0; i < sortedCount.length; i++) {
    var k = sortedCount[i];
    var vals = step2[k].sort();
    result = result.concat(vals);
  };
  
  console.log(result);
  return result;
};

const mostCommonCharacter = function (string) {
  return orderCharsByOccur(string);
};

const rot = function (string) {
  const rotVal = getId(string) % 26;
  const overflow = 'z'.charCodeAt();
  return string.split('').map(function (a) {
    if (a === '-') { return ' '; }
    if (/[0-9]/.test(a)) { return a; }
    
    var aVal = a.charCodeAt();
    for (var i=0; i<rotVal; i++) {
      aVal++;
      if (aVal > overflow) {
        aVal = 'a'.charCodeAt();
      }
    }
    return String.fromCharCode(aVal);
  }).join('');
}

module.exports = {
  getId: getId,
  filterInvalidChars: filterInvalidChars,
  orderCharsByOccur: orderCharsByOccur,
  mostCommonCharacter: mostCommonCharacter,
  rot: rot
};
