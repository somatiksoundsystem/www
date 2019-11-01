'use strict';

const map = require('./mapper');
const assert = require('assert').strict;

// Test unchanged
assert.equal(map(`unchanged`), `unchanged`);
assert.equal(map(`1234`), `1234`);

// Test dots
assert.equal(map(`file.jpg`), `file_jpg`);

// Test spaces
assert.equal(map(`name and name`), `name_and_name`);

// Test case
assert.equal(map(`UPPER_CASE`), `upper_case`);
assert.equal(map(`SomeOtherCase`), `someothercase`);

// Test cyrillic
assert.equal(map(`русский`), `russkii`);
assert.equal(map(`Для застолья`), `dlya_zastolya`);
