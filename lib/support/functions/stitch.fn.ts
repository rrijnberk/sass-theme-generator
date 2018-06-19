const { breakdown } = require('./breakdown.fn.ts');

function stitch(variables, pattern) {
    const count = (variables = breakdown(variables)).length;
    let results = [];

    for(let i =0; i < variables[0].length; i++) {
        let result = pattern;
        for(let x =0; x < count; x++) {
            const target = new RegExp(`\\$${x}`, 'g');
            result = result.toString().replace(target, variables[x][i]);
        }
        results.push(result);
    }
    return results.join('\n');
}

exports.stitch = stitch;