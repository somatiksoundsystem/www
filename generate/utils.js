const isUnique = (uniqueSet, key) => {
  if (uniqueSet.has(key)) {
    return false;
  }
  uniqueSet.add(key);
  return true;
};

const checkUnique = (onNotUnique) => {
  const uniqueSet = new Set();
  return (item) => {
    if (!isUnique(uniqueSet, item.id)) {
      onNotUnique(item);
    }
    return item;
  }
};

const toObject = (array) => array.reduce((acc, it, idx) => {
  if (Array.isArray(it)) {
    acc[it[0]] = it[1];
  } else {
    acc[it] = idx;
  }
  return acc;
}, {});

module.exports = {checkUnique, toObject};
