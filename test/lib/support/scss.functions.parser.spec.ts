require('../../support/regexp.extensions.ts');

const chai = require('chai');
const {scssFunctions} = require('../../../lib/support/scss-functions.parser.ts');

describe('SCSS Comment functions', function () {
    const source = `
This is some text in front
//@fn multiply [ a, b, c, d ][ s, n, l ] => .margin-$0-$1 { margin-$0: $1px; };

//@fn multiply [ a, b ][ 1, 2 ] => .margin-$0-$1 { margin-$0: $1px; };
This is some text in the middle
//@fn multiply [ c, d ][ 3, 4 ] => .margin-$0-$1 { margin-$0: $1px; };


//@fn multiply [ top, right, bottom, left][ s, n, l ] => .margin-$0-$1 { margin-$0: $1px; };
This is some text at the end        
`;

    describe('API', () => {
        it('declares an exists function', () => {
            chai.expect(scssFunctions.exist).to.be.a('function');
        });

        it('declares an parse function', () => {
            chai.expect(scssFunctions.parse).to.be.a('function');
        });
    });

    it('exist method correctly identifies function comments presence', function () {
        chai.expect(scssFunctions.exist(source)).to.equal(true);
    });

    it('parse correctly converts source', () => {
        const expectation = `This is some text in front
.margin-a-s { margin-a: spx; }
.margin-a-n { margin-a: npx; }
.margin-a-l { margin-a: lpx; }
.margin-b-s { margin-b: spx; }
.margin-b-n { margin-b: npx; }
.margin-b-l { margin-b: lpx; }
.margin-c-s { margin-c: spx; }
.margin-c-n { margin-c: npx; }
.margin-c-l { margin-c: lpx; }
.margin-d-s { margin-d: spx; }
.margin-d-n { margin-d: npx; }
.margin-d-l { margin-d: lpx; }

.margin-a-1 { margin-a: 1px; }
.margin-a-2 { margin-a: 2px; }
.margin-b-1 { margin-b: 1px; }
.margin-b-2 { margin-b: 2px; }
This is some text in the middle
.margin-c-3 { margin-c: 3px; }
.margin-c-4 { margin-c: 4px; }
.margin-d-3 { margin-d: 3px; }
.margin-d-4 { margin-d: 4px; }


.margin-top-s { margin-top: spx; }
.margin-top-n { margin-top: npx; }
.margin-top-l { margin-top: lpx; }
.margin-right-s { margin-right: spx; }
.margin-right-n { margin-right: npx; }
.margin-right-l { margin-right: lpx; }
.margin-bottom-s { margin-bottom: spx; }
.margin-bottom-n { margin-bottom: npx; }
.margin-bottom-l { margin-bottom: lpx; }
.margin-left-s { margin-left: spx; }
.margin-left-n { margin-left: npx; }
.margin-left-l { margin-left: lpx; }
This is some text at the end`;

        chai.expect(scssFunctions.parse(source).trim()).to.equal(expectation);
    })


});