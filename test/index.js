const should = require('chai').should();

const makeFinder = require('../index');

describe('Matcher', () => {
    describe('make', () => {
        it('should throw error when no formats provided', () => {
            should.throw(() => {
                makeFinder();
            });

            should.throw(() => {
                makeFinder([]);
            });
        });

        it('should throw when format of mask is not string', () => {
            should.throw(() => {
                makeFinder([1]);
            });
        });

        it('should throw when format of mask does not follow pattern', () => {
            should.throw(() => {
                makeFinder(['A0A']);
            });
        });
    });

    describe('find', () => {
        let formats;
        let find;

        beforeEach(() => {
            formats = [
                "AA9 9AA",
                "A99 9AA",
                "A9A 9AA",
                "9AA 9AA"
            ];

            find = makeFinder(formats);
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
