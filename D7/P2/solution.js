const file = process.argv[2] || 'inputs/puzzle-input';
const fs = require('fs');

const findAllBracketedText = function (str) {
  return str.match(/\[[a-z]+\]/g);
};

const splitByBrackets = function (input) {
  var str = input;
  findAllBracketedText(str).forEach(function (bracketedText) {
    str = str.replace(bracketedText, ' ');
  });
  return str.split(' ');
};

const abas = function (ip) {
  var abas = [];
  if (ip.length < 3) { return abas; }
  
  for (var i=0; i<ip.length; i++) {
    var first = ip[i];
    var second = ip[i+1];
    var third = ip[i+2];

    if (third === undefined) { break; }

    if (first === third && first !== second) {
      abas.push(first + second + third);
    }
  }

  return abas;
};

const hasBab = function (ip, abas) {
  console.log(ip, abas);
  var babs = abas.map(function (aba) {
    var a = aba[0];
    var b = aba[1];
    return [b,a,b].join('');
  });

  for (var i=0; i<babs.length; i++) {
    var bab = babs[i];
    if (ip.indexOf(bab) !== -1) {
      return true;
    }
  }

  return false;
}

fs.readFile(file, 'utf8', function (err, data) {
  var lines = data.split('\n');
  lines.pop();
  const ipsSupportingTls = [];

  lines.forEach(function (line) {
    var bracketTexts = findAllBracketedText(line).map(function (str) {
      return str.replace(/[\[\]]/g, '');
    });
    var nonBracketedText = splitByBrackets(line);

    var foundAbas = [];
    nonBracketedText.forEach(function (nonBrackText) {
      var abasFromText = abas(nonBrackText);
      foundAbas = foundAbas.concat(abasFromText);
    });

    var babsFound = bracketTexts.filter(function (bracketText) {
      return hasBab(bracketText, foundAbas);
    });

    if (babsFound.length > 0) {
      console.log(line);
      ipsSupportingTls.push(line);
    }
  });

  console.log(ipsSupportingTls.length);
});
