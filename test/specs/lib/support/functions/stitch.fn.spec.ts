const chai = require('chai');
const { stitch } = require('../../../../../lib/support/functions/stitch.fn.ts');

describe('Comment function : stitch : ', () => {
    it('correctly renders two arrays of variables according to the provided pattern', () => {
        const variables = '[ xs, s, n, l, xl ][ 0.2, 0.35, 0.5, 0.65, 0.8 ]';
        const pattern = '.padding---$0 { padding: $1px };';
        const expectation = `.padding---xs { padding: 0.2px };
.padding---s { padding: 0.35px };
.padding---n { padding: 0.5px };
.padding---l { padding: 0.65px };
.padding---xl { padding: 0.8px };`;
        chai.expect(stitch(variables, pattern)).to.equal(expectation);
    });
});