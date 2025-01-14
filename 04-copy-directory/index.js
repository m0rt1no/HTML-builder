const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'files');
const folderCopied = path.join(__dirname, 'files-copy');

fs.readdir(folder, (err, files) => {
  if (err) {
    throw new Error('Error: reading folder: ' + err.message);
  }
  fs.mkdir(folderCopied, { recursive: true }, (err) => {
    if (err) {
      throw new Error('Error: creating folders: ' + err.message);
    }
    files.forEach((file) => {
      const files = path.join(folder, file);
      const filesCopied = path.join(folderCopied, file);
      fs.stat(files, (err, stats) => {
        if (err) {
          throw new Error('Error: receiving information about the file ' + err.message);
        }
        if (stats.isFile()) {
          fs.copyFile(files, filesCopied, (err) => {
            if (err) {
              throw new Error('Error: coping file: ' + err.message);
            } else {
              console.log(`${file} copied successfully.`);
            }
          });
        }
      });
    });
  });
});