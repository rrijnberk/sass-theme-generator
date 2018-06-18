const chai = require('chai');
const {breakdown} = require('../../../../lib/support/functions/breakdown.fn.ts');

describe('Support function : breakdown : ', () => {

    it('correctly converts a single variable set string.', () => {
        const expectation = [
            [
                'top',
                'right',
                'bottom',
                'left'
            ]
        ];
        const result = breakdown('[ top, right, bottom, left ]');
        chai.assert.deepEqual(result, expectation);
    });

    it('correctly converts a multi variable set string.', () => {
        const expectation = [
            [
                'lowest',
                'low',
                'normal',
                'high',
                'highest'
            ], [
                '0.2',
                '0.35',
                '0.5',
                '0.65',
                '0.8'
            ]
        ];
        const result = breakdown('[ lowest, low, normal, high, highest ][ 0.2, 0.35, 0.5, 0.65, 0.8 ]');
        chai.assert.deepEqual(result, expectation);
    });
});
