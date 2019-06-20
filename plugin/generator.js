'use strict';

const pug = require('pug');
const log = require('fancy-log');
const fs = require('fs');
const path = require('path');
const util = require('util');

const GLOBALS = {
  items: {
    Albums: '/index.html',
    Artists: '/artists.html',
    News: '/news.html',
    Shop: '/page-in-progress.html',
    Contacts: '/page-in-progress.html'
  }
};

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

const root = process.cwd();

log(`Root: ${root}`);

const dataDirPath = path.resolve(root, 'data');
const artistsJsonPath = path.resolve(dataDirPath, 'artists.json');

const artists = require(artistsJsonPath);

const filterAlbums = () => {
  let allAlbums = [];
  const albumNameSet = new Set();
  for (const [, data] of Object.entries(artists)) {
    allAlbums = allAlbums.concat(data.albums);
  }

  return allAlbums.filter(({name}) => {
    const has = albumNameSet.has(name);
    if (!has) {
      albumNameSet.add(name);
    }
    return !has;
  });
};

const albums = filterAlbums();


async function createDirs(...paths) {
  const output = path.resolve(root, ...paths);

  await mkdir(output, {recursive: true});
  return output;
}

const writeAlbums = async (output) => {

  const fn = pug.compileFile(path.resolve(root, 'source/views/albums/index.pug'), {});
  const albumsHtml = fn(Object.assign(GLOBALS, {albums}));

  await writeFile(path.resolve(output, 'index.html'), albumsHtml);

  return await writeFile(path.resolve(output, 'albums.html'), albumsHtml);
};

const writeArtist = async (outputPath, name, artist) => {

  const fn = pug.compileFile(path.resolve(root, 'source/views/artists/artist.pug'), {});
  const html = fn(Object.assign(GLOBALS, {artist}));

  const output = await createDirs(outputPath, 'artist');

  await writeFile(path.resolve(output, `${name}.html`), html);

  artist.href = `artist/${name}.html`;
};

const writeArtists = async (output) => {
  const promises = [];
  for (const [name, artist] of Object.entries(artists)) {
    promises.push(writeArtist(output, name, artist));
  }

  await Promise.all(promises);

  const fn = pug.compileFile(path.resolve(root, 'source/views/artists/index.pug'), {});
  const artistsHtml = fn(Object.assign(GLOBALS, {artists: Object.values(artists)}));

  return await writeFile(path.resolve(output, 'artists.html'), artistsHtml);
};

module.exports = async (outputPath) => {
  outputPath = await createDirs(outputPath);

  const albumsPromise = writeAlbums(outputPath);
  const artistsPromise = writeArtists(outputPath);

  return await Promise.all([albumsPromise, artistsPromise]);
};
