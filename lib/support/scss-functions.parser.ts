const {multiply} = require('./functions/multiply.fn.ts');

function ScssFunctions() {
    const local = this;
    const functionCommentResolver = /\/{2}@fn\s{1,}(.*);/g;
    const functionConfigResolver = /^(.*?)\s{1,}(\[\s{0,}.*?\s{0,}\]{1,})\s{1,}=>\s{1,}(.*)$/;

    local.multiply = multiply;

    function commentFunctionHandler(full, declaration) {
        if (functionConfigResolver.test(declaration)) {

            const [_, handler, variables, pattern] = functionConfigResolver.exec(declaration);
            if (local[handler]) {
                return local[handler](variables, pattern);
            } else {
                console.error(`Attempt to parse unknown function '${handler}'. Terminating process.`);
            }
        } else {
            console.error(`Attempt to parse corrupt function declaration "${declaration}". Terminating process.`);
        }
        process.exit(1);
    }

    function exist(source) {
        return functionCommentResolver.test(source);
    }

    function parse(source) {
        return source.replace(functionCommentResolver, commentFunctionHandler)
    }

    return {
        functionCommentResolver,
        exist,
        parse
    }
}

exports.scssFunctions = new ScssFunctions();