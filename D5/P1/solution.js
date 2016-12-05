const md5 = require('js-md5');
const doorId = '18f47a30';

var i = 0;
const password = [];

while (password.length < 8) {
  const hash = md5(doorId + i).slice(0,6);
  if (/^0{5}/.test(hash)) {
    const index = hash[5];
    password.push(index);
    console.log(i, hash, index, password);
  }
  i++;
}

console.log(password.join(''));
