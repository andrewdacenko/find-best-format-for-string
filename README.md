# Format matcher

Find best format for input string using prepared formats.


[![Build Status](https://img.shields.io/travis/andrewdacenko/format-matcher/master.svg?style=flat-square)](https://travis-ci.org/andrewdacenko/format-matcher) 

## Usage

Install

```
npm i format-matcher -S
```

Require and use 

```javascript
const makeMatcher = require('format-matcher');

const formats = ['A 9', 'A-9', '9 A'];
const find = makeMatcher(formats);

const input = 'H-1';
const format = find(input);

format === 'A-9'; // true
```

### String pattern for input and format

Any combination of characters are allowed for input and format, 
but any non `A-z` & `0-9` & `-` or space would be removed.

Thus for these formats would be treated as same:
* `A-9 A.` - dot would be removed
* `A 8*-L` - asterisk would be removed
* `Q-1 M=` - equals would be removed

Same applies for inputs
