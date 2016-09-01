const levenshtein = require('fast-levenshtein');

const FORMAT_PATTERN = /^[A9 ]+$/;

function makeMatcher(formats) {
    if (!Array.isArray(formats)) {
        throw new Error('invalid formats type');
    }

    if (!formats.length) {
        throw new Error('please provide formats');
    }

    const masks = formats.map((format, index) => {
        if (typeof format !== 'string') {
            throw Error(`format ${format} at ${index} index is not a string`);
        }

        if (!FORMAT_PATTERN.test(format)) {
            throw Error(`format ${format} at ${index} index doesn't match pattern ${FORMAT_PATTERN}`);
        }

        return {format, string: format.replace(' ', '')}
    });

    return function findFormat(string) {
        string = string.replace(/[A-z]/g, 'A');
        string = string.replace(/[0-9]/g, '9');
        string = string.replace(/![A|9]/g, '');

        const solution = {
            mask: masks[0],
            distance: levenshtein.get(string, masks[0].string)
        };

        return masks.slice(1, masks.length).reduce((solution, mask) => {
            const distance = levenshtein.get(string, mask.string);

            if (solution.distance > distance) {
                return {mask, distance};
            }

            return solution;
        }, solution).mask.format;
    }
}

module.exports = makeMatcher;

