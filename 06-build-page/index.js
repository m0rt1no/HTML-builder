const fs = require('fs');
const path = require('path');

const paths = {
  template: path.join(__dirname, 'template.html'),
  dist: path.join(__dirname, 'project-dist'),
  assets: path.join(__dirname, 'assets'),
  components: path.join(__dirname, 'components'),
  styles: path.join(__dirname, 'styles'),
  bundle: path.join(__dirname, 'project-dist', 'style.css'),
  assetsDist: path.join(__dirname, 'project-dist', 'assets')
};

async function createDir(dirPath) {
    await fs.promises.mkdir(dirPath, { recursive: true });
}

async function buildHTML() {
  let readTemplate = await fs.promises.readFile(paths.template, 'utf-8');
  const arrTags = readTemplate.match(/\{{(.+?)\}}/g) || [];

  for (const tag of arrTags) {
    const componentName = tag.slice(2, -2);
    const componentPath = path.join(paths.components, `${componentName}.html`);
    const componentContent = await fs.promises.readFile(componentPath, 'utf-8');
    readTemplate = readTemplate.replace(tag, componentContent);
  }

  await fs.promises.writeFile(path.join(paths.dist, 'index.html'), readTemplate);
}

async function buildCSS() {
  const cssFiles = await fs.promises.readdir(paths.styles);
  const writeStream = fs.createWriteStream(paths.bundle);

  for (const file of cssFiles) {
    const filePath = path.join(paths.styles, file);
    if (path.extname(file) === '.css') {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      writeStream.write(data + '\n');
    }
  }

  writeStream.end();
}

async function copyAssets() {
  const copyFolder = async (src, dest) => {
    await fs.promises.mkdir(dest, { recursive: true });
    const arrFiles = await fs.promises.readdir(src);

    for (const file of arrFiles) {
      const inputFolder = path.join(src, file);
      const outputFolder = path.join(dest, file);
      const stats = await fs.promises.stat(inputFolder);
      if (stats.isDirectory()) {
        await copyFolder(inputFolder, outputFolder);
      } else {
        await fs.promises.copyFile(inputFolder, outputFolder);
      }
    }
  };

  await copyFolder(paths.assets, paths.assetsDist);
}

async function projectAssembly() {
  await createDir(paths.dist);
  await Promise.all([buildHTML(), buildCSS(), copyAssets()]);
}

projectAssembly();