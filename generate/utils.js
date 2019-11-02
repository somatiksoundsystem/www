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

module.exports = checkUnique;
