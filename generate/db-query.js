const {ARTISTS, ALBUMS} = require('./artists-data');

console.log(ALBUMS.map((it) => `('${it.name}',TIMESTAMP(STR_TO_DATE('${it.date ? it.date : '01.01.2016'}','%d.%m.%Y')),'${it.image}',${it.url ? `'${it.url}'` : 'DEFAULT'})`)
  .join(`,\n`));

console.log(ARTISTS.map((it) => `('${it.nickname}','${it.name}','${it.info}','${it.photo_url}')`)
  .join(`,\n`));

const eachArtist = (it) => {
  console.log(`$artist = Artist::resolve("${it.nickname}");`)
  Object.entries(it.social).forEach(([key, value]) => {
    console.log(`$artist->addSocialLink("${key}", "${value}");`)
  })
};

ARTISTS.forEach(eachArtist)

const resolveAlbum = (it) => {
  console.log(`$artist = Artist::resolve("${it.nickname}");`)
  for (const album of it.albums) {
    console.log(`$album = Album::resolve("${album.name}");`)
    console.log(`$artist->addAlbum($album);`)
  }
};

ARTISTS.forEach(resolveAlbum)

