'use strict';

const generateId = require('./mapper.js');
const checkUnique = require('./utils.js');

const ARTIST_PATH = `/artist/`;
const ALBUM_PATH = `/album/`;
const ARTIST_PHOTO_PATH = `/img/artists/thumb/`;
const ALBUM_PHOTO_PATH = `/img/albums/thumb/`;

const DEFAULT_ARTIST_INFO = {
  photo: `default.png`,
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
  const photo = ARTIST_PHOTO_PATH + info.photo;
  const artist = {...info, ...{id, nickname, href, photo, albums: []}};
  checkUniqueArtist(artist);
  return artist;
};

const DUBSANE = newArtist(`Dubsane`, {
  nickname: `Dubsane`,
  photo: `dubsane.jpg`,
  name: `Alex Palastrov`,
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
  photo: `aedem.jpg`,
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
  photo: `primary_substance.jpg`,
  name: `Алексей Семенов`,
  info: `Российский музыкальный проект, основанный в 2010 году в Санкт-Петербурге, музыкантом, рэпером и саунд дизайнером Алексеем Семеновым.
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
const KASHAPOV = newArtist(`Kashapov`, {
  photo: `kashapov.jpg`,
  name: `Евгений Кашапов`,
  info: `Один из первых соматик диджеев. В секте с 2014 года. В 2016 стал сооснователем подпольного бара "точка", который стал легендой петербургского андеграунда. В 2017 проехал полстраны автостопом выступая в разных городах. В 2019 создал проект машапов, в котором создаю машап ремиксы на всякие песни.`,
  social: {
    instagram: `https://instagram.com/evgenkashapov`,
    vk: `https://vk.com/evgenkashapov`,
  }
});
const DOQTA = newArtist(`DOQTA`, {
  photo: `doqta.jpg`,
  name: `Сергей Ефимов`,
  info: `DOQTA электронный музыкант и экспериментальный продюсер из СПб, резидент Somatik Sound System (один из первых начал привлекать МС и использовать рэп акапеллы для записи соматик треков), Психея Саундсистем и bastardboogietunes soundsystem, участник и организатор многочисленных субкультурных проектов (Feodoq, Perecore, Враги, Adubtors, Stirka40, Duku and etc), техно-турист (исколесил с выступлениями треть планеты, 16 стран, сотни фестивалей и тысячи клубов, в том числе берлинский Трезор).`,
  social: {
    vk: `https://vk.com/doqta`,
    bandcamp: `https://doqta.bandcamp.com/album/dissocination`,
    soundcloud: `https://soundcloud.com/doqta-somatik`,
  }
});

