'use strict';

const pug = require('pug');
const log = require('fancy-log');
const fs = require('fs');
const path = require('path');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

const root = process.cwd();

log(`Root: ${root}`);

const dataDirPath = path.resolve(root, 'data');
const artistsJsonPath = path.resolve(dataDirPath, 'artists.json');

const artists = require(artistsJsonPath);

let allAlbums = [];
const albumNameSet = new Set();
for (const [, data] of Object.entries(artists)) {
  allAlbums = allAlbums.concat(data.albums);
}

const albums = allAlbums.filter(({name}) => {
  const has = albumNameSet.has(name);
  if (!has) {
    albumNameSet.add(name);
  }
  return !has;
});

const globals = {
  items: {
    Albums: 'index.html',
    Artists: 'artists.html',
    News: 'news.html',
    Shop: 'page-in-progress.html',
    Contacts: 'page-in-progress.html'
  }
};

const writeAlbums = async (outputPath) => {
  const output = path.resolve(root, outputPath);

  await mkdir(output, {recursive: true});

  const fn = pug.compileFile(path.resolve(root, 'source/views/albums/index.pug'), {});
  const albumsHtml = fn(Object.assign(globals, {albums}));

  await writeFile(path.resolve(output, 'index.html'), albumsHtml);

  return await writeFile(path.resolve(output, 'albums.html'), albumsHtml);
};
module.exports = writeAlbums;
