'use strict';

// noinspection NonAsciiCharacters
const RUSSIAN_CHARS = {
  'а': `a`,
  'б': `b`,
  'в': `v`,
  'г': `g`,
  'д': `d`,
  'е': `e`,
  'ё': `e`,
  'ж': `zh`,
  'з': `z`,
  'и': `i`,
  'й': `i`,
  'к': `k`,
  'л': `l`,
  'м': `m`,
  'н': `n`,
  'о': `o`,
  'п': `p`,
  'р': `r`,
  'с': `s`,
  'т': `t`,
  'у': `u`,
  'ф': `f`,
  'х': `h`,
  'ц': `c`,
  'ч': `ch`,
  'ш': `sh`,
  'щ': `shch`,
  'ь': ``,
  'ы': `y`,
  'ъ': ``,
  'э': `e`,
  'ю': `yu`,
  'я': `ya`
};

const escapeWith = (char) => (acc, it) => {
  acc[it] = char;
  return acc;
};
const UNSAFE_CHARS = Array.from(` <>[]{}|\\^%!.`).reduce(escapeWith(`_`), {});
const RESERVED_CHARS = Array.from(`$&+,/;:=?@#`).reduce(escapeWith(`-`), {});

const MAPPINGS = {...UNSAFE_CHARS, ...RESERVED_CHARS, ...RUSSIAN_CHARS};

const map = (name) => {
  name = name.toLowerCase();

  const result = [];
  for (const letter of name) {
    const changed = MAPPINGS[letter];
    result.push(typeof (changed) === `undefined` ? letter: changed);
  }
  return result.join(``);
};

module.exports = map;
