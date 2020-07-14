'use strict';

const pug = require('pug');
const log = require('fancy-log');
const fs = require('fs');
const path = require('path');
const util = require('util');

const GLOBALS = {
  items: {
    Albums: '/',
    Artists: '/artists',
    News: '/news',
    Shop: '/shop',
    Contacts: '/page-in-progress'
  }
};

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

const root = process.cwd();

log(`Root: ${root}`);

const dataDirPath = path.resolve(root, 'data');
const ARTISTS_JSON_PATH = path.resolve(dataDirPath, 'artists.json');
const NEWS_JSON_PATH = path.resolve(dataDirPath, 'news.json');
const SHOP_JSON_PATH = path.resolve(dataDirPath, 'shop.json');

const artists = require(ARTISTS_JSON_PATH);

// TODO: check json consistency
const filterAlbums = () => {
  let allAlbums = [];
  for (const [, data] of Object.entries(artists)) {
    allAlbums = allAlbums.concat(data.albums);
  }

  allAlbums.forEach((album) => {
    album.authors = album.authors.map((id) => artists[id]);
  });

  return allAlbums;
};

const albums = filterAlbums();


async function createDirs(...paths) {
  const output = path.resolve(root, ...paths);

  await mkdir(output, {recursive: true});
  return output;
}

const writeAlbum = async (outputPath, album) => {

  const fn = pug.compileFile(path.resolve(root, 'source/views/albums/album.pug'), {});
  const html = fn(Object.assign(GLOBALS, {album}));

  const output = await createDirs(outputPath, 'album');

  return writeFile(path.resolve(output, `${album.id}.html`), html);
};

const writeAlbums = async (output) => {

  const promises = [];
  for (const album of albums) {
    promises.push(writeAlbum(output, album));
  }

  const fn = pug.compileFile(path.resolve(root, 'source/views/albums/index.pug'), {});
  const albumsHtml = fn(Object.assign(GLOBALS, {albums}));

  promises.push(writeFile(path.resolve(output, 'index.html'), albumsHtml));
  promises.push(writeFile(path.resolve(output, 'albums.html'), albumsHtml));
  return Promise.all(promises);
};

const writeArtist = async (outputPath, artist) => {

  const fn = pug.compileFile(path.resolve(root, 'source/views/artists/artist.pug'), {});
  const html = fn(Object.assign(GLOBALS, {artist}));

  const output = await createDirs(outputPath, 'artist');

  return writeFile(path.resolve(output, `${artist.id}.html`), html);
};

const writeArtists = async (output) => {
  const promises = [];
  for (const [, artist] of Object.entries(artists)) {
    promises.push(writeArtist(output, artist));
  }

  const fn = pug.compileFile(path.resolve(root, 'source/views/artists/index.pug'), {});
  const artistsHtml = fn(Object.assign(GLOBALS, {artists: Object.values(artists)}));

  promises.push(writeFile(path.resolve(output, 'artists.html'), artistsHtml));
  return Promise.all(promises);
};

const news = require(NEWS_JSON_PATH);
const writeNews = async (output) => {
  const fn = pug.compileFile(path.resolve(root, 'source/views/news/index.pug'), {});
  const html = fn(Object.assign(GLOBALS, {news}));

  return writeFile(path.resolve(output, 'news.html'), html);
};

const shop = require(SHOP_JSON_PATH);
const writeShop = async (output) => {
  const fn = pug.compileFile(path.resolve(root, 'source/views/shop/index.pug'), {});
  const html = fn(Object.assign(GLOBALS, {shopItems: Object.values(shop)}));

  return writeFile(path.resolve(output, 'shop.html'), html);
};

module.exports = async (outputPath) => {
  outputPath = await createDirs(outputPath);

  const albumsPromise = writeAlbums(outputPath);
  const artistsPromise = writeArtists(outputPath);
  const newsPromise = writeNews(outputPath);
  const shopPromise = writeShop(outputPath);

  return Promise.all([albumsPromise, artistsPromise, newsPromise, shopPromise]);
};
