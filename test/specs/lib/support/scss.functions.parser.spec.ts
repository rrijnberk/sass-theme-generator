const chai = require('chai');
const {scssFunctions} = require('../../../../lib/support/scss-functions.parser.ts');

describe('SCSS Comment functions', function () {


    describe('API', () => {
        it('declares an exists function', () => {
            chai.expect(scssFunctions.exist).to.be.a('function');
        });

        it('declares an parse function', () => {
            chai.expect(scssFunctions.commentFunctionHandler).to.be.a('function');
        });
    });

    it('exist method correctly identifies function comments presence', function () {
        const source = `
This is some text in front
//@fn multiply [ a, b, c, d ][ s, n, l ] => .margin-$0-$1 { margin-$0: $1px; }

//@fn multiply [ a, b ][ 1, 2 ] => .margin-$0-$1 { margin-$0: $1px; }
This is some text in the middle
//@fn multiply [ c, d ][ 3, 4 ] => .margin-$0-$1 { margin-$0: $1px; }


//@fn multiply [ top, right, bottom, left][ s, n, l ] => .margin-$0-$1 { margin-$0: $1px; }
This is some text at the end        
`;
        chai.expect(scssFunctions.exist(source)).to.equal(true);
    });

    it('parse correctly converts source', () => {
        const full = `//@fn multiply [ a, b, c, d ][ s, n, l ] => .margin-$0-$1 { margin-$0: $1px; }`;
        const declaration = `multiply [ a, b, c, d ][ s, n, l ] => .margin-$0-$1 { margin-$0: $1px; }`;
        const expectation = `.margin-a-s { margin-a: spx; }
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
.margin-d-l { margin-d: lpx; }`;

        chai.expect(scssFunctions.commentFunctionHandler(full, declaration).trim()).to.equal(expectation);
    })


});