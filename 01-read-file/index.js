const path = require('path');
const fs = require('fs');
const pathFile = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(pathFile);
readStream.on('data', function(chunk) {
    console.log(chunk.toString());
});