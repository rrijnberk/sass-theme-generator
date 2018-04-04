const config = require('./../support/configuration.ts');
const path = require('path');
const fs = require('fs-extra');

const logError = (err) => {
    console.error(err.message);
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
};

module.exports = renderResponseHandler;