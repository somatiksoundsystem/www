'use strict';

const generateId = require('./mapper.js');
const checkUnique = require('./utils.js');

const ARTIST_PATH = `/artist/`;
const ALBUM_PATH = `/album/`;

const DEFAULT_ARTIST_INFO = {
  photo: `/img/artists/default.png`,
  name: `Ivanov Ivan Invanovich`,
  info: `Consequuntur omnis non qui voluptatem praesentium libero eos non. Quibusdam vitae\n        aperiam inventore itaque sapiente rerum laboriosam accusamus. Non molestiae voluptas nobis possimus est\n        expedita. Impedit repellendus repellat voluptas fugit. In consectetur ipsum qui. Dolorem mollitia voluptatem\n        provident reprehenderit.`,
  url: `https://api.soundcloud.com/tracks/614559213`,
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
  url: `https://api.soundcloud.com/tracks/614559213`,
  social: {
    instagram: `https://instagram.com/dubsane`,
    vk: `https://vk.com/dubsane`,
    facebook: `https://fb.com/dubsane`,
    soundcloud: `https://soundcloud.com/altabdubsane`
  }
});

const PCP = newArtist(`Vova PCP`);
const AEDEM = newArtist(`Aedem`, {
  photo: `/img/artists/default.png`,
  name: `Константин Терентьев`,
  info: `Электронный музыкант из Санкт-Петербурга. Автор трех альбомов, выпущенных на Microcosmos Records. С 2016 года резидент Somatik Sound System, где выпустил несколько релизов, под которые любители самых разных жанров электроники успешно двигают телами в ритме 90 bpm. Музыка Aedem - это полет фантазии, быстрые переходы из мрачной романтики в интенсивный драйв, острый пронизывающий саунд, с тонким чувством вкуса сплетённые эмбиент, пситранс, техно - все это делает его творчество узнаваемым с первых тактов.`,
  social: {
    vk: `https://vk.com/kostia_aedem`,
    instagram: `https://instagram.com/aedem.ru/`,
    bandcamp: `https://aedem.bandcamp.com/`,
    soundcloud: `https://soundcloud.com/aedem`,
    facebook: `https://facebook.com/aedem.ru/`,
    discogs: `https://www.discogs.com/ru/artist/1843808-Aedem`
  }
});
const PRIMARY_SUBSTANCE = newArtist(`Primary Substance`, {
  photo: `/img/artists/default.png`,
  name: `Алексей Семенов`,
  info: `российский музыкальный проект, основанный в 2010 году в Санкт-Петербурге, музыкантом, рэпером и саунд дизайнером Алексеем Семеновым.
  Алексей Семенов известен, как создатель нескольких танцевальных и экспериментальных музыкальных проектов (Don’ttouchmebitch!, Russian outskirts, Харакири мс, there were) и участник ряда разных групп и объединений в Санкт-Петербурге и за его пределами. Участник крупных европейских и российских фестивалей, создатель ярких перформансов и необычных коллабораций.
  “Понятие музыки для меня, это нечто гораздо большее, чем создание треков для электронно-танцевальной индустрии, в соответствии с ее правилами и законами жанров. Мои творческие задачи каждый раз предполагают новые исследования. Будь то реализация субъективных психических содержаний и абстракций вроде сиюминутного настроения в конкретной звуковой форме, или чисто технические процессы из области саунд-дизайна. Это всегда погружение в темноту неизвестного, всегда путешествие без карты…`,
  social: {
    facebook: `https://facebook.com/Primarysubstance`,
    instagram: `https://instagram.com/primary_substance`,
    vk: `https://vk.com/primarysubstance`,
    bandcamp: `https://primarysubstance.bandcamp.com`,
    soundcloud: `https://soundcloud.com/primarysubstance`,
  }
});
const NPLM = newArtist(`NPLM`);
const KASHAPOV = newArtist(`Kashapov`);
const DOQTA = newArtist(`DOQTA`, {
  photo: `/img/artists/default.png`,
  name: `Сергей Ефимов`,
  info: `DOQTA электронный музыкант и экспериментальный продюсер из СПб, резидент Somatik Sound System (один из первых начал привлекать МС и использовать рэп акапеллы для записи соматик треков), Психея Саундсистем и bastardboogietunes soundsystem, участник и организатор многочисленных субкультурных проектов (Feodoq, Perecore, Враги, Adubtors, Stirka40, Duku and etc), техно-турист (исколесил с выступлениями треть планеты, 16 стран, сотни фестивалей и тысячи клубов, в том числе берлинский Трезор).`,
  social: {
    vk: `https://vk.com/doqta`,
    bandcamp: `https://doqta.bandcamp.com/album/dissocination`,
    soundcloud: `https://soundcloud.com/doqta-somatik`,
  }
});

const LEM = newArtist(`Lem`, {
  photo: `/img/artists/default.png`,
  name: `Nicholas LEM`,
  info: `somatik techno and ghettopsychedelic producer from Saint-P. Nicholas LEM - коренной представитель питерской школы somatik techno, оригинальный музыкант, чье творчество признано в России и за рубежом. Специалист по синтезаторам и саунд-дизайнер шведской фирмы Elektron, которая публикует его звуки в качестве официальных банков данных к своим инструментам. Экспериментальный, мощный аналоговый саунд, созданный LEM, изобилует глубокими вибрациями и виртуозными манипуляциями с ритм-машиной и свидетельствует о том, что русская электроника еще может удивлять`,
  social: {
    instagram: `https://www.instagram.com/nicholas_lem`,
    vk: `https://vk.com/lemnic`,
    facebook: `https://www.facebook.com/nicholas.lem.5`,
    soundcloud: `https://soundcloud.com/lemnic`,
    youtube: `http://www.youtube.com/user/lemelektron`
  }
});

const ARTISTS = [
  newArtist(`Arthur Tourenism`, {
    photo: `/img/artists/default.png`,
    name: `Arthur Mikhe Tourenism`,
    info: `Minsk based composer and sound designer. Co-founder / owner of Elemental Voices
Records. The old resident of Somatik Sound System.`,
    social: {
      instagram: `https://www.instagram.com/arthur_tourenism`,
      vk: `https://vk.com/tourenism`,
      bandcamp: `https://tourenism.bandcamp.com/`,
      discogs: `https://www.discogs.com/artist/2730027-Arthur-Tourenism`
    }
  }),
  newArtist(`Petr Nikitin`, {
    photo: `/img/artists/default.png`,
    name: `Nikita Petrashev`,
    social: {
      instagram: `https://www.instagram.com/petr._.nikitin/`,
      vk: `https://vk.com/petrrrnikitin`,
      soundcloud: `https://soundcloud.com/petrnikitin`,
    }
  }),
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
  newArtist(`Bees And Cobras`),
  AEDEM,
  newArtist(`ICD`),
  newArtist(`Cylriel`),
  newArtist(`Dopesmoker`),
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
    url: `https://api.soundcloud.com/playlists/506033388`
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
  url: `https://api.soundcloud.com/playlists/506033388`
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
