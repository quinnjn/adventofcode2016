function Screen(rows, cols) {
  this.screen = [];
  for (var i=0; i<rows; i++) {
    this.screen.push('.'.repeat(cols).split(''));
  }
}

Screen.prototype.toString = function () {
  var str = '';
  this.screen.forEach(function (row) {
    str += row.join('') + '\n';
  });
  return str;
};

Screen.prototype.print = function () {
    console.log(this.toString());
};

Screen.prototype.rect = function (a,b) {
  for (var y=0; y<a; y++) {
    for (var x=0; x<b; x++) {
      this.screen[x][y] = '#';
    }
  }
};

Screen.prototype.rotateColumn = function (pos, by) {
  for (var i=0; i<by; i++) {
    var prevValue;
    for (var row=0; row < this.screen.length; row++) {
      var value = this.screen[row][pos];
  
      if (!prevValue) {
        const lastRow = this.screen.length-1;
        prevValue = this.screen[lastRow][pos];
      }
  
      this.screen[row][pos] = prevValue;
  
      prevValue = value;
    }
    prevValue = undefined;
  }
};

Screen.prototype.rotateRow = function (pos, by) {
  var row = this.screen[pos];

  for (var i=0; i<by; i++) {
    row.unshift(row.pop());
  }
  
  this.screen[pos] = row;
};

Screen.prototype.countLit = function () {
  return this.toString().match(/#/g).length 
};

const applyInstruction = function (instruction) {
  if (instruction.startsWith('rect')) {
    var args = instruction.match(/(\d+x\d+)/).split('x');
    var a  = parseInt(args[0]);
    var b = parseInt(args[1]);

    this.rect(a,b);
  } else if (instruction.startsWith('rotate')) {
    const args = instruction.match(/(\d+ by \d+/).split(' by ');
    const pos = parseInt(args[0]); 
    const by = parseInt(args[1]); 

    if (instruction.indexOf('row') !== -1) {
      this.rotateRow(pos, by);
    } else {
      this.rotateColumn(pos, by);
    }   
  }
};

module.exports = Screen;
