'use strict';

const log = require('fancy-log');
const fs = require('fs');
const util = require('util');
const fix = require('./mapper');
const artists = require('./artists-data');

const writeFile = util.promisify(fs.writeFile);

const root = process.cwd();

log(`Root: ${root}`);

const uniqueSet = new Set();

const isUnique = (key) => {
  if (uniqueSet.has(key)) {
    return false;
  }
  uniqueSet.add(key);
  return true;
};

const reduceArtist = (acc, it) => {
  const nickname = it.nickname;
  const keyName = fix(nickname);
  if (!isUnique(keyName)) {
    throw new Error(`Duplicate key [${keyName}] for nickname '${nickname}'`);
  }
  acc[keyName] = it;
  it.href = `/artist/${keyName}`;
  return acc;
};
const artistsMap = artists.reduce(reduceArtist, {});

const artistJson = `artists.json`;
writeFile(artistJson, JSON.stringify(artistsMap, null, 2), `utf8`).then(() => log(`Successfully saved to: ${artistJson}`))
  .catch((e) => log(`Failed to save file with ${e.message}`));


