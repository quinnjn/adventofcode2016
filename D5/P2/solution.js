const md5 = require('js-md5');
const doorId = 'ojvtpuvg';

var i = 0;
var solved = false;
const password = '        '.split('');

while (password.indexOf(' ') !== -1) {
  const hash = md5(doorId + i).slice(0,7);
  if (/^0{5}/.test(hash)) {
    const index = hash[5];
    const val = hash[6];
    if (/[0-7]/.test(index) && ' ' === password[index]) { 
      password[index] = val;
    }
    console.log(i, hash, index, val, password);
  }
  i++;
}

console.log(password.join(''));
