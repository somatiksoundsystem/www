'use strict';

const log = require('fancy-log');
const fs = require('fs');
const util = require('util');
const artists = require('./artists-data').ARTISTS;

const writeFile = util.promisify(fs.writeFile);

const root = process.cwd();

log(`Root: ${root}`);

const reduceArtist = (acc, it) => {
  acc[it.id] = it;
  for (const album of it.albums) {
    album.authors = album.authors.map(({id}) => id);
  }
  return acc;
};

const artistsMap = artists.reduce(reduceArtist, {});

const artistJson = `../data/artists.json`;
writeFile(artistJson, JSON.stringify(artistsMap, null, 2), `utf8`)
  .then(() => log(`Successfully saved to: ${artistJson}`))
  .catch((e) => log(`Failed to save file with ${e.message}`));


