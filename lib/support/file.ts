const fs = require('fs-extra');

const config = require('./configuration.ts');

function writeFile(path, fileName, content) {
    const file = `${path}/${fileName}`;
    fs.ensureFileSync(file);
    fs.writeFileSync(file, content);
}

module.exports = {
    write: writeFile
};
