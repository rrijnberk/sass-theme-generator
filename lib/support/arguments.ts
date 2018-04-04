const __arguments = {
    config: null
};

(() => {
    const printConfigMessage = (arg) => {
        const message = `Provided option ${arg} is not supported.

Supported options are:
-c, --config [file name]\tPath to the configuration (relative to the project root).
`;
        console.error(message);
    };

    for(let index = 2; index < process.argv.length; index++) {
        switch(process.argv[index]) {
            case '-c':
            case '--config':
                __arguments.config = process.argv[++index];
                break;
            default:
                printConfigMessage(process.argv[index]);
                process.exit(1);
        }
    }
})();

module.exports = __arguments;