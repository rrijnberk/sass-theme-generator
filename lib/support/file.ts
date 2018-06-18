const config = require('./configuration.ts');
const fs = require('fs-extra');
const rimraf = require('rimraf');


function removeFile(path, fileName) {
    const file = `${path}/${fileName}`;
    rimraf(file, () => {});
}

function writeFile(path, fileName, content) {
    const file = `${path}/${fileName}`;
    fs.ensureFileSync(file);
    fs.writeFileSync(file, content);
}

module.exports = {
    remove: removeFile,
    write: writeFile
};
