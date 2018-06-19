const chai = require('chai');
const {multiply} = require('../../../../../lib/support/functions/multiply.fn.ts');

describe('Comment function : multiply : ', () => {
    it('renders the correct results for a single level set', () => {
        const variables = '[top, right, bottom, left]';
        const pattern = '.border-$0 { border-$0: 1px solid }';
        const expectation = '' +
            '.border-top { border-top: 1px solid }\n' +
            '.border-right { border-right: 1px solid }\n' +
            '.border-bottom { border-bottom: 1px solid }\n' +
            '.border-left { border-left: 1px solid }';
        chai.expect(multiply(variables, pattern)).to.equal(expectation);
    });


    it('renders the correct results for a single level set', () => {
        const variables = '[top, right, bottom, left][ s, n, l ]';
        const pattern = '.border-$0---$1 { border-$0: 1px solid $some--var---$1 }';
        const expectation = '' +
            '.border-top---s { border-top: 1px solid $some--var---s }\n' +
            '.border-top---n { border-top: 1px solid $some--var---n }\n' +
            '.border-top---l { border-top: 1px solid $some--var---l }\n' +
            '.border-right---s { border-right: 1px solid $some--var---s }\n' +
            '.border-right---n { border-right: 1px solid $some--var---n }\n' +
            '.border-right---l { border-right: 1px solid $some--var---l }\n' +
            '.border-bottom---s { border-bottom: 1px solid $some--var---s }\n' +
            '.border-bottom---n { border-bottom: 1px solid $some--var---n }\n' +
            '.border-bottom---l { border-bottom: 1px solid $some--var---l }\n' +
            '.border-left---s { border-left: 1px solid $some--var---s }\n' +
            '.border-left---n { border-left: 1px solid $some--var---n }\n' +
            '.border-left---l { border-left: 1px solid $some--var---l }';
        chai.expect(multiply(variables, pattern)).to.equal(expectation);
    });

});