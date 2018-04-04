const variableRegexp = /(\$.*):((.|\n)*?);/g;

function objectify(_content) {
    let m, result = {};
    while ((m = variableRegexp.exec(_content)) !== null) {
        if (m.index === variableRegexp.lastIndex) {
            variableRegexp.lastIndex++;
        }
        result[m[1]] = m[2];
    }
    return result;
}

function assign(a, b) {
    return Object.assign(a, b);
}

function stringify(object) {
    return Object.keys(object)
        .map((key) => {
            // console.log('=>', key, object[key]);
            return `${key}: ${object[key].trim()};`
        })
        .join('\n');
}

module.exports = {
    assign,
    objectify,
    stringify
};