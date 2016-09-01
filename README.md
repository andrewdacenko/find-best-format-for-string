# Format matcher

Find best format for input string using prepared formats.


[![Build Status](https://img.shields.io/travis/andrewdacenko/format-matcher/master.svg?style=flat-square)](https://travis-ci.org/andrewdacenko/format-matcher) 

## Usage

Install via `npm i format-matcher -S`

Require and use 

    
    const makeFinder = require('format-matcher');

    const formats = ['A 9', '9 A'];
    const find = makeFinder(formats);

    const input = 'H1';
    const format = find(input);
    
    format === 'A 9'; // true
    

### Format pattern

Following format pattern is used `/^[A9 ]+$/`.

### Input pattern

Any combination of characters are allowed for input, 
but non `A-z` & non `0-9` would be removed.
