const {ARTISTS, ALBUMS} = require('./artists-data');

console.log(ALBUMS.map((it) => `('${it.name}',TIMESTAMP(STR_TO_DATE('${it.date ? it.date : '01.01.2016'}','%d.%m.%Y')),'${it.image}',${it.url ? `'${it.url}'` : 'DEFAULT'})`)
  .join(`,\n`));

console.log(ARTISTS.map((it) => `('${it.nickname}','${it.name}','${it.info}','${it.photo_url}')`)
  .join(`,\n`));
