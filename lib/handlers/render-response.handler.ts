const config = require('./../support/configuration.ts');
const fileHandler = require('../support/file.ts');
const fs = require('fs-extra');
const path = require('path');


const logError = (err) => {
    console.error(`${err.message} See line: ${err.line}, column: ${err.column} in tmp/compilation.source.scss.`);
    process.exit(1);
};

const renderResponseHandler = (err, result) => {
    result && !err ?
        writeToTarget(result.css.toString()) :
        logError(err);
};

const writeToTarget = (cssContent) => {
    const file = `${config.target}/${config.name}.css`;
    fs.ensureFileSync(file);
    fs.writeFileSync(
        file,
        cssContent
    );
    fileHandler.remove(config.target, `tmp/`);
};

module.exports = renderResponseHandler;