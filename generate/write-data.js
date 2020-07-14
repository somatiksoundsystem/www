'use strict';

const log = require('fancy-log');
const util = require('util');
const writeFile = util.promisify(require('fs').writeFile);
const artists = require('./artists-data').ARTISTS;
const shop = require('./shop-data').SHOP_ITEMS;

const root = process.cwd();

log(`Root: ${root}`);

const reduceArtist = (acc, it) => {
  acc[it.id] = it;
  for (const album of it.albums) {
    album.authors = album.authors.map(({id}) => id);
  }
  return acc;
};

function write(path, data) {
  writeFile(path, JSON.stringify(data, null, 2), `utf8`)
    .then(() => log(`Successfully saved to: ${path}`))
    .catch((e) => log(`Failed to save file with ${e.message}`));
}

write(`../data/artists.json`, artists.reduce(reduceArtist, {}));

const shopMap = shop.reduce((acc, it) =>({[it.id]: it, ...acc}), {});
write(`../data/shop.json`, shopMap);

