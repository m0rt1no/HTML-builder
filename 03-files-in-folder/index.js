const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error! Folder does not exist', err.message);
    return;
  }

  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(folderPath, file.name);
      const fileExtension = path.extname(filePath).slice(1);
      const fileName = path.basename(file.name, path.extname(file.name));

      fs.stat(filePath, (err, stats) => {
        if (err) {
            throw new Error(`Error with file stats: ${err.message}`);
        } else {
          console.log(`${fileName} - ${fileExtension} - ${stats.size}b`);
        }
      });
    }
  });
});