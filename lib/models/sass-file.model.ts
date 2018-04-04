const fs = require('fs-extra');
const path = require('path');

const importRegex = /@import \"(.*)\";/g;

function getFileName(_path, result) {
    if(fs.existsSync(_path.concat('/', result, '.scss'))) {
        return path.resolve(_path, result.concat('.scss'));
    }
}

function getPartialName(_path, result) {
    result = result.split('/')
    result = result.slice(0, -1).concat('_' + result.splice(-1)).join('/');
    if(fs.existsSync(_path.concat('/', result, '.scss'))) {
        return path.resolve(_path, result.concat('.scss'));
    }
}

function SassFile(uri) {
    let _content = fs.readFileSync(uri).toString(),
        _path = uri.split('/').slice(0,-1).join('/'),
        m, files = [];

    while ((m = importRegex.exec(_content)) !== null) {
        let fileLocation = null;

        if (m.index === importRegex.lastIndex) {
            importRegex.lastIndex++;
        }

        fileLocation = getFileName(_path, m[1]);
        fileLocation = getPartialName(_path, m[1]);

        if(fileLocation) {
            files.push({
                statement: m[0],
                location: fileLocation
            });
        }
    }

    files.map(file => {
        let sassFile;
        if(file.location) {
            sassFile = new SassFile(file.location);
            _content = _content.replace(file.statement, sassFile.toString());
        } else {
            throw new Error(`No file found for ${m[0]}.`);
        }
    });

    this.toString = () => {
        return _content;
    };
}

module.exports = SassFile;