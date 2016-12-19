const fs = require('fs');
const file = process.argv[2] || 'inputs/puzzle-input';
const data = fs.readFileSync(file, 'utf8').trim();

console.log('data length', data.length);
