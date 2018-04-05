const _path = require('path');
const _args = require('./arguments.ts');

const _defaults = {
        variables: [],
        sources: [],
        target: 'dist',
        name: 'theme'
    },
    __default_themeConfig = _path.resolve('./', 'theme.config.json');

const generateConfig = () => {
    const externalConfig =
        require(_args.config ? _path.resolve('./', _args.config) : __default_themeConfig) || {} ;
    return Object.assign(_defaults, externalConfig);
};

const _config = generateConfig();

module.exports = _config;