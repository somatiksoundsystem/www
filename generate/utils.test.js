'use strict';

const {toObject} = require('./utils.js');
const assert = require('assert').strict;

assert.deepEqual(toObject([[`a`, `b`], [`c`, `d`]]), {a: `b`, c: `d`});
assert.deepEqual(toObject([`a`, `b`, `c`, `d`]), {a: 0, b: 1, c: 2, d: 3});
