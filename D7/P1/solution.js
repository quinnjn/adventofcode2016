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

const abba = function (ip) {
  if (ip.length < 4) { return false; }
  
  for (var i=0; i<ip.length; i++) {
    var first = ip[i];
    var second = ip[i+1];
    var third = ip[i+2];
    var fourth = ip[i+3];

    if (first === fourth && second === third &&
        first !== second && third !== fourth) {
      return true;
    }
  }
  return false;
};

fs.readFile(file, 'utf8', function (err, data) {
  var lines = data.split('\n');
  lines.pop();
  const ipsSupportingTls = [];

  lines.forEach(function (line) {
    var brackedText = findAllBracketedText(line).map(function (str) {
      return str.replace(/[\[\]]/g, '');
    });
    var nonBracketedText = splitByBrackets(line);
    var abbaBracketedText = brackedText.filter(function (bracketText) {
      return abba(bracketText);
    });

    var abbaNonBracketedText = nonBracketedText.filter(function (nonBracketText) {
      return abba(nonBracketText);
    });

    if (abbaBracketedText.length === 0 && abbaNonBracketedText.length > 0) {
      ipsSupportingTls.push(line);
    }
  });

  console.log(ipsSupportingTls.length);
});
