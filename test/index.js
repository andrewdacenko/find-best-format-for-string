const should = require('chai').should();

const makeMatcher = require('../index');

describe('Matcher', () => {
    describe('make', () => {
        it('should throw error when no formats provided', () => {
            should.throw(() => {
                makeMatcher();
            });

            should.throw(() => {
                makeMatcher([]);
            });
        });

        it('should throw when format of mask is not string', () => {
            should.throw(() => {
                makeMatcher([1]);
            });
        });
    });

    describe('find', () => {
        "use strict";

        let formats;
        let find;

        beforeEach(() => {
            formats = [
                'AA9 9AA',
                'A99 9AA',
                'A9A 9AA',
                '9AA 9AA'
            ];

            find = makeMatcher(formats);
        });

        it('should get best format for input string', () => {
            const inputs = [
                'ai99op',
                'q760im',
                'i9l0ks',
                '7au9nb'
            ];

            inputs.map(find).should.deep.equal(formats);
        });
    });
});
