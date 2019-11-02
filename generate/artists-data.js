'use strict';

const generateId = require('./mapper.js');
const checkUnique = require('./utils.js');

const ARTIST_PATH = `/artist/`;
const ALBUM_PATH = `/album/`;

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

const checkUniqueArtist = checkUnique(
  ({id, nickname}) => {
    throw new Error(`Duplicate id [${id}] for nickname '${nickname}'`)
  }
);

const newArtist = (nickname, info = DEFAULT_ARTIST_INFO) => {
  const id = generateId(nickname);
  const href = ARTIST_PATH + id;
  const artist = {...info, ...{id, nickname, href, albums: []}};
  checkUniqueArtist(artist);
  return artist;
};

const DUBSANE = newArtist(`Dubsane`, {
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
});

const PCP = newArtist(`Vova PCP`);
const AEDEM = newArtist(`Aedem`);
const PRIMARY_SUBSTANCE = newArtist(`Primary Substance`);
const NPLM = newArtist(`NPLM`);
const KASHAPOV = newArtist(`Kashapov`);
const DOQTA = newArtist(`Doqta`);
const LEM = newArtist(`Lem`);

const ARTISTS = [
  DUBSANE,
  LEM,
  newArtist(`Dronum`),
  PCP,
  newArtist(`Tsaritsa Logiki`),
  newArtist(`Alex Cool`),
  newArtist(`Office Passenger`),
  PRIMARY_SUBSTANCE,
  newArtist(`Kinestetic`),
  DOQTA,
  NPLM,
  newArtist(`U3niko`),
  KASHAPOV,
  newArtist(`Kansai`),
  newArtist(`Arthur Tourenism`),
  newArtist(`Bees And Cobras`),
  AEDEM,
  newArtist(`ICD`),
  newArtist(`Cylriel`),
  newArtist(`Dj's`),
  newArtist(`Dopesmoker`),
  newArtist(`Petr Nikitin`),
  newArtist(`Costas Alexas`),
];

const ALBUMS = [
  {
    image: `/img/albums/album_thumb_escape.jpg`,
    authors: [DUBSANE],
    name: `Escape`,
    date: `01.01.2018`,
    social: {
      vk: `https://vk.com/music?z=audio_playlist16058189_73062618`,
      soundcloud: `https://soundcloud.com/altabdubsane/sets/dubsane-escape`
    },
    url: encodeURIComponent(`https://api.soundcloud.com/playlists/506033388`)
  },
  {
    image: `/img/albums/album_thumb_escape.jpg`,
    authors: [DUBSANE],
    name: `Girls`,
    date: `01.01.2019`
  },
  {
    name: `Neverendingstory`,
    image: `/img/albums/album_thumb_neverending-story.jpg`,
    authors: [PCP]
  },
  {
    image: `/img/albums/album_thumb_eat-my-face.jpg`,
    authors: [AEDEM],
    name: `Eat my face`
  },
  {
    image: `/img/albums/album_thumb_hidden-by-the-leaves.jpg`,
    authors: [PRIMARY_SUBSTANCE],
    name: `Hidden by the leaves`
  },
  {
    image: `/img/albums/album_thumb_luna.jpg`,
    authors: [NPLM],
    name: `Luna`
  },
  {
    image: `/img/albums/album_thumb_mashapov.jpg`,
    authors: [KASHAPOV],
    name: `Mashapov`
  },
  {
    image: `/img/albums/album_thumb_raver-baby.jpg`,
    authors: [AEDEM],
    name: `Raver baby`
  },
  {
    image: `/img/albums/album_thumb_dissocination.jpg`,
    authors: [DOQTA],
    name: `Dissocination`
  },
  {
    image: `/img/albums/album_thumb_dlya-orgij-i-horovodov.jpg`,
    authors: [LEM],
    name: `Для Оргий И Хороводов`
  },
  {
    image: `/img/albums/album_thumb_pcp-remixes.jpg`,
    authors: [PCP],
    name: `Remixes`
  }
];

const DEFAULT_ALBUM_INFO = {
  image: `/img/albums/album_thumb_escape.jpg`,
  name: `Escape`,
  date: `01.01.2018`,
  social: {
    vk: `https://vk.com/music?z=audio_playlist16058189_73062618`,
    soundcloud: `https://soundcloud.com/altabdubsane/sets/dubsane-escape`
  },
  url: encodeURIComponent(`https://api.soundcloud.com/playlists/506033388`)
};

const checkUniqueAlbum = checkUnique(
  ({id, name}) => {
    throw new Error(`Duplicate id [${id}] for album '${name}'`)
  }
);
ALBUMS
  .forEach((it) => {
    const id = generateId(it.name);
    const href = ALBUM_PATH + id;
    const album = {...DEFAULT_ALBUM_INFO, ...it, ...{id, href}};
    checkUniqueAlbum(album);
    for (const artist of album.authors) {
      artist.albums.push(album);
    }
  });


module.exports = ARTISTS;
