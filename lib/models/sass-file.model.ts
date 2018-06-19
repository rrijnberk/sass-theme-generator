const fs = require('fs-extra');
const path = require('path');
const { scssFunctions } = require('../support/scss-functions.parser.ts');

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

function underscoredTarget(target) {
    const [_, pre, post] = /^(.*)\/(.*)$/.exec(target) || [null, target, null];
    return !post ? `_${pre}.scss` : `${pre}/_${post}.scss`;
}

function SassFile(uri) {
    let _content = fs.readFileSync(uri).toString(),
        _root = uriRegex.exec(uri)[1];

    this.importedContent = (full, target) => {
        let filePath;

        if(fs.existsSync(filePath = path.resolve(_root, target.concat('.scss'))) ||
            fs.existsSync(filePath = path.resolve(_root, underscoredTarget(target)))
        ) {
            return (new SassFile(filePath)).toString();
        } else {
            console.error(`Attempt to import non existent reference '${filePath}' in file: '${uri}'.`);
            process.exit(1);
        }
    };

    _content = _content
        .replace(importRegex, this.importedContent)
        .replace(scssFunctions.functionCommentResolver, scssFunctions.parse);

    this.toString = () => {
        return _content;
    };
}


module.exports = SassFile;