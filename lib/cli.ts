#! /usr/bin/env node

const rimraf = require('rimraf');
const sass = require('node-sass');

const config = require('./support/configuration.ts');
const file = require('./support/file.ts');
const renderResponseHandler = require('./handlers/render-response.handler.ts');
const SassFile = require('./models/sass-file.model.ts');
const Variables = require('./support/variables.ts');

const noop = () => {
};

/**
 * Resolve and flatten variables.
 * @returns All variables in one string
 */
function getVariables() {
    let variables = config.variables
        .map(uri => new SassFile(uri))
        .map(scss => scss.toString())
        .map(Variables.objectify);
    return Variables.stringify(
        variables.length > 0 ?
            variables.reduce(Variables.assign) :
            variables
    );
}

/**
 * Resolve and flatten sources.
 * @returns All variables in one string
 */
function getSources() {
    return config.sources
        .map(uri => new SassFile(uri))
        .map(scss => scss.toString())
        .join('\n\n');
}

/**
 * Generate the theme.
 */
function generateTheme() {
    // Resolve variable & source content
    const variables = getVariables(),
        sources = getSources(),
        compilationSource = variables.concat('\n\n', sources);

    // Write theme sources.
    file.write(config.target, `src/${config.name}_variables.scss`, variables);
    file.write(config.target, `src/${config.name}_sources.scss`, sources);

    file.write(config.target, `tmp/compilation.source.scss`, compilationSource);
    // Write stylesheet.
    sass.render({
        data: compilationSource || 'body {}'
    }, renderResponseHandler);
}

/**
 * Remove existing theme content and generate the theme.
 */
rimraf(`${config.target}/${config.name}.css`, noop);
rimraf(`${config.target}/src`, generateTheme);




