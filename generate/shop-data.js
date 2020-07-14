'use strict';

const generateId = require('./mapper.js');
const {checkUnique} = require('./utils.js');

const SHOP_ITEM_PATH = `/shop/`;
const SHOP_ITEM_PHOTO_PATH = `/img/shop/thumb/`;

const DEFAULT_SHOP_ITEM_INFO = {
  photo: `default.png`,
  name: `Super Switshot`,
  info: `Тёплый мягкий охуенный и суперпиздатый свитшот, бери его скорее сука!`,
};

const checkUniqueName = checkUnique(
  ({id, name}) => {
    throw new Error(`Duplicate id [${id}] for name: '${name}'`)
  }
);

const newShopItem = (name, info = DEFAULT_SHOP_ITEM_INFO) => {
  info = {...DEFAULT_SHOP_ITEM_INFO, ...info};
  const id = generateId(name);
  const href = SHOP_ITEM_PATH + id;
  const photo_url = info.photo;
  const photo = SHOP_ITEM_PHOTO_PATH + info.photo;
  const item = {...info, ...{id, name, href, photo, photo_url}};
  checkUniqueName(item);
  return item;
};

const SHOP_ITEMS = [
  newShopItem(`Кепка Соматик`),
  newShopItem(`Кофта Соматик`, {
    info: `Моднейший`,
  }),
  newShopItem(`Часы Соматик`),
  newShopItem(`Сома-трусы`),
];

module.exports = {SHOP_ITEMS};
