const fs = require('fs');
const path = require('path');

const folders = {
  stylesFolder: path.join(__dirname, 'styles'),
  distFolder: path.join(__dirname, 'project-dist'),
};
const outputFile = path.join(folders.distFolder, 'bundle.css');

async function mergeStyles() {
  try {
    await fs.promises.mkdir(folders.distFolder, { recursive: true });
    const cssFiles = await fs.promises.readdir(folders.stylesFolder, { withFileTypes: true });

    const cssFilter = cssFiles
      .filter(file => file.isFile() && path.extname(file.name) === '.css')
      .map(file => path.join(folders.stylesFolder, file.name));

    const writeStream = fs.createWriteStream(outputFile);
    
    for (const file of cssFilter) {
      const data = await fs.promises.readFile(file, 'utf8');
      writeStream.write(data + '\n');
    }
    
    writeStream.end();
  } catch (err) {
    
  }
}

mergeStyles();