const LEM = newArtist(`Lem`, {
  photo: `lem.jpg`,
  name: `Nicholas LEM`,
  info: `Somatik techno and ghettopsychedelic producer from Saint-P. Nicholas LEM - коренной представитель питерской школы somatik techno, оригинальный музыкант, чье творчество признано в России и за рубежом. Специалист по синтезаторам и саунд-дизайнер шведской фирмы Elektron, которая публикует его звуки в качестве официальных банков данных к своим инструментам. Экспериментальный, мощный аналоговый саунд, созданный LEM, изобилует глубокими вибрациями и виртуозными манипуляциями с ритм-машиной и свидетельствует о том, что русская электроника еще может удивлять`,
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
    photo: `arthur_tourenism.jpg`,
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
    photo: `petr_nikitin.jpg`,
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
  newArtist(`Alex Cool`, {
    photo: `alex_cool.jpg`,
    name: `Алексей Кулагин`,
    info: `«Когда слушаешь его треки, становится ясно, что слово "COOL" в его псевдониме означает дикий, 45-градусный сибирский холод. На фоне которого, по практически безжизненному пейзажу шагает, раскачиваясь, покрытый инеем, лязгающий, металлический бит, линии acid-арпеджио вспыхивают как газовые факела, а сверху светящимися восходящими потоками летит мелодия, в которой слышны гармонии ушедшей древней империи Востока. Так могло бы звучать ритуальное техно, если бы оно появилось на планете Татуин.», - Vova PCP.`,
    social: {
      instagram: `https://www.instagram.com/technoalexcool/`,
      vk: `https://vk.com/acltech`,
      facebook: `https://www.facebook.com/alexcooltech`,
      soundcloud: `https://soundcloud.com/alex-cool`,
    }
  }),
  newArtist(`Office Passenger`, {
    photo: `office_passenger.jpg`,
    name: `Игорь Ряков`,
    info: `Самогенерирующиеся закрученные сюжетные линии внутренних переживаний обычного офисного клерка
пропущенная через кучу синтезаторов и всяческих педалей`,
    social: {
      instagram: `https://www.instagram.com/officepassenger/`,
      bandcamp: `https://officepassenger.bandcamp.com/`,
      vk: `https://vk.com/bubbleberry`,
      facebook: `https://www.facebook.com/OfficePassenger/`,
      soundcloud: `https://soundcloud.com/officepassenger`,
      youtube: `https://www.youtube.com/channel/UC6UJ6HvlV485IWZhmPJ2piQ`
    }
  }),
  PRIMARY_SUBSTANCE,
  newArtist(`Kinestetic`),
  DOQTA,
  NPLM,
  newArtist(`U3niko`, {
    photo: `u3niko.jpg`,
    name: `Евгений Малашенков`,
    info: `The project U3niko music interpretation of the relationship of nature, people and robots. Robots as part of nature, the product of man and the highest stage of evolution.`,
    social: {
      instagram: `https://www.instagram.com/evgeny_malashenkov/`,
      vk: `https://vk.com/u3nik`,
      facebook: `https://www.facebook.com/profile.php?id=100010250283615`,
      soundcloud: `https://soundcloud.com/user-930539857`,
    }
  }),
  KASHAPOV,
  newArtist(`Kansai`, {
    photo: `kansai.jpg`,
    name: `Павел Кондыгин`,
    info: `KANSAI - это DJ и Саунд продюсер из маленького посёлка Сорум, в ХМАО-Югре с населением в 1500 человек. В 2013 году KANSAI побывал в Санкт-Петербурге, познакомился с группой P.C.P., с Somatik и с их творчеством. После поездки в Питер, был написан трек - Blinking Vandals, затем еще несколько треков, а также вторая версия трека Blinking vandals. На тот момент, интернета в Соруме практически не было, поэтому треки приходилось отправлять на флешках. В 2017 году  на SS вышел альбом "Blinking vandals". В октябре 2018 года на Somatik Sound System вышел альбом "Tripster", в июле 2019 года EP "Sub Sun"`,
    social: {
      instagram: `https://www.instagram.com/kansai_somatik_sound_system`,
      vk: `https://vk.com/kansai88`,
      soundcloud: `https://soundcloud.com/x8mgt7gmkj7x`,
    }
  }),
  newArtist(`Bees And Cobras`, {
    photo: `bees_and_cobras.jpg`,
    name: `Евгений Псов`,
    social: {
      instagram: `https://www.instagram.com/eugene.eeee`,
      vk: `https://vk.com/reveswa`,
      facebook: `https://www.facebook.com/beesandcobras`,
      soundcloud: `https://soundcloud.com/beesandcobras`,
      bandcamp: `https://beesandcobras.bandcamp.com`
    }
  }),
  AEDEM,
  newArtist(`ICD`),
  newArtist(`Cylriel`),
  newArtist(`Dopesmoker`),
  newArtist(`Costas Alexas`),
];

const ALBUMS = [
  {
    image: `album_escape.jpg`,
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
    image: `album_girls.jpg`,
    authors: [DUBSANE],
    name: `Girls`,
    date: `01.01.2019`
  },
  {
    name: `Neverendingstory`,
    image: `album_neverending-story.jpg`,
    authors: [PCP]
  },
  {
    image: `album_eat-my-face.jpg`,
    authors: [AEDEM],
    name: `Eat my face`
  },
  {
    image: `album_hidden-by-the-leaves.jpg`,
    authors: [PRIMARY_SUBSTANCE],
    name: `Hidden by the leaves`
  },
  {
    image: `album_luna.jpg`,
    authors: [NPLM],
    name: `Luna`
  },
  {
    image: `album_mashapov.jpg`,
    authors: [KASHAPOV],
    name: `Mashapov`
  },
  {
    image: `album_raver-baby.jpg`,
    authors: [AEDEM],
    name: `Raver baby`
  },
  {
    image: `album_dissocination.jpg`,
    authors: [DOQTA],
    name: `Dissocination`
  },
  {
    image: `album_dlya-orgij-i-horovodov.jpg`,
    authors: [LEM],
    name: `Для Оргий И Хороводов`
  },
  {
    image: `album_pcp-remixes.jpg`,
    authors: [PCP],
    name: `Remixes`
  }
];

const DEFAULT_ALBUM_INFO = {
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

const createAlbum = (it) => {
  const id = generateId(it.name);
  const href = ALBUM_PATH + id;
  const image = ALBUM_PHOTO_PATH + it.image;
  const album = {...DEFAULT_ALBUM_INFO, ...it, ...{id, href, image}};
  checkUniqueAlbum(album);
  for (const artist of album.authors) {
    artist.albums.push(album);
  }
};

ALBUMS.forEach(createAlbum);


module.exports = ARTISTS;
