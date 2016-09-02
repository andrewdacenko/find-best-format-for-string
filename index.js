const levenshtein = require('fast-levenshtein');

function makeMatcher(formats) {
    if (!Array.isArray(formats)) {
        throw new Error('invalid formats type');
    }

    if (!formats.length) {
        throw new Error('please provide formats');
    }

    const masks = formats.map((format) => {
        const string = cleanString(format);

        return {format, string};
    });

    return function findFormat(string) {
        string = cleanString(string);

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

function cleanString(string) {
    if (typeof string !== 'string') {
        throw Error(`${string} at index is not a string`);
    }

    return string.replace(/[A-z]/g, 'A')
        .replace(/[0-9]/g, '9')
        .replace(/![A9\s-]/g, '');
}

module.exports = makeMatcher;

