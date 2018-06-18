const { breakdown } = require('./breakdown.fn.ts');

function multiply(variables, pattern) {
    variables = breakdown(variables);

    let results = multiplyRenderer(0, pattern, variables.shift(), variables);
    return results.toString().replace(/},/g, '}\n');
}

function multiplyRenderer(index, pattern, head, tail) {
    const search = `\\$${index}`;
    const searchPattern = new RegExp(search, 'g');
    const next = tail.length > 0 ? tail.shift() : false;
    return head.map(value => {
        return !next ? pattern.replace(searchPattern, value) :
            multiplyRenderer(index+1, pattern.replace(searchPattern, value), next, tail);
    });
}

exports.multiply = multiply;

