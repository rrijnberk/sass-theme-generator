const fs = require('fs-extra');
const path = require('path');

const importRegex = /\@import (?:\"|\')(.*?)(?:\"|\');/g;
const uriRegex = /^(.*)\/(?:.*?).scss$/;

function getFileName(_path, result) {
    if(fs.existsSync(_path.concat('/', result, '.scss'))) {
        return path.resolve(_path, result.concat('.scss'));
    }
}

function getPartialName(_path, result) {
    result = result.split('/');
    result = result.slice(0, -1).concat('_' + result.splice(-1)).join('/');
    if(fs.existsSync(_path.concat('/', result, '.scss'))) {
        return path.resolve(_path, result.concat('.scss'));
    }
}

function SassFile(uri) {
    let _content = fs.readFileSync(uri).toString(),
        _root = uriRegex.exec(uri)[1];

    this.importedContent = (full, target) => {
        let filePath;
        if(fs.existsSync(filePath = path.resolve(_root, target.concat('.scss'))) ||
            fs.existsSync(filePath = path.resolve(_root, '_'.concat(target, '.scss')))
        ) {
            return (new SassFile(filePath)).toString();
        } else {
            console.error(`Attempt to import non existent reference '${target}' in file: '${uri}'.`);
            process.exit(1);
        }
    };

    _content = _content.replace(importRegex, this.importedContent);

    this.toString = () => {
        return _content;
    };
}


module.exports = SassFile;