'use strict';

const log = require('fancy-log');
const fs = require('fs');
const util = require('util');
const fix = require('./mapper');

const writeFile = util.promisify(fs.writeFile);

const root = process.cwd();

log(`Root: ${root}`);

const ARTISTS = [
  {
    nickname: `Dubsane`,
    photo: `/img/artists/dubsane.jpg`,
    name: `Alex Palastrov`,
    info: `Consequuntur omnis non qui voluptatem praesentium libero eos non. Quibusdam vitae\n        aperiam inventore itaque sapiente rerum laboriosam accusamus. Non molestiae voluptas nobis possimus est\n        expedita. Impedit repellendus repellat voluptas fugit. In consectetur ipsum qui. Dolorem mollitia voluptatem\n        provident reprehenderit.`,
    url: encodeURIComponent(`https://api.soundcloud.com/tracks/614559213`),
    social: {
      instagram: `https://instagram.com/dubsane`,
      vk: `https://vk.com/dubsane`,
      facebook: `https://fb.com/dubsane`,
      soundcloud: `https://soundcloud.com/altabdubsane`
    }
  },
  {nickname: `Lem`},
  {nickname: `Dronum`},
  {nickname: `Vova PCP`},
  {nickname: `Tsaritsa Logiki`},
  {nickname: `Alex Cool`},
  {nickname: `Office Passenger`},
  {nickname: `Primary Substance`},
  {nickname: `Kinestetic`},
  {nickname: `Doqta`},
  {nickname: `NPLM`},
  {nickname: `U3niko`},
  {nickname: `Kashapov`},
  {nickname: `Kansai`},
  {nickname: `Arthur Tourenism`},
  {nickname: `Bees And Cobras`},
  {nickname: `Aedem`},
  {nickname: `ICD`},
  {nickname: `Cylriel`},
  {nickname: `Dj's`},
  {nickname: `Dopesmoker`},
  {nickname: `Petr Nikitin`},
  {nickname: `Costas Alexas`},
];

const DEFAULT_ARTIST_INFO = {
  photo: `/img/artists/default.png`,
  name: `Ivanov Ivan Invanovich`,
  info: `Consequuntur omnis non qui voluptatem praesentium libero eos non. Quibusdam vitae\n        aperiam inventore itaque sapiente rerum laboriosam accusamus. Non molestiae voluptas nobis possimus est\n        expedita. Impedit repellendus repellat voluptas fugit. In consectetur ipsum qui. Dolorem mollitia voluptatem\n        provident reprehenderit.`,
  url: encodeURIComponent(`https://api.soundcloud.com/tracks/614559213`),
  social: {
    instagram: `https://instagram.com/dubsane`,
    vk: `https://vk.com/dubsane`,
    facebook: `https://fb.com/dubsane`,
    soundcloud: `https://soundcloud.com/altabdubsane`
  }
};

const uniqueSet = new Set();

const reduceArtist = (acc, it) => {
  const nickname = it.nickname;
  const keyName = fix(nickname);
  if (uniqueSet.has(keyName)) {
    throw new Error(`Artist with key ${keyName} and nickname ${nickname} exists`);
  }
  uniqueSet.add(keyName);
  acc[keyName] = it;
  it.href = `/artist/${keyName}`;
  return acc;
};
const artists = ARTISTS
  .map((it) => Object.assign({}, DEFAULT_ARTIST_INFO, it))
  .reduce(reduceArtist, {});

const artistJson = `artists.json`;
writeFile(artistJson, JSON.stringify(artists, null, 2), `utf8`).then(() => log(`Successfully saved to: ${artistJson}`))
  .catch((e) => log(`Failed to save file with ${e.message}`));


